import { Router } from "express";
import { UserRouter } from "../modules/User/user.route";

const router = Router();

const moduleRoutes = [
    {
        path: '/users',
        router: UserRouter
    }
];

moduleRoutes.forEach((route) => router.use(route.path, route.router));

export default router;