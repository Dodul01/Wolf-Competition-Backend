import mongoose from "mongoose";
import { emailTemplate } from "../../../shared/emailTemplate";
import { logger } from "../../../shared/logger";
import sendEmail from "../../helpers/email-helper/emailSender";
import generateOTP from "../../helpers/generateOTP/generateOTP";
import { OTP } from "../Otp/otp.model";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import colors from 'colors';
import AppError from "../../error/AppError";
import http from 'http-status';

//create user into db
const createUserIntoDB = async (user: IUser) => {
    const session = await mongoose.startSession();

    session.startTransaction();

    try {
        const result = await User.create(user);

        //generate otp
        const otp = await generateOTP(6);

        //save the otp and send it to user email
        const saveOtp = await OTP.create({
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

export const UserService = {
    createUserIntoDB,
}