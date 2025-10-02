import { Types } from "mongoose";
import { UserGender, UserRole } from "./user.types";

export interface IUser {
    userName?: string;
    email: string;
    password: string;
    phoneNumber?: string;
    country?: string;
    city?: string;
    province?: string;
    gender?: UserGender;
    bio?: string;
    photoUrl?: string;
    role?: UserRole;
    isBlocked?: boolean;
    isDeleted?: boolean;
    raffles?: Types.ObjectId[];
    refferalCode?: string;
    isPolicyAccepted: boolean;
    currency?: string[];
    isVerified?: boolean;
};

export interface IForgetPassword {
    email: string;
}

export interface IResetPassword {
    oldPassword: string,
    newPassword: string
}