import { HardHat, Cpu, Shield, Users, Smartphone, Cloud, CheckCircle2, Award } from 'lucide-react';
import { SEO } from '../SEO';
import { StatsBar } from '../StatsBar';
import { PageHero, ContentSection, GridSection, CTASection, FeatureSection } from '../sections';

export function ConstructionPage() {
  const services = [
    {
      icon: HardHat,
      title: 'Bouwbedrijven',
      description: 'Robuuste IT-oplossingen voor bouwlocaties met mobiele werkplekken',
      features: ['Mobile werkplekken', 'Projectmanagement tools', '4G/5G connectivity']
    },
    {
      icon: Cpu,
      title: 'Industrie & Productie',
      description: 'Betrouwbare IT voor productiebedrijven met focus op uptime',
      features: ['MES integratie', 'OT/IT convergence', 'Industrial IoT']
    },
    {
      icon: Shield,
      title: 'CAD & BIM',
      description: 'Krachtige workstations en servers voor zware engineering software',
      features: ['CAD workstations', 'BIM collaboration', 'High-performance computing']
    },
    {
      icon: Cloud,
      title: 'Locatie-onafhankelijk werken',
      description: 'Veilige toegang tot systemen vanaf bouwlocaties en kantoor',
      features: ['VPN toegang', 'Cloud services', 'Mobile device management']
    }
  ];

  const benefits = [
    { icon: Smartphone, title: 'Mobile first', description: 'Werken vanaf elke locatie' },
    { icon: Shield, title: 'Robuuste systemen', description: 'Bestand tegen zware omstandigheden' },
    { icon: Award, title: 'Productiviteit', description: 'Efficiënt werken op locatie' },
    { icon: CheckCircle2, title: 'Betrouwbaar', description: 'Minimale downtime' }
  ];

  return (
    <div>
      <SEO
        title="IT voor Bouw & Industrie - Robuuste oplossingen | Systeemlink"
        description="Gespecialiseerde IT voor bouw en industrie. Mobile werkplekken, CAD/BIM ondersteuning en robuuste systemen voor productieomgevingen."
        keywords="bouw IT, industrie IT, CAD BIM, mobile werkplekken, productie IT, engineering IT"
        canonical="https://systeemlink.nl/branches/bouw-industrie"
      />

      <PageHero
        breadcrumbs={[
          { label: 'Branches', path: '/branches' },
          { label: 'Bouw & industrie', path: '/branches/bouw-industrie' }
        ]}
        badge={{ text: 'Bouw & Industrie' }}
        title="IT-oplossingen voor bouw en industrie"
        description="Robuuste IT-infrastructuur voor bouwbedrijven, productie en technische dienstverlening. Mobiel werken en krachtige engineering systemen."
        gradient="from-red-600 via-orange-700 to-amber-800"
        buttons={[
          { text: 'Neem contact op', link: '/bedrijfsinformatie/contact', variant: 'primary' },
          { text: 'Gratis IT-check', link: '/it-check', variant: 'secondary' }
        ]}
      />

      <StatsBar />

      <ContentSection
        badge={{ text: 'Onze diensten' }}
        title="IT-oplossingen voor bouw en industrie"
        description="Specialist in robuuste en mobiele IT"
        background="white"
      >
        <GridSection items={services} columns={2} variant="icon" />
      </ContentSection>

      <ContentSection
        badge={{ text: 'De voordelen' }}
        title="Waarom Systeemlink voor bouw en industrie?"
        description="Robuuste IT die meebeweegt met uw bedrijf"
        background="gray"
      >
        <FeatureSection items={benefits} columns={4} variant="grid" />
      </ContentSection>

      <CTASection
        badge={{ text: 'Sector expertise' }}
        title="Ontdek wat we voor uw bedrijf kunnen betekenen"
        description="Plan een vrijblijvend gesprek en ontdek hoe we andere bouw en industriebedrijven helpen."
        gradient="from-red-600 via-orange-700 to-amber-800"
        buttons={[
          { text: 'Plan een gesprek', link: '/bedrijfsinformatie/contact', variant: 'primary' },
          { text: 'Gratis IT-check', link: '/it-check', variant: 'secondary' }
        ]}
      />
    </div>
  );
}