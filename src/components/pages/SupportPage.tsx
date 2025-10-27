import { Headset, Phone, Mail, MessageSquare, Clock, Zap, Shield, Target, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { StatsBar } from '../StatsBar';
import { PageHero, ContentSection, GridSection, CTASection, FeatureSection } from '../sections';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { AnimatedSection } from '../AnimatedSection';
import { Button } from '../ui/button';

export function SupportPage() {
  const supportChannels = [
    {
      icon: Phone,
      title: 'Telefoon Support',
      description: 'Direct contact met onze helpdesk voor urgente issues',
      features: ['Werkdagen 08:00 - 18:00', '< 5 minuten reactie']
    },
    {
      icon: Mail,
      title: 'Email & Ticket Systeem',
      description: 'Gestructureerde afhandeling via ons ticket platform',
      features: ['24/7 tickets aanmaken', '< 2 uur reactie']
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Real-time ondersteuning via onze chat functie',
      features: ['Werkdagen 08:00 - 18:00', '< 10 minuten reactie']
    }
  ];

  const serviceLevels = [
    {
      name: 'Standard Support',
      price: 'Vanaf €75',
      period: 'per gebruiker/jaar',
      description: 'Basis IT-support voor kleine teams',
      features: [
        'Email & ticket support (werkdagen)',
        'Reactietijd: 4 uur',
        'Oplossingstijd: 8 uur',
        'Normale prioriteit',
        'Knowledge base toegang',
        'Maandelijkse rapportage'
      ]
    },
    {
      name: 'Business Support',
      price: 'Vanaf €125',
      period: 'per gebruiker/jaar',
      description: 'Uitgebreide support voor groeiende bedrijven',
      features: [
        'Alles uit Standard',
        'Telefoon support (werkdagen 08:00-18:00)',
        'Reactietijd: 2 uur',
        'Oplossingstijd: 4 uur',
        'Hoge prioriteit',
        'Vaste contactpersoon',
        'Kwartaal review meetings'
      ],
      popular: true
    },
    {
      name: 'Premium Support',
      price: 'Op maat',
      period: 'custom pricing',
      description: 'Enterprise support met 24/7 beschikbaarheid',
      features: [
        'Alles uit Business',
        '24/7 telefoon support',
        'Reactietijd: 15 minuten',
        'Oplossingstijd: 1 uur',
        'Kritieke prioriteit',
        'Dedicated support engineer',
        'Maandelijkse strategische sessies',
        'Proactive monitoring & alerting'
      ]
    }
  ];

  const benefits = [
    { icon: Zap, title: '95% First Call Resolution', description: 'Problemen direct opgelost' },
    { icon: Shield, title: 'Veiligheidscontroles', description: 'Regelmatige beveiligingscheck-ups' },
    { icon: Target, title: 'Doelgerichte oplossingen', description: 'Aangepaste support voor uw specifieke behoeften' },
    { icon: CheckCircle2, title: '4.8/5 Satisfaction', description: 'Hoge klanttevredenheid' }
  ];

  return (
    <div>
      <SEO
        title="24/7 IT-Support & Helpdesk | Systeemlink"
        description="Professionele IT-support en helpdesk met snelle reactietijden. Telefoon, email, chat en on-site support. Proactieve monitoring 24/7. Vaste contactpersonen."
        keywords="IT-support, helpdesk, 24/7 support, remote support, on-site support, IT-monitoring, service desk, ticket systeem, first line support"
        canonical="https://systeemlink.nl/oplossingen/it-support"
      />

      <PageHero
        breadcrumbs={[
          { label: 'Oplossingen', path: '/oplossingen' },
          { label: 'IT-Support', path: '/oplossingen/it-support' }
        ]}
        badge={{ text: '24/7 Beschikbaar', icon: Headset }}
        title="IT-Support & Monitoring"
        description="Snelle, betrouwbare ondersteuning wanneer u het nodig heeft. Van helpdesk tot proactieve monitoring - wij zorgen dat uw IT blijft draaien."
        gradient="from-emerald-600 via-green-700 to-teal-800"
        buttons={[
          { text: 'Start vandaag', link: '/bedrijfsinformatie/contact', variant: 'primary' },
          { text: 'IT-Check aanvragen', link: '/it-check', variant: 'secondary' }
        ]}
      />

      <StatsBar />

      <ContentSection
        title="Meerdere support kanalen"
        description="Kies het kanaal dat het beste bij uw situatie past"
        background="gray"
      >
        <GridSection items={supportChannels} columns={4} variant="icon" />
      </ContentSection>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fade-up">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Badge className="mb-4 bg-emerald-100 text-emerald-700">Transparante prijzen</Badge>
              <h2 className="text-3xl lg:text-5xl mb-6">
                Support pakketten
              </h2>
              <p className="text-xl text-gray-600">
                Van basis tot enterprise - kies het support niveau dat past bij uw behoefte
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {serviceLevels.map((level, index) => (
              <AnimatedSection key={index} animation="fade-up" delay={index * 0.15}>
                <Card className={`p-8 h-full border-2 ${level.popular ? 'border-emerald-500 shadow-2xl scale-105' : 'border-gray-300'} relative`}>
                  {level.popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-600 to-green-600 text-white">
                      Meest populair
                    </Badge>
                  )}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl mb-2">{level.name}</h3>
                    <div className="text-4xl mb-2">
                      <span className={level.popular ? 'text-emerald-600' : 'text-gray-900'}>{level.price}</span>
                    </div>
                    <div className="text-sm text-gray-600">{level.period}</div>
                  </div>
                  <p className="text-gray-600 mb-6 text-center text-sm">{level.description}</p>
                  <ul className="space-y-3 mb-8">
                    {level.features.map((feature, i) => (
                      <li key={i} className="flex gap-3">
                        <CheckCircle2 className={`w-5 h-5 ${level.popular ? 'text-emerald-600' : 'text-gray-400'} flex-shrink-0`} />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/bedrijfsinformatie/contact" className="block">
                    <Button className={`w-full ${level.popular ? 'bg-gradient-to-r from-emerald-600 to-green-600' : 'bg-gray-900'} text-white`}>
                      Meer informatie
                    </Button>
                  </Link>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <ContentSection
        badge={{ text: 'Waarom Systeemlink' }}
        title="Betrouwbare IT-support"
        description="Vaste contactpersonen en snelle oplossingen"
        background="gray"
      >
        <FeatureSection items={benefits} columns={4} variant="grid" />
      </ContentSection>

      <CTASection
        title="Klaar voor betrouwbare IT-support?"
        description="Start vandaag nog met professionele support en monitoring. Neem contact op voor een vrijblijvend adviesgesprek."
        gradient="from-emerald-600 via-green-700 to-teal-800"
        buttons={[
          { text: 'Start direct', link: '/bedrijfsinformatie/contact', variant: 'primary' },
          { text: 'Gratis IT-check', link: '/it-check', variant: 'secondary' }
        ]}
      />
    </div>
  );
}