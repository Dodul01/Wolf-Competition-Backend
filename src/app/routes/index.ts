import { Router } from "express";
import { UserRouter } from "../modules/User/user.route";
import { VerifyUserRouter } from "../modules/VerifyUser/verifyUser.route";

const router = Router();

const moduleRoutes = [
    {
        path: '/users',
        router: UserRouter
    },
    {
        path: '/verify-user',
        router: VerifyUserRouter
    }
];

moduleRoutes.forEach((route) => router.use(route.path, route.router));

export default router;