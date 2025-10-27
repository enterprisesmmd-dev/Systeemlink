import { useParams, Link } from 'react-router-dom';
import { PuckPageRenderer } from '../PuckPageRenderer';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';

export function PuckPreviewPage() {
  const { pageId } = useParams<{ pageId: string }>();

  if (!pageId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-4">Geen pagina ID gevonden</h1>
          <Link to="/be-he-er-admin">
            <Button>Terug naar CMS</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Preview Header */}
      <div className="bg-yellow-50 border-b border-yellow-200 px-6 py-3 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-medium">
            👁️ PREVIEW MODE
          </div>
          <span className="text-sm text-gray-600">
            Dit is een preview van uw Puck pagina
          </span>
        </div>
        <Link to="/be-he-er-admin">
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Terug naar CMS
          </Button>
        </Link>
      </div>

      {/* Puck Page Content */}
      <PuckPageRenderer
        pageId={pageId}
        fallback={
          <div className="max-w-7xl mx-auto px-4 py-20 text-center">
            <h2 className="text-2xl mb-4">Geen Puck data gevonden</h2>
            <p className="text-gray-600 mb-6">
              Deze pagina heeft nog geen Puck content. Bouw eerst de pagina in de Page Builder.
            </p>
            <Link to="/be-he-er-admin">
              <Button>Ga naar Page Builder</Button>
            </Link>
          </div>
        }
      />
    </div>
  );
}
