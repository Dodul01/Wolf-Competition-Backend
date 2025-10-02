import mongoose from "mongoose";
import { emailTemplate } from "../../../shared/emailTemplate";
import { errorLogger, logger } from "../../../shared/logger";
import sendEmail from "../../helpers/email-helper/emailSender";
import generateOTP from "../../helpers/generateOTP/generateOTP";
import { OTP } from "../Otp/otp.model";
import { IForgetPassword, IUser } from "./user.interface";
import { User } from "./user.model";
import colors from 'colors';
import AppError from "../../error/AppError";
import http from 'http-status';
import config from "../../../config";
import { createToken } from "../Auth/auth.utils";
import jwt from 'jsonwebtoken'

//create user into db
const createUserIntoDB = async (user: IUser) => {
    const session = await mongoose.startSession();

    session.startTransaction();

    try {
        const result = await User.create(user);

        //generate otp
        const otp = await generateOTP(6);

        //save the otp and send it to user email
        await OTP.create({
            userId: result._id,
            otp: otp,
            email: user.email
        });

        // send OTP
        sendEmail({
            from: 'onboarding@resend.dev',
            to: 'delivered@resend.dev',
            template: emailTemplate.verifyEmail({ name: user.userName || 'User', OTP: otp }),
        });
        await session.commitTransaction();
        return result;
    } catch (err: any) {
        logger.error(colors.bgRed(colors.black(`🚨 Error in creating user into DB : ${err}`)));

        await session.abortTransaction();

        throw new AppError(err, http.BAD_REQUEST.toString())
    } finally {
        session.endSession();
    }
};

const forgetPassword = async (data: IForgetPassword) => {
    const { email } = data;

    const session = await mongoose.startSession();

    session.startTransaction();

    try {
        const user = await User.findOne({ email });

        if (!user) {
            throw new AppError(http.NOT_FOUND, "User not found.");
        }

        const otp = await generateOTP(6);

        await OTP.create({
            userId: user._id,
            otp: otp,
            email: email
        });

        // generate token
        const jwtPayload = {
            _id: user._id.toString(),
            name: user?.userName || 'User',
            email: user.email,
            role: user.role || 'user',
            isVerified: user.isVerified || true,
            isDeleted: user.isDeleted || false
        };

        sendEmail({
            from: 'onboarding@resend.dev',
            to: 'delivered@resend.dev',
            template: emailTemplate.forgetPassword({ name: user.userName || 'User', OTP: otp }),
        });

        const jwtToken = createToken(jwtPayload, config.jwt.jwt_secret as string, config.jwt.jwt_expire_in as string);

        return jwtToken;
    } catch (err: any) {
        logger.error(colors.bgRed(colors.black(`🚨 Error in forget password : ${err}`)));

        await session.abortTransaction();

        throw new AppError(err, http.BAD_REQUEST.toString());
    } finally {
        session.endSession();
    }
}

const resetPassword = async (data: any, token: string) => {
    const { newPassword, confirmPassword } = data;

    if (!token) {
        errorLogger.error(colors.bgRed(colors.black(`🚨 Token not found.`)));
        throw new AppError(http.UNAUTHORIZED, "Please provide token to reset password.");
    }

    let decoded;
    try {
        decoded = jwt.verify(token, config.jwt.jwt_secret as string);

        if (!decoded) {
            errorLogger.error(colors.bgRed(colors.black(`🚨 Token not found.`)));
            throw new AppError(http.UNAUTHORIZED, "Please provide token to reset password.");
        }

        let userId;

        if (typeof decoded === 'object' && '_id' in decoded) {
            userId = (decoded as { _id: string })._id;
        } else {
            errorLogger.error(colors.bgRed(colors.black(`🚨 Invalid token payload.`)));
            throw new AppError(http.UNAUTHORIZED, "Invalid token payload.");
        }

        const user = await User.findOne({ _id: userId });

        if (!user) {
            errorLogger.error(colors.bgRed(colors.black(`🚨 User not found.`)));
            throw new AppError(http.NOT_FOUND, "User not found.");
        }

        if (newPassword !== confirmPassword) {
            throw new AppError(http.BAD_REQUEST, "New password and confirm password do not match.");
        }

        user.password = newPassword;
        await user.save();

        logger.info(colors.bgGreen(colors.black(`🤘Password reset successfully.`)));

        return user;
    } catch (err: any) {
        logger.error(colors.bgRed(colors.black(`🚨 Error in forget password : ${err}`)));
        throw new AppError(err, http.BAD_REQUEST.toString());
    }
}

export const UserService = {
    createUserIntoDB,
    forgetPassword,
    resetPassword
}