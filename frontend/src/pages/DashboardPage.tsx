import { useEffect, useState } from 'react';
import { getSystemOverview } from '../api/systemApi';
import { SystemOverviewCards } from '../components/system/SystemOverviewCards';
import type { AuthUser } from '../types/auth';
import type { SystemOverview } from '../types/system';

const REFRESH_INTERVAL_STORAGE_KEY = 'potato-dashboard-refresh-interval';
const DEFAULT_REFRESH_INTERVAL = 5000;

type DashboardPageProps = {
  user: AuthUser;
  onLogout: () => void;
};

export function DashboardPage({ user, onLogout }: DashboardPageProps) {
  const [overview, setOverview] = useState<SystemOverview | null>(null);
  const [refreshInterval, setRefreshInterval] = useState(getSavedRefreshInterval);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    function loadOverview() {
      getSystemOverview()
        .then((data) => {
          if (!isActive) {
            return;
          }

          setOverview(data);
          setError(null);
        })
        .catch(() => {
          if (!isActive) {
            return;
          }

          setError('Could not load system overview.');
        });
    }

    const intervalId = window.setInterval(loadOverview, refreshInterval);
    const initialLoadId = window.setTimeout(loadOverview, 0);

    return () => {
      isActive = false;
      window.clearInterval(intervalId);
      window.clearTimeout(initialLoadId);
    };
  }, [refreshInterval]);

  function handleRefreshIntervalChange(value: number) {
    localStorage.setItem(REFRESH_INTERVAL_STORAGE_KEY, String(value));
    setRefreshInterval(value);
  }

  return (
    <main>
      <header>
        <h1>Server Overview</h1>
        <p>{user.email}</p>
        <button type="button" onClick={onLogout}>
          Log out
        </button>
      </header>

      <section>
        <label>
          Update every{' '}
          <select
            value={refreshInterval}
            onChange={(event) => handleRefreshIntervalChange(Number(event.target.value))}
          >
            <option value={1000}>1 second</option>
            <option value={5000}>5 seconds</option>
            <option value={10000}>10 seconds</option>
            <option value={30000}>30 seconds</option>
          </select>
        </label>
      </section>

      {error ? <p>{error}</p> : null}
      {!overview && !error ? <p>Loading system overview.</p> : null}
      {overview ? (
        <>
          <p>Last updated: {new Date(overview.timestamp).toLocaleTimeString()}</p>
          <SystemOverviewCards overview={overview} />
        </>
      ) : null}
    </main>
  );
}

function getSavedRefreshInterval() {
  const savedValue = Number(localStorage.getItem(REFRESH_INTERVAL_STORAGE_KEY));

  return [1000, 5000, 10000, 30000].includes(savedValue)
    ? savedValue
    : DEFAULT_REFRESH_INTERVAL;
}
