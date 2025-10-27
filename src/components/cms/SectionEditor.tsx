import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Card } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ImageManager } from './ImageManager';
import { ArrayEditor } from './ArrayEditor';
import { CMSSection } from '../../lib/cms-content-extractor';

interface SectionEditorProps {
  section: CMSSection;
  onUpdate: (field: string, value: any) => void;
}

export function SectionEditor({ section, onUpdate }: SectionEditorProps) {
  const renderFieldsByType = () => {
    switch (section.type) {
      case 'hero':
        return (
          <>
            <div>
              <Label>Hoofdtitel</Label>
              <Input
                value={section.content.heading || ''}
                onChange={(e) => onUpdate('heading', e.target.value)}
                placeholder="Bijv. Uw IT volledig ontzorgd"
              />
            </div>
            <div>
              <Label>Subtitel / Beschrijving</Label>
              <Textarea
                value={section.content.subtitle || ''}
                onChange={(e) => onUpdate('subtitle', e.target.value)}
                placeholder="Beschrijvende tekst onder de hoofdtitel"
                rows={3}
              />
            </div>
            
            <ImageManager
              value={section.content.backgroundImage || ''}
              onChange={(url) => onUpdate('backgroundImage', url)}
              label="Achtergrond afbeelding (optioneel)"
            />

            <div className="border-t pt-4 mt-4">
              <Label className="text-sm text-gray-600 mb-3 block">Primary Button</Label>
              <div className="space-y-3">
                <div>
                  <Label className="text-xs">Button tekst</Label>
                  <Input
                    value={section.content.buttonText || ''}
                    onChange={(e) => onUpdate('buttonText', e.target.value)}
                    placeholder="Neem contact op"
                  />
                </div>
                <div>
                  <Label className="text-xs">Button link</Label>
                  <Input
                    value={section.content.buttonLink || ''}
                    onChange={(e) => onUpdate('buttonLink', e.target.value)}
                    placeholder="/contact"
                  />
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <Label className="text-sm text-gray-600 mb-3 block">Secondary Button (optioneel)</Label>
              <div className="space-y-3">
                <div>
                  <Label className="text-xs">Button tekst</Label>
                  <Input
                    value={section.content.secondaryButtonText || ''}
                    onChange={(e) => onUpdate('secondaryButtonText', e.target.value)}
                    placeholder="Meer info"
                  />
                </div>
                <div>
                  <Label className="text-xs">Button link</Label>
                  <Input
                    value={section.content.secondaryButtonLink || ''}
                    onChange={(e) => onUpdate('secondaryButtonLink', e.target.value)}
                    placeholder="/oplossingen"
                  />
                </div>
              </div>
            </div>

            <div>
              <Label>Badge tekst (optioneel)</Label>
              <Input
                value={section.content.badgeText || ''}
                onChange={(e) => onUpdate('badgeText', e.target.value)}
                placeholder="Nieuw"
              />
            </div>
          </>
        );

      case 'stats':
        return (
          <>
            <div>
              <Label>Sectie titel (optioneel)</Label>
              <Input
                value={section.content.heading || ''}
                onChange={(e) => onUpdate('heading', e.target.value)}
                placeholder="Cijfers die spreken"
              />
            </div>
            <ArrayEditor
              value={section.content.stats || []}
              onChange={(stats) => onUpdate('stats', stats)}
              type="stats"
              label="Statistieken"
            />
          </>
        );

      case 'features':
        return (
          <>
            <div>
              <Label>Sectie titel</Label>
              <Input
                value={section.content.heading || ''}
                onChange={(e) => onUpdate('heading', e.target.value)}
                placeholder="Onze diensten"
              />
            </div>
            <div>
              <Label>Beschrijving (optioneel)</Label>
              <Textarea
                value={section.content.description || ''}
                onChange={(e) => onUpdate('description', e.target.value)}
                rows={2}
                placeholder="Korte introductie"
              />
            </div>
            <ArrayEditor
              value={section.content.features || []}
              onChange={(features) => onUpdate('features', features)}
              type="features"
              label="Features"
            />
            <div>
              <Label>Layout stijl</Label>
              <Select
                value={section.content.layout || 'grid'}
                onValueChange={(value) => onUpdate('layout', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="grid">Grid (3 kolommen)</SelectItem>
                  <SelectItem value="list">Lijst</SelectItem>
                  <SelectItem value="cards">Cards met schaduwen</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );

      case 'cta':
        return (
          <>
            <div>
              <Label>CTA Titel</Label>
              <Input
                value={section.content.heading || ''}
                onChange={(e) => onUpdate('heading', e.target.value)}
                placeholder="Klaar om te starten?"
              />
            </div>
            <div>
              <Label>CTA Beschrijving</Label>
              <Textarea
                value={section.content.description || ''}
                onChange={(e) => onUpdate('description', e.target.value)}
                rows={3}
                placeholder="Motiverende tekst"
              />
            </div>
            <div>
              <Label>Button tekst</Label>
              <Input
                value={section.content.buttonText || ''}
                onChange={(e) => onUpdate('buttonText', e.target.value)}
                placeholder="Neem contact op"
              />
            </div>
            <div>
              <Label>Button link</Label>
              <Input
                value={section.content.buttonLink || ''}
                onChange={(e) => onUpdate('buttonLink', e.target.value)}
                placeholder="/contact"
              />
            </div>
            <div>
              <Label>Achtergrond gradient</Label>
              <Select
                value={section.content.backgroundColor || 'from-sky-500 to-blue-600'}
                onValueChange={(value) => onUpdate('backgroundColor', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="from-sky-500 to-blue-600">Sky Blue</SelectItem>
                  <SelectItem value="from-indigo-500 to-indigo-600">Indigo</SelectItem>
                  <SelectItem value="from-violet-500 to-violet-600">Violet</SelectItem>
                  <SelectItem value="from-emerald-500 to-emerald-600">Emerald</SelectItem>
                  <SelectItem value="from-pink-500 to-pink-600">Pink</SelectItem>
                  <SelectItem value="from-orange-500 to-orange-600">Orange</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );

      case 'content':
        return (
          <>
            <div>
              <Label>Titel</Label>
              <Input
                value={section.content.title || ''}
                onChange={(e) => onUpdate('title', e.target.value)}
                placeholder="Sectie titel"
              />
            </div>
            <div>
              <Label>Content / Tekst</Label>
              <Textarea
                value={section.content.text || ''}
                onChange={(e) => onUpdate('text', e.target.value)}
                rows={8}
                placeholder="Volledige content tekst"
              />
            </div>
            <ImageManager
              value={section.content.image || ''}
              onChange={(url) => onUpdate('image', url)}
              label="Afbeelding (optioneel)"
            />
            <div>
              <Label>Layout</Label>
              <Select
                value={section.content.layout || 'text-only'}
                onValueChange={(value) => onUpdate('layout', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text-only">Alleen tekst</SelectItem>
                  <SelectItem value="image-left">Afbeelding links</SelectItem>
                  <SelectItem value="image-right">Afbeelding rechts</SelectItem>
                  <SelectItem value="image-top">Afbeelding boven</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );

      case 'cards':
        return (
          <>
            <div>
              <Label>Sectie titel</Label>
              <Input
                value={section.content.heading || ''}
                onChange={(e) => onUpdate('heading', e.target.value)}
                placeholder="Onze branches"
              />
            </div>
            <div>
              <Label>Beschrijving</Label>
              <Textarea
                value={section.content.description || ''}
                onChange={(e) => onUpdate('description', e.target.value)}
                rows={2}
              />
            </div>
            <ArrayEditor
              value={section.content.cards || []}
              onChange={(cards) => onUpdate('cards', cards)}
              type="cards"
              label="Cards"
            />
          </>
        );

      case 'team':
        return (
          <>
            <div>
              <Label>Sectie titel</Label>
              <Input
                value={section.content.heading || ''}
                onChange={(e) => onUpdate('heading', e.target.value)}
                placeholder="Ons team"
              />
            </div>
            <div>
              <Label>Beschrijving</Label>
              <Textarea
                value={section.content.description || ''}
                onChange={(e) => onUpdate('description', e.target.value)}
                rows={2}
              />
            </div>
            <ArrayEditor
              value={section.content.members || []}
              onChange={(members) => onUpdate('members', members)}
              type="team"
              label="Team members"
            />
          </>
        );

      case 'pricing':
        return (
          <>
            <div>
              <Label>Sectie titel</Label>
              <Input
                value={section.content.heading || ''}
                onChange={(e) => onUpdate('heading', e.target.value)}
                placeholder="Onze prijzen"
              />
            </div>
            <div>
              <Label>Beschrijving</Label>
              <Textarea
                value={section.content.description || ''}
                onChange={(e) => onUpdate('description', e.target.value)}
                rows={2}
              />
            </div>
            <ArrayEditor
              value={section.content.plans || []}
              onChange={(plans) => onUpdate('plans', plans)}
              type="pricing"
              label="Prijsplannen"
            />
          </>
        );

      case 'timeline':
        return (
          <>
            <div>
              <Label>Sectie titel</Label>
              <Input
                value={section.content.heading || ''}
                onChange={(e) => onUpdate('heading', e.target.value)}
                placeholder="Onze geschiedenis"
              />
            </div>
            <ArrayEditor
              value={section.content.events || []}
              onChange={(events) => onUpdate('events', events)}
              type="timeline"
              label="Timeline events"
            />
          </>
        );

      case 'testimonials':
        return (
          <>
            <div>
              <Label>Sectie titel</Label>
              <Input
                value={section.content.heading || ''}
                onChange={(e) => onUpdate('heading', e.target.value)}
                placeholder="Wat klanten zeggen"
              />
            </div>
            <ArrayEditor
              value={section.content.testimonials || []}
              onChange={(testimonials) => onUpdate('testimonials', testimonials)}
              type="testimonials"
              label="Reviews"
            />
          </>
        );

      case 'faq':
        return (
          <>
            <div>
              <Label>Sectie titel</Label>
              <Input
                value={section.content.heading || ''}
                onChange={(e) => onUpdate('heading', e.target.value)}
                placeholder="Veelgestelde vragen"
              />
            </div>
            <ArrayEditor
              value={section.content.items || []}
              onChange={(items) => onUpdate('items', items)}
              type="faq"
              label="FAQ items"
            />
          </>
        );

      case 'form':
        return (
          <>
            <div>
              <Label>Formulier titel</Label>
              <Input
                value={section.content.heading || ''}
                onChange={(e) => onUpdate('heading', e.target.value)}
                placeholder="Neem contact op"
              />
            </div>
            <div>
              <Label>Beschrijving</Label>
              <Textarea
                value={section.content.description || ''}
                onChange={(e) => onUpdate('description', e.target.value)}
                rows={2}
              />
            </div>
            <div>
              <Label>Submit button tekst</Label>
              <Input
                value={section.content.submitText || ''}
                onChange={(e) => onUpdate('submitText', e.target.value)}
                placeholder="Verstuur bericht"
              />
            </div>
            <div>
              <Label>Succes bericht</Label>
              <Input
                value={section.content.successMessage || ''}
                onChange={(e) => onUpdate('successMessage', e.target.value)}
                placeholder="Bedankt voor uw bericht!"
              />
            </div>
            <Card className="p-4 bg-blue-50 border-blue-200">
              <p className="text-sm text-blue-900">
                💡 Formuliervelden worden automatisch gegenereerd: naam, email, telefoon, bedrijf, bericht
              </p>
            </Card>
          </>
        );

      default:
        return (
          <div>
            <Label>Content (JSON format - geavanceerd)</Label>
            <Textarea
              value={JSON.stringify(section.content, null, 2)}
              onChange={(e) => {
                try {
                  const content = JSON.parse(e.target.value);
                  Object.keys(content).forEach(key => onUpdate(key, content[key]));
                } catch (err) {
                  // Invalid JSON - ignore
                }
              }}
              rows={15}
              className="font-mono text-sm"
            />
            <p className="text-xs text-gray-500 mt-2">
              Let op: Wijzigingen worden alleen opgeslagen als de JSON geldig is
            </p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-4">
      {renderFieldsByType()}
      
      {/* Preview helper */}
      <Card className="p-4 bg-gray-50 border-dashed">
        <p className="text-sm text-gray-600">
          💡 Tip: Klik op "Opslaan" bovenaan de pagina om wijzigingen permanent op te slaan
        </p>
      </Card>
    </div>
  );
}
