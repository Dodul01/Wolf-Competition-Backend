import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { userValidation } from "./user.validation";
import { UserService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from 'http-status'

const createUser = catchAsync(async (req: Request, res: Response) => {
    const user = req.body;
    const zodPerserUser = userValidation.userValidationSchema.parse(user);
    const result = await UserService.createUserIntoDB(zodPerserUser);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'User created successfully',
        data: result
    });
});

const forgetPassword = catchAsync(async (req: Request, res: Response) => {
    const email = req.body;
    const zodPerser = userValidation.forgetPasswordValidation.parse(email);
    const result = await UserService.forgetPassword(zodPerser);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Check your email for OTP to reset password.',
        data: result,
    })
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
    const data = req.body;
    const token = req.headers.authorization?.split(' ')[1];
    const zodPerser = userValidation.resetPasswordValidation.parse(data);
    const result = await UserService.resetPassword(zodPerser, token as string);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Password reset successfully",
        data: result,
    });
});

export const UserController = {
    createUser,
    forgetPassword,
    resetPassword
}