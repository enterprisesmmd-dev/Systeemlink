import { Award, Shield, CheckCircle2, Users, Star, BookOpen, Briefcase, TrendingUp } from 'lucide-react';
import { SEO } from '../SEO';
import { StatsBar } from '../StatsBar';
import { PageHero, ContentSection, CTASection, FeatureSection } from '../sections';
import { AnimatedSection } from '../AnimatedSection';

export function CertificationsPage() {
  const certifications = [
    {
      icon: Award,
      title: 'Microsoft Gold Partner',
      description: 'Gecertificeerd voor Microsoft 365 en Azure solutions'
    },
    {
      icon: Shield,
      title: 'Cisco Select Partner',
      description: 'Specialisatie in netwerk en security oplossingen'
    },
    {
      icon: CheckCircle2,
      title: 'FortiGate Certified',
      description: 'Expertise in next-generation firewalls'
    },
    {
      icon: Users,
      title: 'ISO 27001 Gecertificeerd',
      description: 'Information security management'
    },
    {
      icon: Star,
      title: 'VMware Certified Professional',
      description: 'Virtualisatie en cloud infrastructure'
    },
    {
      icon: BookOpen,
      title: 'ITIL Foundation',
      description: 'IT Service Management best practices'
    },
    {
      icon: Briefcase,
      title: 'CompTIA Network+',
      description: 'Netwerk infrastructuur expertise'
    },
    {
      icon: Shield,
      title: 'CompTIA Security+',
      description: 'Cybersecurity fundamentals'
    }
  ];

  const certificationBenefits = [
    { 
      icon: Award, 
      title: 'Erkende expertise', 
      description: 'Onafhankelijk getoetste kennis en vaardigheden' 
    },
    { 
      icon: TrendingUp, 
      title: 'Continue verbetering', 
      description: 'Regelmatige training en herontcertificering' 
    },
    { 
      icon: Shield, 
      title: 'Kwaliteitsgarantie', 
      description: 'Voldoen aan de hoogste industriestandaarden' 
    },
    { 
      icon: CheckCircle2, 
      title: 'Beste praktijken', 
      description: 'Toepassing van bewezen methodieken' 
    }
  ];

  return (
    <div>
      <SEO
        title="Certificeringen & Kwalificaties | Systeemlink"
        description="Overzicht van alle certificeringen en kwalificaties van Systeemlink. Van Microsoft Gold Partner tot ISO 27001 certificering."
        keywords="certificeringen, Microsoft certificering, ISO 27001, Cisco certificaat, IT kwalificaties"
        canonical="https://systeemlink.nl/bedrijfsinformatie/certificeringen"
      />

      <PageHero
        breadcrumbs={[
          { label: 'Bedrijfsinformatie', path: '/bedrijfsinformatie/over-ons' },
          { label: 'Certificeringen', path: '/bedrijfsinformatie/certificeringen' }
        ]}
        badge={{ text: 'Certificeringen' }}
        title="Erkende expertise en vakmanschap"
        description="Onze certificeringen garanderen dat we werken volgens de hoogste kwaliteitsstandaarden en over de nieuwste kennis beschikken."
        gradient="from-purple-600 via-indigo-700 to-blue-800"
        buttons={[
          { text: 'Bekijk partners', link: '/bedrijfsinformatie/partners-certificeringen', variant: 'primary' },
          { text: 'Neem contact op', link: '/bedrijfsinformatie/contact', variant: 'secondary' }
        ]}
      />

      <StatsBar />

      {/* Certificeringen Grid */}
      <ContentSection
        badge={{ text: 'Onze certificeringen' }}
        title="Gecertificeerde expertise"
        description="Erkend door toonaangevende organisaties"
        background="white"
      >
        <FeatureSection items={certifications} columns={4} variant="grid" />
      </ContentSection>

      {/* Voordelen van certificeringen */}
      <ContentSection
        badge={{ text: 'Waarom certificeringen' }}
        title="Kwaliteit gegarandeerd"
        description="Wat onze certificeringen betekenen voor u"
        background="gray"
      >
        <FeatureSection items={certificationBenefits} columns={4} variant="grid" />
      </ContentSection>

      {/* Team certificeringen */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fade-up">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full mb-6 border border-blue-200">
                <Users className="w-4 h-4" />
                <span>Ons team</span>
              </div>
              <h2 className="text-3xl lg:text-5xl mb-6">
                Voortdurende professionalisering
              </h2>
              <p className="text-xl text-gray-600">
                Onze engineers volgen continu trainingen en certificeringsprogramma's om up-to-date te blijven met de nieuwste ontwikkelingen in IT.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={0.2}>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl border border-blue-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-600 text-white p-3 rounded-lg">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl">50+</h3>
                </div>
                <p className="text-gray-600">Actieve certificeringen in ons team</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-xl border border-purple-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-purple-600 text-white p-3 rounded-lg">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl">200+</h3>
                </div>
                <p className="text-gray-600">Uren training per engineer per jaar</p>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-xl border border-indigo-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-indigo-600 text-white p-3 rounded-lg">
                    <Award className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl">15+</h3>
                </div>
                <p className="text-gray-600">Jaar ervaring gemiddeld</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <CTASection
        badge={{ text: 'Kwaliteit en expertise' }}
        title="Profiteer van onze gecertificeerde kennis"
        description="Neem contact op en ontdek hoe onze expertise uw IT-infrastructuur naar een hoger niveau tilt."
        gradient="from-purple-600 via-indigo-700 to-blue-800"
        buttons={[
          { text: 'Neem contact op', link: '/bedrijfsinformatie/contact', variant: 'primary' },
          { text: 'Gratis IT-check', link: '/it-check', variant: 'secondary' }
        ]}
      />
    </div>
  );
}
