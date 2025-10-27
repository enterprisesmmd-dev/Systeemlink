import { Scale, FileText, Lock, TrendingUp, Users, Shield, CheckCircle2, Award } from 'lucide-react';
import { SEO } from '../SEO';
import { StatsBar } from '../StatsBar';
import { PageHero, ContentSection, GridSection, CTASection, FeatureSection } from '../sections';

export function BusinessServicesPage() {
  const services = [
    {
      icon: Scale,
      title: 'Advocatenkantoren',
      description: 'Veilige documentbeheer en AVG-conforme IT-oplossingen voor juridische dienstverlening',
      features: ['DMS integratie', 'Dossier beveiliging', 'Cliëntportalen']
    },
    {
      icon: FileText,
      title: 'Accountancy',
      description: 'Gespecialiseerde IT voor accountants met focus op beveiliging en compliance',
      features: ['ISAE 3402 ondersteuning', 'Secure file sharing', 'Audit trails']
    },
    {
      icon: Lock,
      title: 'Consultancy',
      description: 'Flexibele IT voor consultants die altijd en overal moeten kunnen werken',
      features: ['Mobile werkplekken', 'VPN toegang', 'Collaboration tools']
    },
    {
      icon: Shield,
      title: 'Financiële dienstverlening',
      description: 'Hoge beveiligingseisen en strikte compliance voor financiële sector',
      features: ['PCI-DSS compliance', 'Encrypted communication', 'Multi-factor authenticatie']
    }
  ];

  const benefits = [
    { icon: Lock, title: 'Compliance & Security', description: 'AVG, ISAE 3402 en branche-specifieke eisen' },
    { icon: Users, title: 'Client portals', description: 'Veilig documenten delen met klanten' },
    { icon: TrendingUp, title: 'Productiviteit', description: 'Werken van overal met veilige toegang' },
    { icon: CheckCircle2, title: '99.9% Uptime', description: 'Maximale beschikbaarheid voor uw dienstverlening' }
  ];

  return (
    <div>
      <SEO
        title="IT voor Zakelijke Dienstverlening - Advocaten, Accountants | Systeemlink"
        description="Gespecialiseerde IT-oplossingen voor zakelijke dienstverlening. AVG-compliant, veilig documentbeheer en cliëntportalen voor advocaten en accountants."
        keywords="IT advocatenkantoor, accountancy IT, consultancy IT, zakelijke dienstverlening IT, DMS, AVG compliance"
        canonical="https://systeemlink.nl/branches/zakelijke-dienstverlening"
      />

      <PageHero
        breadcrumbs={[
          { label: 'Branches', path: '/branches' },
          { label: 'Zakelijke dienstverlening', path: '/branches/zakelijke-dienstverlening' }
        ]}
        badge={{ text: 'Zakelijke dienstverlening' }}
        title="IT-oplossingen voor professionele dienstverleners"
        description="Veilige en conforme IT voor advocaten, accountants, consultants en financiële dienstverleners. Wij begrijpen uw specifieke uitdagingen."
        gradient="from-blue-600 via-blue-700 to-indigo-800"
        buttons={[
          { text: 'Neem contact op', link: '/bedrijfsinformatie/contact', variant: 'primary' },
          { text: 'Gratis IT-check', link: '/it-check', variant: 'secondary' }
        ]}
      />

      <StatsBar />

      <ContentSection
        badge={{ text: 'Onze diensten' }}
        title="IT-oplossingen voor uw sector"
        description="Specialist in zakelijke dienstverlening"
        background="white"
      >
        <GridSection items={services} columns={2} variant="icon" />
      </ContentSection>

      <ContentSection
        badge={{ text: 'De voordelen' }}
        title="Waarom Systeemlink voor zakelijke dienstverlening?"
        description="Expertise in compliance en beveiliging"
        background="gray"
      >
        <FeatureSection items={benefits} columns={4} variant="grid" />
      </ContentSection>

      <CTASection
        badge={{ text: 'Sector expertise' }}
        title="Ontdek wat we voor uw kantoor kunnen betekenen"
        description="Plan een vrijblijvend gesprek en ontdek hoe we andere advocaten en accountants helpen."
        gradient="from-blue-600 via-blue-700 to-indigo-800"
        buttons={[
          { text: 'Plan een gesprek', link: '/bedrijfsinformatie/contact', variant: 'primary' },
          { text: 'Gratis IT-check', link: '/it-check', variant: 'secondary' }
        ]}
      />
    </div>
  );
}