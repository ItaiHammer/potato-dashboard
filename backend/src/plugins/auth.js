import { getSessionFromRequest } from '../services/auth/session.service.js';
import { isApprovedEmail } from '../services/auth/approved-users.service.js';

const PUBLIC_ROUTES = new Set([
    'POST /api/auth/google',
    'POST /api/auth/logout',
    'GET /api/auth/me',
]);

export function registerAuth(app) {
    app.addHook('preHandler', async (request, reply) => {
        if (request.method === 'OPTIONS') {
            return;
        }

        const path = request.url.split('?')[0];

        if (PUBLIC_ROUTES.has(`${request.method} ${path}`)) {
            return;
        }

        const session = getSessionFromRequest(request);

        if (!session || !isApprovedEmail(session.email)) {
            return reply.code(401).send({
                error: 'Unauthorized',
                message: 'You must sign in with an approved Google account.',
            });
        }

        request.user = session;
    });
}
