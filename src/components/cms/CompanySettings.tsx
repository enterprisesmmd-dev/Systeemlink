import { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Clock, Mail, Phone, MapPin, Globe, Save, RefreshCw } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export interface OpeningHours {
  day: string;
  open: string;
  close: string;
  closed: boolean;
}

export interface CompanyInfo {
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    zipcode: string;
    country: string;
  };
  website: string;
  kvk: string;
  btw: string;
  openingHours: OpeningHours[];
}

const defaultCompanyInfo: CompanyInfo = {
  name: 'Systeemlink',
  email: 'info@systeemlink.nl',
  phone: '+31 613777733',
  address: {
    street: 'Planetenpark 19',
    city: 'Purmerend',
    zipcode: '1443BS',
    country: 'Nederland'
  },
  website: 'https://systeemlink.nl',
  kvk: '88308170',
  btw: 'NL004588053B11',
  openingHours: [
    { day: 'Maandag', open: '08:00', close: '18:00', closed: false },
    { day: 'Dinsdag', open: '08:00', close: '18:00', closed: false },
    { day: 'Woensdag', open: '08:00', close: '18:00', closed: false },
    { day: 'Donderdag', open: '08:00', close: '18:00', closed: false },
    { day: 'Vrijdag', open: '08:00', close: '18:00', closed: false },
    { day: 'Zaterdag', open: '09:00', close: '17:00', closed: true },
    { day: 'Zondag', open: '09:00', close: '17:00', closed: true }
  ]
};

interface CompanySettingsProps {
  onSave?: (settings: CompanyInfo) => void;
}

export function CompanySettings({ onSave }: CompanySettingsProps) {
  const [settings, setSettings] = useState<CompanyInfo>(defaultCompanyInfo);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = () => {
    const saved = localStorage.getItem('cms_company_settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSettings({ ...defaultCompanyInfo, ...parsed });
      } catch (e) {
        console.error('Failed to load company settings:', e);
      }
    }
  };

  const saveSettings = () => {
    localStorage.setItem('cms_company_settings', JSON.stringify(settings));
    setHasChanges(false);
    toast.success('Bedrijfsinstellingen opgeslagen!');
    if (onSave) {
      onSave(settings);
    }
  };

  const reloadPage = () => {
    window.location.reload();
  };

  const updateField = (field: keyof CompanyInfo, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const updateAddress = (field: keyof CompanyInfo['address'], value: string) => {
    setSettings(prev => ({
      ...prev,
      address: { ...prev.address, [field]: value }
    }));
    setHasChanges(true);
  };

  const updateOpeningHours = (index: number, field: keyof OpeningHours, value: any) => {
    setSettings(prev => ({
      ...prev,
      openingHours: prev.openingHours.map((hours, i) =>
        i === index ? { ...hours, [field]: value } : hours
      )
    }));
    setHasChanges(true);
  };

  // Helper function to check if currently open
  const isCurrentlyOpen = () => {
    const now = new Date();
    const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const dayIndex = currentDay === 0 ? 6 : currentDay - 1; // Convert to our array index
    const todayHours = settings.openingHours[dayIndex];
    
    if (todayHours.closed) return false;
    
    const currentTime = now.toTimeString().slice(0, 5);
    return currentTime >= todayHours.open && currentTime < todayHours.close;
  };

  const getCurrentStatus = () => {
    return isCurrentlyOpen() 
      ? { text: 'Online • Nu Geopend', color: 'bg-green-500' }
      : { text: 'Offline • Gesloten', color: 'bg-red-500' };
  };

  const status = getCurrentStatus();

  return (
    <div className="space-y-6">
      {/* Header with Status */}
      <Card className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl mb-2">Bedrijfsinstellingen</h2>
            <p className="text-gray-600">Beheer contactgegevens, openingstijden en bedrijfsinformatie</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${status.color} animate-pulse`}></div>
              <span className="text-sm">{status.text}</span>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Contact Information */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Mail className="w-5 h-5 text-indigo-600" />
            <h3 className="text-xl">Contactgegevens</h3>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Bedrijfsnaam</Label>
              <Input
                value={settings.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="Systeemlink"
              />
            </div>

            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={settings.email}
                onChange={(e) => updateField('email', e.target.value)}
                placeholder="info@systeemlink.nl"
              />
            </div>

            <div>
              <Label>Telefoonnummer</Label>
              <Input
                type="tel"
                value={settings.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                placeholder="+31 20 234 5678"
              />
            </div>

            <div>
              <Label>Website</Label>
              <Input
                type="url"
                value={settings.website}
                onChange={(e) => updateField('website', e.target.value)}
                placeholder="https://systeemlink.nl"
              />
            </div>
          </div>
        </Card>

        {/* Address */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <MapPin className="w-5 h-5 text-indigo-600" />
            <h3 className="text-xl">Adresgegevens</h3>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Straat + Huisnummer</Label>
              <Input
                value={settings.address.street}
                onChange={(e) => updateAddress('street', e.target.value)}
                placeholder="Voorbeeldstraat 123"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Postcode</Label>
                <Input
                  value={settings.address.zipcode}
                  onChange={(e) => updateAddress('zipcode', e.target.value)}
                  placeholder="1234 AB"
                />
              </div>
              <div>
                <Label>Plaats</Label>
                <Input
                  value={settings.address.city}
                  onChange={(e) => updateAddress('city', e.target.value)}
                  placeholder="Amsterdam"
                />
              </div>
            </div>

            <div>
              <Label>Land</Label>
              <Input
                value={settings.address.country}
                onChange={(e) => updateAddress('country', e.target.value)}
                placeholder="Nederland"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>KVK Nummer</Label>
                <Input
                  value={settings.kvk}
                  onChange={(e) => updateField('kvk', e.target.value)}
                  placeholder="12345678"
                />
              </div>
              <div>
                <Label>BTW Nummer</Label>
                <Input
                  value={settings.btw}
                  onChange={(e) => updateField('btw', e.target.value)}
                  placeholder="NL123456789B01"
                />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Opening Hours */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-600" />
            <h3 className="text-xl">Openingstijden</h3>
          </div>
          <Badge className={`${status.color} text-white`}>
            {status.text}
          </Badge>
        </div>

        <div className="space-y-3">
          {settings.openingHours.map((hours, index) => (
            <div key={hours.day} className="grid grid-cols-12 gap-4 items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="col-span-3">
                <Label className="text-sm">{hours.day}</Label>
              </div>
              
              <div className="col-span-3">
                <Input
                  type="time"
                  value={hours.open}
                  onChange={(e) => updateOpeningHours(index, 'open', e.target.value)}
                  disabled={hours.closed}
                  className="text-sm"
                />
              </div>

              <div className="col-span-1 text-center text-gray-500">
                <span>tot</span>
              </div>

              <div className="col-span-3">
                <Input
                  type="time"
                  value={hours.close}
                  onChange={(e) => updateOpeningHours(index, 'close', e.target.value)}
                  disabled={hours.closed}
                  className="text-sm"
                />
              </div>

              <div className="col-span-2 flex items-center gap-2">
                <Switch
                  checked={!hours.closed}
                  onCheckedChange={(checked) => updateOpeningHours(index, 'closed', !checked)}
                />
                <Label className="text-xs text-gray-500">
                  {hours.closed ? 'Gesloten' : 'Open'}
                </Label>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>💡 Let op:</strong> De support widget zal automatisch online/offline status aanpassen op basis van deze openingstijden.
          </p>
        </div>
      </Card>

      {/* Preview */}
      <Card className="p-6 bg-gray-50">
        <h3 className="text-xl mb-4">Voorbeeld Footer Informatie</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-semibold mb-2">Contact</h4>
            <div className="space-y-1 text-sm text-gray-600">
              <p>{settings.email}</p>
              <p>{settings.phone}</p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Adres</h4>
            <div className="space-y-1 text-sm text-gray-600">
              <p>{settings.address.street}</p>
              <p>{settings.address.zipcode} {settings.address.city}</p>
              <p>{settings.address.country}</p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Openingstijden</h4>
            <div className="space-y-1 text-sm text-gray-600">
              {settings.openingHours.filter(h => !h.closed).map(hours => (
                <p key={hours.day}>
                  {hours.day}: {hours.open} - {hours.close}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex items-center justify-between gap-4">
        <Button
          onClick={loadSettings}
          variant="outline"
          size="lg"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Reset
        </Button>

        <div className="flex gap-4">
          <Button
            onClick={saveSettings}
            size="lg"
            disabled={!hasChanges}
            className="bg-gradient-to-r from-indigo-500 to-purple-600"
          >
            <Save className="w-4 h-4 mr-2" />
            Opslaan
          </Button>

          <Button
            onClick={reloadPage}
            size="lg"
            variant="outline"
            className="border-indigo-200 text-indigo-600"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Opslaan & Herladen
          </Button>
        </div>
      </div>
    </div>
  );
}

// Helper function to get company settings (for use in other components)
export function getCompanySettings(): CompanyInfo {
  const saved = localStorage.getItem('cms_company_settings');
  if (saved) {
    try {
      return { ...defaultCompanyInfo, ...JSON.parse(saved) };
    } catch (e) {
      console.error('Failed to parse company settings:', e);
    }
  }
  return defaultCompanyInfo;
}

// Helper function to check if currently within opening hours
export function isWithinOpeningHours(): boolean {
  const settings = getCompanySettings();
  const now = new Date();
  const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
  const dayIndex = currentDay === 0 ? 6 : currentDay - 1; // Convert to our array index
  const todayHours = settings.openingHours[dayIndex];
  
  if (todayHours.closed) return false;
  
  const currentTime = now.toTimeString().slice(0, 5);
  return currentTime >= todayHours.open && currentTime < todayHours.close;
}

// Helper function to get current status text
export function getOpeningStatus(): { text: string; isOpen: boolean } {
  const isOpen = isWithinOpeningHours();
  const settings = getCompanySettings();
  
  if (isOpen) {
    const now = new Date();
    const currentDay = now.getDay();
    const dayIndex = currentDay === 0 ? 6 : currentDay - 1;
    const todayHours = settings.openingHours[dayIndex];
    return {
      text: `Online • Geopend tot ${todayHours.close}`,
      isOpen: true
    };
  }
  
  // Find next opening
  const now = new Date();
  const currentDay = now.getDay();
  const currentTime = now.toTimeString().slice(0, 5);
  
  for (let i = 0; i < 7; i++) {
    const checkDay = (currentDay + i) % 7;
    const dayIndex = checkDay === 0 ? 6 : checkDay - 1;
    const hours = settings.openingHours[dayIndex];
    
    if (!hours.closed) {
      if (i === 0 && currentTime < hours.open) {
        return {
          text: `Offline • Opent om ${hours.open}`,
          isOpen: false
        };
      } else if (i > 0) {
        return {
          text: `Offline • Opent ${hours.day} ${hours.open}`,
          isOpen: false
        };
      }
    }
  }
  
  return {
    text: 'Offline • Gesloten',
    isOpen: false
  };
}