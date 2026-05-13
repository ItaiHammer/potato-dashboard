import { getGpuOverview } from '../../services/system/gpu.service.js';
import { shouldUseHumanReadableFormat } from '../../utils/response.js';

/**
 * GET /api/system/gpu
 *
 * Purpose:
 * Returns GPU status for the dashboard.
 *
 * Prerequisites:
 * Query:
 * humanReadable=true formats VRAM, percent, and Celsius for display.
 *
 * Prerequisites:
 * None. Usage, VRAM, and temperature may require GPU drivers/tools.
 * Nvidia cards can fall back to nvidia-smi when available.
 *
 * Expected output:
 * {
 *   timestamp: string,   // Snapshot time.
 *   controllers: [
 *     {
 *       vendor: string,  // GPU vendor.
 *       model: string,   // GPU name.
 *       temperature: number, // Celsius.
 *       memoryUsed: number,  // Used VRAM.
 *       memoryTotal: number, // Total VRAM.
 *       usagePercent: number // GPU usage.
 *     }
 *   ]
 * }
 */
export default async function gpuRoutes(app) {
    app.get('/gpu', async (request) => {
        return getGpuOverview({
            humanReadable: shouldUseHumanReadableFormat(request),
        });
    });
}
