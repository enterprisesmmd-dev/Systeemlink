import { Users, Heart, Target, Award, TrendingUp, Shield, CheckCircle2, Clock } from 'lucide-react';
import { SEO } from '../SEO';
import { StatsBar } from '../StatsBar';
import { PageHero, ContentSection, CTASection, FeatureSection } from '../sections';

export function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: 'Klantgericht',
      description: 'Uw succes is ons succes. We denken proactief mee en leveren altijd maatwerk.'
    },
    {
      icon: Shield,
      title: 'Betrouwbaar',
      description: 'Transparante communicatie, heldere afspraken en consistente kwaliteit.'
    },
    {
      icon: Clock,
      title: 'Efficiënt',
      description: 'We optimaliseren uw IT-processen voor maximale efficiëntie en productiviteit.'
    },
    {
      icon: Users,
      title: 'Persoonlijk',
      description: 'Vaste contactpersonen die uw organisatie en medewerkers echt kennen.'
    }
  ];

  const expertise = [
    { icon: CheckCircle2, title: '15+ jaar ervaring', description: 'In IT-beheer voor MKB' },
    { icon: Award, title: 'Gecertificeerd', description: 'Microsoft, Cisco en FortiGate partners' },
    { icon: Users, title: '200+ klanten', description: 'Tevreden bedrijven door heel Nederland' },
    { icon: TrendingUp, title: 'Continue groei', description: 'Door kwaliteit en klanttevredenheid' }
  ];

  return (
    <div>
      <SEO
        title="Over Systeemlink - Betrouwbare IT-partner sinds 2009 | Systeemlink"
        description="Systeemlink is uw betrouwbare IT-partner voor het MKB. Sinds 2009 leveren wij hoogwaardige managed IT-services met persoonlijke aandacht en vakmanschap."
        keywords="over ons, IT-partner MKB, managed services provider, IT-bedrijf Nederland, Systeemlink team"
        canonical="https://systeemlink.nl/bedrijfsinformatie/over-ons"
      />

      <PageHero
        breadcrumbs={[
          { label: 'Bedrijfsinformatie', path: '/bedrijfsinformatie/over-ons' },
          { label: 'Over ons', path: '/bedrijfsinformatie/over-ons' }
        ]}
        badge={{ text: 'Over Systeemlink' }}
        title="Uw betrouwbare IT-partner sinds 2009"
        description="Wij zijn Systeemlink - een team van gepassioneerde IT-professionals dat bedrijven helpt groeien met slimme technologie en persoonlijke service."
        gradient="from-indigo-600 via-purple-700 to-pink-800"
        buttons={[
          { text: 'Neem contact op', link: '/bedrijfsinformatie/contact', variant: 'primary' },
          { text: 'Bekijk vacatures', link: '/bedrijfsinformatie/vacatures', variant: 'secondary' }
        ]}
      />

      <StatsBar />

      <ContentSection
        badge={{ text: 'Onze waarden' }}
        title="Waar wij voor staan"
        description="Onze kernwaarden bepalen hoe wij werken en met wie we samenwerken"
        background="white"
      >
        <FeatureSection items={values} columns={4} variant="grid" />
      </ContentSection>

      <ContentSection
        badge={{ text: 'Onze expertise' }}
        title="Waarom kiezen voor Systeemlink?"
        description="Ervaring, certificeringen en bewezen resultaten"
        background="gray"
      >
        <FeatureSection items={expertise} columns={4} variant="grid" />
      </ContentSection>

      <CTASection
        badge={{ text: 'Laten we kennismaken' }}
        title="Ontdek wat we voor u kunnen betekenen"
        description="Plan een vrijblijvend kennismakingsgesprek en ontdek hoe we uw IT kunnen transformeren."
        gradient="from-indigo-600 via-purple-700 to-pink-800"
        buttons={[
          { text: 'Plan een gesprek', link: '/bedrijfsinformatie/contact', variant: 'primary' },
          { text: 'Gratis IT-check', link: '/it-check', variant: 'secondary' }
        ]}
      />
    </div>
  );
}