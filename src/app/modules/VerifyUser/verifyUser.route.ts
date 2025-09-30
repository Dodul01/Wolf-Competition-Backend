import express from "express";
import { VerifyUserController } from "./verifyUser.controller";


const router = express.Router();

router.post('/verify', VerifyUserController.verifyUser);

export const VerifyUserRouter = router;