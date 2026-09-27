import { useState, useEffect } from 'react';

/**
 * Hook to retrieve and subscribe to pathname changes in single-spa and browser history.
 */
export function useCurrentPath(): string {
  const [currentPath, setCurrentPath] = useState(() =>
    typeof window !== 'undefined' ? window.location.pathname : ''
  );

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('single-spa:routing-event', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('single-spa:routing-event', handleLocationChange);
    };
  }, []);

  return currentPath;
}
