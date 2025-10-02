import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { RafflesService } from "./raffles.service";
import sendResponse from "../../utils/sendResponse";
import { raffleValidation } from "./raffles.validation";
import AppError from "../../error/AppError";
import httpStatus from 'http-status';
import { errorLogger } from "../../../shared/logger";
import colors from 'colors';
import { getRaffleThumbnailURL } from "../../utils/uploadImage";

const createRaffles = catchAsync(async (req: Request, res: Response) => {

    if (!req.file) {
        errorLogger.error(colors.red("Upload thumbnail"))
        throw new AppError(httpStatus.BAD_REQUEST, "Thumbnail is required.");
    }

    // validate other fields
    const zodPersed = raffleValidation.raffleValidationSchema.parse(req.body);

    // get thumbnail url
    const thumbnailURL = getRaffleThumbnailURL(req.file.filename);

    // combine data 
    const raffleData = {
        ...zodPersed,
        thumbnail: thumbnailURL
    }

    const result = await RafflesService.createRaffles(raffleData);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Reffles created successfully",
        data: result,
    })
});

const updateRaffles = catchAsync(async (req: Request, res: Response) => {
    const data = req.body;
    const raffleId = req.params.rafflesId;

    let raffleData = {};

    if (req.file) {
        const thumbnailURL = getRaffleThumbnailURL(req.file.filename);

        raffleData = {
            ...req.body,
            thumbnail: thumbnailURL
        }
    }

    raffleData = { ...data }

    const result = await RafflesService.updateRaffles(raffleData, raffleId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Raffle updated succesfully.',
        data: result,
    });
});

export const RafflesController = {
    createRaffles,
    updateRaffles
};