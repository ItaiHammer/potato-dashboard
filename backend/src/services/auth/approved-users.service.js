import { env } from '../../config/env.js';

export function isApprovedEmail(email) {
    if (!email) {
        return false;
    }

    return env.approvedEmails.includes(email.toLowerCase());
}
