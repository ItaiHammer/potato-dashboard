import si from 'systeminformation';
import { env } from '../../config/env.js';
import { formatBytes, formatPercent } from '../../utils/format.js';

export async function getDiskOverview(options = {}) {
    const filesystems = await si.fsSize();
    const visibleFilesystems = getVisibleFilesystems(filesystems);

    return {
        timestamp: new Date().toISOString(), // Snapshot time.
        filesystems: visibleFilesystems.map((filesystem) => ({
            label: getDiskLabel(filesystem), // Display name.
            filesystem: filesystem.fs, // Device name.
            mount: filesystem.mount, // Mount path.
            size: options.humanReadable ? formatBytes(filesystem.size) : filesystem.size, // Total space.
            used: options.humanReadable ? formatBytes(filesystem.used) : filesystem.used, // Used space.
            available: options.humanReadable ? formatBytes(filesystem.available) : filesystem.available, // Free space.
            usagePercent: options.humanReadable ? formatPercent(filesystem.use) : filesystem.use, // Disk usage.
        })),
    };
}

function getVisibleFilesystems(filesystems) {
    const filteredFilesystems = filesystems
        .filter((filesystem) => !isContainerNoise(filesystem))
        .filter((filesystem, index, filteredFilesystems) => {
            return filteredFilesystems.findIndex((other) => {
                return other.fs === filesystem.fs && other.size === filesystem.size;
            }) === index;
        });

    if (env.visibleDiskMounts.length === 0) {
        return filteredFilesystems;
    }

    return filteredFilesystems.filter((filesystem) => {
        return env.visibleDiskMounts.includes(filesystem.mount);
    });
}

function isContainerNoise(filesystem) {
    const mount = filesystem.mount ?? '';

    return (
        mount === '/app/node_modules'
        || mount === '/etc/hosts'
        || mount === '/etc/hostname'
        || mount === '/etc/resolv.conf'
    );
}

function getDiskLabel(filesystem) {
    if (/^[A-Z]:\\?$/i.test(filesystem.mount)) {
        return filesystem.mount;
    }

    return filesystem.mount;
}
