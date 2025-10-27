import { useEffect, useState } from 'react';
import { Render, Data } from '@measured/puck';
import { puckConfig } from '../lib/puck-config';
import { PuckStorage } from '../lib/puck-data-converter';

interface PuckPageRendererProps {
  pageId: string;
  fallback?: React.ReactNode;
}

/**
 * Renders a page built with Puck Editor
 * Falls back to regular content if no Puck data exists
 */
export function PuckPageRenderer({ pageId, fallback }: PuckPageRendererProps) {
  const [puckData, setPuckData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = PuckStorage.load(pageId);
    setPuckData(data);
    setLoading(false);
  }, [pageId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // If Puck data exists, render it
  if (puckData) {
    return (
      <div className="puck-rendered-page">
        <Render config={puckConfig} data={puckData} />
      </div>
    );
  }

  // Otherwise, render fallback content
  return <>{fallback}</>;
}
