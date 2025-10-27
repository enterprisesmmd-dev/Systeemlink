import { Monitor, Users, Cloud, Shield, Zap, Building2 } from 'lucide-react';
import { ScanWizard } from '../ScanWizard';
import { SEO } from '../SEO';

export function WorkplaceScanPage() {
  const questions = [
    {
      id: 'employees',
      question: 'Hoeveel medewerkers heeft uw organisatie?',
      description: 'Dit helpt ons de juiste oplossing voor te stellen',
      options: [
        { value: '1-10', label: '1-10 medewerkers', icon: Users },
        { value: '11-50', label: '11-50 medewerkers', icon: Users },
        { value: '51-100', label: '51-100 medewerkers', icon: Building2 },
        { value: '100+', label: 'Meer dan 100 medewerkers', icon: Building2 }
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
        { value: '75-100', label: '75-100% werkt remote', icon: Cloud }
      ]
    },
    {
      id: 'office-version',
      question: 'Welke Office omgeving gebruikt u momenteel?',
      description: 'We analyseren migratiemogelijkheden naar Microsoft 365',
      options: [
        { value: 'office365', label: 'Microsoft 365', icon: Cloud },
        { value: 'office-old', label: 'Oudere Office versie (2016/2019)', icon: Monitor },
        { value: 'google', label: 'Google Workspace', icon: Cloud },
        { value: 'mixed', label: 'Gemengde omgeving', icon: Zap }
      ]
    },
    {
      id: 'collaboration',
      question: 'Hoe werken uw medewerkers nu samen?',
      description: 'Moderne samenwerking verhoogt productiviteit',
      options: [
        { value: 'email', label: 'Voornamelijk via e-mail', icon: Monitor },
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
        { value: 'no-management', label: 'Geen centraal beheer', icon: Users }
      ]
    },
    {
      id: 'priority',
      question: 'Wat is uw belangrijkste prioriteit?',
      description: 'We richten de scan op uw specifieke doelen',
      options: [
        { value: 'productivity', label: 'Productiviteit verhogen', icon: Zap },
        { value: 'security', label: 'Beveiliging verbeteren', icon: Shield },
        { value: 'cost', label: 'Kosten besparen', icon: Building2 },
        { value: 'flexibility', label: 'Flexibel werken mogelijk maken', icon: Cloud }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <SEO 
        title="Modern Workplace Scan - Optimaliseer uw digitale werkplek | Systeemlink"
        description="Gratis Modern Workplace scan. Ontdek hoe u met Microsoft 365, Teams en moderne samenwerking de productiviteit verhoogt."
        keywords="modern workplace scan, microsoft 365, teams, digitale werkplek, productiviteit"
        canonical="https://systeemlink.nl/scan/modern-workplace"
      />

      {/* Hero Header */}
      <section className="relative bg-gradient-to-br from-sky-600 via-sky-700 to-blue-800 text-white overflow-hidden">
        <div className="pt-[160px] md:pt-[168px] pb-12">
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl mb-4">Modern Workplace Scan</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Ontdek in 6 stappen hoe uw organisatie optimaal kan profiteren van moderne workplace technologie
            </p>
          </div>
        </div>
      </section>

      <ScanWizard
        title="Modern Workplace Scan"
        description="Beantwoord 6 korte vragen en ontvang een gratis analyse van uw digitale werkplek"
        icon={Monitor}
        theme={{
          gradient: 'bg-gradient-to-br from-sky-600 to-blue-800',
          badge: 'bg-sky-100 text-sky-800 border-sky-200',
          button: 'bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-700 hover:to-blue-800 text-white',
          progress: 'bg-gradient-to-r from-sky-500 to-blue-600',
          option: 'bg-gradient-to-br from-sky-600 to-blue-700',
          optionHover: 'hover:border-sky-300 hover:shadow-lg'
        }}
        questions={questions}
      />
    </div>
  );
}