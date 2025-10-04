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

const getSingleRaffle = async (id: string) => {
    const raffle = await Raffles.findById({ _id: id });
    return raffle;
}

const getAllRaffles = async () => {
    const raffle = await Raffles.find();
    return raffle;
}

export const RafflesService = {
    createRaffles,
    updateRaffles,
    getSingleRaffle,
    getAllRaffles
}