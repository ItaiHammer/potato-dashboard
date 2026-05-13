import { googleClientId } from '../config';
import type { GoogleCredentialResponse } from '../types/auth';

export async function renderGoogleSignInButton(
  element: HTMLElement,
  onSignIn: (response: GoogleCredentialResponse) => void,
) {
  if (!googleClientId) {
    throw new Error('Missing VITE_GOOGLE_CLIENT_ID.');
  }

  await loadGoogleSignInScript();

  if (!window.google) {
    throw new Error('Google sign-in could not load.');
  }

  window.google.accounts.id.initialize({
    client_id: googleClientId,
    callback: onSignIn,
  });

  element.innerHTML = '';
  window.google.accounts.id.renderButton(element, {
    theme: 'outline',
    size: 'large',
    text: 'signin_with',
    shape: 'rectangular',
    width: 280,
  });
}

function loadGoogleSignInScript() {
  const existingScript = document.querySelector<HTMLScriptElement>('script[src="https://accounts.google.com/gsi/client"]');

  if (existingScript) {
    return Promise.resolve();
  }

  return new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject();
    document.head.appendChild(script);
  });
}
