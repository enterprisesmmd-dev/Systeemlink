import { useEffect, useState } from 'react';
import { useWebVitals } from '../hooks/useWebVitals';

export function PerformanceMonitor() {
  useWebVitals();
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Log page load performance
  useEffect(() => {
    if ('performance' in window) {
      window.addEventListener('load', () => {
        const perfData = performance.getEntriesByType('navigation')[0] as any;
        if (perfData) {
          console.log('[Performance] Page Load:', {
            'DNS Lookup': perfData.domainLookupEnd - perfData.domainLookupStart,
            'TCP Connection': perfData.connectEnd - perfData.connectStart,
            'Request Time': perfData.responseEnd - perfData.requestStart,
            'DOM Processing': perfData.domComplete - perfData.domLoading,
            'Total Load Time': perfData.loadEventEnd - perfData.fetchStart
          });
        }
      });
    }
  }, []);

  // Show offline indicator
  if (!isOnline) {
    return (
      <div className="fixed top-0 left-0 right-0 bg-yellow-500 text-white text-center py-2 z-[9999] text-sm">
        🔌 Geen internetverbinding - Sommige functies werken mogelijk niet
      </div>
    );
  }

  return null;
}
