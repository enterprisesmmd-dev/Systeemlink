import { Briefcase, Heart, ShoppingCart, HardHat, CheckCircle2, Users, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { StatsBar } from '../StatsBar';
import { PageHero, ContentSection, GridSection, CTASection, FeatureSection } from '../sections';
import { pageColors } from '../../lib/theme-colors';

export function BranchesPage() {
  const themeColor = pageColors.branches;

  const sectors = [
    {
      icon: Briefcase,
      title: 'Zakelijke dienstverlening',
      description: 'IT-oplossingen voor advocatenkantoren, accountants, consultancy en financiële dienstverlening.',
      link: '/branches/zakelijke-dienstverlening',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
      features: ['Compliance & beveiliging', 'Klantportalen', 'Document management']
    },
    {
      icon: Heart,
      title: 'Zorg & onderwijs',
      description: 'Veilige en betrouwbare IT voor zorginstellingen, scholen en onderwijsinstellingen met NEN 7510.',
      link: '/branches/zorg-onderwijs',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
      features: ['NEN 7510 compliant', 'Privacy waarborging', 'Digitaal leren']
    },
    {
      icon: ShoppingCart,
      title: 'Retail & logistiek',
      description: 'Betrouwbare systemen voor webshops, groothandel en logistieke organisaties.',
      link: '/branches/retail-logistiek',
      image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
      features: ['POS systemen', 'Inventory management', '24/7 beschikbaarheid']
    },
    {
      icon: HardHat,
      title: 'Bouw & industrie',
      description: 'Robuuste IT-infrastructuur voor bouwbedrijven, productie en technische dienstverlening.',
      link: '/branches/bouw-industrie',
      image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
      features: ['Mobile werkplekken', 'Projectmanagement tools', 'CAD/BIM ondersteuning']
    }
  ];

  const benefits = [
    {
      icon: CheckCircle2,
      title: 'Branche-specifieke kennis',
      description: 'We kennen de uitdagingen en regelgeving van uw sector'
    },
    {
      icon: Users,
      title: 'Referenties beschikbaar',
      description: 'Bewezen track record in uw branche'
    },
    {
      icon: TrendingUp,
      title: 'Best practices',
      description: 'Profiteer van onze ervaring in vergelijkbare organisaties'
    }
  ];

  return (
    <div>
      <SEO
        title="IT-oplossingen per branche | Systeemlink"
        description="Branche-specifieke IT-oplossingen voor zakelijke dienstverlening, zorg, retail en bouw. Expertise in compliance, beveiliging en sector-specifieke software."
        keywords="IT per branche, zakelijke IT, zorg IT, retail IT, bouw IT, NEN 7510, sector IT-oplossingen"
        canonical="https://systeemlink.nl/branches"
      />

      <PageHero
        badge={{ text: 'Sector Expertise' }}
        title="IT-oplossingen voor elke branche"
        description="Wij begrijpen de unieke IT-uitdagingen van uw sector. Van compliance tot specifieke software - wij hebben de expertise en ervaring."
        gradient={themeColor.gradient}
        buttons={[
          { text: 'Bekijk uw branche', link: '#sectors', variant: 'primary' },
          { text: 'Neem contact op', link: '/bedrijfsinformatie/contact', variant: 'secondary' }
        ]}
      />

      <StatsBar />

      <ContentSection
        title="Onze branches"
        description="Specifieke IT-oplossingen voor uw branche"
        background="white"
      >
        <GridSection items={sectors} columns={2} variant="image" />
      </ContentSection>

      <ContentSection
        badge={{ text: 'Waarom branche-expertise' }}
        title="Het voordeel van specialistische kennis"
        description="Sector-specifieke IT vraagt om sector-specifieke expertise"
        background="gray"
      >
        <FeatureSection items={benefits} columns={3} variant="grid" />
      </ContentSection>

      <CTASection
        badge={{ text: 'Laten we kennismaken' }}
        title="Ontdek wat we voor uw branche kunnen betekenen"
        description="Vraag een vrijblijvend gesprek aan en ontdek hoe we andere bedrijven in uw sector helpen."
        gradient={themeColor.gradient}
        buttons={[
          { text: 'Plan een gesprek', link: '/bedrijfsinformatie/contact', variant: 'primary' },
          { text: 'Gratis IT-check', link: '/it-check', variant: 'secondary' }
        ]}
      />
    </div>
  );
}