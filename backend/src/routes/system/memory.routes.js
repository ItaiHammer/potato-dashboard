import { getMemoryOverview } from '../../services/system/memory.service.js';
import { shouldUseHumanReadableFormat } from '../../utils/response.js';

/**
 * GET /api/system/memory
 *
 * Purpose:
 * Returns RAM status for the dashboard.
 *
 * Prerequisites:
 * Query:
 * humanReadable=true formats bytes and percent for display.
 *
 * Prerequisites:
 * None.
 *
 * Expected output:
 * {
 *   timestamp: string,    // Snapshot time.
 *   total: number,        // Total RAM.
 *   used: number,         // Used RAM.
 *   available: number,    // Available RAM.
 *   usagePercent: number  // RAM usage.
 * }
 */
export default async function memoryRoutes(app) {
    app.get('/memory', async (request) => {
        return getMemoryOverview({
            humanReadable: shouldUseHumanReadableFormat(request),
        });
    });
}
