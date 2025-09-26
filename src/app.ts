import express, { Application, Request, Response } from 'express';
import cookiePerser from 'cookie-parser';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';

const app: Application = express();

app.use(express.json());
app.use(cookiePerser());
app.use(cors({
    origin: "*",
    credentials: true,
}));

// App router here
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
    res.send({
        status: true,
        statusCode: 200,
        message: "Server is running...",
        health: "OK"
    })
});

// serve static files from the "uploads" directory
// TODO: 

// global error handler
app.use(globalErrorHandler);

// not found handler
app.use(notFound);

export default app;