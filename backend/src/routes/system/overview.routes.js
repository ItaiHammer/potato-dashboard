import { getSystemOverview } from '../../services/system/overview.service.js';
import { shouldUseHumanReadableFormat } from '../../utils/response.js';

/**
 * GET /api/system/overview
 *
 * Purpose:
 * Returns the main dashboard summary for the server.
 *
 * Prerequisites:
 * Query:
 * humanReadable=true formats bytes/percent/temperature/speed for display.
 *
 * Prerequisites:
 * None. Hardware values depend on OS support and permissions.
 *
 * Expected output:
 * {
 *   status: string,    // API health.
 *   timestamp: string, // Snapshot time.
 *   cpu: object,       // CPU status.
 *   memory: object,    // RAM status.
 *   disk: object,      // Disk status.
 *   gpu: object        // GPU status.
 * }
 */
export default async function overviewRoutes(app) {
    app.get('/overview', async (request) => {
        return getSystemOverview({
            humanReadable: shouldUseHumanReadableFormat(request),
        });
    });
}
