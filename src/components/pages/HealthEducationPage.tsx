import { Heart, GraduationCap, Shield, Lock, Users, Cloud, CheckCircle2, Award } from 'lucide-react';
import { SEO } from '../SEO';
import { StatsBar } from '../StatsBar';
import { PageHero, ContentSection, GridSection, CTASection, FeatureSection } from '../sections';

export function HealthEducationPage() {
  const services = [
    {
      icon: Heart,
      title: 'Zorginstellingen',
      description: 'NEN 7510 compliant IT voor ziekenhuizen, klinieken en zorginstellingen',
      features: ['NEN 7510 compliance', 'EPD integratie', 'Privacy waarborging']
    },
    {
      icon: GraduationCap,
      title: 'Onderwijsinstellingen',
      description: 'Veilige leeromgevingen voor scholen, universiteiten en opleidingscentra',
      features: ['Student management', 'Digital learning', 'Ouderportalen']
    },
    {
      icon: Shield,
      title: 'Privacy & Security',
      description: 'Hoogste beveiligingsniveau voor gevoelige patiënt- en studentgegevens',
      features: ['Data encryption', 'Access control', 'Audit logging']
    },
    {
      icon: Cloud,
      title: 'Cloud oplossingen',
      description: 'Betrouwbare cloud oplossingen voor zorg en onderwijs',
      features: ['Cloud storage', 'Cloud computing', 'Cloud security']
    }
  ];

  const benefits = [
    { icon: Lock, title: 'NEN 7510 compliant', description: 'Volledig gecertificeerd voor zorg IT' },
    { icon: CheckCircle2, title: '99.9% Beschikbaarheid', description: 'Kritieke systemen altijd online' },
    { icon: Users, title: 'Gedragscode gegarandeerd', description: 'Personeel met privacy awareness' },
    { icon: Award, title: 'AVG-proof', description: 'Privacy by design' }
  ];

  return (
    <div>
      <SEO
        title="IT voor Zorg & Onderwijs - NEN 7510 compliant | Systeemlink"
        description="Gespecialiseerde IT voor zorg en onderwijs. NEN 7510 compliant, AVG-proof en betrouwbaar. EPD integratie en digitale leeromgevingen."
        keywords="zorg IT, onderwijs IT, NEN 7510, EPD, digitaal leren, privacy zorg, AVG compliance onderwijs"
        canonical="https://systeemlink.nl/branches/zorg-onderwijs"
      />

      <PageHero
        breadcrumbs={[
          { label: 'Branches', path: '/branches' },
          { label: 'Zorg & onderwijs', path: '/branches/zorg-onderwijs' }
        ]}
        badge={{ text: 'Zorg & Onderwijs' }}
        title="Veilige IT voor zorg en onderwijs"
        description="NEN 7510 compliant IT-oplossingen voor zorginstellingen en onderwijsinstellingen. Privacy en beveiliging staan voorop."
        gradient="from-emerald-600 via-green-700 to-teal-800"
        buttons={[
          { text: 'Neem contact op', link: '/bedrijfsinformatie/contact', variant: 'primary' },
          { text: 'Gratis security scan', link: '/it-check', variant: 'secondary' }
        ]}
      />

      <StatsBar />

      <ContentSection
        badge={{ text: 'Onze diensten' }}
        title="IT-oplossingen voor zorg en onderwijs"
        description="Specialist in NEN 7510 en AVG compliance"
        background="white"
      >
        <GridSection items={services} columns={2} variant="icon" />
      </ContentSection>

      <ContentSection
        badge={{ text: 'Waarom Systeemlink' }}
        title="Betrouwbare IT-partner voor zorg en onderwijs"
        description="Expertise in compliance en beveiliging"
        background="gray"
      >
        <FeatureSection items={benefits} columns={4} variant="grid" />
      </ContentSection>

      <CTASection
        badge={{ text: 'NEN 7510 expertise' }}
        title="Ontdek wat we voor uw instelling kunnen betekenen"
        description="Plan een vrijblijvend gesprek en ontdek hoe we andere zorginstellingen en scholen helpen."
        gradient="from-emerald-600 via-green-700 to-teal-800"
        buttons={[
          { text: 'Plan een gesprek', link: '/bedrijfsinformatie/contact', variant: 'primary' },
          { text: 'Security scan', link: '/it-check', variant: 'secondary' }
        ]}
      />
    </div>
  );
}