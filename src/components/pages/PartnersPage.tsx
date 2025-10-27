import { Award, Shield, TrendingUp, Users, CheckCircle2, Star, Handshake } from 'lucide-react';
import { SEO } from '../SEO';
import { StatsBar } from '../StatsBar';
import { PageHero, ContentSection, CTASection, FeatureSection } from '../sections';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Card } from '../ui/card';
import { AnimatedSection } from '../AnimatedSection';

export function PartnersPage() {
  const partners = [
    { name: 'Microsoft', logo: 'https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=200&h=100&fit=crop' },
    { name: 'Cisco', logo: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=200&h=100&fit=crop' },
    { name: 'FortiGate', logo: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=200&h=100&fit=crop' },
    { name: 'VMware', logo: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=200&h=100&fit=crop' },
    { name: 'Dell', logo: 'https://images.unsplash.com/photo-1593642532400-2682810df593?w=200&h=100&fit=crop' },
    { name: 'HP', logo: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=200&h=100&fit=crop' }
  ];

  const partnershipLevels = [
    {
      icon: Star,
      title: 'Microsoft Gold Partner',
      description: 'Hoogste partnerniveau voor Microsoft 365 en Azure oplossingen'
    },
    {
      icon: Shield,
      title: 'Cisco Select Partner',
      description: 'Gecertificeerd voor netwerk en security infrastructuur'
    },
    {
      icon: Award,
      title: 'FortiGate Certified Partner',
      description: 'Expertise in next-generation firewall oplossingen'
    },
    {
      icon: CheckCircle2,
      title: 'VMware Partner',
      description: 'Virtualisatie en cloud infrastructure specialist'
    }
  ];

  const benefits = [
    { icon: Award, title: 'Beste technologie', description: 'Toegang tot enterprise tools en producten' },
    { icon: TrendingUp, title: 'Continue training', description: 'Altijd op de hoogte van nieuwste updates' },
    { icon: Shield, title: 'Direct support', description: 'Rechtstreeks contact met fabrikanten' },
    { icon: CheckCircle2, title: 'Scherpe prijzen', description: 'Volume voordelen doorberekend aan klanten' }
  ];

  return (
    <div>
      <SEO
        title="Partners & Samenwerkingen | Systeemlink"
        description="Systeemlink werkt samen met toonaangevende leveranciers zoals Microsoft, Cisco en FortiGate. Ontdek onze partnerships en wat dit voor u betekent."
        keywords="Microsoft partner, Cisco partner, FortiGate, IT-partnerships, technologie partners"
        canonical="https://systeemlink.nl/bedrijfsinformatie/partners-certificeringen"
      />

      <PageHero
        breadcrumbs={[
          { label: 'Bedrijfsinformatie', path: '/bedrijfsinformatie/over-ons' },
          { label: 'Partners', path: '/bedrijfsinformatie/partners-certificeringen' }
        ]}
        badge={{ text: 'Partnerships' }}
        title="Samenwerking met de beste leveranciers"
        description="Als gecertificeerd partner van toonaangevende leveranciers bieden wij u toegang tot de beste technologieën en expertise."
        gradient="from-blue-600 via-indigo-700 to-purple-800"
        buttons={[
          { text: 'Bekijk certificeringen', link: '/bedrijfsinformatie/certificeringen', variant: 'primary' },
          { text: 'Neem contact op', link: '/bedrijfsinformatie/contact', variant: 'secondary' }
        ]}
      />

      <StatsBar />

      {/* Partners Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fade-up">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full mb-6 border border-blue-200">
                <Handshake className="w-4 h-4" />
                <span>Onze partners</span>
              </div>
              <h2 className="text-3xl lg:text-5xl mb-6">
                Technologie partners
              </h2>
              <p className="text-xl text-gray-600">
                Samenwerking met wereldwijde marktleiders voor de beste oplossingen
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.map((partner, index) => (
              <AnimatedSection key={index} animation="fade-up" delay={index * 0.1}>
                <Card className="p-8 flex items-center justify-center h-32 hover:shadow-lg transition-shadow">
                  <ImageWithFallback
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-16 max-w-full object-contain grayscale hover:grayscale-0 transition-all"
                  />
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Levels */}
      <ContentSection
        badge={{ text: 'Partnership status' }}
        title="Onze partnerniveaus"
        description="Erkend door toonaangevende leveranciers"
        background="gray"
      >
        <FeatureSection items={partnershipLevels} columns={4} variant="grid" />
      </ContentSection>

      {/* Voordelen */}
      <ContentSection
        badge={{ text: 'De voordelen' }}
        title="Voordelen voor onze klanten"
        description="Wat onze partnerships voor u betekenen"
        background="white"
      >
        <FeatureSection items={benefits} columns={4} variant="grid" />
      </ContentSection>

      <CTASection
        badge={{ text: 'Enterprise technologie' }}
        title="Profiteer van onze partnerships"
        description="Neem contact op en ontdek hoe onze partnerships uw bedrijf kunnen helpen."
        gradient="from-blue-600 via-indigo-700 to-purple-800"
        buttons={[
          { text: 'Neem contact op', link: '/bedrijfsinformatie/contact', variant: 'primary' },
          { text: 'Gratis IT-check', link: '/it-check', variant: 'secondary' }
        ]}
      />
    </div>
  );
}