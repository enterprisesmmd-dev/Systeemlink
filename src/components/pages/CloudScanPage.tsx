import { Cloud, Server, Database, Lock, Zap, TrendingUp } from 'lucide-react';
import { ScanWizard } from '../ScanWizard';
import { SEO } from '../SEO';

export function CloudScanPage() {
  const questions = [
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
      description: 'Dit bepaalt de juiste cloud storage oplossing',
      options: [
        { value: 'small', label: 'Minder dan 1TB', icon: Database },
        { value: 'medium', label: '1-10TB', icon: Database },
        { value: 'large', label: '10-50TB', icon: Server },
        { value: 'enterprise', label: 'Meer dan 50TB', icon: Server }
      ]
    },
    {
      id: 'applications',
      question: 'Welke bedrijfskritische applicaties gebruikt u?',
      description: 'We beoordelen cloud readiness van uw applicaties',
      options: [
        { value: 'standard', label: 'Standaard (Office, Email)', icon: Cloud },
        { value: 'business', label: 'Business apps (CRM, ERP)', icon: TrendingUp },
        { value: 'custom', label: 'Custom applicaties', icon: Server },
        { value: 'mixed', label: 'Mix van bovenstaande', icon: Zap }
      ]
    },
    {
      id: 'backup',
      question: 'Hoe is uw backup en disaster recovery geregeld?',
      description: 'Cloud biedt geavanceerde backup oplossingen',
      options: [
        { value: 'manual', label: 'Handmatige backups', icon: Server },
        { value: 'automated-local', label: 'Geautomatiseerd (lokaal)', icon: Database },
        { value: 'cloud-backup', label: 'Cloud backup oplossing', icon: Cloud },
        { value: 'none', label: 'Geen backup strategie', icon: Lock }
      ]
    },
    {
      id: 'scalability',
      question: 'Hoe snel groeit uw organisatie?',
      description: 'Cloud schaalt mee met uw groei',
      options: [
        { value: 'stable', label: 'Stabiel (weinig groei)', icon: Server },
        { value: 'slow-growth', label: 'Langzame groei (< 10% per jaar)', icon: TrendingUp },
        { value: 'fast-growth', label: 'Snelle groei (10-30% per jaar)', icon: Zap },
        { value: 'rapid-growth', label: 'Explosieve groei (> 30% per jaar)', icon: Cloud }
      ]
    },
    {
      id: 'cloud-goals',
      question: 'Wat wilt u bereiken met cloud?',
      description: 'We richten de scan op uw specifieke doelstellingen',
      options: [
        { value: 'cost', label: 'Kosten besparen', icon: TrendingUp },
        { value: 'flexibility', label: 'Flexibiliteit verhogen', icon: Cloud },
        { value: 'security', label: 'Beveiliging verbeteren', icon: Lock },
        { value: 'innovation', label: 'Innovatie mogelijk maken', icon: Zap }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <SEO 
        title="Cloud Readiness Scan - Is uw bedrijf klaar voor de cloud? | Systeemlink"
        description="Gratis Cloud Readiness scan. Ontdek hoe Azure, Microsoft 365 en cloud oplossingen uw bedrijf toekomstbestendig maken."
        keywords="cloud readiness scan, azure, cloud migratie, cloud strategie, microsoft cloud"
        canonical="https://systeemlink.nl/scan/cloud-readiness"
      />

      {/* Hero Header */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-indigo-700 to-blue-800 text-white overflow-hidden">
        <div className="pt-[160px] md:pt-[168px] pb-12">
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl mb-4">Cloud Readiness Scan</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Ontdek in 6 stappen hoe cloud uw bedrijf flexibeler, veiliger en efficiënter maakt
            </p>
          </div>
        </div>
      </section>

      <ScanWizard
        title="Cloud Readiness Scan"
        description="Beantwoord 6 korte vragen en ontvang een gratis cloud readiness analyse"
        icon={Cloud}
        theme={{
          gradient: 'bg-gradient-to-br from-indigo-600 to-blue-800',
          badge: 'bg-indigo-100 text-indigo-800 border-indigo-200',
          button: 'bg-gradient-to-r from-indigo-600 to-blue-700 hover:from-indigo-700 hover:to-blue-800 text-white',
          progress: 'bg-gradient-to-r from-indigo-500 to-blue-600',
          option: 'bg-gradient-to-br from-indigo-600 to-blue-700',
          optionHover: 'hover:border-indigo-300 hover:shadow-lg'
        }}
        questions={questions}
      />
    </div>
  );
}