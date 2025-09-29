import z from "zod";

const verifyUserValidation = z.object({
    email: z.string({ message: "Email is required" }).email({ message: "Invalid email address" }),
    otp: z.string({ message: "OTP is required" })
});

export const verifyUserValidationSchema = { verifyUserValidation };