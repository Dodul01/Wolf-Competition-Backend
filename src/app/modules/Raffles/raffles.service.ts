import AppError from "../../error/AppError";
import { IRaffles } from "./raffles.interface";
import { Raffles } from "./raffles.model";
import httpStatus from "http-status";

const createRaffles = async (raffles: IRaffles) => {
    const result = await Raffles.create(raffles);
    return result;
}

const updateRaffles = async (updatedRaffles: any, raffleId: string) => {
    const raffle = await Raffles.findByIdAndUpdate(
        raffleId,
        updatedRaffles,
        {
            new: true
        }
    );

    if (!raffle) {
        throw new AppError(httpStatus.NOT_FOUND, 'Raffle not found...');
    }
    return raffle;
}

export const RafflesService = {
    createRaffles,
    updateRaffles
}