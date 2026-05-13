import Fastify from 'fastify';
import cors from '@fastify/cors';
import { env } from './config/env.js';
import { registerAuth } from './plugins/auth.js';
import routes from './routes/index.js';

export function buildApp() {
    const app = Fastify({ logger: true });

    app.register(cors, {
        origin: env.frontendOrigin,
        credentials: true,
    });

    registerAuth(app);
    app.register(routes);

    return app;
}
