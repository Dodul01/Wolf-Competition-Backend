import express, { Application, Request, Response } from 'express';
import cookiePerser from 'cookie-parser';
import cors from 'cors';

const app: Application = express();

app.use(express.json());
app.use(cookiePerser());
app.use(cors({
    origin: "*",
    credentials: true,
}));

// App router here

app.get('/', (req: Request, res: Response) => {
    res.send({
        status: true,
        statusCode: 200,
        message: "Server is running...",
        health: "OK"
    })
});

export default app;