import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";
import { UserGender, UserRole } from "./user.types";
import bcrypt from 'bcrypt';
import config from "../../../config";

const userSchema = new Schema<IUser>({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
    },
    country: {
        type: String,
    },
    city: {
        type: String,
    },
    province: {
        type: String,
    },
    gender: {
        type: String,
        enum: Object.values(UserGender),
    },
    bio: {
        type: String,
    },
    photoUrl: {
        type: String,
    },
    role: {
        type: String,
        enum: Object.values(UserRole),
        default: UserRole.USER,
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    raffles: {
        type: [Schema.Types.ObjectId],
        ref: 'raffle',
    },
    refferalCode: {
        type: String,
    },
    isPolicyAccepted: {
        type: Boolean,
        required: true,
    },
    currency: {
        type: [String],
    },
    isVerified: {
        type: Boolean, 
        default: false,
    }
});

userSchema.pre<IUser>('save', async function (next) {
    if (this.password) {
        const hashedPassword = await bcrypt.hash(
            this.password,
            Number(config.bcrypt_salt_rounds)
        );
        this.password = hashedPassword;
    }
    next();
});

userSchema.post('save', (doc, next) => {
    doc.password = '';
    next();
});

export const User = model<IUser>('User', userSchema);