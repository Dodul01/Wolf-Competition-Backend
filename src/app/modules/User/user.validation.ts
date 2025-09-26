import z from "zod";
import { UserGender, UserRole } from "./user.types";

const userValidationSchema = z.object({
    userName: z.string({ message: 'Username is required.' })
        .min(3, { message: 'Username must be at least 3 characters long.' })
        .max(20, { message: 'Username must be at most 20 characters long.' })
        .optional(),
    email: z.string({ message: 'Email is required.' })
        .email({ message: 'Invalid email address.' }),
    password: z.string({ message: 'Password is required.' })
        .min(8, { message: 'Password must be at least 8 characters long.' })
        .max(20, { message: 'Password must be at most 20 characters long.' }),
    phoneNumber: z.string({
        message: "Phone number is required",
    })
        .min(7, { message: "Phone number is too short" })
        .max(20, { message: "Phone number is too long" })
        .regex(/^(\+\d{1,3}[- ]?)?((\(\d{1,4}\))|(\d{1,4}))[- ]?\d{3,4}[- ]?\d{3,4}$/,
            { message: 'Invalid phone number format' })
        .optional(),
    country: z.string({ message: 'Country is required.' })
        .optional(),
    city: z.string({ message: 'City is required' }).optional(),
    province: z.string({ message: 'Province is required' }).optional(),
    gender: z.nativeEnum(UserGender, { message: 'Gender is required' }).optional(),
    bio: z.string({ message: 'Bio is required' }).optional(),
    photoUrl: z.string({ message: 'Photo URL is required' }).optional(),
    role: z.nativeEnum(UserRole, { message: 'Role is required' }).optional(),
    isBlocked: z.boolean({ message: 'Blocked status is required' }).optional(),
    isDeleted: z.boolean({ message: 'Deleted status is required' }).optional(),
    refferalCode: z.string({ message: 'Refferal code is required' }).optional(),
    isPolicyAccepted: z.boolean({ message: 'Policy acceptance status is required' }),
    currency: z.array(z.string()).optional(),
});

export const userValidation = { userValidationSchema };