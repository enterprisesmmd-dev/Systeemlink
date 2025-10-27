import { Briefcase, MapPin, Clock, TrendingUp, Heart, Users, Award, Coffee } from 'lucide-react';
import { SEO } from '../SEO';
import { StatsBar } from '../StatsBar';
import { PageHero, ContentSection, CTASection, FeatureSection } from '../sections';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { AnimatedSection } from '../AnimatedSection';
import { Link } from 'react-router-dom';

export function VacanciesPage() {
  const openPositions = [
    {
      title: 'IT Support Engineer',
      location: 'Amsterdam',
      type: 'Fulltime',
      level: 'Medior',
      description: 'Werken aan diverse IT-vraagstukken voor onze MKB klanten'
    },
    {
      title: 'Network & Security Specialist',
      location: 'Utrecht',
      type: 'Fulltime',
      level: 'Senior',
      description: 'Ontwerpen en implementeren van netwerkoplossingen'
    },
    {
      title: 'Cloud Engineer (Azure)',
      location: 'Remote',
      type: 'Fulltime',
      level: 'Medior/Senior',
      description: 'Microsoft 365 en Azure implementaties en migraties'
    }
  ];

  const benefits = [
    { icon: Heart, title: 'Goede arbeidsvoorwaarden', description: 'Marktconform salaris en secundaire voorwaarden' },
    { icon: TrendingUp, title: 'Doorgroeimogelijkheden', description: 'Persoonlijk ontwikkelplan en trainingen' },
    { icon: Users, title: 'Leuk team', description: 'Informele werksfeer met betrokken collega\'s' },
    { icon: Award, title: 'Flexibiliteit', description: 'Hybride werken en flexibele werktijden' },
    { icon: Coffee, title: 'Certificeringen', description: 'We betalen je Microsoft, Cisco certificaten' },
    { icon: Briefcase, title: 'Moderne tools', description: 'Werk met de nieuwste technologieën' }
  ];

  return (
    <div>
      <SEO
        title="Vacatures - Werken bij Systeemlink | Systeemlink"
        description="Bekijk onze vacatures en kom werken bij een dynamisch IT-team. Uitdagende projecten, goede arbeidsvoorwaarden en doorgroeimogelijkheden."
        keywords="vacatures IT, werken bij, IT-banen, network engineer, support engineer, cloud engineer"
        canonical="https://systeemlink.nl/bedrijfsinformatie/vacatures"
      />

      <PageHero
        breadcrumbs={[
          { label: 'Bedrijfsinformatie', path: '/bedrijfsinformatie/over-ons' },
          { label: 'Vacatures', path: '/bedrijfsinformatie/vacatures' }
        ]}
        badge={{ text: 'Werken bij Systeemlink' }}
        title="Kom ons team versterken"
        description="Werk je graag met de nieuwste technologieën en wil je bedrijven écht helpen? Dan zijn we op zoek naar jou!"
        gradient="from-emerald-600 via-teal-700 to-cyan-800"
        buttons={[
          { text: 'Bekijk vacatures', link: '#vacatures', variant: 'primary' },
          { text: 'Open sollicitatie', link: '/bedrijfsinformatie/contact', variant: 'secondary' }
        ]}
      />

      <StatsBar />

      <ContentSection
        badge={{ text: 'Wat we bieden' }}
        title="Werken bij Systeemlink"
        description="Goede arbeidsvoorwaarden en uitdagende projecten"
        background="white"
      >
        <FeatureSection items={benefits} columns={3} variant="grid" />
      </ContentSection>

      {/* Vacatures */}
      <section id="vacatures" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fade-up">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Badge className="mb-4 bg-emerald-100 text-emerald-700">Openstaande vacatures</Badge>
              <h2 className="text-3xl lg:text-5xl mb-6">
                Huidige openings
              </h2>
              <p className="text-xl text-gray-600">
                Bekijk onze openstaande vacatures en solliciteer direct
              </p>
            </div>
          </AnimatedSection>

          <div className="space-y-6 max-w-4xl mx-auto">
            {openPositions.map((position, index) => (
              <AnimatedSection key={index} animation="slide-right" delay={index * 0.1}>
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Briefcase className="w-5 h-5 text-emerald-600" />
                        <h3 className="text-xl">{position.title}</h3>
                      </div>
                      <p className="text-gray-600 mb-3">{position.description}</p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">{position.location}</Badge>
                        <Badge variant="secondary">{position.type}</Badge>
                        <Badge variant="secondary">{position.level}</Badge>
                      </div>
                    </div>
                    <Link to="/bedrijfsinformatie/contact">
                      <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                        Solliciteer
                      </Button>
                    </Link>
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection animation="fade-up" delay={0.4}>
            <div className="text-center mt-12">
              <p className="text-gray-600 mb-4">
                Staat jouw ideale functie er niet tussen?
              </p>
              <Link to="/bedrijfsinformatie/contact">
                <Button variant="outline" size="lg">
                  Doe een open sollicitatie
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <CTASection
        badge={{ text: 'Join our team' }}
        title="Klaar voor een nieuwe uitdaging?"
        description="Stuur je CV en motivatie naar jobs@systeemlink.nl of neem direct contact met ons op."
        gradient="from-emerald-600 via-teal-700 to-cyan-800"
        buttons={[
          { text: 'Neem contact op', link: '/bedrijfsinformatie/contact', variant: 'primary' }
        ]}
      />
    </div>
  );
}