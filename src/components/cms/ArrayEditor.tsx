import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Card } from '../ui/card';
import { Plus, Trash2, GripVertical, ChevronUp, ChevronDown } from 'lucide-react';
import { ImageManager } from './ImageManager';

interface ArrayEditorProps {
  value: any[];
  onChange: (value: any[]) => void;
  type: 'stats' | 'features' | 'team' | 'pricing' | 'cards' | 'timeline' | 'testimonials' | 'faq';
  label?: string;
}

export function ArrayEditor({ value = [], onChange, type, label }: ArrayEditorProps) {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set([0]));

  const addItem = () => {
    const newItem = getDefaultItem(type);
    onChange([...value, newItem]);
    setExpandedItems(new Set([...expandedItems, value.length]));
  };

  const removeItem = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: string, fieldValue: any) => {
    const updated = value.map((item, i) =>
      i === index ? { ...item, [field]: fieldValue } : item
    );
    onChange(updated);
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= value.length) return;

    const updated = [...value];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    onChange(updated);
  };

  const toggleExpand = (index: number) => {
    const next = new Set(expandedItems);
    if (next.has(index)) {
      next.delete(index);
    } else {
      next.add(index);
    }
    setExpandedItems(next);
  };

  return (
    <div className="space-y-3">
      {label && <Label>{label}</Label>}
      
      <div className="space-y-3">
        {value.map((item, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="p-3 bg-gray-50 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GripVertical className="w-4 h-4 text-gray-400" />
                <span className="text-sm">
                  {getItemLabel(type, item, index)}
                </span>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleExpand(index)}
                  type="button"
                >
                  {expandedItems.has(index) ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => moveItem(index, 'up')}
                  disabled={index === 0}
                  type="button"
                >
                  ↑
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => moveItem(index, 'down')}
                  disabled={index === value.length - 1}
                  type="button"
                >
                  ↓
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeItem(index)}
                  type="button"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            </div>
            
            {expandedItems.has(index) && (
              <div className="p-4 space-y-4">
                {renderItemFields(type, item, index, updateItem)}
              </div>
            )}
          </Card>
        ))}
      </div>

      <Button
        onClick={addItem}
        variant="outline"
        className="w-full border-dashed"
        type="button"
      >
        <Plus className="w-4 h-4 mr-2" />
        Item toevoegen
      </Button>
    </div>
  );
}

function getDefaultItem(type: string) {
  const defaults: Record<string, any> = {
    stats: { value: '', label: '', description: '' },
    features: { icon: 'Zap', title: '', description: '', link: '' },
    team: { name: '', role: '', description: '', image: '' },
    pricing: { name: '', price: '', period: '', features: [], highlighted: false },
    cards: { title: '', description: '', link: '', icon: '', image: '' },
    timeline: { year: '', title: '', description: '' },
    testimonials: { name: '', role: '', company: '', text: '', image: '', rating: 5 },
    faq: { question: '', answer: '' }
  };
  return defaults[type] || {};
}

function getItemLabel(type: string, item: any, index: number): string {
  const labels: Record<string, (item: any) => string> = {
    stats: (item) => item.label || `Stat ${index + 1}`,
    features: (item) => item.title || `Feature ${index + 1}`,
    team: (item) => item.name || `Team member ${index + 1}`,
    pricing: (item) => item.name || `Plan ${index + 1}`,
    cards: (item) => item.title || `Card ${index + 1}`,
    timeline: (item) => item.year || `Event ${index + 1}`,
    testimonials: (item) => item.name || `Review ${index + 1}`,
    faq: (item) => item.question || `Vraag ${index + 1}`
  };
  return labels[type]?.(item) || `Item ${index + 1}`;
}

function renderItemFields(
  type: string,
  item: any,
  index: number,
  updateItem: (index: number, field: string, value: any) => void
) {
  switch (type) {
    case 'stats':
      return (
        <>
          <div>
            <Label>Waarde</Label>
            <Input
              value={item.value || ''}
              onChange={(e) => updateItem(index, 'value', e.target.value)}
              placeholder="99.9%"
            />
          </div>
          <div>
            <Label>Label</Label>
            <Input
              value={item.label || ''}
              onChange={(e) => updateItem(index, 'label', e.target.value)}
              placeholder="Uptime garantie"
            />
          </div>
          <div>
            <Label>Beschrijving (optioneel)</Label>
            <Input
              value={item.description || ''}
              onChange={(e) => updateItem(index, 'description', e.target.value)}
              placeholder="Voor kritieke systemen"
            />
          </div>
        </>
      );

    case 'features':
      return (
        <>
          <div>
            <Label>Icon naam (Lucide)</Label>
            <Input
              value={item.icon || ''}
              onChange={(e) => updateItem(index, 'icon', e.target.value)}
              placeholder="Monitor, Cloud, Shield, etc."
            />
            <p className="text-xs text-gray-500 mt-1">
              Zie: <a href="https://lucide.dev/icons" target="_blank" className="text-blue-500">lucide.dev/icons</a>
            </p>
          </div>
          <div>
            <Label>Titel</Label>
            <Input
              value={item.title || ''}
              onChange={(e) => updateItem(index, 'title', e.target.value)}
              placeholder="Werkplekbeheer"
            />
          </div>
          <div>
            <Label>Beschrijving</Label>
            <Textarea
              value={item.description || ''}
              onChange={(e) => updateItem(index, 'description', e.target.value)}
              placeholder="Volledige beheer van al uw werkplekken"
              rows={3}
            />
          </div>
          <div>
            <Label>Link (optioneel)</Label>
            <Input
              value={item.link || ''}
              onChange={(e) => updateItem(index, 'link', e.target.value)}
              placeholder="/oplossingen/werkplekbeheer"
            />
          </div>
        </>
      );

    case 'team':
      return (
        <>
          <ImageManager
            value={item.image || ''}
            onChange={(url) => updateItem(index, 'image', url)}
            label="Foto"
          />
          <div>
            <Label>Naam</Label>
            <Input
              value={item.name || ''}
              onChange={(e) => updateItem(index, 'name', e.target.value)}
              placeholder="Jan van der Berg"
            />
          </div>
          <div>
            <Label>Functie</Label>
            <Input
              value={item.role || ''}
              onChange={(e) => updateItem(index, 'role', e.target.value)}
              placeholder="CEO & Founder"
            />
          </div>
          <div>
            <Label>Beschrijving</Label>
            <Textarea
              value={item.description || ''}
              onChange={(e) => updateItem(index, 'description', e.target.value)}
              placeholder="20+ jaar ervaring in IT-consultancy"
              rows={2}
            />
          </div>
        </>
      );

    case 'pricing':
      return (
        <>
          <div>
            <Label>Plan naam</Label>
            <Input
              value={item.name || ''}
              onChange={(e) => updateItem(index, 'name', e.target.value)}
              placeholder="Professional"
            />
          </div>
          <div>
            <Label>Prijs</Label>
            <Input
              value={item.price || ''}
              onChange={(e) => updateItem(index, 'price', e.target.value)}
              placeholder="€75"
            />
          </div>
          <div>
            <Label>Periode</Label>
            <Input
              value={item.period || ''}
              onChange={(e) => updateItem(index, 'period', e.target.value)}
              placeholder="per werkplek/maand"
            />
          </div>
          <div>
            <Label>Features (één per regel)</Label>
            <Textarea
              value={Array.isArray(item.features) ? item.features.join('\n') : ''}
              onChange={(e) => updateItem(index, 'features', e.target.value.split('\n').filter(Boolean))}
              placeholder="24/7 support&#10;Proactieve monitoring&#10;Security management"
              rows={5}
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id={`highlight-${index}`}
              checked={item.highlighted || false}
              onChange={(e) => updateItem(index, 'highlighted', e.target.checked)}
              className="rounded"
            />
            <Label htmlFor={`highlight-${index}`}>Uitgelicht plan</Label>
          </div>
        </>
      );

    case 'cards':
      return (
        <>
          {item.image !== undefined && (
            <ImageManager
              value={item.image || ''}
              onChange={(url) => updateItem(index, 'image', url)}
              label="Afbeelding"
            />
          )}
          <div>
            <Label>Icon (optioneel)</Label>
            <Input
              value={item.icon || ''}
              onChange={(e) => updateItem(index, 'icon', e.target.value)}
              placeholder="Briefcase"
            />
          </div>
          <div>
            <Label>Titel</Label>
            <Input
              value={item.title || ''}
              onChange={(e) => updateItem(index, 'title', e.target.value)}
              placeholder="Zakelijke Dienstverlening"
            />
          </div>
          <div>
            <Label>Beschrijving</Label>
            <Textarea
              value={item.description || ''}
              onChange={(e) => updateItem(index, 'description', e.target.value)}
              rows={3}
            />
          </div>
          <div>
            <Label>Link</Label>
            <Input
              value={item.link || ''}
              onChange={(e) => updateItem(index, 'link', e.target.value)}
              placeholder="/branches/zakelijke-dienstverlening"
            />
          </div>
        </>
      );

    case 'timeline':
      return (
        <>
          <div>
            <Label>Jaar</Label>
            <Input
              value={item.year || ''}
              onChange={(e) => updateItem(index, 'year', e.target.value)}
              placeholder="2024"
            />
          </div>
          <div>
            <Label>Titel</Label>
            <Input
              value={item.title || ''}
              onChange={(e) => updateItem(index, 'title', e.target.value)}
              placeholder="200+ klanten"
            />
          </div>
          <div>
            <Label>Beschrijving</Label>
            <Textarea
              value={item.description || ''}
              onChange={(e) => updateItem(index, 'description', e.target.value)}
              rows={2}
            />
          </div>
        </>
      );

    case 'testimonials':
      return (
        <>
          <ImageManager
            value={item.image || ''}
            onChange={(url) => updateItem(index, 'image', url)}
            label="Foto"
          />
          <div>
            <Label>Naam</Label>
            <Input
              value={item.name || ''}
              onChange={(e) => updateItem(index, 'name', e.target.value)}
              placeholder="Maria de Jong"
            />
          </div>
          <div>
            <Label>Functie</Label>
            <Input
              value={item.role || ''}
              onChange={(e) => updateItem(index, 'role', e.target.value)}
              placeholder="IT Manager"
            />
          </div>
          <div>
            <Label>Bedrijf</Label>
            <Input
              value={item.company || ''}
              onChange={(e) => updateItem(index, 'company', e.target.value)}
              placeholder="Acme Corp"
            />
          </div>
          <div>
            <Label>Review tekst</Label>
            <Textarea
              value={item.text || ''}
              onChange={(e) => updateItem(index, 'text', e.target.value)}
              rows={4}
            />
          </div>
          <div>
            <Label>Rating (1-5)</Label>
            <Input
              type="number"
              min="1"
              max="5"
              value={item.rating || 5}
              onChange={(e) => updateItem(index, 'rating', parseInt(e.target.value) || 5)}
            />
          </div>
        </>
      );

    case 'faq':
      return (
        <>
          <div>
            <Label>Vraag</Label>
            <Input
              value={item.question || ''}
              onChange={(e) => updateItem(index, 'question', e.target.value)}
              placeholder="Wat is werkplekbeheer?"
            />
          </div>
          <div>
            <Label>Antwoord</Label>
            <Textarea
              value={item.answer || ''}
              onChange={(e) => updateItem(index, 'answer', e.target.value)}
              rows={4}
            />
          </div>
        </>
      );

    default:
      return null;
  }
}
