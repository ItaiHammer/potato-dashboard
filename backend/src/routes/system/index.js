import overviewRoutes from './overview.routes.js';
import cpuRoutes from './cpu.routes.js';
import memoryRoutes from './memory.routes.js';
import diskRoutes from './disk.routes.js';
import gpuRoutes from './gpu.routes.js';

export default async function systemRoutes(app) {
    await app.register(overviewRoutes);
    await app.register(cpuRoutes);
    await app.register(memoryRoutes);
    await app.register(diskRoutes);
    await app.register(gpuRoutes);
}
