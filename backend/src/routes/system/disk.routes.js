import { getDiskOverview } from '../../services/system/disk.service.js';
import { shouldUseHumanReadableFormat } from '../../utils/response.js';

/**
 * GET /api/system/disk
 *
 * Purpose:
 * Returns disk usage for mounted filesystems.
 *
 * Prerequisites:
 * Query:
 * humanReadable=true formats bytes and percent for display.
 *
 * Prerequisites:
 * None. Filesystems shown depend on OS/container visibility.
 *
 * Expected output:
 * {
 *   timestamp: string,      // Snapshot time.
 *   filesystems: [
 *     {
 *       filesystem: string, // Device name.
 *       mount: string,      // Mount path.
 *       size: number,       // Total space.
 *       used: number,       // Used space.
 *       available: number,  // Free space.
 *       usagePercent: number // Disk usage.
 *     }
 *   ]
 * }
 */
export default async function diskRoutes(app) {
    app.get('/disk', async (request) => {
        return getDiskOverview({
            humanReadable: shouldUseHumanReadableFormat(request),
        });
    });
}
