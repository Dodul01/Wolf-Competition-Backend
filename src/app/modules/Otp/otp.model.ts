import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        require: true
    },
    otp: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60
    }
});

export const OTP = mongoose.model("OTP", otpSchema)