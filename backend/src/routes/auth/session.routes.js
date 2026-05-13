import { createExpiredSessionCookie, getSessionFromRequest } from '../../services/auth/session.service.js';
import { isApprovedEmail } from '../../services/auth/approved-users.service.js';

/**
 * GET /api/auth/me
 *
 * Purpose:
 * Returns the current signed-in user when the session is valid.
 *
 * Prerequisites:
 * A valid session cookie.
 *
 * Expected output:
 * {
 *   authenticated: boolean,
 *   user: object | null
 * }
 */
/**
 * POST /api/auth/logout
 *
 * Purpose:
 * Clears the current session cookie.
 *
 * Prerequisites:
 * None.
 *
 * Expected output:
 * {
 *   ok: boolean
 * }
 */
export default async function sessionRoutes(app) {
    app.get('/me', async (request) => {
        const session = getSessionFromRequest(request);

        if (!session || !isApprovedEmail(session.email)) {
            return {
                authenticated: false,
                user: null,
            };
        }

        return {
            authenticated: true,
            user: {
                email: session.email,
                name: session.name,
                picture: session.picture,
            },
        };
    });

    app.post('/logout', async (_request, reply) => {
        reply.header('Set-Cookie', createExpiredSessionCookie());

        return { ok: true };
    });
}
