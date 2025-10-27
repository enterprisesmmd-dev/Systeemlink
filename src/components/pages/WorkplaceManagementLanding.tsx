import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { SEO } from '../SEO';
import { 
  ArrowRight, 
  Check, 
  Shield, 
  Zap, 
  Users, 
  Clock, 
  TrendingUp, 
  Headset,
  Laptop,
  Cloud,
  Lock,
  BarChart3,
  CheckCircle2,
  Star,
  Quote,
  Building2,
  Award,
  Phone,
  Mail,
  MessageSquare,
  Sparkles,
  Rocket,
  Target,
  Gauge
} from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue, useAnimation } from 'motion/react';

// Floating element component
function FloatingElement({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [-10, 10, -10] }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay
      }}
    >
      {children}
    </motion.div>
  );
}

// Magnetic button component
function MagneticButton({ children, className = "", ...props }: any) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.1);
    y.set((e.clientY - centerY) * 0.1);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Parallax section component
function ParallaxSection({ children, speed = 0.5 }: { children: React.ReactNode; speed?: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);
  
  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  );
}

export function WorkplaceManagementLanding() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    employees: '',
    message: ''
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const scaleProgress = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const opacityProgress = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const features = [
    {
      icon: Laptop,
      title: 'Volledig Werkplekbeheer',
      description: 'Wij beheren alle werkplekken van A tot Z. Van hardware tot software, updates tot beveiliging.',
      color: 'from-blue-500 to-cyan-500',
      gradient: 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20'
    },
    {
      icon: Cloud,
      title: 'Cloud Integratie',
      description: 'Naadloze integratie met Microsoft 365, Google Workspace en andere cloud diensten.',
      color: 'from-purple-500 to-pink-500',
      gradient: 'bg-gradient-to-br from-purple-500/20 to-pink-500/20'
    },
    {
      icon: Lock,
      title: 'Enterprise Security',
      description: 'Bank-level beveiliging met 24/7 monitoring, firewalls en anti-virus bescherming.',
      color: 'from-orange-500 to-red-500',
      gradient: 'bg-gradient-to-br from-orange-500/20 to-red-500/20'
    },
    {
      icon: Headset,
      title: '24/7 Support',
      description: 'Altijd bereikbaar met gemiddelde reactietijd van minder dan 15 minuten.',
      color: 'from-green-500 to-emerald-500',
      gradient: 'bg-gradient-to-br from-green-500/20 to-emerald-500/20'
    },
    {
      icon: BarChart3,
      title: 'Real-time Rapportage',
      description: 'Volledig inzicht in uw IT-omgeving met gedetailleerde dashboards en rapporten.',
      color: 'from-indigo-500 to-blue-500',
      gradient: 'bg-gradient-to-br from-indigo-500/20 to-blue-500/20'
    },
    {
      icon: Zap,
      title: 'Proactive Monitoring',
      description: 'Problemen detecteren en oplossen voordat ze uw bedrijf beïnvloeden.',
      color: 'from-yellow-500 to-orange-500',
      gradient: 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20'
    }
  ];

  const packages = [
    {
      name: 'Starter',
      subtitle: 'Voor kleine teams',
      price: '€49',
      period: 'per werkplek/maand',
      description: 'Perfect voor startups en kleine bedrijven',
      features: [
        'Tot 10 werkplekken',
        'Standaard support (9-17u)',
        'Maandelijkse updates',
        'Basis monitoring',
        'Email support',
        'Cloud backup',
        'Anti-virus bescherming'
      ],
      highlighted: false,
      color: 'from-gray-500 to-gray-600'
    },
    {
      name: 'Professional',
      subtitle: 'Voor groeiende bedrijven',
      price: '€79',
      period: 'per werkplek/maand',
      description: 'Ideaal voor MKB bedrijven',
      features: [
        'Tot 50 werkplekken',
        '24/7 support',
        'Wekelijkse updates',
        'Geavanceerde monitoring',
        'Prioriteit support',
        'Cloud backup & restore',
        'Advanced security suite',
        'Maandelijkse rapportage',
        'Dedicated accountmanager'
      ],
      highlighted: true,
      color: 'from-sky-500 to-blue-600'
    },
    {
      name: 'Enterprise',
      subtitle: 'Voor grote organisaties',
      price: 'Op maat',
      period: 'custom pricing',
      description: 'Volledig maatwerk voor uw organisatie',
      features: [
        'Onbeperkt werkplekken',
        '24/7 priority support',
        'Real-time updates',
        'Custom monitoring',
        'SLA garantie 99.9%',
        'Disaster recovery plan',
        'Enterprise security',
        'Wekelijkse rapportage',
        'Dedicated IT-team',
        'Custom integraties'
      ],
      highlighted: false,
      color: 'from-purple-500 to-indigo-600'
    }
  ];

  const testimonials = [
    {
      name: 'Peter van der Berg',
      role: 'CEO',
      company: 'TechVision BV',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
      content: 'Sinds Systeemlink ons werkplekbeheer heeft overgenomen, hebben we 40% minder IT-problemen. Hun proactieve aanpak is geweldig!',
      rating: 5
    },
    {
      name: 'Sarah Jansen',
      role: 'Operations Manager',
      company: 'Retail Solutions',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
      content: 'De 24/7 support en snelle reactietijd hebben ons echt geholpen. We kunnen nu zonder zorgen doorwerken, wat ons ook overkomt.',
      rating: 5
    },
    {
      name: 'Mark Hendriksen',
      role: 'IT Manager',
      company: 'BuildCorp',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop',
      content: 'Professioneel, betrouwbaar en altijd bereikbaar. De beste beslissing die we hebben genomen voor onze IT-infrastructuur.',
      rating: 5
    }
  ];

  const faqs = [
    {
      question: 'Hoe snel kan ik starten met werkplekbeheer?',
      answer: 'We kunnen binnen 48 uur na ondertekening van het contract beginnen met de onboarding. De volledige implementatie duurt gemiddeld 1-2 weken, afhankelijk van de grootte van uw organisatie.'
    },
    {
      question: 'Wat gebeurt er als een werkplek uitvalt?',
      answer: 'Bij een uitval reageert ons team binnen 15 minuten. We hebben een gemiddelde oplostijd van minder dan 2 uur. Voor kritieke systemen bieden we een SLA met 99.9% uptime garantie.'
    },
    {
      question: 'Kunnen jullie ook bestaande systemen overnemen?',
      answer: 'Absoluut! We voeren eerst een gratis IT-scan uit om uw huidige situatie in kaart te brengen. Daarna maken we een plan om uw systemen over te nemen zonder downtime.'
    },
    {
      question: 'Welke software en tools beheren jullie?',
      answer: 'We beheren alle gangbare zakelijke software zoals Microsoft 365, Google Workspace, Adobe Creative Cloud, en honderden andere applicaties. Ook custom software kan worden beheerd.'
    },
    {
      question: 'Is er een minimum contract periode?',
      answer: 'Onze standaard contracten lopen voor 12 maanden. Dit zorgt voor continuïteit en stabiliteit. Na deze periode kunt u maandelijks opzeggen.'
    },
    {
      question: 'Wat kost werkplekbeheer voor mijn bedrijf?',
      answer: 'De kosten zijn afhankelijk van het aantal werkplekken en het gekozen pakket. Starter begint bij €49 per werkplek per maand. Neem contact op voor een persoonlijke offerte.'
    }
  ];

  const stats = [
    { value: '500+', label: 'Beheerde werkplekken', icon: Laptop, color: 'from-blue-500 to-cyan-500' },
    { value: '99.9%', label: 'Uptime garantie', icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
    { value: '<15min', label: 'Reactietijd', icon: Clock, color: 'from-orange-500 to-red-500' },
    { value: '24/7', label: 'Support beschikbaar', icon: Headset, color: 'from-purple-500 to-pink-500' }
  ];

  return (
    <>
      <SEO 
        title="Professioneel Werkplekbeheer | Systeemlink"
        description="Volledig ontzorgd met ons werkplekbeheer. 24/7 support, proactive monitoring en 99.9% uptime garantie. Vraag nu een gratis IT-scan aan!"
        keywords="werkplekbeheer, IT beheer, werkplek support, Microsoft 365 beheer, cloud werkplek"
      />

      {/* Animated cursor follower */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-30 transition duration-300"
        animate={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(14, 165, 233, 0.15), transparent 80%)`
        }}
      />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white">
        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-20">
          <motion.div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(14, 165, 233, 0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(14, 165, 233, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
            animate={{
              backgroundPosition: ['0px 0px', '50px 50px']
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        {/* Floating gradient orbs */}
        <FloatingElement delay={0}>
          <motion.div 
            className="absolute top-20 left-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-30"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </FloatingElement>
        
        <FloatingElement delay={1}>
          <motion.div 
            className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-30"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </FloatingElement>

        <FloatingElement delay={2}>
          <motion.div 
            className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500 rounded-full blur-3xl opacity-20"
            animate={{
              scale: [1, 1.3, 1],
              x: [-50, 50, -50],
              y: [-50, 50, -50]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </FloatingElement>

        <motion.div 
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32"
          style={{ scale: scaleProgress, opacity: opacityProgress }}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <Badge className="mb-6 bg-blue-500/20 text-blue-200 border-blue-400/30 backdrop-blur-sm">
                  <Award className="w-3 h-3 mr-1" />
                  Microsoft Certified Partner
                </Badge>
              </motion.div>
              
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                Volledig ontzorgd met{' '}
                <motion.span 
                  className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent bg-[length:200%_auto]"
                  animate={{
                    backgroundPosition: ['0% center', '200% center', '0% center']
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  professioneel werkplekbeheer
                </motion.span>
              </motion.h1>
              
              <motion.p 
                className="text-xl text-gray-300 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                Focus op uw bedrijf, terwijl wij uw IT beheren. 24/7 support, proactive monitoring en 99.9% uptime garantie. Vanaf €49 per werkplek per maand.
              </motion.p>

              {/* Animated USPs */}
              <motion.div 
                className="grid sm:grid-cols-2 gap-4 mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {[
                  { icon: CheckCircle2, text: '24/7 Support beschikbaar', color: 'from-green-400 to-emerald-400' },
                  { icon: Shield, text: '99.9% Uptime garantie', color: 'from-blue-400 to-cyan-400' },
                  { icon: Clock, text: '<15 min reactietijd', color: 'from-orange-400 to-red-400' },
                  { icon: Award, text: 'Microsoft Partner', color: 'from-purple-400 to-pink-400' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3 group"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div 
                      className={`w-10 h-10 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0 shadow-lg`}
                      whileHover={{ 
                        scale: 1.1,
                        rotate: 360
                      }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 260, 
                        damping: 20 
                      }}
                    >
                      <item.icon className="w-5 h-5 text-white" />
                    </motion.div>
                    <span className="text-gray-200 group-hover:text-white transition-colors">{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Buttons with magnetic effect */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <MagneticButton>
                  <a href="#contact">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 h-14 px-8 shadow-2xl shadow-blue-500/50 relative overflow-hidden group">
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500"
                          initial={{ x: '100%' }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                        <span className="relative z-10 flex items-center gap-2">
                          Gratis IT-scan aanvragen
                          <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <ArrowRight className="w-5 h-5" />
                          </motion.div>
                        </span>
                      </Button>
                    </motion.div>
                  </a>
                </MagneticButton>
                
                <MagneticButton>
                  <a href="#packages">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-white/30 text-white hover:bg-white hover:text-blue-900 h-14 px-8 backdrop-blur-sm">
                        Bekijk pakketten
                      </Button>
                    </motion.div>
                  </a>
                </MagneticButton>
              </motion.div>
            </div>

            {/* Right Content - Animated Stats Card */}
            <motion.div
              initial={{ opacity: 0, x: 50, rotateY: -15 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                whileHover={{ 
                  scale: 1.02,
                  rotateY: 5,
                  rotateX: 5
                }}
                style={{
                  transformStyle: 'preserve-3d',
                  perspective: 1000
                }}
              >
                <Card className="p-8 bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl relative overflow-hidden">
                  {/* Animated border gradient */}
                  <motion.div
                    className="absolute inset-0 opacity-50"
                    animate={{
                      background: [
                        'linear-gradient(45deg, rgba(14, 165, 233, 0.2), rgba(168, 85, 247, 0.2))',
                        'linear-gradient(90deg, rgba(168, 85, 247, 0.2), rgba(14, 165, 233, 0.2))',
                        'linear-gradient(45deg, rgba(14, 165, 233, 0.2), rgba(168, 85, 247, 0.2))'
                      ]
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                  />
                  
                  <div className="relative z-10">
                    <h3 className="text-2xl mb-6 text-white flex items-center gap-2">
                      <Sparkles className="w-6 h-6 text-cyan-400" />
                      Waarom Systeemlink?
                    </h3>
                    <div className="space-y-6">
                      {stats.map((stat, index) => (
                        <motion.div 
                          key={index}
                          className="flex items-center gap-4 group"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                          whileHover={{ x: 10 }}
                        >
                          <motion.div 
                            className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center flex-shrink-0 shadow-lg`}
                            whileHover={{ 
                              scale: 1.1,
                              rotate: [0, -10, 10, 0]
                            }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <stat.icon className="w-7 h-7 text-white" />
                          </motion.div>
                          <div>
                            <motion.div 
                              className="text-3xl text-white"
                              whileHover={{ scale: 1.1 }}
                            >
                              {stat.value}
                            </motion.div>
                            <div className="text-sm text-gray-300">{stat.label}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Animated scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2">
              <motion.div 
                className="w-1.5 h-3 bg-white rounded-full"
                animate={{ 
                  y: [0, 12, 0],
                  opacity: [1, 0.3, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity 
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Animated divider */}
      <div className="relative h-24 bg-gradient-to-b from-indigo-950 to-gray-50 dark:to-gray-900 overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%']
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundImage: 'linear-gradient(45deg, transparent 30%, rgba(14, 165, 233, 0.3) 50%, transparent 70%)',
            backgroundSize: '200% 200%'
          }}
        />
      </div>

      {/* Trusted By Section with scroll animation */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p 
            className="text-center text-sm text-gray-600 dark:text-gray-400 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Vertrouwd door bedrijven en gecertificeerd door
          </motion.p>
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {['Microsoft Partner', 'Dell Technologies', 'HP Enterprise', 'Cisco Systems', 'VMware', 'Fortinet'].map((company, index) => (
              <motion.div 
                key={index} 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1, y: -5 }}
              >
                <div className="flex items-center justify-center h-12 gap-2">
                  <Building2 className="w-8 h-8 text-gray-400 dark:text-gray-600" />
                  <span className="text-gray-600 dark:text-gray-400 text-sm">{company}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Problem/Solution Section with parallax */}
      <section className="py-24 bg-white dark:bg-gray-950 overflow-hidden relative">
        <ParallaxSection speed={0.3}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              >
                <Badge className="mb-4">De uitdaging</Badge>
              </motion.div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl mb-6">
                Herkenbaar? Deze <motion.span 
                  className="text-red-600"
                  animate={{ 
                    textShadow: [
                      '0 0 0px rgba(220, 38, 38, 0)',
                      '0 0 20px rgba(220, 38, 38, 0.5)',
                      '0 0 0px rgba(220, 38, 38, 0)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  IT-problemen
                </motion.span> kosten u tijd en geld
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {[
                { title: 'Langzame computers', description: 'Werknemers besteden uren per week aan wachten op trage systemen', icon: Gauge },
                { title: 'Veiligheidsrisico\'s', description: 'Verouderde software en ontbrekende updates maken u kwetsbaar', icon: Shield },
                { title: 'Onverwachte downtime', description: 'Storingen kosten gemiddeld €5.000 per uur aan productiviteitsverlies', icon: TrendingUp },
                { title: 'Geen IT-expertise', description: 'IT-problemen oplossen terwijl u daar niet voor opgeleid bent', icon: Users }
              ].map((problem, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, rotateX: -15 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ 
                    y: -10,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                >
                  <Card className="p-6 border-2 border-red-200 dark:border-red-900 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 relative overflow-hidden group">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/10 to-red-500/0"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-3">
                        <motion.div
                          className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <problem.icon className="w-6 h-6 text-white" />
                        </motion.div>
                        <h3 className="text-xl text-red-900 dark:text-red-400">{problem.title}</h3>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">{problem.description}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="p-12 bg-gradient-to-br from-green-50 via-emerald-50 to-green-50 dark:from-green-950/20 dark:via-emerald-950/20 dark:to-green-950/20 border-2 border-green-200 dark:border-green-800 relative overflow-hidden">
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    background: [
                      'radial-gradient(circle at 0% 0%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)',
                      'radial-gradient(circle at 100% 100%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)',
                      'radial-gradient(circle at 0% 0%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)'
                    ]
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                />
                <div className="text-center relative z-10">
                  <motion.div 
                    className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/50"
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity }
                    }}
                  >
                    <CheckCircle2 className="w-10 h-10 text-white" />
                  </motion.div>
                  <h3 className="text-3xl mb-4">Wij nemen al uw IT-zorgen weg</h3>
                  <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                    Met ons werkplekbeheer zorgen we dat uw systemen altijd optimaal werken, beveiligd zijn en up-to-date blijven. U focust op uw bedrijf, wij op uw IT.
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>
        </ParallaxSection>
      </section>

      {/* Features Section with stagger animation */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        {/* Animated background pattern */}
        <motion.div
          className="absolute inset-0 opacity-5"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%230ea5e9" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            backgroundSize: '60px 60px'
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-4">Onze diensten</Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-6">
              Alles voor uw{' '}
              <motion.span 
                className="bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent bg-[length:200%_auto]"
                animate={{
                  backgroundPosition: ['0% center', '200% center', '0% center']
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                werkplekbeheer
              </motion.span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Van monitoring tot support, van beveiliging tot cloud - wij regelen het allemaal
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: index * 0.1,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <motion.div
                  whileHover={{ 
                    y: -10,
                    rotateY: 5,
                    rotateX: 5
                  }}
                  style={{
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <Card className={`p-8 h-full border-2 hover:border-blue-200 dark:hover:border-blue-800 relative overflow-hidden group ${feature.gradient}`}>
                    {/* Shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                    />
                    
                    <div className="relative z-10">
                      <motion.div 
                        className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg`}
                        whileHover={{ 
                          scale: 1.1,
                          rotate: [0, -10, 10, -10, 0]
                        }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 260, 
                          damping: 20 
                        }}
                      >
                        <feature.icon className="w-8 h-8 text-white" />
                      </motion.div>
                      <h3 className="text-2xl mb-3">{feature.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section with 3D cards */}
      <section id="packages" className="py-24 bg-white dark:bg-gray-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-4">Pakketten</Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-6">
              Kies het pakket dat bij u past
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Transparante prijzen, geen verborgen kosten. Altijd maandelijks opzegbaar na de eerste 12 maanden.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateY: -10 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: index * 0.15,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <motion.div
                  whileHover={{ 
                    scale: pkg.highlighted ? 1.05 : 1.02,
                    y: -10,
                    rotateY: 5,
                    rotateX: 5
                  }}
                  style={{
                    transformStyle: 'preserve-3d',
                    perspective: 1000
                  }}
                  className="h-full"
                >
                  <Card className={`p-8 h-full flex flex-col relative overflow-hidden ${
                    pkg.highlighted 
                      ? 'border-4 border-blue-500 dark:border-blue-600 shadow-2xl shadow-blue-500/50' 
                      : 'border-2 border-gray-200 dark:border-gray-800'
                  }`}>
                    {/* Animated gradient background */}
                    {pkg.highlighted && (
                      <motion.div
                        className="absolute inset-0 opacity-10"
                        animate={{
                          background: [
                            'linear-gradient(45deg, #3b82f6, #06b6d4)',
                            'linear-gradient(90deg, #06b6d4, #3b82f6)',
                            'linear-gradient(45deg, #3b82f6, #06b6d4)'
                          ]
                        }}
                        transition={{ duration: 5, repeat: Infinity }}
                      />
                    )}

                    {pkg.highlighted && (
                      <motion.div 
                        className="absolute -top-4 left-1/2 -translate-x-1/2"
                        animate={{ 
                          y: [0, -5, 0],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity
                        }}
                      >
                        <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0 px-6 py-1 shadow-lg shadow-blue-500/50">
                          <Star className="w-3 h-3 mr-1" />
                          Meest gekozen
                        </Badge>
                      </motion.div>
                    )}
                    
                    <div className="text-center mb-6 relative z-10">
                      <motion.h3 
                        className="text-2xl mb-2"
                        whileHover={{ scale: 1.05 }}
                      >
                        {pkg.name}
                      </motion.h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{pkg.subtitle}</p>
                      <motion.div 
                        className="mb-2"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <span className="text-5xl">{pkg.price}</span>
                      </motion.div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{pkg.period}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">{pkg.description}</p>
                    </div>

                    <div className="flex-grow relative z-10">
                      <ul className="space-y-3 mb-8">
                        {pkg.features.map((feature, idx) => (
                          <motion.li 
                            key={idx} 
                            className="flex items-start gap-2"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05 }}
                            whileHover={{ x: 5 }}
                          >
                            <motion.div
                              whileHover={{ scale: 1.2, rotate: 360 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            </motion.div>
                            <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div className="relative z-10">
                      <MagneticButton className="w-full">
                        <a href="#contact" className="block">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button 
                              className={`w-full h-12 ${
                                pkg.highlighted 
                                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0' 
                                  : ''
                              }`}
                              variant={pkg.highlighted ? 'default' : 'outline'}
                            >
                              {pkg.name === 'Enterprise' ? 'Neem contact op' : 'Start nu'}
                              <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                          </motion.div>
                        </a>
                      </MagneticButton>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section with rotation effect */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-4">Testimonials</Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-6">
              Wat onze klanten zeggen
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: index * 0.15,
                  duration: 0.6
                }}
              >
                <motion.div
                  whileHover={{ 
                    y: -15,
                    rotateY: 5,
                    rotateX: 5,
                    scale: 1.02
                  }}
                  style={{
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <Card className="p-8 h-full bg-white dark:bg-gray-800 relative overflow-hidden group">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    <Quote className="absolute top-6 right-6 w-12 h-12 text-blue-100 dark:text-blue-900 opacity-50" />
                    
                    <div className="relative z-10">
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                            whileHover={{ scale: 1.2, rotate: 360 }}
                          >
                            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          </motion.div>
                        ))}
                      </div>

                      <p className="text-gray-700 dark:text-gray-300 mb-6 italic">
                        "{testimonial.content}"
                      </p>

                      <div className="flex items-center gap-4">
                        <motion.img 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          className="w-14 h-14 rounded-full object-cover ring-2 ring-blue-500/20"
                          whileHover={{ scale: 1.1, rotate: 360 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        />
                        <div>
                          <div>{testimonial.name}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {testimonial.role}, {testimonial.company}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section with accordion animation */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-4">Veelgestelde vragen</Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-6">
              Heeft u nog vragen?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Hier vindt u antwoorden op de meest gestelde vragen
            </p>
          </motion.div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <AccordionItem 
                  value={`item-${index}`} 
                  className="border-2 border-gray-200 dark:border-gray-800 rounded-lg px-6 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-6">
                    <span className="text-lg pr-4">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-400 pb-6 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact Form Section with glass morphism */}
      <section id="contact" className="py-24 bg-gradient-to-br from-blue-600 via-cyan-600 to-indigo-600 text-white relative overflow-hidden">
        {/* Animated background elements */}
        <FloatingElement delay={0}>
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        </FloatingElement>
        <FloatingElement delay={1}>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl" />
        </FloatingElement>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              Gratis & vrijblijvend
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-6">
              Vraag nu een gratis IT-scan aan
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Ontdek binnen 48 uur waar uw IT-infrastructuur voor staat en krijg concrete verbetervoorstellen
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="p-8 md:p-12 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-2 border-white/20 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                  >
                    <label className="block text-sm mb-2 text-gray-900 dark:text-gray-100">
                      Naam *
                    </label>
                    <Input 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Uw volledige naam"
                      className="h-12"
                    />
                  </motion.div>
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                  >
                    <label className="block text-sm mb-2 text-gray-900 dark:text-gray-100">
                      E-mail *
                    </label>
                    <Input 
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="uw@email.nl"
                      className="h-12"
                    />
                  </motion.div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                  >
                    <label className="block text-sm mb-2 text-gray-900 dark:text-gray-100">
                      Telefoonnummer *
                    </label>
                    <Input 
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="06 12345678"
                      className="h-12"
                    />
                  </motion.div>
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                  >
                    <label className="block text-sm mb-2 text-gray-900 dark:text-gray-100">
                      Bedrijfsnaam *
                    </label>
                    <Input 
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      placeholder="Uw bedrijf BV"
                      className="h-12"
                    />
                  </motion.div>
                </div>

                <motion.div
                  whileFocus={{ scale: 1.02 }}
                >
                  <label className="block text-sm mb-2 text-gray-900 dark:text-gray-100">
                    Aantal werkplekken
                  </label>
                  <Input 
                    value={formData.employees}
                    onChange={(e) => setFormData({...formData, employees: e.target.value})}
                    placeholder="Bijv. 10-25"
                    className="h-12"
                  />
                </motion.div>

                <motion.div
                  whileFocus={{ scale: 1.02 }}
                >
                  <label className="block text-sm mb-2 text-gray-900 dark:text-gray-100">
                    Bericht (optioneel)
                  </label>
                  <Textarea 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Vertel ons iets over uw situatie..."
                    rows={4}
                  />
                </motion.div>

                <MagneticButton className="w-full">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      type="submit"
                      size="lg"
                      className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 h-14 relative overflow-hidden group"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Gratis IT-scan aanvragen
                        <ArrowRight className="w-5 h-5" />
                      </span>
                    </Button>
                  </motion.div>
                </MagneticButton>

                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                  Door dit formulier in te vullen gaat u akkoord met onze privacyverklaring
                </p>
              </form>
            </Card>
          </motion.div>

          {/* Contact Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              { icon: Phone, text: '+31 613777733', label: 'Bel ons direct', color: 'from-green-400 to-emerald-400' },
              { icon: Mail, text: 'info@systeemlink.nl', label: 'Stuur een email', color: 'from-blue-400 to-cyan-400' },
              { icon: MessageSquare, text: 'Live chat', label: 'Chat met ons', color: 'from-purple-400 to-pink-400' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.05 }}
              >
                <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 text-center hover:bg-white/20 transition-all cursor-pointer">
                  <motion.div
                    className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <item.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <div className="text-sm text-white/80 mb-1">{item.label}</div>
                  <div className="text-white">{item.text}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA with rocket animation */}
      <section className="py-16 bg-gray-900 text-white relative overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundImage: 'linear-gradient(45deg, #3b82f6 25%, transparent 25%, transparent 75%, #3b82f6 75%, #3b82f6)',
            backgroundSize: '40px 40px'
          }}
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="inline-block mb-6"
            >
              <Rocket className="w-16 h-16 text-cyan-400" />
            </motion.div>
            
            <h3 className="text-2xl md:text-3xl mb-4">
              Klaar om uw IT zorgeloos te maken?
            </h3>
            <p className="text-gray-400 mb-6">
              Meer dan 200 bedrijven gingen u voor. Start vandaag nog met professioneel werkplekbeheer.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton>
                <a href="#contact">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 h-14 px-8">
                      Gratis IT-scan aanvragen
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </motion.div>
                </a>
              </MagneticButton>
              
              <MagneticButton>
                <a href="#packages">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-gray-900 h-14 px-8">
                      Bekijk pakketten
                    </Button>
                  </motion.div>
                </a>
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
