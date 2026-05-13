import { verifyGoogleIdToken } from '../../services/auth/google-auth.service.js';
import { isApprovedEmail } from '../../services/auth/approved-users.service.js';
import { createSessionCookie } from '../../services/auth/session.service.js';

/**
 * POST /api/auth/google
 *
 * Purpose:
 * Signs in with Google and creates a session for approved emails.
 *
 * Request body:
 * {
 *   idToken: string // Google ID token.
 * }
 *
 * Prerequisites:
 * GOOGLE_CLIENT_ID, SESSION_SECRET, and APPROVED_EMAILS must be configured.
 *
 * Expected output:
 * {
 *   user: object // Signed-in user.
 * }
 */
export default async function googleRoutes(app) {
    app.post('/google', async (request, reply) => {
        const idToken = request.body?.idToken ?? request.body?.credential;

        if (!idToken) {
            return reply.code(400).send({
                error: 'Bad Request',
                message: 'Google ID token is required.',
            });
        }

        let user;

        try {
            user = await verifyGoogleIdToken(idToken);
        } catch (error) {
            const isConfigError = error.message.includes('configured');

            return reply.code(isConfigError ? 500 : 401).send({
                error: isConfigError ? 'Server Configuration Error' : 'Unauthorized',
                message: isConfigError ? error.message : 'Google sign-in could not be verified.',
            });
        }

        if (!isApprovedEmail(user.email)) {
            return reply.code(403).send({
                error: 'Forbidden',
                message: 'This Google account is not approved.',
            });
        }

        reply.header('Set-Cookie', createSessionCookie(user));

        return { user };
    });
}
