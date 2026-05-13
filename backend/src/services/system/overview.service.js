import { getCpuOverview } from './cpu.service.js';
import { getMemoryOverview } from './memory.service.js';
import { getDiskOverview } from './disk.service.js';
import { getGpuOverview } from './gpu.service.js';

export async function getSystemOverview(options = {}) {
    const [cpu, memory, disk, gpu] = await Promise.all([
        getCpuOverview(options),
        getMemoryOverview(options),
        getDiskOverview(options),
        getGpuOverview(options),
    ]);

    return {
        status: 'ok', // API health.
        timestamp: new Date().toISOString(), // Snapshot time.
        cpu, // CPU status.
        memory, // RAM status.
        disk, // Disk status.
        gpu, // GPU status.
    };
}
