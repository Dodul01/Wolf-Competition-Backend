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


export const UserController = {
    createUser
}