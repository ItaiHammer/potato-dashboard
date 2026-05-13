import googleRoutes from './google.routes.js';
import sessionRoutes from './session.routes.js';

export default async function authRoutes(app) {
    await app.register(googleRoutes);
    await app.register(sessionRoutes);
}
