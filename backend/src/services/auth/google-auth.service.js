import { env } from '../../config/env.js';

export async function verifyGoogleIdToken(idToken) {
    if (!env.googleClientId) {
        throw new Error('GOOGLE_CLIENT_ID is not configured.');
    }

    const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`);

    if (!response.ok) {
        throw new Error('Invalid Google token.');
    }

    const payload = await response.json();

    if (payload.aud !== env.googleClientId) {
        throw new Error('Google token was issued for a different client.');
    }

    if (payload.email_verified !== 'true' && payload.email_verified !== true) {
        throw new Error('Google email is not verified.');
    }

    return {
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
    };
}
