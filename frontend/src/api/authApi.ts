import { apiUrl } from '../config';

export async function getCurrentUser() {
  const response = await fetch(`${apiUrl}/api/auth/me`, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to load current user.');
  }

  return response.json();
}

export async function signInWithGoogle(idToken: string) {
  let response;

  try {
    response = await fetch(`${apiUrl}/api/auth/google`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ idToken }),
    });
  } catch {
    throw new Error('Could not reach the backend auth endpoint.');
  }

  return {
    ok: response.ok,
    status: response.status,
    data: await readJsonResponse(response),
  };
}

export async function logout() {
  const response = await fetch(`${apiUrl}/api/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to log out.');
  }
}

async function readJsonResponse(response: Response) {
  const text = await response.text();

  if (!text) {
    return {};
  }

  try {
    return JSON.parse(text);
  } catch {
    return {
      message: text,
    };
  }
}
