import { Server } from "http";
import app from "./app";
import { errorLogger, logger } from "./shared/logger";
import colors from 'colors';
import setupSecurity from "./config/security";
import connectToDB from "./db/db";
import config from "./config";

let server: Server;

async function main() {
    try {
        // connect to DB
        connectToDB();

        // start server
        server = app.listen(config.port, () => {
            logger.info(colors.bgGreen(colors.black(`♻️  Application listening on http://localhost:${config.port}`)))
        });
    } catch (err) {
        errorLogger.error(colors.red(`Error starting server: ${err}`));
    }
}

// Set up security middleware 
setupSecurity();
main();