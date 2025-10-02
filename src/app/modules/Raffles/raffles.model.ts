import { model, Schema } from "mongoose";
import { IRaffles } from "./raffles.interface";

const raffleSchema = new Schema<IRaffles>({
    thumbnail: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    totalTicket: {
        type: Number,
        required: true
    },
    perUserTicketLimit: {
        type: Number,
        required: true
    },
    ticketSold: {
        type: Number,
        default: 0
    },
    status: {
        type: Boolean,
        default: true,
    }
});

export const Raffles = model<IRaffles>('Raffles', raffleSchema);