import { 
  CheckCircle2, 
  Search, 
  FileText, 
  Presentation, 
  Zap, 
  Users, 
  Building2, 
  Monitor, 
  Cloud, 
  Server, 
  Shield, 
  Database, 
  Lock, 
  TrendingUp, 
  Wifi, 
  Globe,
  HardDrive,
  Mail,
  Smartphone,
  AlertTriangle,
  Target
} from 'lucide-react';
import { ScanWizard } from '../ScanWizard';
import { SEO } from '../SEO';
import { PageHero, ContentSection, FeatureSection } from '../sections';
import { AnimatedSection } from '../AnimatedSection';

export function ITCheckPage() {
  const questions = [
    {
      id: 'employees',
      question: 'Hoeveel medewerkers heeft uw organisatie?',
      description: 'Dit helpt ons de juiste IT-oplossing voor te stellen',
      options: [
        { value: '1-10', label: '1-10 medewerkers', icon: Users },
        { value: '11-50', label: '11-50 medewerkers', icon: Users },
        { value: '51-100', label: '51-100 medewerkers', icon: Building2 },
        { value: '100+', label: 'Meer dan 100 medewerkers', icon: Building2 }
      ]
    },
    {
      id: 'industry',
      question: 'In welke branche is uw organisatie actief?',
      description: 'Verschillende branches hebben verschillende IT-behoeften',
      options: [
        { value: 'retail', label: 'Retail & E-commerce', icon: Building2 },
        { value: 'logistics', label: 'Logistiek & Transport', icon: TrendingUp },
        { value: 'construction', label: 'Bouw & Industrie', icon: Building2 },
        { value: 'healthcare', label: 'Zorg & Welzijn', icon: Shield },
        { value: 'education', label: 'Onderwijs', icon: FileText },
        { value: 'business-services', label: 'Zakelijke dienstverlening', icon: Users },
        { value: 'other', label: 'Overig', icon: Globe }
      ]
    },
    {
      id: 'infrastructure',
      question: 'Waar draait uw IT-infrastructuur momenteel?',
      description: 'We analyseren uw huidige omgeving en migratiemogelijkheden',
      options: [
        { value: 'on-premise', label: 'Volledig on-premise (eigen servers)', icon: Server },
        { value: 'hybrid', label: 'Hybride (deels cloud, deels on-premise)', icon: Cloud },
        { value: 'cloud-basic', label: 'Cloud (basis setup)', icon: Cloud },
        { value: 'cloud-advanced', label: 'Cloud (volledig geoptimaliseerd)', icon: Zap }
      ]
    },
    {
      id: 'data-volume',
      question: 'Hoeveel data beheert uw organisatie?',
      description: 'Dit bepaalt de juiste storage en backup oplossing',
      options: [
        { value: 'small', label: 'Minder dan 1TB', icon: Database },
        { value: 'medium', label: '1-10TB', icon: Database },
        { value: 'large', label: '10-50TB', icon: HardDrive },
        { value: 'enterprise', label: 'Meer dan 50TB', icon: Server }
      ]
    },
    {
      id: 'office-version',
      question: 'Welke Office omgeving gebruikt u momenteel?',
      description: 'We analyseren migratiemogelijkheden naar Microsoft 365',
      options: [
        { value: 'office365', label: 'Microsoft 365', icon: Cloud },
        { value: 'office-old', label: 'Oudere Office versie (2016/2019)', icon: Monitor },
        { value: 'google', label: 'Google Workspace', icon: Globe },
        { value: 'mixed', label: 'Gemengde omgeving', icon: Zap }
      ]
    },
    {
      id: 'remote-work',
      question: 'Hoeveel procent van uw medewerkers werkt (gedeeltelijk) remote?',
      description: 'Remote werk vereist specifieke workplace oplossingen',
      options: [
        { value: '0-25', label: '0-25% werkt remote', icon: Building2 },
        { value: '25-50', label: '25-50% werkt remote', icon: Monitor },
        { value: '50-75', label: '50-75% werkt remote', icon: Cloud },
        { value: '75-100', label: '75-100% werkt remote', icon: Smartphone }
      ]
    },
    {
      id: 'collaboration',
      question: 'Hoe werken uw medewerkers nu samen?',
      description: 'Moderne samenwerking verhoogt productiviteit',
      options: [
        { value: 'email', label: 'Voornamelijk via e-mail', icon: Mail },
        { value: 'teams-basic', label: 'Teams/Slack basis gebruik', icon: Users },
        { value: 'teams-advanced', label: 'Teams met SharePoint/OneDrive', icon: Cloud },
        { value: 'advanced', label: 'Volledig geïntegreerd (Planner, Power Apps)', icon: Zap }
      ]
    },
    {
      id: 'devices',
      question: 'Hoe worden apparaten momenteel beheerd?',
      description: 'Modern device management verhoogt security en efficiency',
      options: [
        { value: 'manual', label: 'Handmatig beheer', icon: Monitor },
        { value: 'basic-mdm', label: 'Basis MDM oplossing', icon: Shield },
        { value: 'intune', label: 'Microsoft Intune', icon: Cloud },
        { value: 'no-management', label: 'Geen centraal beheer', icon: AlertTriangle }
      ]
    },
    {
      id: 'backup',
      question: 'Hoe is uw backup en disaster recovery geregeld?',
      description: 'Cloud biedt geavanceerde backup oplossingen',
      options: [
        { value: 'manual', label: 'Handmatige backups', icon: HardDrive },
        { value: 'automated-local', label: 'Geautomatiseerd (lokaal)', icon: Database },
        { value: 'cloud-backup', label: 'Cloud backup oplossing', icon: Cloud },
        { value: 'none', label: 'Geen backup strategie', icon: AlertTriangle }
      ]
    },
    {
      id: 'security',
      question: 'Welk security niveau heeft u momenteel?',
      description: 'We beoordelen uw huidige beveiliging',
      options: [
        { value: 'basic', label: 'Basis (antivirus)', icon: Shield },
        { value: 'intermediate', label: 'Gemiddeld (firewall + antivirus)', icon: Lock },
        { value: 'advanced', label: 'Geavanceerd (MDR/SOC)', icon: Shield },
        { value: 'enterprise', label: 'Enterprise grade security', icon: Zap }
      ]
    },
    {
      id: 'network',
      question: 'Hoe is uw netwerkinfrastructuur ingericht?',
      description: 'Een solide netwerk is de basis van goede IT',
      options: [
        { value: 'basic', label: 'Basis setup (consumer router)', icon: Wifi },
        { value: 'business', label: 'Business netwerk (managed switch)', icon: Server },
        { value: 'advanced', label: 'Geavanceerd (VLAN, QoS)', icon: Shield },
        { value: 'enterprise', label: 'Enterprise (redundant, monitored)', icon: Zap }
      ]
    },
    {
      id: 'monitoring',
      question: 'Heeft u monitoring en alerting op uw IT-infrastructuur?',
      description: 'Proactieve monitoring voorkomt downtime',
      options: [
        { value: 'none', label: 'Geen monitoring', icon: AlertTriangle },
        { value: 'basic', label: 'Basis monitoring (uptime)', icon: Monitor },
        { value: 'intermediate', label: 'Gemiddeld (performance + alerts)', icon: TrendingUp },
        { value: 'advanced', label: 'Geavanceerd (24/7 SOC)', icon: Shield }
      ]
    },
    {
      id: 'scalability',
      question: 'Hoe snel groeit uw organisatie?',
      description: 'We zorgen dat uw IT meegroeit',
      options: [
        { value: 'stable', label: 'Stabiel (weinig groei)', icon: Building2 },
        { value: 'slow-growth', label: 'Langzame groei (< 10% per jaar)', icon: TrendingUp },
        { value: 'fast-growth', label: 'Snelle groei (10-30% per jaar)', icon: Zap },
        { value: 'rapid-growth', label: 'Explosieve groei (> 30% per jaar)', icon: Target }
      ]
    },
    {
      id: 'budget',
      question: 'Wat is uw geschatte maandbudget voor IT?',
      description: 'Dit helpt ons realistische aanbevelingen te doen',
      options: [
        { value: '1k', label: '€ 1.000 - € 2.500 per maand', icon: Building2 },
        { value: '2.5k', label: '€ 2.500 - € 5.000 per maand', icon: TrendingUp },
        { value: '5k', label: '€ 5.000 - € 10.000 per maand', icon: Zap },
        { value: '10k+', label: 'Meer dan € 10.000 per maand', icon: Target },
        { value: 'unknown', label: 'Nog niet bekend', icon: FileText }
      ]
    },
    {
      id: 'primary-goal',
      question: 'Wat is uw belangrijkste doel met deze IT-check?',
      description: 'We richten de analyse op uw specifieke doelstellingen',
      options: [
        { value: 'productivity', label: 'Productiviteit verhogen', icon: Zap },
        { value: 'security', label: 'Beveiliging verbeteren', icon: Shield },
        { value: 'cost', label: 'Kosten besparen', icon: TrendingUp },
        { value: 'flexibility', label: 'Flexibiliteit verhogen', icon: Cloud },
        { value: 'scalability', label: 'Schaalbaarheid verbeteren', icon: Target },
        { value: 'compliance', label: 'Compliance/AVG nakomen', icon: Lock }
      ]
    },
    {
      id: 'timeline',
      question: 'Wat is uw gewenste tijdlijn voor verbeteringen?',
      description: 'Dit bepaalt de planning en prioritering',
      options: [
        { value: 'urgent', label: 'Urgent (binnen 1 maand)', icon: AlertTriangle },
        { value: 'short', label: 'Kort (1-3 maanden)', icon: Zap },
        { value: 'medium', label: 'Middellang (3-6 maanden)', icon: TrendingUp },
        { value: 'long', label: 'Lang (6+ maanden)', icon: Building2 },
        { value: 'exploratory', label: 'Verkennend / geen haast', icon: Search }
      ]
    }
  ];

  const steps = [
    {
      icon: Search,
      title: 'Analyse',
      description: 'We onderzoeken uw huidige IT-infrastructuur en processen'
    },
    {
      icon: FileText,
      title: 'Rapportage',
      description: 'U ontvangt een gedetailleerd rapport met bevindingen'
    },
    {
      icon: Presentation,
      title: 'Adviesgesprek',
      description: 'We bespreken de resultaten en mogelijke verbeteringen'
    },
    {
      icon: CheckCircle2,
      title: 'Plan van aanpak',
      description: 'Samen stellen we een implementatieplan op'
    }
  ];

  const benefits = [
    {
      icon: CheckCircle2,
      title: 'Volledig gratis',
      description: 'Geen kosten, geen verplichtingen'
    },
    {
      icon: Search,
      title: 'Diepgaande analyse',
      description: 'Alle aspecten van uw IT worden doorgelicht'
    },
    {
      icon: FileText,
      title: 'Duidelijk rapport',
      description: 'Begrijpelijke rapportage met aanbevelingen'
    },
    {
      icon: Zap,
      title: 'Snel resultaat',
      description: 'Binnen 2 werkdagen heeft u het rapport'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <SEO
        title="Gratis IT-check - Ontdek verbeterpunten in uw IT | Systeemlink"
        description="Vraag een gratis en vrijblijvende IT-check aan. We analyseren uw infrastructuur en geven advies over mogelijke verbeteringen en kostenbesparingen."
        keywords="gratis IT-check, IT-scan, IT-analyse, infrastructuur audit, security scan, IT-advies"
        canonical="https://systeemlink.nl/it-check"
      />

      {/* Hero Header */}
      <section className="relative bg-gradient-to-br from-emerald-600 via-teal-700 to-cyan-800 text-white overflow-hidden">
        <div className="pt-[160px] md:pt-[168px] pb-12">
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-sm">Gratis & vrijblijvend</span>
            </div>
            <h1 className="text-4xl md:text-5xl mb-4">Uitgebreide IT-Check</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Ontdek in 16 stappen verbeterpunten, bespaarmogelijkheden en security risico's in uw IT-infrastructuur
            </p>
          </div>
        </div>
      </section>

      {/* What we check - Info Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fade-up">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl lg:text-5xl mb-6">
                Wat checken we?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Een complete doorlichting van uw IT-omgeving op 16 essentiële punten
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { icon: Wifi, text: 'Netwerkinfrastructuur', color: 'text-sky-600' },
              { icon: Shield, text: 'Security & beveiliging', color: 'text-violet-600' },
              { icon: Database, text: 'Backup & disaster recovery', color: 'text-indigo-600' },
              { icon: Monitor, text: 'Werkplekbeheer', color: 'text-blue-600' },
              { icon: Cloud, text: 'Cloud & Microsoft 365', color: 'text-cyan-600' },
              { icon: Lock, text: 'Compliance & AVG', color: 'text-emerald-600' },
              { icon: TrendingUp, text: 'Performance & monitoring', color: 'text-teal-600' },
              { icon: Target, text: 'Schaalbaarheid & groei', color: 'text-green-600' }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <AnimatedSection key={index} animation="fade-up" delay={index * 0.05}>
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700">
                    <Icon className={`w-8 h-8 ${item.color} mb-3`} />
                    <p className="text-sm">{item.text}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fade-up">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 px-4 py-2 rounded-full mb-4">
                <Zap className="w-4 h-4" />
                <span className="text-sm">Hoe werkt het?</span>
              </div>
              <h2 className="text-3xl lg:text-5xl mb-6">
                Het IT-check proces
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                In 4 eenvoudige stappen naar volledige inzicht
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <AnimatedSection key={index} animation="fade-up" delay={index * 0.1}>
                  <div className="text-center">
                    <div className="relative inline-flex items-center justify-center w-16 h-16 mb-4">
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-2xl rotate-6"></div>
                      <div className="relative bg-gradient-to-br from-emerald-500 to-teal-600 w-14 h-14 rounded-xl flex items-center justify-center">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                    </div>
                    <div className="text-sm text-emerald-600 dark:text-emerald-400 mb-2">Stap {index + 1}</div>
                    <h3 className="text-xl mb-2">{step.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{step.description}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fade-up">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 px-4 py-2 rounded-full mb-4">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-sm">De voordelen</span>
              </div>
              <h2 className="text-3xl lg:text-5xl mb-6">
                Waarom een IT-check?
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <AnimatedSection key={index} animation="scale-up" delay={index * 0.1}>
                  <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-emerald-100 dark:border-emerald-900/50">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg mb-2">{benefit.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{benefit.description}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Wizard */}
      <ScanWizard
        title="Uitgebreide IT-Check"
        description="Beantwoord 16 vragen en ontvang een gratis en gedetailleerde analyse van uw IT-infrastructuur"
        icon={CheckCircle2}
        theme={{
          gradient: 'bg-gradient-to-br from-emerald-600 to-teal-700',
          badge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
          button: 'bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white',
          progress: 'bg-gradient-to-r from-emerald-500 to-teal-600',
          option: 'bg-gradient-to-br from-emerald-600 to-teal-700',
          optionHover: 'hover:border-emerald-300 hover:shadow-lg'
        }}
        questions={questions}
      />
    </div>
  );
}
