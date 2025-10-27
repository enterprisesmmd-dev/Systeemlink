// Content extractor - haalt alle content uit de pagina's en structureert het voor de CMS

export interface CMSPageContent {
  id: string;
  name: string;
  path: string;
  sections: CMSSection[];
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
}

export interface CMSSection {
  id: string;
  type: 'hero' | 'slider' | 'content' | 'stats' | 'features' | 'cta' | 'cards' | 'timeline' | 'pricing' | 'team' | 'testimonials' | 'faq' | 'form';
  title: string;
  content: Record<string, any>;
  order: number;
}

export const initialCMSContent: Record<string, CMSPageContent> = {
  home: {
    id: 'home',
    name: 'Homepage',
    path: '/',
    seo: {
      title: 'Systeemlink - Werkplekbeheer & IT-oplossingen voor bedrijven',
      description: 'Professioneel werkplekbeheer en complete IT-oplossingen voor het MKB. Cloud, beveiliging, support en meer. ✓ 99.9% uptime ✓ 24/7 support ✓ Vaste prijzen',
      keywords: 'werkplekbeheer, IT-beheer, managed services, cloud oplossingen, IT-support, MKB, Microsoft 365'
    },
    sections: [
      {
        id: 'slider-1',
        type: 'slider',
        title: 'Hero Slider',
        order: 1,
        content: {
          slides: [
            {
              image: 'https://images.unsplash.com/photo-1599580546605-a86af98dbdb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2MTM4MzI1NXww&ixlib=rb-4.1.0&q=80&w=1080',
              title: 'Uw betrouwbare partner in IT-beheer',
              subtitle: 'Volledig ontzorgd',
              description: 'Wij nemen het volledige beheer van uw IT-infrastructuur uit handen. Van werkplekken tot cloud-omgevingen, zodat u zich kunt focussen op uw bedrijf.',
              ctaText: 'Vraag gratis IT-check aan',
              ctaLink: '/it-check'
            },
            {
              image: 'https://images.unsplash.com/photo-1506399558188-acca6f8cbf41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGRhdGElMjBjZW50ZXJ8ZW58MXx8fHwxNzYxNDQyMzE0fDA&ixlib=rb-4.1.0&q=80&w=1080',
              title: 'Proactive IT-oplossingen voor uw bedrijf',
              subtitle: '24/7 Monitoring & Support',
              description: 'Voorkom downtime met onze proactieve monitoring. Wij detecteren en verhelpen problemen voordat ze impact hebben op uw bedrijfsvoering.',
              ctaText: 'Ontdek onze oplossingen',
              ctaLink: '/oplossingen'
            },
            {
              image: 'https://images.unsplash.com/photo-1748256622734-92241ae7b43f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NjEzODAwNTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
              title: 'Microsoft 365 & Cloud transformatie',
              subtitle: 'Modern werken',
              description: 'Verhoog uw productiviteit met Microsoft 365. Wij helpen u met migratie, implementatie en volledig cloudbeheer voor veilig samenwerken overal.',
              ctaText: 'Naar Cloud oplossingen',
              ctaLink: '/oplossingen/cloud-microsoft-365'
            },
            {
              image: 'https://images.unsplash.com/photo-1746893737268-81fe686e6a51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXR3b3JrJTIwc2VydmVyJTIwaW5mcmFzdHJ1Y3R1cmV8ZW58MXx8fHwxNzYxNDQyMzE1fDA&ixlib=rb-4.1.0&q=80&w=1080',
              title: 'Cybersecurity voor het MKB',
              subtitle: 'Bescherm wat belangrijk is',
              description: 'In een digitale wereld vol dreigingen beschermen wij uw bedrijfsgegevens met enterprise-level beveiliging. Van firewalls tot 24/7 security monitoring.',
              ctaText: 'Beveilig uw bedrijf',
              ctaLink: '/oplossingen/netwerk-beveiliging'
            }
          ]
        }
      },
      {
        id: 'stats-1',
        type: 'stats',
        title: 'Cijfers die spreken',
        order: 2,
        content: {
          stats: [
            { value: '99.9%', label: 'Uptime garantie' },
            { value: '24/7', label: 'Support beschikbaar' },
            { value: '200+', label: 'Tevreden klanten' },
            { value: '<15 min', label: 'Reactietijd' }
          ]
        }
      },
      {
        id: 'features-1',
        type: 'features',
        title: 'Onze diensten',
        order: 3,
        content: {
          heading: 'Complete IT-oplossingen',
          description: 'Van werkplekbeheer tot cloudmigraties',
          features: [
            {
              icon: 'Monitor',
              title: 'Werkplekbeheer',
              description: 'Volledige beheer van al uw werkplekken inclusief updates, beveiliging en monitoring.',
              link: '/oplossingen/werkplekbeheer'
            },
            {
              icon: 'Cloud',
              title: 'Cloud & Microsoft 365',
              description: 'Migratie naar en beheer van Microsoft 365, Azure en andere cloudoplossingen.',
              link: '/oplossingen/cloud-microsoft-365'
            },
            {
              icon: 'Shield',
              title: 'Netwerk & Beveiliging',
              description: 'Beveilig uw netwerk met firewalls, VPN en geavanceerde beveiligingsoplossingen.',
              link: '/oplossingen/netwerk-beveiliging'
            },
            {
              icon: 'Headphones',
              title: 'IT-Support',
              description: '24/7 helpdesk support voor al uw IT-vragen en problemen.',
              link: '/oplossingen/it-support'
            }
          ]
        }
      },
      {
        id: 'cta-1',
        type: 'cta',
        title: 'Call to Action',
        order: 4,
        content: {
          heading: 'Klaar om uw IT te transformeren?',
          description: 'Plan een vrijblijvende IT-scan en ontdek hoe wij uw bedrijf kunnen helpen groeien.',
          buttonText: 'Gratis IT-scan aanvragen',
          buttonLink: '/it-check',
          backgroundColor: 'from-sky-500 to-blue-600'
        }
      }
    ]
  },

  workplace: {
    id: 'workplace',
    name: 'Werkplekbeheer',
    path: '/oplossingen/werkplekbeheer',
    seo: {
      title: 'Werkplekbeheer - Volledige beheer van uw IT-werkplekken | Systeemlink',
      description: 'Professioneel werkplekbeheer voor het MKB. ✓ Windows & Mac beheer ✓ Automatische updates ✓ Remote support ✓ Asset management ✓ Vaste maandprijs vanaf €45',
      keywords: 'werkplekbeheer, desktop management, laptop beheer, Windows beheer, Mac beheer, IT-beheer werkplekken, MDM'
    },
    sections: [
      {
        id: 'hero-workplace',
        type: 'hero',
        title: 'Hero Sectie',
        order: 1,
        content: {
          heading: 'Professioneel Werkplekbeheer',
          subtitle: 'Volledige controle en beheer van al uw werkplekken. Van laptops tot desktops, wij zorgen voor updates, beveiliging en optimale performance.',
          buttonText: 'IT-Check aanvragen',
          buttonLink: '/it-check',
          backgroundImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200'
        }
      },
      {
        id: 'features-workplace',
        type: 'features',
        title: 'Wat we bieden',
        order: 2,
        content: {
          heading: 'Complete werkplekoplossingen',
          description: 'Van beheer tot beveiliging, wij regelen het allemaal',
          features: [
            {
              icon: 'Monitor',
              title: 'Device Management',
              description: 'Centraal beheer van alle werkplekken met moderne MDM-tooling',
              link: ''
            },
            {
              icon: 'Shield',
              title: 'Security & Compliance',
              description: 'Automatische beveiligingsupdates en naleving van security policies',
              link: ''
            },
            {
              icon: 'Zap',
              title: 'Automatische Updates',
              description: 'Patches en updates worden automatisch geïnstalleerd buiten kantoortijden',
              link: ''
            },
            {
              icon: 'Headphones',
              title: '24/7 Remote Support',
              description: 'Directe hulp op afstand wanneer u dat nodig heeft',
              link: ''
            }
          ]
        }
      },
      {
        id: 'pricing-workplace',
        type: 'pricing',
        title: 'Prijzen',
        order: 3,
        content: {
          heading: 'Transparante prijzen',
          description: 'Kies het pakket dat bij uw bedrijf past',
          plans: [
            {
              name: 'Basic',
              price: '€45',
              period: 'per werkplek/maand',
              features: [
                'Remote monitoring',
                'Automatische updates',
                'Email support',
                'Maandelijkse rapportages'
              ],
              highlighted: false
            },
            {
              name: 'Professional',
              price: '€75',
              period: 'per werkplek/maand',
              features: [
                'Alles van Basic',
                '24/7 support',
                'Proactieve monitoring',
                'Security management',
                'Asset management'
              ],
              highlighted: true
            },
            {
              name: 'Enterprise',
              price: 'Op maat',
              period: 'custom prijzen',
              features: [
                'Alles van Professional',
                'Dedicated account manager',
                'SLA garanties',
                'Custom integraties',
                'On-site support'
              ],
              highlighted: false
            }
          ]
        }
      },
      {
        id: 'cta-workplace',
        type: 'cta',
        title: 'Call to Action',
        order: 4,
        content: {
          heading: 'Klaar voor professioneel werkplekbeheer?',
          description: 'Laat ons een gratis IT-scan uitvoeren en ontdek hoe wij uw werkplekken kunnen optimaliseren.',
          buttonText: 'Complete IT-check',
          buttonLink: '/it-check',
          backgroundColor: 'from-sky-500 to-blue-600'
        }
      }
    ]
  },

  cloud: {
    id: 'cloud',
    name: 'Cloud & Microsoft 365',
    path: '/oplossingen/cloud-microsoft-365',
    seo: {
      title: 'Cloud & Microsoft 365 - Migratie en beheer | Systeemlink',
      description: 'Professionele Microsoft 365 en Azure cloud oplossingen. ✓ Volledige migratie ✓ Beheer & optimalisatie ✓ Security & compliance ✓ Teams & SharePoint',
      keywords: 'Microsoft 365, Office 365, Azure cloud, cloud migratie, Teams, SharePoint, Exchange Online, cloud beheer'
    },
    sections: [
      {
        id: 'hero-cloud',
        type: 'hero',
        title: 'Hero Sectie',
        order: 1,
        content: {
          heading: 'Cloud & Microsoft 365',
          subtitle: 'Migreer naar de cloud en werk efficiënter met Microsoft 365. Wij verzorgen de volledige migratie, configuratie en beheer.',
          buttonText: 'Gratis cloud scan',
          buttonLink: '/it-check'
        }
      },
      {
        id: 'features-cloud',
        type: 'features',
        title: 'Cloud Services',
        order: 2,
        content: {
          heading: 'Volledige cloud transformatie',
          features: [
            {
              icon: 'Cloud',
              title: 'Microsoft 365 Migratie',
              description: 'Soepele overgang naar Microsoft 365 zonder dataverlies of downtime'
            },
            {
              icon: 'Users',
              title: 'Teams & Collaboration',
              description: 'Optimaal gebruik van Teams, SharePoint en OneDrive voor samenwerking'
            },
            {
              icon: 'Shield',
              title: 'Security & Compliance',
              description: 'Advanced security features en compliance met AVG en NEN7510'
            },
            {
              icon: 'Server',
              title: 'Azure Cloud',
              description: 'Infrastructure as a Service met Azure voor uw applicaties'
            }
          ]
        }
      }
    ]
  },

  network: {
    id: 'network',
    name: 'Netwerk & Beveiliging',
    path: '/oplossingen/netwerk-beveiliging',
    seo: {
      title: 'Netwerk & Beveiliging - Bescherm uw IT-infrastructuur | Systeemlink',
      description: 'Professionele netwerkbeveiliging voor het MKB. ✓ Firewalls ✓ VPN ✓ WiFi ✓ Netwerkmonitoring ✓ Penetratietesten ✓ Security awareness',
      keywords: 'netwerkbeveiliging, firewall, VPN, WiFi, network security, cybersecurity, penetratietest, security monitoring'
    },
    sections: [
      {
        id: 'hero-network',
        type: 'hero',
        title: 'Hero Sectie',
        order: 1,
        content: {
          heading: 'Netwerk & Beveiliging',
          subtitle: 'Bescherm uw bedrijf tegen cyberdreigingen met onze geavanceerde beveiligingsoplossingen en netwerkbeheer.',
          buttonText: 'Risico assessment',
          buttonLink: '/it-check'
        }
      },
      {
        id: 'features-network',
        type: 'features',
        title: 'Security Services',
        order: 2,
        content: {
          heading: 'Volledige netwerkbeveiliging',
          features: [
            {
              icon: 'Shield',
              title: 'Next-Gen Firewalls',
              description: 'Geavanceerde firewalls met AI-based threat detection'
            },
            {
              icon: 'Lock',
              title: 'VPN & Remote Access',
              description: 'Veilige verbindingen voor thuiswerkers en externe locaties'
            },
            {
              icon: 'Wifi',
              title: 'Secure WiFi',
              description: 'Enterprise WiFi met meerdere netwerken en gastentoegang'
            },
            {
              icon: 'Activity',
              title: '24/7 Monitoring',
              description: 'Continue monitoring van uw netwerk en security events'
            }
          ]
        }
      }
    ]
  },

  support: {
    id: 'support',
    name: 'IT-Support',
    path: '/oplossingen/it-support',
    seo: {
      title: 'IT-Support & Helpdesk - 24/7 beschikbaar | Systeemlink',
      description: '24/7 IT-support en helpdesk voor het MKB. ✓ <15 min reactietijd ✓ Remote & on-site ✓ Ticketsysteem ✓ Proactieve monitoring ✓ Knowledge base',
      keywords: 'IT-support, helpdesk, 24/7 support, servicedesk, IT-hulp, remote support, technische ondersteuning'
    },
    sections: [
      {
        id: 'hero-support',
        type: 'hero',
        title: 'Hero Sectie',
        order: 1,
        content: {
          heading: 'IT-Support & Monitoring',
          subtitle: '24/7 support voor al uw IT-vraagstukken. Snelle oplossingen via telefoon, email of remote support.',
          buttonText: 'IT-Check aanvragen',
          buttonLink: '/it-check'
        }
      },
      {
        id: 'stats-support',
        type: 'stats',
        title: 'Support Statistieken',
        order: 2,
        content: {
          stats: [
            { value: '<15 min', label: 'Reactietijd' },
            { value: '24/7', label: 'Beschikbaar' },
            { value: '98%', label: 'First-call fix' },
            { value: '4.9/5', label: 'Klanttevredenheid' }
          ]
        }
      }
    ]
  },

  branches: {
    id: 'branches',
    name: 'Branches Overzicht',
    path: '/branches',
    seo: {
      title: 'Branches - IT-oplossingen per sector | Systeemlink',
      description: 'Gespecialiseerde IT-oplossingen voor verschillende branches. ✓ Zakelijke dienstverlening ✓ Zorg & onderwijs ✓ Retail & logistiek ✓ Bouw & industrie',
      keywords: 'branches, sectoren, branche IT-oplossingen, sector specifieke IT, zakelijke dienstverlening, zorg, retail, bouw'
    },
    sections: [
      {
        id: 'hero-branches',
        type: 'hero',
        title: 'Hero Sectie',
        order: 1,
        content: {
          heading: 'IT-oplossingen per branche',
          subtitle: 'Gespecialiseerde IT-diensten afgestemd op uw sector. Wij begrijpen de unieke uitdagingen van uw branche.',
          buttonText: 'Gratis IT-check',
          buttonLink: '/it-check'
        }
      },
      {
        id: 'cards-branches',
        type: 'cards',
        title: 'Onze Branches',
        order: 2,
        content: {
          cards: [
            {
              title: 'Zakelijke Dienstverlening',
              description: 'IT voor accountants, advocaten, consultants en andere zakelijke dienstverleners',
              link: '/branches/zakelijke-dienstverlening',
              icon: 'Briefcase'
            },
            {
              title: 'Zorg & Onderwijs',
              description: 'Veilige en betrouwbare IT voor zorginstellingen en onderwijsinstellingen',
              link: '/branches/zorg-onderwijs',
              icon: 'Heart'
            },
            {
              title: 'Retail & Logistiek',
              description: 'IT-oplossingen voor retail, e-commerce en logistieke bedrijven',
              link: '/branches/retail-logistiek',
              icon: 'ShoppingCart'
            },
            {
              title: 'Bouw & Industrie',
              description: 'Robuuste IT voor de bouw, productie en industriële sector',
              link: '/branches/bouw-industrie',
              icon: 'HardHat'
            }
          ]
        }
      }
    ]
  },

  business: {
    id: 'business',
    name: 'Zakelijke Dienstverlening',
    path: '/branches/zakelijke-dienstverlening',
    seo: {
      title: 'IT voor Zakelijke Dienstverlening - Accountants, Advocaten | Systeemlink',
      description: 'Professionele IT-oplossingen voor zakelijke dienstverleners. ✓ Compliance & AVG ✓ Veilige documentopslag ✓ Mobiel werken ✓ Client portals',
      keywords: 'IT zakelijke dienstverlening, accountant IT, advocaat IT, consultant IT, professional services IT'
    },
    sections: [
      {
        id: 'hero-business',
        type: 'hero',
        title: 'Hero Sectie',
        order: 1,
        content: {
          heading: 'IT voor Zakelijke Dienstverlening',
          subtitle: 'Betrouwbare en veilige IT-oplossingen voor accountants, advocaten, consultants en andere professionals.',
          buttonText: 'Gratis IT-scan',
          buttonLink: '/it-check'
        }
      }
    ]
  },

  about: {
    id: 'about',
    name: 'Over Ons',
    path: '/bedrijfsinformatie/over',
    seo: {
      title: 'Over Systeemlink - Uw IT-partner sinds 2009',
      description: 'Systeemlink biedt al 15+ jaar betrouwbaar IT-beheer aan 200+ MKB bedrijven. Ervaren team, persoonlijke aanpak en moderne technologie.',
      keywords: 'over ons, IT-bedrijf, managed services provider, MKB IT-partner, team, certificeringen'
    },
    sections: [
      {
        id: 'hero-about',
        type: 'hero',
        title: 'Hero Sectie',
        order: 1,
        content: {
          heading: 'Over Systeemlink',
          subtitle: 'Wij zijn uw betrouwbare IT-partner die bedrijven helpt groeien door technologie zorgeloos te maken. Persoonlijk, proactief en met passie voor IT.',
          buttonText: 'Start met IT-check',
          buttonLink: '/it-check'
        }
      },
      {
        id: 'stats-about',
        type: 'stats',
        title: 'Bedrijfscijfers',
        order: 2,
        content: {
          stats: [
            { value: '15+', label: 'Jaar ervaring', description: 'In IT-beheer voor MKB' },
            { value: '200+', label: 'Tevreden klanten', description: 'Door heel Nederland' },
            { value: '500+', label: 'Beheerde werkplekken', description: 'Dagelijks gemonitord' },
            { value: '99.9%', label: 'Uptime garantie', description: 'Voor kritieke systemen' }
          ]
        }
      }
    ]
  },

  partners: {
    id: 'partners',
    name: 'Partners & Certificeringen',
    path: '/bedrijfsinformatie/partners-certificeringen',
    seo: {
      title: 'Partners & Certificeringen - Erkende expertise | Systeemlink',
      description: 'Systeemlink is Microsoft Partner, ISO 27001 gecertificeerd en werkt samen met toonaangevende IT-leveranciers. ✓ Microsoft ✓ Fortinet ✓ Cisco',
      keywords: 'partners, certificeringen, Microsoft Partner, ISO 27001, Fortinet, Cisco, IT-certificaten'
    },
    sections: [
      {
        id: 'hero-partners',
        type: 'hero',
        title: 'Hero Sectie',
        order: 1,
        content: {
          heading: 'Partners & Certificeringen',
          subtitle: 'Wij werken samen met de beste leveranciers en beschikken over erkende certificeringen om u de hoogste kwaliteit te garanderen.',
          buttonText: 'Gratis IT-check',
          buttonLink: '/it-check'
        }
      }
    ]
  },

  vacancies: {
    id: 'vacancies',
    name: 'Vacatures',
    path: '/bedrijfsinformatie/vacatures',
    seo: {
      title: 'Vacatures - Werk bij Systeemlink | IT-carrières',
      description: 'Werk je graag met de nieuwste technologieën? Kom werken bij Systeemlink! ✓ Innovatieve projecten ✓ Leuke werksfeer ✓ Doorgroeimogelijkheden',
      keywords: 'vacatures, IT-banen, werken bij, carrière, IT-engineer, systeembeheerder, support engineer'
    },
    sections: [
      {
        id: 'hero-vacancies',
        type: 'hero',
        title: 'Hero Sectie',
        order: 1,
        content: {
          heading: 'Werken bij Systeemlink',
          subtitle: 'Kom werken bij een innovatief IT-bedrijf waar technologie, teamwork en persoonlijke ontwikkeling centraal staan.',
          buttonText: 'Bekijk vacatures',
          buttonLink: '#vacatures'
        }
      }
    ]
  },

  contact: {
    id: 'contact',
    name: 'Contact',
    path: '/bedrijfsinformatie/contact',
    seo: {
      title: 'Contact - Neem contact op met Systeemlink',
      description: 'Neem contact op voor een vrijblijvend gesprek over uw IT-uitdagingen. ✓ Snelle reactie ✓ Persoonlijk advies ✓ Gratis IT-scan mogelijk',
      keywords: 'contact, contactformulier, IT-advies, offerte aanvragen, bellen, email'
    },
    sections: [
      {
        id: 'hero-contact',
        type: 'hero',
        title: 'Hero Sectie',
        order: 1,
        content: {
          heading: 'Neem contact op',
          subtitle: 'Heeft u vragen over onze diensten of wilt u een vrijblijvende afspraak maken? Wij helpen u graag verder.',
          buttonText: 'Direct bellen',
          buttonLink: 'tel:+31201234567'
        }
      },
      {
        id: 'form-contact',
        type: 'form',
        title: 'Contactformulier',
        order: 2,
        content: {
          fields: [
            { name: 'name', label: 'Naam', type: 'text', required: true },
            { name: 'email', label: 'E-mailadres', type: 'email', required: true },
            { name: 'phone', label: 'Telefoonnummer', type: 'tel', required: false },
            { name: 'company', label: 'Bedrijfsnaam', type: 'text', required: false },
            { name: 'message', label: 'Bericht', type: 'textarea', required: true }
          ],
          submitText: 'Verstuur bericht',
          successMessage: 'Bedankt voor uw bericht! We nemen zo snel mogelijk contact op.'
        }
      }
    ]
  }
};