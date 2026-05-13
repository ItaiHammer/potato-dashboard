import si from 'systeminformation';
import { formatBytes, formatPercent } from '../../utils/format.js';

export async function getMemoryOverview(options = {}) {
    const memory = await si.mem();
    const usagePercent = memory.total > 0 ? (memory.used / memory.total) * 100 : null;

    return {
        timestamp: new Date().toISOString(), // Snapshot time.
        total: options.humanReadable ? formatBytes(memory.total) : memory.total, // Total RAM.
        used: options.humanReadable ? formatBytes(memory.used) : memory.used, // Used RAM.
        available: options.humanReadable ? formatBytes(memory.available) : memory.available, // Available RAM.
        usagePercent: options.humanReadable ? formatPercent(usagePercent) : usagePercent, // RAM usage.
    };
}
