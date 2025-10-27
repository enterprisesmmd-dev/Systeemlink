import { Link } from 'react-router-dom';
import { Monitor, CheckCircle2, Laptop, HardDrive, Shield, Zap, BarChart3, Settings, Award } from 'lucide-react';
import { motion } from 'motion/react';
import { SEO } from '../SEO';
import { StatsBar } from '../StatsBar';
import { ContentSection, GridSection, CTASection, FeatureSection } from '../sections';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { useState } from 'react';

export function WorkplacePage() {
  const [activePlan, setActivePlan] = useState('professional');

  const features = [
    {
      icon: Monitor,
      title: 'Device Management',
      description: 'Centraal beheer van alle werkplekken met moderne MDM-tooling',
      color: 'bg-gradient-to-br from-sky-500 to-sky-600'
    },
    {
      icon: Shield,
      title: 'Security & Compliance',
      description: 'Automatische beveiligingsupdates en naleving van security policies',
      color: 'bg-gradient-to-br from-indigo-500 to-indigo-600'
    },
    {
      icon: Zap,
      title: 'Automatische Updates',
      description: 'Patches en updates worden automatisch geïnstalleerd buiten kantoortijden',
      color: 'bg-gradient-to-br from-violet-500 to-violet-600'
    },
    {
      icon: HardDrive,
      title: 'Backup & Recovery',
      description: 'Dagelijkse backups met snelle hersteloptie bij dataverlies',
      color: 'bg-gradient-to-br from-blue-500 to-blue-600'
    },
    {
      icon: BarChart3,
      title: 'Monitoring & Reporting',
      description: 'Real-time inzicht in status en prestaties van alle systemen',
      color: 'bg-gradient-to-br from-cyan-500 to-cyan-600'
    },
    {
      icon: Settings,
      title: '24/7 Remote Support',
      description: 'Directe hulp op afstand wanneer u dat nodig heeft',
      color: 'bg-gradient-to-br from-emerald-500 to-emerald-600'
    }
  ];

  const pricingPlans = [
    {
      id: 'basic',
      name: 'Basic',
      price: '€45',
      period: 'per werkplek/maand',
      description: 'Voor kleine bedrijven die basis IT-beheer nodig hebben',
      features: [
        'Remote monitoring',
        'Automatische updates',
        'Email support (24u)',
        'Maandelijkse rapportages',
        'Asset management'
      ]
    },
    {
      id: 'professional',
      name: 'Professional',
      price: '€75',
      period: 'per werkplek/maand',
      description: 'Onze meest populaire oplossing voor groeiende bedrijven',
      features: [
        'Alles van Basic',
        '24/7 support',
        'Proactieve monitoring',
        'Security management',
        'Backup & recovery',
        'Dedicated support engineer'
      ],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Op maat',
      period: 'custom prijzen',
      description: 'Voor grote organisaties met specifieke eisen',
      features: [
        'Alles van Professional',
        'Dedicated account manager',
        'SLA garanties op maat',
        'Advanced security features',
        'Compliance ondersteuning',
        'On-site support optie'
      ]
    }
  ];

  const benefits = [
    {
      icon: Award,
      title: 'Minder downtime',
      description: 'Proactief beheer voorkomt storingen'
    },
    {
      icon: CheckCircle2,
      title: 'Kostenbesparingen',
      description: 'Tot 40% lagere IT-kosten'
    },
    {
      icon: Shield,
      title: 'Betere beveiliging',
      description: 'Continue monitoring en updates'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <SEO 
        title="Werkplekbeheer - Volledige beheer van uw IT-werkplekken | Systeemlink"
        description="Professioneel werkplekbeheer voor het MKB. ✓ Windows & Mac beheer ✓ Automatische updates ✓ Remote support ✓ Asset management ✓ Vaste maandprijs vanaf €45"
        keywords="werkplekbeheer, desktop management, laptop beheer, Windows beheer, Mac beheer, IT-beheer werkplekken, MDM"
        canonical="https://systeemlink.nl/oplossingen/werkplekbeheer"
      />

      {/* Hero with Animated Grid */}
      <section className="relative bg-gradient-to-br from-sky-600 via-sky-700 to-blue-800 text-white overflow-hidden">
        {/* Reduced padding for compact layout */}
        <div className="pt-[30px] pb-16">
          {/* Animated Background Grid */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
              backgroundSize: '100px 100px',
              animation: 'gridMove 20s linear infinite'
            }} />
          </div>

          {/* Floating Devices Animation */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-20 right-20 opacity-20"
            >
              <Monitor className="w-32 h-32 text-white" />
            </motion.div>
            <motion.div
              animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-20 left-20 opacity-20"
            >
              <Laptop className="w-24 h-24 text-white" />
            </motion.div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <div className="flex items-center gap-2 mb-6 text-sm">
                <Link to="/oplossingen" className="hover:underline opacity-90">Oplossingen</Link>
                <span className="opacity-60">/</span>
                <span className="opacity-90">Werkplekbeheer</span>
              </div>
              <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm">
                Complete werkplekbeheer
              </Badge>
              
              <h1 className="text-5xl lg:text-6xl mb-6 leading-tight">
                Professioneel
                <span className="block bg-gradient-to-r from-sky-200 to-emerald-300 bg-clip-text text-transparent">
                  Werkplekbeheer
                </span>
              </h1>
              
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Volledige controle en beheer van al uw werkplekken. Van laptops tot desktops, 
                wij zorgen voor updates, beveiliging en optimale performance.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/scan/modern-workplace">
                  <Button size="lg" className="h-14 px-8 bg-white text-sky-600 hover:bg-gray-100">
                    <Zap className="w-5 h-5 mr-2" />
                    Gratis workplace scan
                  </Button>
                </Link>
                <Link to="/bedrijfsinformatie/contact">
                  <Button size="lg" className="h-14 px-8 bg-transparent border-2 border-white text-white hover:bg-white hover:text-sky-600 transition-colors">
                    Neem contact op
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>

          <style>{`
            @keyframes gridMove {
              0% { transform: translateY(0); }
              100% { transform: translateY(100px); }
            }
          `}</style>
        </div>
      </section>

      <StatsBar />

      <ContentSection
        badge={{ text: 'Wat we bieden' }}
        title="Complete werkplekoplossingen"
        description="Van beheer tot beveiliging, wij regelen het allemaal"
        background="gray"
      >
        <GridSection items={features} columns={3} variant="icon" />
      </ContentSection>

      {/* Pricing Section with Interactive Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-sky-100 text-sky-700">Transparante prijzen</Badge>
            <h2 className="text-4xl lg:text-5xl mb-4">
              Kies het pakket dat bij u past
            </h2>
            <p className="text-xl text-gray-600">
              Vaste maandprijzen, geen verborgen kosten
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setActivePlan(plan.id)}
                className="cursor-pointer"
              >
                <Card className={`p-8 h-full transition-all duration-300 ${
                  plan.popular 
                    ? 'border-2 border-sky-500 shadow-2xl scale-105' 
                    : activePlan === plan.id
                    ? 'border-2 border-sky-300 shadow-lg'
                    : 'border hover:border-sky-200 hover:shadow-lg'
                } relative`}>
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-sky-600 to-blue-600 text-white">
                      Meest gekozen
                    </Badge>
                  )}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl mb-2">{plan.name}</h3>
                    <div className="text-4xl mb-2">
                      <span className={plan.popular ? 'text-sky-600' : 'text-gray-900'}>
                        {plan.price}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">{plan.period}</div>
                  </div>
                  <p className="text-gray-600 mb-6 text-center text-sm">
                    {plan.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex gap-3">
                        <CheckCircle2 className={`w-5 h-5 ${plan.popular ? 'text-sky-600' : 'text-gray-400'} flex-shrink-0`} />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/bedrijfsinformatie/contact" className="block">
                    <Button className={`w-full ${plan.popular ? 'bg-gradient-to-r from-sky-600 to-blue-600 text-white' : 'bg-gray-900 text-white'}`}>
                      Kies dit pakket
                    </Button>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ContentSection
        badge={{ text: 'De voordelen' }}
        title="Waarom werkplekbeheer?"
        description="Focus op uw bedrijf, wij zorgen voor de IT"
        background="gray"
      >
        <FeatureSection items={benefits} columns={3} variant="grid" />
      </ContentSection>

      <CTASection
        badge={{ text: 'Gratis & vrijblijvend' }}
        title="Klaar voor professioneel werkplekbeheer?"
        description="Plan een vrijblijvende IT-scan en ontdek hoe wij uw werkplekken optimaal kunnen beheren."
        variant="card"
        buttons={[
          { text: 'Gratis IT-scan aanvragen', link: '/it-check', variant: 'primary', icon: Zap },
          { text: 'Contact opnemen', link: '/bedrijfsinformatie/contact', variant: 'secondary' }
        ]}
      />
    </div>
  );
}