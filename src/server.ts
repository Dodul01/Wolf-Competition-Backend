import { Server } from "http";
import app from "./app";
import config from "./config";
import { errorLogger, logger } from "./shared/logger";
import colors from 'colors'
import setupSecurity from "./config/security";

let server: Server;
const port = 5000;

async function main() {
    try {
        server = app.listen(port, () => {
            console.log(`Server running on port ${port}`);
            logger.info(colors.bgGreen(colors.black(`♻️  Application listening on http://localhost:${port}`)))
        });
    } catch (err) {
        errorLogger.error(colors.red(`Error starting server: ${err}`));
    }
}

// Set up security middleware 
setupSecurity();

main();