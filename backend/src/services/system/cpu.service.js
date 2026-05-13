import si from 'systeminformation';
import { formatGigahertz, formatPercent, formatTemperature } from '../../utils/format.js';

export async function getCpuOverview(options = {}) {
    const [info, temperature, frequency, load] = await Promise.all([
        si.cpu(),
        si.cpuTemperature(),
        si.cpuCurrentSpeed(),
        si.currentLoad(),
    ]);

    return {
        timestamp: new Date().toISOString(), // Snapshot time.
        model: info.brand, // CPU name.
        cores: info.cores, // CPU threads.
        usagePercent: options.humanReadable ? formatPercent(load.currentLoad) : load.currentLoad, // CPU usage.
        temperature: options.humanReadable ? formatTemperature(temperature.main) : temperature.main, // Celsius.
        speed: options.humanReadable ? formatGigahertz(frequency.avg) : frequency.avg, // GHz.
    };
}
