import { IRaffles } from "./raffles.interface";
import { Raffles } from "./raffles.model";

const createRaffles = async (raffles: IRaffles) => {
    const result = await Raffles.create(raffles);
    return result;
}

export const RafflesService = {
    createRaffles
}