import { Link } from 'react-router-dom';
import { Cloud, CloudCog, Users, Shield, Server, CheckCircle2, Zap, Lock, RefreshCw, BarChart } from 'lucide-react';
import { motion } from 'motion/react';
import { SEO } from '../SEO';
import { StatsBar } from '../StatsBar';
import { ContentSection, GridSection, CTASection, FeatureSection } from '../sections';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

export function CloudPage() {
  const cloudServices = [
    {
      icon: CloudCog,
      title: 'Microsoft 365',
      description: 'Volledige implementatie en beheer van Microsoft 365 inclusief Teams, SharePoint en Exchange',
      features: ['Teams & SharePoint setup', 'Email migratie', 'Security configuratie'],
      color: 'bg-gradient-to-br from-indigo-500 to-indigo-600'
    },
    {
      icon: Server,
      title: 'Azure Cloud',
      description: 'Azure infrastructuur voor schaalbare en veilige cloud-applicaties en hosting',
      features: ['VM hosting', 'Database services', 'App development'],
      color: 'bg-gradient-to-br from-blue-500 to-blue-600'
    },
    {
      icon: Shield,
      title: 'Security & Compliance',
      description: 'Complete beveiliging met MFA, conditional access en compliance monitoring',
      features: ['MFA implementatie', 'Data loss prevention', 'Compliance reporting'],
      color: 'bg-gradient-to-br from-violet-500 to-violet-600'
    },
    {
      icon: Users,
      title: 'User Management',
      description: 'Centraal beheer van gebruikers, groepen en toegangsrechten via Azure AD',
      features: ['Azure AD setup', 'SSO configuratie', 'Access management'],
      color: 'bg-gradient-to-br from-cyan-500 to-cyan-600'
    }
  ];

  const benefits = [
    {
      icon: Zap,
      title: 'Verhoogde productiviteit',
      description: 'Samenwerken van overal met Teams en SharePoint'
    },
    {
      icon: Lock,
      title: 'Enterprise security',
      description: 'Geavanceerde beveiliging en compliance ondersteuning'
    },
    {
      icon: RefreshCw,
      title: 'Altijd up-to-date',
      description: 'Automatische updates zonder downtime'
    },
    {
      icon: BarChart,
      title: 'Schaalbaar',
      description: 'Flexibel opschalen zonder extra investeringen'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <SEO 
        title="Cloud & Microsoft 365 - Migratie en beheer | Systeemlink"
        description="Professionele Microsoft 365 en Azure cloud oplossingen. ✓ Volledige migratie ✓ Beheer & optimalisatie ✓ Security & compliance ✓ Teams & SharePoint"
        keywords="Microsoft 365, Office 365, Azure cloud, cloud migratie, Teams, SharePoint, Exchange Online, cloud beheer"
        canonical="https://systeemlink.nl/oplossingen/cloud-microsoft-365"
      />

      {/* Hero with Cloud Animation */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-indigo-700 to-blue-800 text-white overflow-hidden">
        {/* Reduced padding for compact layout */}
        <div className="pt-[30px] pb-16">
          {/* Animated Clouds */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute opacity-10"
              style={{ top: '20%', left: '-10%' }}
              animate={{ x: ['0%', '120%'] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Cloud className="w-20 h-20 text-white" />
            </motion.div>
            <motion.div
              className="absolute opacity-10"
              style={{ top: '35%', left: '-10%' }}
              animate={{ x: ['0%', '120%'] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 2 }}
            >
              <Cloud className="w-28 h-28 text-white" />
            </motion.div>
            <motion.div
              className="absolute opacity-10"
              style={{ top: '50%', left: '-10%' }}
              animate={{ x: ['0%', '120%'] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear", delay: 4 }}
            >
              <Cloud className="w-36 h-36 text-white" />
            </motion.div>
          </div>

          {/* Gradient Orbs */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-20 left-20 w-96 h-96 bg-indigo-400 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-400 rounded-full blur-3xl animate-pulse delay-1000" />
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
                <span className="opacity-90">Cloud & Microsoft 365</span>
              </div>
              <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm">
                Cloud transformatie
              </Badge>
              
              <h1 className="text-5xl lg:text-6xl mb-6 leading-tight">
                Microsoft 365 &
                <span className="block bg-gradient-to-r from-indigo-200 to-cyan-300 bg-clip-text text-transparent">
                  Azure Cloud
                </span>
              </h1>
              
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Werk veilig samen vanuit elke locatie met Microsoft 365. Wij verzorgen de volledige 
                migratie, implementatie en beheer van uw cloud omgeving.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/scan/cloud-readiness">
                  <Button size="lg" className="h-14 px-8 bg-white text-indigo-600 hover:bg-gray-100">
                    <Zap className="w-5 h-5 mr-2" />
                    Gratis cloud readiness scan
                  </Button>
                </Link>
                <Link to="/bedrijfsinformatie/contact">
                  <Button size="lg" className="h-14 px-8 bg-transparent border-2 border-white text-white hover:bg-white hover:text-indigo-600 transition-colors">
                    Neem contact op
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <StatsBar />

      <ContentSection
        badge={{ text: 'Cloud Services' }}
        title="Complete Microsoft 365 & Azure oplossingen"
        description="Van migratie tot beheer, wij ontzorgen uw cloud transformatie"
        background="white"
      >
        <GridSection items={cloudServices} columns={2} variant="icon" />
      </ContentSection>

      <ContentSection
        badge={{ text: 'De voordelen' }}
        title="Waarom Microsoft 365?"
        description="Moderniseer uw werkplek en verhoog de productiviteit"
        background="gray"
      >
        <FeatureSection items={benefits} columns={4} variant="grid" />
      </ContentSection>

      <CTASection
        badge={{ text: 'Gratis cloud assessment' }}
        title="Klaar voor de cloud?"
        description="Ontdek hoe Microsoft 365 en Azure uw bedrijf kunnen transformeren. Vraag een gratis assessment aan."
        variant="card"
        buttons={[
          { text: 'Start cloud assessment', link: '/it-check', variant: 'primary', icon: Cloud },
          { text: 'Contact opnemen', link: '/bedrijfsinformatie/contact', variant: 'secondary' }
        ]}
      />
    </div>
  );
}