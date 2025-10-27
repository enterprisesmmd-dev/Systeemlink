import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ImageIcon, Link as LinkIcon, Search, Upload } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { unsplashMultiple } from '../../lib/unsplash-helper';

interface ImageManagerProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export function ImageManager({ value, onChange, label = 'Afbeelding' }: ImageManagerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [unsplashResults, setUnsplashResults] = useState<string[]>([]);

  const handleUnsplashSearch = async () => {
    if (!searchQuery.trim()) {
      toast.error('Voer een zoekterm in');
      return;
    }

    setIsSearching(true);
    try {
      const results = await unsplashMultiple(searchQuery, 6);
      setUnsplashResults(results);
      if (results.length === 0) {
        toast.error('Geen afbeeldingen gevonden');
      } else {
        toast.success(`${results.length} afbeeldingen gevonden`);
      }
    } catch (error) {
      toast.error('Fout bij zoeken naar afbeeldingen');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="space-y-3">
      <Label>{label}</Label>
      
      <Tabs defaultValue="url" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="url" className="gap-2">
            <LinkIcon className="w-4 h-4" />
            URL
          </TabsTrigger>
          <TabsTrigger value="unsplash" className="gap-2">
            <Search className="w-4 h-4" />
            Unsplash
          </TabsTrigger>
        </TabsList>

        <TabsContent value="url" className="space-y-3">
          <Input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
          {value && (
            <Card className="p-4">
              <img
                src={value}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Invalid+Image';
                }}
              />
            </Card>
          )}
        </TabsContent>

        <TabsContent value="unsplash" className="space-y-3">
          <div className="flex gap-2">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Zoek afbeeldingen... (bijv. 'modern office')"
              onKeyDown={(e) => e.key === 'Enter' && handleUnsplashSearch()}
            />
            <Button
              onClick={handleUnsplashSearch}
              disabled={isSearching}
              type="button"
            >
              {isSearching ? (
                <>Zoeken...</>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Zoek
                </>
              )}
            </Button>
          </div>

          {unsplashResults.length > 0 && (
            <div className="grid grid-cols-2 gap-3">
              {unsplashResults.map((url, index) => (
                <Card
                  key={index}
                  className={`p-2 cursor-pointer transition-all ${
                    value === url ? 'ring-2 ring-indigo-500' : 'hover:ring-2 ring-gray-300'
                  }`}
                  onClick={() => {
                    onChange(url);
                    toast.success('Afbeelding geselecteerd');
                  }}
                >
                  <img
                    src={url}
                    alt={`Unsplash result ${index + 1}`}
                    className="w-full h-32 object-cover rounded"
                  />
                </Card>
              ))}
            </div>
          )}

          <p className="text-xs text-gray-500">
            💡 Tip: Gebruik beschrijvende zoektermen zoals "modern office", "team meeting", "technology"
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}