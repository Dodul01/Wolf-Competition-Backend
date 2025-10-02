import z from "zod";

const raffleValidationSchema = z.object({
    // thumbnail: z.file({ message: "Thumbnails is required" }),
    title: z.string({ message: 'Title is required' }),
    details: z.string({ message: 'Raffles details is required' }),
    price: z.string({ message: 'Price is required' }).transform(Number),
    totalTicket: z.string({ message: 'Total ticket is required' }).transform(Number),
    perUserTicketLimit: z.string({ message: 'Per user ticket limit is required' }).transform(Number),
});

export const raffleValidation = {
    raffleValidationSchema,
};