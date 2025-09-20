import compression from 'compression'
import app from '../app';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

// Setup security middleware
const setupSecurity = () => {
    app.use(compression());

    // Security headers 
    app.use(helmet());

    //Rate limit setup
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    });
    // Apply rate limit to all requests
    app.use(limiter);

    // Add request timeout
    app.use((req, res, next) => {
        res.setTimeout(30000, () => {
            res.status(503).send('Request timed out');
        });

        next();
    });
}

export default setupSecurity