import { emailTemplate } from "../../../shared/emailTemplate";
import sendEmail from "../../helpers/email-helper/emailSender";
import { IUser } from "./user.interface";
import { User } from "./user.model";

//create user into db
const createUserIntoDB = async (user: IUser) => {
    const result = await User.create(user);

    // send OTP
    sendEmail({
        from: 'onboarding@resend.dev',
        to: 'delivered@resend.dev',
        template: emailTemplate.verifyEmail({name: user.userName || 'User', OTP: 123456}), 
    });

    return result;
};

export const UserService = {
    createUserIntoDB,
}