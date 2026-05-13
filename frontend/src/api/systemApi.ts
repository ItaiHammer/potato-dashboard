import { apiUrl } from '../config';
import type { SystemOverview } from '../types/system';

export async function getSystemOverview() {
  const response = await fetch(`${apiUrl}/api/system/overview?humanReadable=true`, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to load system overview.');
  }

  return response.json() as Promise<SystemOverview>;
}
