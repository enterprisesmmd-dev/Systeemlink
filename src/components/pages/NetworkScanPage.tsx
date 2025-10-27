import { Shield, Lock, Wifi, AlertTriangle, Eye, ShieldCheck } from 'lucide-react';
import { ScanWizard } from '../ScanWizard';
import { SEO } from '../SEO';

export function NetworkScanPage() {
  const questions = [
    {
      id: 'current-security',
      question: 'Welke beveiligingsmaatregelen heeft u momenteel?',
      description: 'We beoordelen uw huidige security posture',
      options: [
        { value: 'basic', label: 'Basis (antivirus, Windows Firewall)', icon: Shield },
        { value: 'firewall', label: 'Firewall + antivirus', icon: Lock },
        { value: 'advanced', label: 'Firewall + antivirus + monitoring', icon: ShieldCheck },
        { value: 'enterprise', label: 'Enterprise security (SIEM, EDR)', icon: Eye }
      ]
    },
    {
      id: 'network-size',
      question: 'Hoeveel apparaten zijn verbonden met uw netwerk?',
      description: 'Dit bepaalt de complexiteit van uw netwerk',
      options: [
        { value: 'small', label: 'Minder dan 25 apparaten', icon: Wifi },
        { value: 'medium', label: '25-100 apparaten', icon: Wifi },
        { value: 'large', label: '100-500 apparaten', icon: Shield },
        { value: 'enterprise', label: 'Meer dan 500 apparaten', icon: ShieldCheck }
      ]
    },
    {
      id: 'remote-access',
      question: 'Hoe regelt u remote toegang tot uw netwerk?',
      description: 'Veilige remote access is cruciaal voor moderne organisaties',
      options: [
        { value: 'none', label: 'Geen remote access', icon: Lock },
        { value: 'vpn-basic', label: 'Basis VPN', icon: Shield },
        { value: 'vpn-advanced', label: 'Enterprise VPN met MFA', icon: ShieldCheck },
        { value: 'zero-trust', label: 'Zero Trust Network Access', icon: Eye }
      ]
    },
    {
      id: 'incidents',
      question: 'Heeft u recent security incidenten gehad?',
      description: 'Dit helpt ons kwetsbaarheden te identificeren',
      options: [
        { value: 'none', label: 'Geen incidenten', icon: ShieldCheck },
        { value: 'minor', label: 'Kleine incidenten (spam, phishing)', icon: AlertTriangle },
        { value: 'major', label: 'Ernstige incidenten (malware, ransomware)', icon: AlertTriangle },
        { value: 'unknown', label: 'Weet ik niet / geen monitoring', icon: Eye }
      ]
    },
    {
      id: 'compliance',
      question: 'Welke compliance eisen gelden voor uw organisatie?',
      description: 'We zorgen dat uw beveiliging voldoet aan regelgeving',
      options: [
        { value: 'none', label: 'Geen specifieke eisen', icon: Shield },
        { value: 'avg', label: 'AVG (GDPR)', icon: Lock },
        { value: 'nen7510', label: 'NEN 7510 (zorg)', icon: ShieldCheck },
        { value: 'iso27001', label: 'ISO 27001 / meerdere', icon: Eye }
      ]
    },
    {
      id: 'priority',
      question: 'Wat is uw grootste security zorg?',
      description: 'We richten de scan op uw belangrijkste uitdagingen',
      options: [
        { value: 'ransomware', label: 'Ransomware / malware', icon: AlertTriangle },
        { value: 'data-loss', label: 'Dataverlies / datalekken', icon: Lock },
        { value: 'downtime', label: 'Netwerk downtime', icon: Wifi },
        { value: 'compliance', label: 'Compliance / AVG', icon: ShieldCheck }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <SEO 
        title="Security Scan - Hoe veilig is uw netwerk? | Systeemlink"
        description="Gratis Security Scan. Ontdek kwetsbaarheden in uw netwerk voordat hackers dat doen. ✓ Firewall ✓ VPN ✓ Monitoring"
        keywords="security scan, netwerkbeveiliging, firewall scan, penetratietest, security audit"
        canonical="https://systeemlink.nl/scan/security"
      />

      {/* Hero Header */}
      <section className="relative bg-gradient-to-br from-violet-600 via-purple-700 to-indigo-900 text-white overflow-hidden">
        <div className="pt-[160px] md:pt-[168px] pb-12">
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl mb-4">Security Scan</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Ontdek in 6 stappen kwetsbaarheden in uw netwerk voordat hackers dat doen
            </p>
          </div>
        </div>
      </section>

      <ScanWizard
        title="Security Scan"
        description="Beantwoord 6 korte vragen en ontvang een gratis security analyse van uw netwerk"
        icon={Shield}
        theme={{
          gradient: 'bg-gradient-to-br from-violet-600 to-indigo-900',
          badge: 'bg-violet-100 text-violet-800 border-violet-200',
          button: 'bg-gradient-to-r from-violet-600 to-purple-700 hover:from-violet-700 hover:to-purple-800 text-white',
          progress: 'bg-gradient-to-r from-violet-500 to-purple-600',
          option: 'bg-gradient-to-br from-violet-600 to-purple-700',
          optionHover: 'hover:border-violet-300 hover:shadow-lg'
        }}
        questions={questions}
      />
    </div>
  );
}