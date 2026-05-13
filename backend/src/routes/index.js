import authRoutes from './auth/index.js';
import healthRoutes from './health.routes.js';
import systemRoutes from './system/index.js';

export default async function routes(app) {
    await app.register(authRoutes, { prefix: '/api/auth' });
    await app.register(healthRoutes, { prefix: '/api' });
    await app.register(systemRoutes, { prefix: '/api/system' });
}
