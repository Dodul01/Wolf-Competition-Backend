import z from "zod";

const userValidation = z.object({
    userName: z.string({ message: 'Username is required.' })
        .min(3, { message: 'Username must be at least 3 characters long.' })
        .max(20, { message: 'Username must be at most 20 characters long.' }),
    email: z.string({ message: 'Email is required.' })
        .email({ message: 'Invalid email address.' }),
    password: z.string({ message: 'Password is required.' })
        .min(8, { message: 'Password must be at least 8 characters long.' })
        .max(20, { message: 'Password must be at most 20 characters long.' }),
    phoneNumber: z.string({ message: 'Phone number is required.' })
});