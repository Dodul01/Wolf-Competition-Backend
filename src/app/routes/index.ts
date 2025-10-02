import { Router } from "express";
import { UserRouter } from "../modules/User/user.route";
import { VerifyUserRouter } from "../modules/VerifyUser/verifyUser.route";
import { RafflesRoutes } from "../modules/Raffles/raffles.route";

const router = Router();

const moduleRoutes = [
    {
        path: '/users',
        router: UserRouter
    },
    {
        path: '/verify-user',
        router: VerifyUserRouter
    },
    {
        path: '/raffles',
        router: RafflesRoutes,
    }
];

moduleRoutes.forEach((route) => router.use(route.path, route.router));

export default router;