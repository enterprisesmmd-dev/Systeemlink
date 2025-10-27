import { ShoppingCart, Truck, Smartphone, Cloud, Shield, Zap, CheckCircle2, TrendingUp } from 'lucide-react';
import { SEO } from '../SEO';
import { StatsBar } from '../StatsBar';
import { PageHero, ContentSection, GridSection, CTASection, FeatureSection } from '../sections';

export function RetailLogisticsPage() {
  const services = [
    {
      icon: ShoppingCart,
      title: 'Retail & Webshops',
      description: 'Betrouwbare IT voor fysieke winkels en e-commerce met 24/7 beschikbaarheid',
      features: ['POS systemen', 'E-commerce platforms', 'Inventory management']
    },
    {
      icon: Truck,
      title: 'Logistiek & Distributie',
      description: 'Geavanceerde IT voor warehouse management en transport optimalisatie',
      features: ['WMS integratie', 'Track & trace', 'Route optimalisatie']
    },
    {
      icon: Smartphone,
      title: 'Mobiele oplossingen',
      description: 'Scanners, handhelds en mobiele werkplekken voor efficiënte operations',
      features: ['Mobile device management', 'Barcode scanning', 'Real-time data sync']
    },
    {
      icon: Cloud,
      title: '24/7 Systemen',
      description: 'High-availability infrastructuur voor continue beschikbaarheid',
      features: ['Redundant systems', 'Backup & disaster recovery', 'Proactive monitoring']
    }
  ];

  const benefits = [
    { icon: TrendingUp, title: 'Schaalbaarheid', description: 'Groei mee met uw bedrijf' },
    { icon: CheckCircle2, title: 'Betrouwbaar', description: '99.9% uptime garantie' },
    { icon: Shield, title: 'Beveiligd', description: 'Geavanceerde beveiligingsmaatregelen' },
    { icon: Zap, title: 'Snel', description: 'Snelle en efficiënte systemen' }
  ];

  return (
    <div>
      <SEO
        title="IT voor Retail & Logistiek - 24/7 Beschikbaarheid | Systeemlink"
        description="Gespecialiseerde IT voor retail en logistiek. POS systemen, WMS, inventory management en 24/7 support voor maximale beschikbaarheid."
        keywords="retail IT, logistiek IT, POS systemen, WMS, inventory management, e-commerce IT, warehouse IT"
        canonical="https://systeemlink.nl/branches/retail-logistiek"
      />

      <PageHero
        breadcrumbs={[
          { label: 'Branches', path: '/branches' },
          { label: 'Retail & logistiek', path: '/branches/retail-logistiek' }
        ]}
        badge={{ text: 'Retail & Logistiek' }}
        title="IT-oplossingen voor retail en logistiek"
        description="Betrouwbare systemen met 24/7 beschikbaarheid voor webshops, groothandel en logistieke organisaties."
        gradient="from-amber-600 via-orange-700 to-red-800"
        buttons={[
          { text: 'Neem contact op', link: '/bedrijfsinformatie/contact', variant: 'primary' },
          { text: 'Gratis IT-check', link: '/it-check', variant: 'secondary' }
        ]}
      />

      <StatsBar />

      <ContentSection
        badge={{ text: 'Onze diensten' }}
        title="IT-oplossingen voor retail en logistiek"
        description="Specialist in high-availability systemen"
        background="white"
      >
        <GridSection items={services} columns={2} variant="icon" />
      </ContentSection>

      <ContentSection
        badge={{ text: 'De voordelen' }}
        title="Waarom Systeemlink voor retail en logistiek?"
        description="Betrouwbare IT met 24/7 beschikbaarheid"
        background="gray"
      >
        <FeatureSection items={benefits} columns={4} variant="grid" />
      </ContentSection>

      <CTASection
        badge={{ text: 'Sector expertise' }}
        title="Ontdek wat we voor uw bedrijf kunnen betekenen"
        description="Plan een vrijblijvend gesprek en ontdek hoe we andere retail en logistieke bedrijven helpen."
        gradient="from-amber-600 via-orange-700 to-red-800"
        buttons={[
          { text: 'Plan een gesprek', link: '/bedrijfsinformatie/contact', variant: 'primary' },
          { text: 'Gratis IT-check', link: '/it-check', variant: 'secondary' }
        ]}
      />
    </div>
  );
}