import { Request, Response } from "express";
import { VerifyUserService } from "./verifyUser.service";
import catchAsync from "../../utils/catchAsync";
import { verifyUserValidationSchema } from "./verifyUser.validation";
import sendResponse from "../../utils/sendResponse";

// const verifyUser = async (req: Request, res: Response) => {
//     const { email, otp } = req.body;
//     const zodPerser = await 
//     const data = VerifyUserService.verifyOTP()
//     // console.log(req.body);


// }
const verifyUser = catchAsync(async (req: Request, res: Response) => {
    const zodPerser = verifyUserValidationSchema.verifyUserValidation.parse(req.body);
    const data = await VerifyUserService.verifyOTP(zodPerser);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User verified successfully",
        data
    });
});

export const VerifyUserController = {
    verifyUser
}