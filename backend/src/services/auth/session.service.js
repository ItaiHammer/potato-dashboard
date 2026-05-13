import { createHmac, timingSafeEqual } from 'node:crypto';
import { env } from '../../config/env.js';

const SESSION_COOKIE_NAME = 'potato_dashboard_session';
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export function createSessionCookie(user) {
    const session = {
        email: user.email,
        name: user.name,
        picture: user.picture,
        expiresAt: Date.now() + SESSION_MAX_AGE_SECONDS * 1000,
    };

    const value = signSession(session);
    const secure = env.cookieSecure ? '; Secure' : '';

    return `${SESSION_COOKIE_NAME}=${value}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${SESSION_MAX_AGE_SECONDS}${secure}`;
}

export function createExpiredSessionCookie() {
    const secure = env.cookieSecure ? '; Secure' : '';

    return `${SESSION_COOKIE_NAME}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0${secure}`;
}

export function getSessionFromRequest(request) {
    const cookieValue = getCookieValue(request.headers.cookie, SESSION_COOKIE_NAME);

    if (!cookieValue) {
        return null;
    }

    return verifySession(cookieValue);
}

function signSession(session) {
    if (!env.sessionSecret) {
        throw new Error('SESSION_SECRET is not configured.');
    }

    const payload = Buffer.from(JSON.stringify(session)).toString('base64url');
    const signature = createSignature(payload);

    return `${payload}.${signature}`;
}

function verifySession(value) {
    if (!env.sessionSecret) {
        return null;
    }

    const [payload, signature] = value.split('.');

    if (!payload || !signature || !isValidSignature(payload, signature)) {
        return null;
    }

    try {
        const session = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));

        if (!session.expiresAt || session.expiresAt < Date.now()) {
            return null;
        }

        return session;
    } catch {
        return null;
    }
}

function createSignature(payload) {
    return createHmac('sha256', env.sessionSecret).update(payload).digest('base64url');
}

function isValidSignature(payload, signature) {
    const expected = createSignature(payload);
    const receivedBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expected);

    return receivedBuffer.length === expectedBuffer.length && timingSafeEqual(receivedBuffer, expectedBuffer);
}

function getCookieValue(cookieHeader = '', cookieName) {
    return cookieHeader
        .split(';')
        .map((cookie) => cookie.trim())
        .find((cookie) => cookie.startsWith(`${cookieName}=`))
        ?.slice(cookieName.length + 1);
}
