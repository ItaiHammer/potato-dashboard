import { getCpuOverview } from '../../services/system/cpu.service.js';
import { shouldUseHumanReadableFormat } from '../../utils/response.js';

/**
 * GET /api/system/cpu
 *
 * Purpose:
 * Returns CPU status for the dashboard.
 *
 * Prerequisites:
 * Query:
 * humanReadable=true formats percent, Celsius, and GHz for display.
 *
 * Prerequisites:
 * None. Temperature may require sensor support.
 *
 * Expected output:
 * {
 *   timestamp: string,     // Snapshot time.
 *   model: string,         // CPU name.
 *   cores: number,         // CPU threads.
 *   usagePercent: number,  // CPU usage.
 *   temperature: number,   // Celsius.
 *   speed: number          // GHz.
 * }
 */
export default async function cpuRoutes(app) {
    app.get('/cpu', async (request) => {
        return getCpuOverview({
            humanReadable: shouldUseHumanReadableFormat(request),
        });
    });
}
