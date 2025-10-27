import { Puck, Data } from "@measured/puck";
import "@measured/puck/puck.css";
import { puckConfig } from "../../lib/puck-config";
import { PuckStorage } from "../../lib/puck-data-converter";
import { Button } from "../ui/button";
import { ArrowLeft, Save, Eye } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner@2.0.3";

interface PuckEditorProps {
  pageName: string;
  pageId?: string;
  initialData?: Data;
  onSave: (data: Data) => void;
  onBack: () => void;
}

export function PuckEditor({ pageName, pageId, initialData, onSave, onBack }: PuckEditorProps) {
  const [currentData, setCurrentData] = useState<Data>(
    initialData || {
      content: [],
      root: { props: { title: pageName } },
    }
  );

  const handlePublish = (data: Data) => {
    try {
      // Save to storage if pageId is provided
      if (pageId) {
        PuckStorage.save(pageId, data);
        toast.success(`✅ Pagina "${pageName}" opgeslagen!`);
      }
      
      // Update current data
      setCurrentData(data);
      
      // Call parent onSave
      onSave(data);
    } catch (error) {
      console.error("Error saving page:", error);
      toast.error("❌ Fout bij opslaan van pagina");
    }
  };

  const handlePreview = () => {
    // Open preview in new tab
    if (pageId) {
      const previewUrl = `/#/preview/${pageId}`;
      window.open(previewUrl, '_blank');
      toast.info("Preview geopend in nieuw tabblad");
    }
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Custom Header */}
      <div className="bg-white border-b px-6 py-3 flex items-center justify-between z-[9999] relative shadow-sm">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Terug naar CMS
          </Button>
          
          <div className="border-l pl-4 h-8 flex items-center">
            <div>
              <h1 className="font-semibold text-base">{pageName}</h1>
              <p className="text-xs text-gray-500">Puck Visual Page Builder</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs text-gray-500 hidden md:block">
            💡 Sleep componenten van links | Klik op element om te bewerken
          </div>
          
          {pageId && (
            <Button variant="outline" size="sm" onClick={handlePreview} className="gap-2">
              <Eye className="w-4 h-4" />
              Preview
            </Button>
          )}
        </div>
      </div>

      {/* Puck Editor */}
      <div className="flex-1 overflow-hidden">
        <Puck
          config={puckConfig}
          data={currentData}
          onPublish={handlePublish}
          onChange={(data) => setCurrentData(data)}
        />
      </div>

      {/* Info Bar */}
      <div className="bg-gray-50 border-t px-6 py-2 text-xs text-gray-600 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span>🎨 <strong>{currentData.content?.length || 0}</strong> componenten</span>
          <span>✅ Breadcrumb support ingebouwd</span>
          <span>💾 Auto-save bij publiceren</span>
        </div>
        <div className="text-gray-400">
          Puck Editor v2.0
        </div>
      </div>
    </div>
  );
}
