import AppError from "../../error/AppError";
import { OTP } from "../Otp/otp.model";
import { User } from "../User/user.model";
import { IVerifyUser } from "./verifyUser.interface";
import httpStatus from 'http-status';

const verifyOTP = async (data: IVerifyUser) => {
    const { email, otp } = data;

    // check if the user exist
    const user = await User.findOne({ email });

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found.");
    }

    const isOtpExist = await OTP.findOne({ otp });

    if (!isOtpExist) {
        throw new AppError(httpStatus.NOT_FOUND, "OTP not found.")
    }

    if (user.email !== email) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Invalid email address.");
    }

    const updatedUser = await User.findOneAndUpdate({ email }, { isVerified: true }, { new: true })

    await OTP.findOneAndDelete({ email });

    return updatedUser;
}

export const VerifyUserService = {
    verifyOTP
}