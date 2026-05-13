import { useEffect, useRef } from 'react';
import { googleClientId } from '../config';
import { renderGoogleSignInButton } from '../auth/googleSignIn';
import type { GoogleCredentialResponse } from '../types/auth';

type LoginPageProps = {
  error: string | null;
  onGoogleSignIn: (response: GoogleCredentialResponse) => void;
  onError: (message: string) => void;
};

export function LoginPage({ error, onGoogleSignIn, onError }: LoginPageProps) {
  const googleButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!googleButtonRef.current || !googleClientId) {
      return;
    }

    renderGoogleSignInButton(googleButtonRef.current, onGoogleSignIn).catch(() => {
      onError('Google sign-in could not load.');
    });
  }, [onGoogleSignIn, onError]);

  return (
    <main>
      <h1>Sign in</h1>
      <p>Use an approved Google account.</p>

      {!googleClientId ? <p>Missing VITE_GOOGLE_CLIENT_ID.</p> : <div ref={googleButtonRef} />}
      {error ? <p>{error}</p> : null}
    </main>
  );
}
