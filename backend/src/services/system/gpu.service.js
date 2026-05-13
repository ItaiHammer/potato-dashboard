import si from 'systeminformation';
import { formatMegabytes, formatPercent, formatTemperature } from '../../utils/format.js';
import { runCommand } from '../../utils/shell.js';

export async function getGpuOverview(options = {}) {
    const graphics = await si.graphics();
    const controllers = graphics.controllers?.length
        ? graphics.controllers
        : await getNvidiaControllers();

    return {
        timestamp: new Date().toISOString(), // Snapshot time.
        controllers: controllers.map((controller) => ({
            vendor: controller.vendor, // GPU vendor.
            model: controller.model, // GPU name.
            temperature: options.humanReadable ? formatTemperature(controller.temperatureGpu) : controller.temperatureGpu, // Celsius.
            memoryUsed: options.humanReadable ? formatMegabytes(controller.memoryUsed) : controller.memoryUsed, // Used VRAM.
            memoryTotal: options.humanReadable ? formatMegabytes(controller.memoryTotal) : controller.memoryTotal, // Total VRAM.
            usagePercent: options.humanReadable ? formatPercent(controller.utilizationGpu) : controller.utilizationGpu, // GPU usage.
        })),
    };
}

async function getNvidiaControllers() {
    try {
        const output = await runCommand('nvidia-smi', [
            '--query-gpu=name,utilization.gpu,memory.used,memory.total,temperature.gpu',
            '--format=csv,noheader,nounits',
        ]);

        if (!output) {
            return [];
        }

        return output.split('\n').map((line) => {
            const [model, usagePercent, memoryUsed, memoryTotal, temperature] = line
                .split(',')
                .map((value) => value.trim());

            return {
                vendor: 'NVIDIA',
                model,
                temperatureGpu: Number(temperature),
                memoryUsed: Number(memoryUsed),
                memoryTotal: Number(memoryTotal),
                utilizationGpu: Number(usagePercent),
            };
        });
    } catch {
        return [];
    }
}
