import { useCallback, useEffect, useState } from 'react';
import { getCurrentUser, logout, signInWithGoogle } from './api/authApi';
import { DashboardPage } from './pages/DashboardPage';
import { LoadingPage } from './pages/LoadingPage';
import { LoginPage } from './pages/LoginPage';
import { NotApprovedPage } from './pages/NotApprovedPage';
import type { AuthState, GoogleCredentialResponse } from './types/auth';
import './App.css';

function App() {
  const [authState, setAuthState] = useState<AuthState>({ status: 'loading' });
  const [loginError, setLoginError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    getCurrentUser()
      .then((data) => {
        if (!isActive) {
          return;
        }

        if (data.authenticated) {
          setAuthState({ status: 'signed-in', user: data.user });
          return;
        }

        setAuthState({ status: 'signed-out' });
      })
      .catch(() => {
        if (!isActive) {
          return;
        }

        setLoginError('Could not connect to the backend.');
        setAuthState({ status: 'signed-out' });
      });

    return () => {
      isActive = false;
    };
  }, []);

  const handleGoogleSignIn = useCallback(async (response: GoogleCredentialResponse) => {
    if (!response.credential) {
      setLoginError('Google did not return a sign-in token.');
      return;
    }

    setLoginError(null);

    let result;

    try {
      result = await signInWithGoogle(response.credential);
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : 'Sign-in failed. Try again.');
      return;
    }

    if (result.status === 403) {
      setAuthState({ status: 'not-approved' });
      return;
    }

    if (!result.ok) {
      setLoginError(result.data?.message ?? 'Sign-in failed. Try again.');
      return;
    }

    setAuthState({ status: 'signed-in', user: result.data.user });
  }, []);

  async function handleLogout() {
    try {
      await logout();
    } catch {
      // Clear local state even if the backend is temporarily unavailable.
    }

    setAuthState({ status: 'signed-out' });
  }

  if (authState.status === 'loading') {
    return <LoadingPage />;
  }

  if (authState.status === 'not-approved') {
    return <NotApprovedPage />;
  }

  if (authState.status === 'signed-out') {
    return (
      <LoginPage
        error={loginError}
        onGoogleSignIn={handleGoogleSignIn}
        onError={setLoginError}
      />
    );
  }

  return <DashboardPage user={authState.user} onLogout={handleLogout} />;
}

export default App;
