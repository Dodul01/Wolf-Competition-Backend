import AppError from "../../error/AppError";
import { OTP } from "../Otp/otp.model";
import { User } from "../User/user.model";
import { IVerifyUser } from "./verifyUser.interface";
import httpStatus from 'http-status';

const verifyOTP = async (data: IVerifyUser) => {
    /* TODO
        1. check the email exsist or not
        2. check the otp is correct or not
        3. mark user as verified
        4. remove otp
    */
   
    const { email, otp } = data;
    let user;

    // check if the user exist
    const isUserExist = await User.findOne({ email });

    if (!isUserExist) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found.");
    }

    // if exist then assign to user
    user = isUserExist;

    const isOtpExist = await OTP.findOne({ otp });

    if (!isOtpExist) {
        throw new AppError(httpStatus.NOT_FOUND, "OTP not found.")
    }

    if (isUserExist.email !== email) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Invalid email address.");
    }

    user = await User.findOneAndUpdate({ email }, { isVerified: true }, { new: true })

    await OTP.findOneAndDelete({ email });

    return user;
}

export const VerifyUserService = {
    verifyOTP
}