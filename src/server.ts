import { Server } from "http";
import app from "./app";
import { errorLogger, logger } from "./shared/logger";
import colors from 'colors';
import setupSecurity from "./config/security";
import connectToDB from "./db/db";

let server: Server;
const port = 5000;

async function main() {
    try {
        // connect to DB
        connectToDB();

        // start server
        server = app.listen(port, () => {
            logger.info(colors.bgGreen(colors.black(`♻️  Application listening on http://localhost:${port}`)))
        });
    } catch (err) {
        errorLogger.error(colors.red(`Error starting server: ${err}`));
    }
}

// Set up security middleware 
setupSecurity();
main();