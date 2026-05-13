export function formatBytes(bytes) {
    if (!Number.isFinite(bytes)) {
        return null;
    }

    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let value = bytes;
    let unitIndex = 0;

    while (Math.abs(value) >= 1024 && unitIndex < units.length - 1) {
        value /= 1024;
        unitIndex += 1;
    }

    return `${formatNumber(value)} ${units[unitIndex]}`;
}

export function formatMegabytes(megabytes) {
    if (!Number.isFinite(megabytes)) {
        return null;
    }

    return formatBytes(megabytes * 1024 * 1024);
}

export function formatPercent(value) {
    if (!Number.isFinite(value)) {
        return null;
    }

    return `${formatNumber(value)}%`;
}

export function formatTemperature(value) {
    if (!Number.isFinite(value)) {
        return null;
    }

    return `${formatNumber(value)} C`;
}

export function formatGigahertz(value) {
    if (!Number.isFinite(value)) {
        return null;
    }

    return `${formatNumber(value)} GHz`;
}

function formatNumber(value) {
    return Number(value.toFixed(2)).toString();
}
