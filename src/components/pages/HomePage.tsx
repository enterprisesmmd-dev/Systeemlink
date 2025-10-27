import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Laptop, CloudCog, ShieldCheck, Headset, Check, ArrowRight, Zap, Award } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { HeroSlider } from '../HeroSlider';
import { SEO } from '../SEO';

export function HomePage() {
  const [cmsContent, setCmsContent] = useState<any>(null);

  useEffect(() => {
    // Load CMS content from localStorage
    const storedContent = localStorage.getItem('cms-content');
    if (storedContent) {
      try {
        const content = JSON.parse(storedContent);
        setCmsContent(content.home);
      } catch (e) {
        console.error('Failed to parse CMS content:', e);
      }
    }
  }, []);

  // Get slider content from CMS
  const sliderSection = cmsContent?.sections?.find((s: any) => s.type === 'slider');
  const sliderData = sliderSection?.content?.slides;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <SEO 
        title={cmsContent?.seo?.title || "Systeemlink - Werkplekbeheer & IT-oplossingen voor bedrijven"}
        description={cmsContent?.seo?.description || "Professioneel werkplekbeheer en complete IT-oplossingen voor het MKB. Cloud, beveiliging, support en meer. ✓ 99.9% uptime ✓ 24/7 support ✓ Vaste prijzen"}
        keywords={cmsContent?.seo?.keywords || "werkplekbeheer, IT-beheer, managed services, cloud oplossingen, IT-support, MKB, Microsoft 365"}
      />

      {/* Hero Slider - CMS Driven */}
      <HeroSlider slides={sliderData} />

      {/* Services Grid with Bento Layout */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400">Onze diensten</Badge>
            <h2 className="text-4xl lg:text-5xl mb-4 text-gray-900 dark:text-gray-100">
              Complete IT-oplossingen
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Van werkplekbeheer tot cloudmigraties - alles onder één dak
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Large Card - Werkplekbeheer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="lg:row-span-2"
            >
              <Link to="/oplossingen/werkplekbeheer">
                <Card className="group h-full overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-sky-500 to-blue-600 text-white">
                  <div className="p-8 h-full flex flex-col justify-between">
                    <div>
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <Laptop className="w-8 h-8" />
                      </div>
                      <h3 className="text-3xl mb-4">Werkplekbeheer</h3>
                      <p className="text-white/90 mb-6 text-lg">
                        Volledige beheer van al uw werkplekken inclusief updates, beveiliging en monitoring. 
                        Van laptops tot desktops, wij zorgen voor optimale performance.
                      </p>
                      <ul className="space-y-3 mb-6">
                        {['Device Management', 'Security & Compliance', 'Automatische Updates', '24/7 Remote Support'].map(item => (
                          <li key={item} className="flex items-center gap-2 text-white/90">
                            <Check className="w-5 h-5 text-emerald-300" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-center gap-2 text-white group-hover:gap-4 transition-all">
                      <span className="text-lg">Meer informatie</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>

            {/* Cloud & Microsoft 365 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link to="/oplossingen/cloud-microsoft-365">
                <Card className="group h-full overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white">
                  <div className="p-8">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <CloudCog className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl mb-3">Cloud & Microsoft 365</h3>
                    <p className="text-white/90 mb-4">
                      Migratie naar en beheer van Microsoft 365, Azure en andere cloudoplossingen.
                    </p>
                    <div className="flex items-center gap-2 text-white group-hover:gap-4 transition-all">
                      <span>Ontdek meer</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>

            {/* Netwerk & Beveiliging */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Link to="/oplossingen/netwerk-beveiliging">
                <Card className="group h-full overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-violet-500 to-purple-600 text-white">
                  <div className="p-8">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <ShieldCheck className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl mb-3">Netwerk & Beveiliging</h3>
                    <p className="text-white/90 mb-4">
                      Beveilig uw netwerk met firewalls, VPN en geavanceerde beveiligingsoplossingen.
                    </p>
                    <div className="flex items-center gap-2 text-white group-hover:gap-4 transition-all">
                      <span>Ontdek meer</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>

            {/* IT-Support - Full Width */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2"
            >
              <Link to="/oplossingen/it-support">
                <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
                  <div className="p-8 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Headset className="w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="text-3xl mb-2">IT-Support & Monitoring</h3>
                        <p className="text-white/90 text-lg mb-3">
                          24/7 helpdesk support voor al uw IT-vragen en problemen.
                        </p>
                        <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm">
                          &lt;15 min reactietijd
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
                  </div>
                </Card>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400">Vertrouwd door</Badge>
            <h2 className="text-4xl lg:text-5xl mb-4 text-gray-900 dark:text-gray-100">
              200+ bedrijven gingen u voor
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Van startup tot enterprise - wij zijn er voor elk bedrijf
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Award, title: 'MKB Bedrijven', description: 'Volledig IT-beheer voor groeiende bedrijven', count: '150+' },
              { icon: Award, title: 'Enterprise', description: 'Complexe infrastructuren en dedicated support', count: '30+' },
              { icon: Award, title: 'Startups', description: 'Schaalbare oplossingen voor snelle groei', count: '20+' }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-8 hover:shadow-lg dark:hover:shadow-gray-900/50 transition-shadow bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl mb-2 bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">
                    {item.count}
                  </div>
                  <h3 className="text-xl mb-2 text-gray-900 dark:text-gray-100">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Card className="overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-sky-600 via-blue-700 to-indigo-900 text-white">
              <div className="p-12 lg:p-16 text-center relative">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
                  <div className="absolute bottom-10 right-10 w-64 h-64 bg-sky-300 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10">
                  <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm">
                    Gratis & vrijblijvend
                  </Badge>
                  <h2 className="text-4xl lg:text-5xl mb-6">
                    Klaar om uw IT te transformeren?
                  </h2>
                  <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                    Plan een vrijblijvende IT-scan en ontdek hoe wij uw bedrijf kunnen helpen groeien.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Link to="/it-check">
                      <Button size="lg" className="h-14 px-8 bg-white text-sky-600 hover:bg-gray-100 shadow-xl">
                        <Zap className="w-5 h-5 mr-2" />
                        Gratis IT-scan aanvragen
                      </Button>
                    </Link>
                    <Link to="/bedrijfsinformatie/contact">
                      <Button size="lg" className="h-14 px-8 bg-transparent border-2 border-white text-white hover:bg-white hover:text-sky-600 transition-colors">
                        Contact opnemen
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function StatsItem({ value, label, icon, color }: { value: string; label: string; icon: React.ReactNode; color: string }) {
  return (
    <div className="text-center">
      <div className={`flex justify-center mb-3 ${color}`}>
        {icon}
      </div>
      <div className="text-3xl lg:text-4xl mb-1">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
}