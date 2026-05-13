/**
 * GET /api/health
 *
 * Purpose:
 * Checks that the backend API is running.
 *
 * Prerequisites:
 * None.
 *
 * Expected output:
 * {
 *   status: string // API status.
 * }
 */
export default async function healthRoutes(app) {
    app.get('/health', async () => {
        return { status: 'ok' };
    });
}
