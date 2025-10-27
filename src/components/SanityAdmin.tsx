import { Card } from './ui/card';
import { Button } from './ui/button';
import { ExternalLink, Database, CheckCircle2, XCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { sanityClient } from '../lib/sanity';

/**
 * Admin component om de Sanity CMS status te tonen
 * Dit is handig voor development om te zien of je CMS correct is geconfigureerd
 */
export function SanityAdmin() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [projectInfo, setProjectInfo] = useState<any>(null);

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    try {
      // Probeer een simpele query uit te voeren
      const result = await sanityClient.fetch(`*[_type == "vacancy"][0..0]`);
      setIsConnected(true);
      setProjectInfo({
        projectId: sanityClient.config().projectId,
        dataset: sanityClient.config().dataset,
      });
    } catch (error) {
      console.error('Sanity connection error:', error);
      setIsConnected(false);
    }
  };

  const openStudio = () => {
    const projectId = sanityClient.config().projectId;
    if (projectId && projectId !== 'YOUR_PROJECT_ID') {
      window.open(`https://${projectId}.sanity.studio`, '_blank');
    } else {
      alert('Configureer eerst je Project ID in /lib/sanity.ts');
    }
  };

  const openManage = () => {
    const projectId = sanityClient.config().projectId;
    if (projectId && projectId !== 'YOUR_PROJECT_ID') {
      window.open(`https://manage.sanity.io/projects/${projectId}`, '_blank');
    } else {
      alert('Configureer eerst je Project ID in /lib/sanity.ts');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="p-8">
        <div className="flex items-center gap-3 mb-6">
          <Database className="w-8 h-8 text-[#0ea5e9]" />
          <h2 className="text-2xl">Sanity CMS Status</h2>
        </div>

        <div className="space-y-6">
          {/* Connection Status */}
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            {isConnected === null ? (
              <>
                <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                <span>Verbinding controleren...</span>
              </>
            ) : isConnected ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="text-green-700">Verbonden met Sanity CMS</span>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5 text-red-600" />
                <span className="text-red-700">Niet verbonden - Configureer je Project ID</span>
              </>
            )}
          </div>

          {/* Project Info */}
          {projectInfo && (
            <div className="space-y-2">
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Project ID:</span>
                <span className="font-mono">{projectInfo.projectId}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Dataset:</span>
                <span className="font-mono">{projectInfo.dataset}</span>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={openStudio}
              className="bg-[#0ea5e9] hover:bg-[#0284c7] flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Open Sanity Studio
            </Button>
            <Button
              onClick={openManage}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Beheer Project
            </Button>
            <Button
              onClick={checkConnection}
              variant="outline"
            >
              Verbinding testen
            </Button>
          </div>

          {/* Quick Links */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="mb-2">Quick Start:</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
              <li>Lees de <code className="bg-white px-2 py-1 rounded">/SANITY_SETUP.md</code> voor instructies</li>
              <li>Configureer je Project ID in <code className="bg-white px-2 py-1 rounded">/lib/sanity.ts</code></li>
              <li>Installeer Sanity Studio (zie documentatie)</li>
              <li>Voeg content toe via Sanity Studio</li>
              <li>Ververs deze pagina om te testen</li>
            </ol>
          </div>
        </div>
      </Card>
    </div>
  );
}
