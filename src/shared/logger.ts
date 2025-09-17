import path from 'path';
import DailyRotateFile from 'winston-daily-rotate-file';
import { createLogger, format, transports } from 'winston';
const { combine, timestamp, label, printf } = format;

const myFormat = printf((info) => {
    const date = new Date(info.timestamp as string);
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return `${date.toDateString()} ${hour}:${minutes}:${seconds} [${info.label}] ${info.level}: ${info.message}`;
});

const logger = createLogger({
    level: "info",
    format: combine(label({ label: "SERVER-NAME" }), timestamp(), myFormat),
    transports: [
        new transports.Console(),
        new DailyRotateFile({
            filename: path.join(process.cwd(), 'winston', 'success', '%DATE%-success.log'),
            datePattern: 'DD-MM-YYYY-HH',
            maxSize: '20m',
            maxFiles: '14d'
        }),
    ],
});

const errorLogger = createLogger({
    level: 'error',
    format: combine(label({ label: 'SERVER-NAME' }), timestamp(), myFormat),
    transports: [
        new transports.Console(),
        new DailyRotateFile({
            filename: path.join(process.cwd(), 'winston', 'errors', '%DATE%-error.log'),
            datePattern: 'DD-MM-YYYY-HH',
            maxSize: '20m',
            maxFiles: '14d'
        }),
    ],
});

export { logger, errorLogger }