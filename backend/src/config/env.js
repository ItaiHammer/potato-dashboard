import { existsSync } from 'node:fs';
import { loadEnvFile } from 'node:process';

if (existsSync('.env')) {
    loadEnvFile('.env');
}

export const env = {
    port: Number(process.env.PORT ?? 8000),
    host: process.env.HOST ?? '0.0.0.0',
    frontendOrigin: process.env.FRONTEND_ORIGIN ?? 'http://localhost:5173',
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    sessionSecret: process.env.SESSION_SECRET,
    approvedEmails: parseApprovedEmails(process.env.APPROVED_EMAILS),
    visibleDiskMounts: parseList(process.env.VISIBLE_DISK_MOUNTS),
    cookieSecure: parseBoolean(process.env.COOKIE_SECURE, process.env.NODE_ENV === 'production'),
    isProduction: process.env.NODE_ENV === 'production',
};

function parseApprovedEmails(value = '') {
    return parseList(value).map((email) => email.toLowerCase());
}

function parseList(value = '') {
    return value
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
}

function parseBoolean(value, fallback) {
    if (value === undefined) {
        return fallback;
    }

    return value === 'true' || value === '1' || value === 'yes';
}
