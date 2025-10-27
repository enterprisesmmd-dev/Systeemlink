import { useEffect } from 'react';

const prefetchedRoutes = new Set<string>();

export function usePrefetch(routes: string[]) {
  useEffect(() => {
    routes.forEach((route) => {
      if (prefetchedRoutes.has(route)) return;

      // Create prefetch link
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = route;
      link.as = 'document';
      
      document.head.appendChild(link);
      prefetchedRoutes.add(route);
    });
  }, [routes]);
}

export function prefetchOnHover(path: string) {
  if (prefetchedRoutes.has(path)) return;

  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = path;
  link.as = 'document';
  
  document.head.appendChild(link);
  prefetchedRoutes.add(path);
}
