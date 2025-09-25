import mongoose from "mongoose";
import { errorLogger, logger } from "../shared/logger"
import colors from 'colors';
import config from "../config";

export const setupMongooseListeners = () => {
    mongoose.connection.on('error', (err) => {
        errorLogger.error(colors.red(`Error connecting to DB: ${err}`));
        process.exit(1);
    });

    mongoose.connection.on('disconnected', () => {
        errorLogger.error(colors.yellow(`Database disconnected. Attempting to reconnect...`));
        process.exit(1);
    });

    mongoose.connection.on('reconnected', () => {
        logger.info(colors.bgCyan(`🚀 Database reconnected successfully...`));
    });

    mongoose.connection.on('reconnectFailed', () => {
        errorLogger.error(colors.red(`Error reconnecting to DB`));
        process.exit(1);
    })
}

const connectToDB = async () => {
    try {
        await mongoose.connect(config.database_url as string, {
            serverSelectionTimeoutMS: 5000,
            heartbeatFrequencyMS: 10000,
            maxPoolSize: 10,
            minPoolSize: 5,
            connectTimeoutMS: 10000,
            family: 4,
            retryWrites: true,
            retryReads: true
        });
        logger.info(colors.bgCyan(`🚀 Database connected successfully...`));
    } catch (err) {
        errorLogger.error(colors.red(`Error connecting to DB: ${err}`));
        process.exit(1);
    }
}

export default connectToDB;