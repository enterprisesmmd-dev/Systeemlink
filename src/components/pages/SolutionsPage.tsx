import { Laptop, Cloud, Shield, Headset, CheckCircle2, Zap } from 'lucide-react';
import { SEO } from '../SEO';
import { StatsBar } from '../StatsBar';
import { PageHero, ContentSection, GridSection, CTASection, FeatureSection } from '../sections';
import { pageColors, serviceBoxColors } from '../../lib/theme-colors';

export function SolutionsPage() {
  const themeColor = pageColors.solutions;

  const solutions = [
    {
      icon: Laptop,
      title: 'Werkplekbeheer',
      description: 'Volledig beheer van computers en software met preventief onderhoud, automatische updates en 24/7 monitoring.',
      link: '/oplossingen/werkplekbeheer',
      features: ['Hardware monitoring', 'Automatische updates', 'Endpoint protection'],
      color: serviceBoxColors[0].bg
    },
    {
      icon: Cloud,
      title: 'Cloud & Microsoft 365',
      description: 'Veilig samenwerken vanuit elke locatie met Microsoft 365. Wij verzorgen migratie, implementatie en volledig beheer.',
      link: '/oplossingen/cloud-microsoft-365',
      features: ['Microsoft 365 beheer', 'Cloud migratie', 'SharePoint & Teams'],
      color: serviceBoxColors[1].bg
    },
    {
      icon: Shield,
      title: 'Netwerk & Beveiliging',
      description: 'Enterprise security met next-gen firewalls, VPN, 24/7 monitoring en compliance ondersteuning tegen alle dreigingen.',
      link: '/oplossingen/netwerk-beveiliging',
      features: ['Firewall beheer', '24/7 SOC', 'Penetration testing'],
      color: serviceBoxColors[2].bg
    },
    {
      icon: Headset,
      title: 'IT-Support & Monitoring',
      description: 'Snelle, betrouwbare support via telefoon, email en chat. Proactieve monitoring voorkomt problemen.',
      link: '/oplossingen/it-support',
      features: ['Helpdesk 24/7', 'Proactieve monitoring', 'On-site support'],
      color: serviceBoxColors[3].bg
    }
  ];

  const benefits = [
    {
      icon: CheckCircle2,
      title: 'Één aanspreekpunt voor al uw IT-diensten',
      description: 'Alles onder één dak, geen gedoe met meerdere leveranciers'
    },
    {
      icon: CheckCircle2,
      title: 'Vaste maandelijkse kosten, geen verrassingen',
      description: 'Transparante prijzen en heldere SLA afspraken'
    },
    {
      icon: CheckCircle2,
      title: 'Proactief beheer voorkomt storingen',
      description: '24/7 monitoring en onderhoud voor maximale uptime'
    },
    {
      icon: CheckCircle2,
      title: 'Moderne technologie zonder grote investeringen',
      description: 'Altijd up-to-date zonder kapitaaluitgaven'
    },
    {
      icon: CheckCircle2,
      title: 'Gecertificeerde specialisten',
      description: 'Ervaren engineers met Microsoft, Cisco en FortiGate certificeringen'
    },
    {
      icon: CheckCircle2,
      title: 'Transparante rapportages en inzichten',
      description: 'Maandelijkse rapportages over performance en incidenten'
    }
  ];

  return (
    <div>
      <SEO
        title="IT-Oplossingen voor bedrijven | Systeemlink"
        description="Complete IT-oplossingen: werkplekbeheer, cloud services, cybersecurity en 24/7 support. Betrouwbare IT-partner voor het MKB in Nederland."
        keywords="IT-oplossingen, managed services, werkplekbeheer, cloud services, IT-security, IT-support, MKB IT, bedrijfs IT"
        canonical="https://systeemlink.nl/oplossingen"
      />

      <PageHero
        badge={{ text: 'Managed IT Services' }}
        title="Complete IT-oplossingen voor uw bedrijf"
        description="Van werkplekbeheer tot cybersecurity - wij ontzorgen uw IT volledig. Focus op uw core business, wij regelen de technologie."
        gradient={themeColor.gradient}
        buttons={[
          { text: 'Contact opnemen', link: '/bedrijfsinformatie/contact', variant: 'secondary' },
          { text: 'Start met IT-check', link: '/it-check', variant: 'secondary' }
        ]}
      />

      <StatsBar />

      <ContentSection
        title="Onze IT-oplossingen"
        description="Professionele IT-diensten die uw bedrijf laten groeien"
        background="white"
      >
        <GridSection items={solutions} columns={2} variant="icon" />
      </ContentSection>

      <ContentSection
        badge={{ text: 'Waarom Systeemlink' }}
        title="De voordelen van managed IT-services"
        description="Focus op uw bedrijf, wij zorgen voor de IT"
        background="gray"
      >
        <FeatureSection items={benefits} columns={3} variant="grid" />
      </ContentSection>

      <CTASection
        badge={{ text: 'Gratis & vrijblijvend' }}
        title="Klaar om uw IT te transformeren?"
        description="Plan een vrijblijvende IT-scan en ontdek hoe wij uw bedrijf kunnen helpen groeien."
        variant="card"
        buttons={[
          { text: 'Gratis IT-scan aanvragen', link: '/it-check', variant: 'primary', icon: Zap },
          { text: 'Contact opnemen', link: '/bedrijfsinformatie/contact', variant: 'secondary' }
        ]}
      />
    </div>
  );
}