import { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Save, MessageSquare } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface SupportWidgetSettings {
  enabled: boolean;
  autoOpen: boolean;
  title: string;
  subtitle: string;
  description: string;
  availability: string;
  phone: string;
  email: string;
  supportPagePath: string;
  ctaText: string;
  ctaLink: string;
}

const defaultSettings: SupportWidgetSettings = {
  enabled: true,
  autoOpen: false,
  title: 'Systeemlink Support',
  subtitle: 'We helpen je graag verder!',
  description: 'Hoe kunnen we je vandaag helpen? Kies een van de onderstaande opties:',
  availability: 'Online • Ma-Vr 08:00-18:00',
  phone: '+31202345678',
  email: 'info@systeemlink.nl',
  supportPagePath: '/oplossingen/it-support',
  ctaText: '🎯 Vraag gratis IT-check aan',
  ctaLink: '/it-check'
};

export function WidgetSettings() {
  const [settings, setSettings] = useState<SupportWidgetSettings>(defaultSettings);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = () => {
    const saved = localStorage.getItem('cms_support_widget_settings');
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse widget settings:', e);
      }
    }
  };

  const saveSettings = () => {
    localStorage.setItem('cms_support_widget_settings', JSON.stringify(settings));
    toast.success('Support Widget instellingen opgeslagen!');
    
    // Trigger a page reload to update the widget
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl mb-2 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-sky-600" />
            Support Widget Configuratie
          </h2>
          <p className="text-gray-600">Beheer de support widget content en gedrag</p>
        </div>
        <Button onClick={saveSettings} className="bg-gradient-to-r from-sky-500 to-blue-600">
          <Save className="w-4 h-4 mr-2" />
          Opslaan & Herladen
        </Button>
      </div>

      <div className="max-w-3xl space-y-6">
        {/* Enable/Disable Widget */}
        <Card className="p-4 bg-gradient-to-br from-sky-50 to-blue-50 border-sky-200">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <Label className="text-base">Support Widget Actief</Label>
              <p className="text-sm text-gray-600 mt-1">
                Toon de support widget op de website
              </p>
            </div>
            <Switch
              checked={settings.enabled}
              onCheckedChange={(enabled) => setSettings({ ...settings, enabled })}
            />
          </div>
        </Card>

        {/* Auto Open */}
        <Card className="p-4 bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <Label className="text-base">Auto-Open Popup</Label>
              <p className="text-sm text-gray-600 mt-1">
                Open de popup automatisch na 2 seconden (alleen eerste keer)
              </p>
            </div>
            <Switch
              checked={settings.autoOpen}
              onCheckedChange={(autoOpen) => setSettings({ ...settings, autoOpen })}
            />
          </div>
        </Card>

        {/* Content Settings */}
        <div className="pt-6 border-t">
          <h3 className="text-lg mb-4">Popup Inhoud</h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="widget-title">Titel</Label>
              <Input
                id="widget-title"
                value={settings.title}
                onChange={(e) => setSettings({ ...settings, title: e.target.value })}
                placeholder="Systeemlink Support"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="widget-subtitle">Subtitle</Label>
              <Input
                id="widget-subtitle"
                value={settings.subtitle}
                onChange={(e) => setSettings({ ...settings, subtitle: e.target.value })}
                placeholder="We helpen je graag verder!"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="widget-description">Beschrijving</Label>
              <Textarea
                id="widget-description"
                value={settings.description}
                onChange={(e) => setSettings({ ...settings, description: e.target.value })}
                placeholder="Hoe kunnen we je vandaag helpen?"
                rows={2}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="widget-availability">Beschikbaarheid Tekst</Label>
              <Input
                id="widget-availability"
                value={settings.availability}
                onChange={(e) => setSettings({ ...settings, availability: e.target.value })}
                placeholder="Online • Ma-Vr 08:00-18:00"
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                Dit wordt getoond als groene status indicator
              </p>
            </div>
          </div>
        </div>

        {/* Contact Options */}
        <div className="pt-6 border-t">
          <h3 className="text-lg mb-4">Contactopties</h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="widget-phone">Telefoonnummer</Label>
              <Input
                id="widget-phone"
                type="tel"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                placeholder="+31202345678"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="widget-email">Email Adres</Label>
              <Input
                id="widget-email"
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                placeholder="info@systeemlink.nl"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="widget-support-path">Support Pagina Link</Label>
              <Input
                id="widget-support-path"
                value={settings.supportPagePath}
                onChange={(e) => setSettings({ ...settings, supportPagePath: e.target.value })}
                placeholder="/oplossingen/it-support"
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                Relatief pad naar de support/helpdesk pagina
              </p>
            </div>
          </div>
        </div>

        {/* Call-to-Action */}
        <div className="pt-6 border-t">
          <h3 className="text-lg mb-4">Call-to-Action (Footer Button)</h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="widget-cta-text">CTA Button Tekst</Label>
              <Input
                id="widget-cta-text"
                value={settings.ctaText}
                onChange={(e) => setSettings({ ...settings, ctaText: e.target.value })}
                placeholder="🎯 Vraag gratis IT-check aan"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="widget-cta-link">CTA Button Link</Label>
              <Input
                id="widget-cta-link"
                value={settings.ctaLink}
                onChange={(e) => setSettings({ ...settings, ctaLink: e.target.value })}
                placeholder="/it-check"
                className="mt-1"
              />
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="pt-6 border-t">
          <h3 className="text-lg mb-4">Preview</h3>
          <Card className="p-6 bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-sm mx-auto">
              {/* Preview Header */}
              <div className="bg-gradient-to-br from-[#0ea5e9] to-[#0284c7] p-4 text-white">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{settings.title}</p>
                    <p className="text-xs opacity-90">{settings.subtitle}</p>
                    <p className="text-xs mt-1 opacity-80">● {settings.availability}</p>
                  </div>
                </div>
              </div>
              
              {/* Preview Content */}
              <div className="p-4 space-y-3">
                <p className="text-sm text-gray-600">{settings.description}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 bg-green-50 border border-green-200 rounded-lg text-xs">
                    <div className="w-8 h-8 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Bel: {settings.phone.replace('+31', '0')}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 p-2 bg-blue-50 border border-blue-200 rounded-lg text-xs">
                    <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">IT-Support & Helpdesk</span>
                  </div>
                  
                  <div className="flex items-center gap-2 p-2 bg-purple-50 border border-purple-200 rounded-lg text-xs">
                    <div className="w-8 h-8 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-700">{settings.email}</span>
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <button className="w-full py-2 bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] text-white rounded-lg text-xs">
                    {settings.ctaText}
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Info Card */}
        <Card className="p-4 bg-blue-50 border-blue-200">
          <p className="text-sm text-blue-900">
            💡 <strong>Tip:</strong> De widget verschijnt linksonder op alle pagina's. 
            Wijzigingen worden direct zichtbaar nadat je op "Opslaan & Herladen" klikt.
          </p>
        </Card>
      </div>
    </Card>
  );
}
