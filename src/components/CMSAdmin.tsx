import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Switch } from './ui/switch';
import { 
  Save, 
  Eye, 
  Settings, 
  FileText, 
  Mail, 
  Palette, 
  Plus, 
  Trash2,
  Download,
  Upload,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Edit,
  Copy,
  Search,
  Home,
  Lock,
  Layout,
  MessageSquare,
  Building2,
  Inbox,
  Calendar,
  ExternalLink,
  Filter
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { initialCMSContent, type CMSPageContent, type CMSSection } from '../lib/cms-content-extractor';
import { SectionEditor } from './cms/SectionEditor';
import { PuckEditor } from './cms/PuckEditor';
import { WidgetSettings } from './cms/WidgetSettings';
import { CompanySettings } from './cms/CompanySettings';
import { SubmissionsViewer } from './cms/SubmissionsViewer';
import { Data } from "@measured/puck";
import { PuckStorage, convertCMSToPuck, convertPuckToCMS, initializePuckFromCMS } from '../lib/puck-data-converter';

interface EmailSettings {
  to: string;
  subject: string;
  replyTo: string;
  ccEmails: string[];
}

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

export function CMSAdmin() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [pageData, setPageData] = useState<Record<string, CMSPageContent>>({});
  const [emailSettings, setEmailSettings] = useState<EmailSettings>({
    to: 'info@systeemlink.nl',
    subject: 'Nieuw contactformulier bericht',
    replyTo: 'noreply@systeemlink.nl',
    ccEmails: []
  });
  const [supportWidgetSettings, setSupportWidgetSettings] = useState<SupportWidgetSettings>({
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
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [showPageBuilder, setShowPageBuilder] = useState(false);
  const [pageBuilderData, setPageBuilderData] = useState<any[]>([]);

  const ADMIN_PASSWORD = 'Systeemlink2024!';

  useEffect(() => {
    const savedAuth = localStorage.getItem('cms_authenticated');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
      loadAllPageData();
      loadEmailSettings();
      loadSupportWidgetSettings();
    }
  }, []);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('cms_authenticated', 'true');
      loadAllPageData();
      loadEmailSettings();
      loadSupportWidgetSettings();
      toast.success('Welkom in het CMS Admin Panel');
    } else {
      toast.error('Onjuist wachtwoord');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('cms_authenticated');
    setPassword('');
    toast.info('Uitgelogd');
  };

  const loadAllPageData = () => {
    const saved = localStorage.getItem('cms_pages_data');
    if (saved) {
      setPageData(JSON.parse(saved));
    } else {
      // Initialize with default data from extractor
      setPageData(initialCMSContent);
      localStorage.setItem('cms_pages_data', JSON.stringify(initialCMSContent));
    }
  };

  const loadEmailSettings = () => {
    const saved = localStorage.getItem('cms_email_settings');
    if (saved) {
      setEmailSettings(JSON.parse(saved));
    }
  };

  const loadSupportWidgetSettings = () => {
    const saved = localStorage.getItem('cms_support_widget_settings');
    if (saved) {
      setSupportWidgetSettings(JSON.parse(saved));
    }
  };

  const savePageData = () => {
    localStorage.setItem('cms_pages_data', JSON.stringify(pageData));
    toast.success('Alle wijzigingen opgeslagen!');
  };

  const saveEmailSettings = () => {
    localStorage.setItem('cms_email_settings', JSON.stringify(emailSettings));
    toast.success('Email instellingen opgeslagen');
  };

  const saveSupportWidgetSettings = () => {
    localStorage.setItem('cms_support_widget_settings', JSON.stringify(supportWidgetSettings));
    toast.success('Support Widget instellingen opgeslagen');
  };

  const exportData = () => {
    const data = {
      pages: pageData,
      email: emailSettings,
      supportWidget: supportWidgetSettings,
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `systeemlink-cms-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Data geëxporteerd naar JSON bestand');
  };

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (data.pages) setPageData(data.pages);
        if (data.email) setEmailSettings(data.email);
        if (data.supportWidget) setSupportWidgetSettings(data.supportWidget);
        localStorage.setItem('cms_pages_data', JSON.stringify(data.pages));
        localStorage.setItem('cms_email_settings', JSON.stringify(data.email));
        localStorage.setItem('cms_support_widget_settings', JSON.stringify(data.supportWidget));
        toast.success('Data succesvol geïmporteerd!');
      } catch (error) {
        toast.error('Fout bij importeren van bestand');
      }
    };
    reader.readAsText(file);
  };

  const updatePageSEO = (pageId: string, field: string, value: string) => {
    setPageData(prev => ({
      ...prev,
      [pageId]: {
        ...prev[pageId],
        seo: {
          ...prev[pageId]?.seo,
          [field]: value
        }
      }
    }));
  };

  const updateSectionContent = (pageId: string, sectionId: string, field: string, value: any) => {
    setPageData(prev => ({
      ...prev,
      [pageId]: {
        ...prev[pageId],
        sections: prev[pageId]?.sections.map(section =>
          section.id === sectionId
            ? { ...section, content: { ...section.content, [field]: value } }
            : section
        ) || []
      }
    }));
  };

  const updateSection = (pageId: string, sectionId: string, updates: Partial<CMSSection>) => {
    setPageData(prev => ({
      ...prev,
      [pageId]: {
        ...prev[pageId],
        sections: prev[pageId]?.sections.map(section =>
          section.id === sectionId ? { ...section, ...updates } : section
        ) || []
      }
    }));
  };

  const addSection = (pageId: string, type: CMSSection['type']) => {
    const newSection: CMSSection = {
      id: `section-${Date.now()}`,
      type,
      title: `Nieuwe ${type} sectie`,
      order: (pageData[pageId]?.sections.length || 0) + 1,
      content: {}
    };

    setPageData(prev => ({
      ...prev,
      [pageId]: {
        ...prev[pageId],
        sections: [...(prev[pageId]?.sections || []), newSection]
      }
    }));
    toast.success('Sectie toegevoegd');
  };

  const deleteSection = (pageId: string, sectionId: string) => {
    if (confirm('Weet je zeker dat je deze sectie wilt verwijderen?')) {
      setPageData(prev => ({
        ...prev,
        [pageId]: {
          ...prev[pageId],
          sections: prev[pageId]?.sections.filter(s => s.id !== sectionId) || []
        }
      }));
      toast.success('Sectie verwijderd');
    }
  };

  const duplicateSection = (pageId: string, sectionId: string) => {
    const section = pageData[pageId]?.sections.find(s => s.id === sectionId);
    if (section) {
      const newSection = {
        ...section,
        id: `section-${Date.now()}`,
        title: `${section.title} (kopie)`,
        order: section.order + 1
      };
      setPageData(prev => ({
        ...prev,
        [pageId]: {
          ...prev[pageId],
          sections: [...(prev[pageId]?.sections || []), newSection]
        }
      }));
      toast.success('Sectie gedupliceerd');
    }
  };

  const toggleSectionExpand = (sectionId: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  };

  const currentPageData = pageData[currentPage];
  const filteredPages = Object.values(pageData).filter(page =>
    page.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // If Page Builder is active, show it
  if (showPageBuilder && currentPageData) {
    return (
      <PuckEditor
        pageName={currentPageData.name}
        pageId={currentPage}
        initialData={pageBuilderData}
        onSave={(data: Data) => {
          setPageBuilderData(data);
          PuckStorage.save(currentPage, data);
          toast.success('Pagina opgeslagen met Puck!');
        }}
        onBack={() => setShowPageBuilder(false)}
      />
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🔐</div>
            <h1 className="text-3xl mb-2">Systeemlink CMS</h1>
            <p className="text-gray-600">Beheerderspaneel</p>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="password">Wachtwoord</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="Voer wachtwoord in"
                className="mt-1"
                autoFocus
              />
            </div>
            <Button onClick={handleLogin} className="w-full">
              Inloggen
            </Button>
            <p className="text-xs text-center text-gray-500">
              Standaard wachtwoord: Systeemlink2024!
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl">📝 Systeemlink CMS</h1>
              <Badge variant="secondary" className="bg-indigo-100 text-indigo-900">
                Beheerder
              </Badge>
              <Badge variant="outline">
                {Object.keys(pageData).length} pagina's
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={exportData}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <label>
                <Button variant="outline" size="sm" as="span">
                  <Upload className="w-4 h-4 mr-2" />
                  Import
                </Button>
                <input
                  type="file"
                  accept=".json"
                  onChange={importData}
                  className="hidden"
                />
              </label>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Uitloggen
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <Tabs defaultValue="pages" className="space-y-6">
          <TabsList className="bg-white p-1 shadow-sm">
            <TabsTrigger value="pages" className="gap-2">
              <FileText className="w-4 h-4" />
              Pagina's ({Object.keys(pageData).length})
            </TabsTrigger>
            <TabsTrigger value="submissions" className="gap-2">
              <Inbox className="w-4 h-4" />
              Submissions
            </TabsTrigger>
            <TabsTrigger value="company" className="gap-2">
              <Building2 className="w-4 h-4" />
              Bedrijf
            </TabsTrigger>
            <TabsTrigger value="widgets" className="gap-2">
              <MessageSquare className="w-4 h-4" />
              Widgets
            </TabsTrigger>
            <TabsTrigger value="email" className="gap-2">
              <Mail className="w-4 h-4" />
              Email
            </TabsTrigger>
            <TabsTrigger value="styling" className="gap-2">
              <Palette className="w-4 h-4" />
              Styling
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="w-4 h-4" />
              Instellingen
            </TabsTrigger>
          </TabsList>

          {/* Pages Tab */}
          <TabsContent value="pages" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl mb-2">Pagina Beheer</h2>
                  <p className="text-gray-600">Bewerk content, SEO en secties per pagina</p>
                </div>
                <Button onClick={savePageData} size="lg" className="bg-gradient-to-r from-indigo-500 to-purple-600">
                  <Save className="w-4 h-4 mr-2" />
                  Alles opslaan
                </Button>
              </div>

              <div className="grid lg:grid-cols-4 gap-6">
                {/* Page Selector */}
                <div className="space-y-2">
                  <div className="mb-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="Zoek pagina..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Label className="text-sm text-gray-500">Selecteer pagina</Label>
                  <div className="space-y-1 max-h-[600px] overflow-y-auto">
                    {Object.values(pageData).map(page => (
                      <button
                        key={page.id}
                        onClick={() => setCurrentPage(page.id)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all text-sm ${
                          currentPage === page.id
                            ? 'bg-indigo-100 text-indigo-900 shadow-sm border-2 border-indigo-300'
                            : 'hover:bg-gray-100 border-2 border-transparent'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{page.name}</span>
                          <Badge variant="secondary" className="text-xs">
                            {page.sections.length}
                          </Badge>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{page.path}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Content Editor */}
                <div className="lg:col-span-3 space-y-6">
                  {currentPageData && (
                    <>
                      {/* Page Info */}
                      <Card className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-2xl mb-1">{currentPageData.name}</h3>
                            <p className="text-sm text-gray-600">{currentPageData.path}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              onClick={() => {
                                // Load or convert to Puck data
                                let puckData = PuckStorage.load(currentPage);
                                
                                if (!puckData) {
                                  // Convert from CMS format
                                  puckData = convertCMSToPuck(currentPageData);
                                  PuckStorage.save(currentPage, puckData);
                                  toast.info('Pagina geconverteerd naar Puck format');
                                }
                                
                                setPageBuilderData(puckData);
                                setShowPageBuilder(true);
                              }}
                              className="bg-gradient-to-r from-sky-500 to-indigo-600"
                            >
                              <Layout className="w-4 h-4 mr-2" />
                              Page Builder
                            </Button>
                            <Badge className="bg-indigo-600 text-white">
                              {currentPageData.sections.length} secties
                            </Badge>
                          </div>
                        </div>

                        {/* SEO Section */}
                        <div className="space-y-3 mt-4 pt-4 border-t border-indigo-200">
                          <Label className="text-sm">SEO Instellingen</Label>
                          <div>
                            <Label htmlFor="seo-title" className="text-xs text-gray-600">Meta Title</Label>
                            <Input
                              id="seo-title"
                              value={currentPageData.seo?.title || ''}
                              onChange={(e) => updatePageSEO(currentPage, 'title', e.target.value)}
                              placeholder="SEO titel (max 60 karakters)"
                              className="mt-1"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                              {currentPageData.seo?.title?.length || 0}/60 karakters
                            </p>
                          </div>
                          <div>
                            <Label htmlFor="seo-description" className="text-xs text-gray-600">Meta Description</Label>
                            <Textarea
                              id="seo-description"
                              value={currentPageData.seo?.description || ''}
                              onChange={(e) => updatePageSEO(currentPage, 'description', e.target.value)}
                              placeholder="SEO beschrijving (max 160 karakters)"
                              rows={2}
                              className="mt-1"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                              {currentPageData.seo?.description?.length || 0}/160 karakters
                            </p>
                          </div>
                          <div>
                            <Label htmlFor="seo-keywords" className="text-xs text-gray-600">Keywords</Label>
                            <Input
                              id="seo-keywords"
                              value={currentPageData.seo?.keywords || ''}
                              onChange={(e) => updatePageSEO(currentPage, 'keywords', e.target.value)}
                              placeholder="keyword1, keyword2, keyword3"
                              className="mt-1"
                            />
                          </div>
                        </div>
                      </Card>

                      {/* Add Section Button */}
                      <Card className="p-4 bg-gray-50 border-dashed border-2">
                        <div className="flex items-center gap-3">
                          <Plus className="w-5 h-5 text-gray-400" />
                          <Label className="text-sm">Nieuwe sectie toevoegen</Label>
                        </div>
                        <div className="grid grid-cols-3 gap-2 mt-3">
                          {['hero', 'content', 'stats', 'features', 'cta', 'cards', 'timeline', 'pricing', 'team', 'form'].map(type => (
                            <Button
                              key={type}
                              variant="outline"
                              size="sm"
                              onClick={() => addSection(currentPage, type as any)}
                              className="capitalize"
                            >
                              {type}
                            </Button>
                          ))}
                        </div>
                      </Card>

                      {/* Sections List */}
                      <div className="space-y-4">
                        {currentPageData.sections.length === 0 ? (
                          <Card className="p-12 text-center border-dashed">
                            <p className="text-gray-500 mb-2">Nog geen secties</p>
                            <p className="text-sm text-gray-400">
                              Voeg een sectie toe om te beginnen
                            </p>
                          </Card>
                        ) : (
                          currentPageData.sections.map((section, index) => {
                            const isExpanded = expandedSections.has(section.id);
                            
                            return (
                              <Card key={section.id} className="overflow-hidden">
                                {/* Section Header */}
                                <div className="p-4 bg-gray-50 border-b flex items-center justify-between">
                                  <div className="flex items-center gap-3 flex-1">
                                    <button
                                      onClick={() => toggleSectionExpand(section.id)}
                                      className="p-1 hover:bg-gray-200 rounded"
                                    >
                                      {isExpanded ? (
                                        <ChevronUp className="w-4 h-4" />
                                      ) : (
                                        <ChevronDown className="w-4 h-4" />
                                      )}
                                    </button>
                                    <Badge variant="secondary" className="capitalize">
                                      {section.type}
                                    </Badge>
                                    <Input
                                      value={section.title}
                                      onChange={(e) => updateSection(currentPage, section.id, { title: e.target.value })}
                                      className="flex-1 h-8 text-sm bg-white"
                                    />
                                    <span className="text-xs text-gray-500">#{index + 1}</span>
                                  </div>
                                  <div className="flex gap-1">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => duplicateSection(currentPage, section.id)}
                                      title="Dupliceer sectie"
                                    >
                                      <Copy className="w-4 h-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => deleteSection(currentPage, section.id)}
                                      title="Verwijder sectie"
                                    >
                                      <Trash2 className="w-4 h-4 text-red-500" />
                                    </Button>
                                  </div>
                                </div>

                                {/* Section Content */}
                                {isExpanded && (
                                  <div className="p-6 space-y-4">
                                    <SectionEditor
                                      section={section}
                                      onUpdate={(field, value) => 
                                        updateSectionContent(currentPage, section.id, field, value)
                                      }
                                    />
                                  </div>
                                )}
                              </Card>
                            );
                          })
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Submissions Tab */}
          <TabsContent value="submissions">
            <SubmissionsViewer />
          </TabsContent>

          {/* Company Tab */}
          <TabsContent value="company">
            <CompanySettings />
          </TabsContent>

          {/* Widgets Tab */}
          <TabsContent value="widgets">
            <WidgetSettings />
          </TabsContent>

          {/* Email Tab */}
          <TabsContent value="email">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl mb-2">Email Instellingen</h2>
                  <p className="text-gray-600">Configureer email notificaties voor contactformulieren</p>
                </div>
                <Button onClick={saveEmailSettings} className="bg-gradient-to-r from-blue-500 to-indigo-600">
                  <Save className="w-4 h-4 mr-2" />
                  Opslaan
                </Button>
              </div>

              <div className="max-w-2xl space-y-6">
                <div>
                  <Label htmlFor="emailTo">Ontvanger Email</Label>
                  <Input
                    id="emailTo"
                    type="email"
                    value={emailSettings.to}
                    onChange={(e) => setEmailSettings({ ...emailSettings, to: e.target.value })}
                    placeholder="info@systeemlink.nl"
                    className="mt-1"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Hoofdemail voor alle contactformulier berichten
                  </p>
                </div>

                <div>
                  <Label htmlFor="emailSubject">Email Onderwerp</Label>
                  <Input
                    id="emailSubject"
                    value={emailSettings.subject}
                    onChange={(e) => setEmailSettings({ ...emailSettings, subject: e.target.value })}
                    placeholder="Nieuw contactformulier bericht"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="emailReplyTo">Reply-To Adres</Label>
                  <Input
                    id="emailReplyTo"
                    type="email"
                    value={emailSettings.replyTo}
                    onChange={(e) => setEmailSettings({ ...emailSettings, replyTo: e.target.value })}
                    placeholder="noreply@systeemlink.nl"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="emailCc">CC Adressen (komma gescheiden)</Label>
                  <Input
                    id="emailCc"
                    value={emailSettings.ccEmails.join(', ')}
                    onChange={(e) => setEmailSettings({
                      ...emailSettings,
                      ccEmails: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                    })}
                    placeholder="manager@systeemlink.nl, support@systeemlink.nl"
                    className="mt-1"
                  />
                </div>

                <Card className="p-4 bg-blue-50 border-blue-200">
                  <p className="text-sm text-blue-900">
                    💡 <strong>Opmerking:</strong> In deze demo worden emails niet daadwerkelijk verzonden. 
                    In productie koppel je dit aan SendGrid, Mailgun, of AWS SES.
                  </p>
                </Card>
              </div>
            </Card>
          </TabsContent>

          {/* Styling Tab */}
          <TabsContent value="styling">
            <Card className="p-6">
              <h2 className="text-2xl mb-6">Kleurenschema's</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: 'Sky Blue', gradient: 'from-sky-500 to-blue-600', color: '#0ea5e9', pages: 'Werkplekbeheer, Contact' },
                  { name: 'Indigo', gradient: 'from-indigo-500 to-indigo-600', color: '#6366f1', pages: 'Cloud & Microsoft 365, Oplossingen' },
                  { name: 'Violet', gradient: 'from-violet-500 to-violet-600', color: '#8b5cf6', pages: 'Netwerk & Beveiliging, Partners' },
                  { name: 'Emerald', gradient: 'from-emerald-500 to-emerald-600', color: '#10b981', pages: 'IT-Support, Over Ons' },
                  { name: 'Pink', gradient: 'from-pink-500 to-pink-600', color: '#ec4899', pages: 'Vacatures' },
                  { name: 'Blue', gradient: 'from-blue-500 to-blue-600', color: '#3b82f6', pages: 'Zakelijke Dienstverlening' }
                ].map((theme) => (
                  <Card key={theme.name} className={`p-6 bg-gradient-to-br ${theme.gradient} text-white`}>
                    <h3 className="text-xl mb-2">{theme.name}</h3>
                    <p className="text-sm opacity-90 mb-3">{theme.pages}</p>
                    <code className="text-xs bg-white/20 px-2 py-1 rounded">{theme.color}</code>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card className="p-6">
              <h2 className="text-2xl mb-6">Instellingen</h2>
              <div className="max-w-2xl space-y-6">
                <div>
                  <h3 className="text-lg mb-4">Data Beheer</h3>
                  <div className="flex flex-wrap gap-3">
                    <Button onClick={exportData} variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Exporteer alle data
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        if (confirm('Weet je zeker dat je wilt resetten naar originele content?')) {
                          setPageData(initialCMSContent);
                          localStorage.setItem('cms_pages_data', JSON.stringify(initialCMSContent));
                          toast.success('Content gereset naar origineel');
                        }
                      }}
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Reset naar origineel
                    </Button>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <h3 className="text-lg mb-2">Statistieken</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="p-4 bg-gray-50">
                      <p className="text-3xl mb-1">{Object.keys(pageData).length}</p>
                      <p className="text-sm text-gray-600">Totaal pagina's</p>
                    </Card>
                    <Card className="p-4 bg-gray-50">
                      <p className="text-3xl mb-1">
                        {Object.values(pageData).reduce((acc, page) => acc + page.sections.length, 0)}
                      </p>
                      <p className="text-sm text-gray-600">Totaal secties</p>
                    </Card>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}