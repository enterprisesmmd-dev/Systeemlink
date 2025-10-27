import { Link } from 'react-router-dom';
import { Shield, ShieldCheck, Lock, Wifi, Activity, Eye, AlertTriangle, CheckCircle2, Zap, Server, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import { SEO } from '../SEO';
import { StatsBar } from '../StatsBar';
import { ContentSection, GridSection, CTASection, FeatureSection } from '../sections';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

export function NetworkPage() {
  const securityServices = [
    {
      icon: Shield,
      title: 'Firewall Management',
      description: 'Next-gen firewalls met advanced threat protection en real-time monitoring',
      features: ['FortiGate & Cisco', 'IPS/IDS configuratie', '24/7 monitoring'],
      color: 'bg-gradient-to-br from-violet-500 to-violet-600'
    },
    {
      icon: Lock,
      title: 'VPN & Remote Access',
      description: 'Veilige externe toegang met enterprise VPN oplossingen',
      features: ['Site-to-site VPN', 'Client VPN', 'Zero trust network'],
      color: 'bg-gradient-to-br from-purple-500 to-purple-600'
    },
    {
      icon: Wifi,
      title: 'Secure WiFi',
      description: 'Enterprise WiFi met WPA3 encryptie en netwerkse segmentatie',
      features: ['Ubiquiti & Cisco Meraki', 'Guest network', 'RADIUS authenticatie'],
      color: 'bg-gradient-to-br from-indigo-500 to-indigo-600'
    },
    {
      icon: Eye,
      title: 'Security Monitoring',
      description: '24/7 bewaking met SIEM en automatische threat detectie',
      features: ['Log aggregatie', 'Anomaly detection', 'Incident response'],
      color: 'bg-gradient-to-br from-blue-500 to-blue-600'
    }
  ];

  const benefits = [
    { icon: ShieldCheck, title: 'Enterprise beveiliging', description: 'Bank-grade security voor MKB prijzen' },
    { icon: Activity, title: '24/7 Monitoring', description: 'Continue bewaking van uw netwerk' },
    { icon: CheckCircle2, title: 'Compliance ready', description: 'AVG, NEN 7510 en ISO 27001' },
    { icon: AlertTriangle, title: 'Proactive threat hunting', description: 'Detecteren voor het problemen worden' }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <SEO 
        title="Netwerk & Beveiliging - Bescherm uw IT-infrastructuur | Systeemlink"
        description="Professionele netwerkbeveiliging voor het MKB. ✓ Firewalls ✓ VPN ✓ WiFi ✓ Netwerkmonitoring ✓ Penetratietesten ✓ Security awareness"
        keywords="netwerkbeveiliging, firewall, VPN, WiFi, network security, cybersecurity, penetratietest, security monitoring"
        canonical="https://systeemlink.nl/oplossingen/netwerk-beveiliging"
      />

      {/* Hero with Security Animation */}
      <section className="relative bg-gradient-to-br from-violet-600 via-purple-700 to-indigo-900 text-white overflow-hidden">
        {/* Reduced padding for compact layout */}
        <div className="pt-[30px] pb-16">
          {/* Animated Security Grid */}
          <div className="absolute inset-0">
            {/* Radar Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                className="w-96 h-96 border-2 border-violet-300/20 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0, 0.3]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute inset-0 w-96 h-96 border-2 border-violet-300/20 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0, 0.3]
                }}
                transition={{
                  duration: 3,
                  delay: 1,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>

            {/* Floating Shield Icons */}
            <motion.div
              animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-20 right-20 opacity-10"
            >
              <Shield className="w-24 h-24 text-white" />
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
                <span className="opacity-90">Netwerk & Beveiliging</span>
              </div>
              <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm">
                Enterprise Security
              </Badge>
              
              <h1 className="text-5xl lg:text-6xl mb-6 leading-tight">
                Netwerk &
                <span className="block bg-gradient-to-r from-violet-200 to-pink-300 bg-clip-text text-transparent">
                  Beveiliging
                </span>
              </h1>
              
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Bescherm uw bedrijf tegen cyberdreigingen met enterprise-grade netwerkbeveiliging. 
                Van firewalls tot 24/7 monitoring.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/scan/security">
                  <Button size="lg" className="h-14 px-8 bg-white text-violet-600 hover:bg-gray-100">
                    <Shield className="w-5 h-5 mr-2" />
                    Gratis security scan
                  </Button>
                </Link>
                <Link to="/bedrijfsinformatie/contact">
                  <Button size="lg" className="h-14 px-8 bg-transparent border-2 border-white text-white hover:bg-white hover:text-violet-600 transition-colors">
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
        badge={{ text: 'Security Services' }}
        title="Complete netwerkbeveiliging"
        description="Bescherm uw infrastructuur met enterprise security"
        background="white"
      >
        <GridSection items={securityServices} columns={2} variant="icon" />
      </ContentSection>

      <ContentSection
        badge={{ text: 'Waarom Systeemlink' }}
        title="Beveiliging op enterprise niveau"
        description="Bank-grade security voor MKB organisaties"
        background="gray"
      >
        <FeatureSection items={benefits} columns={4} variant="grid" />
      </ContentSection>

      <CTASection
        badge={{ text: 'Gratis security scan' }}
        title="Bescherm uw bedrijf tegen cyberdreigingen"
        description="Ontdek kwetsbaarheden voordat hackers dat doen. Vraag een gratis security scan aan."
        variant="card"
        buttons={[
          { text: 'Gratis security scan', link: '/it-check', variant: 'primary', icon: Shield },
          { text: 'Contact opnemen', link: '/bedrijfsinformatie/contact', variant: 'secondary' }
        ]}
      />
    </div>
  );
}