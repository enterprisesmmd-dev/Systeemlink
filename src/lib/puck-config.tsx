import { Config } from "@measured/puck";
import { HeroSection } from "../components/sections/HeroSection";
import { ContentSection } from "../components/sections/ContentSection";
import { GridSection } from "../components/sections/GridSection";
import { CTASection } from "../components/sections/CTASection";
import { FeatureSection } from "../components/sections/FeatureSection";
import { StatsBar } from "../components/StatsBar";
import { PageHero } from "../components/sections/PageHero";

export type UserConfig = {
  HeroSection: {
    breadcrumb?: string;
    badge?: { text: string };
    title: string;
    description: string;
    gradient: string;
    buttons?: Array<{
      text: string;
      link: string;
      variant: "primary" | "secondary";
    }>;
  };
  PageHero: {
    breadcrumb?: string;
    badge?: { text: string };
    title: string;
    description: string;
    gradient: string;
    buttons?: Array<{
      text: string;
      link: string;
      variant: "primary" | "secondary";
    }>;
  };
  ContentSection: {
    badge?: { text: string };
    title: string;
    description: string;
    background: "white" | "gray" | "gradient";
    centered: boolean;
  };
  GridSection: {
    items: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
    columns: 2 | 3 | 4;
    variant: "card" | "minimal" | "bordered";
  };
  CTASection: {
    badge?: { text: string };
    title: string;
    description: string;
    variant: "card" | "gradient" | "minimal";
    buttons?: Array<{
      text: string;
      link: string;
      variant: "primary" | "secondary";
    }>;
  };
  FeatureSection: {
    items: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
    columns: 2 | 3 | 4;
  };
  StatsBar: {
    stats: Array<{
      value: string;
      label: string;
    }>;
  };
  Spacer: {
    height: number;
  };
};

export const puckConfig: Config<UserConfig> = {
  components: {
    HeroSection: {
      label: "Hero Section",
      fields: {
        breadcrumb: {
          type: "text",
          label: "Breadcrumb (bv. Oplossingen / Werkplekbeheer)",
        },
        badge: {
          type: "object",
          label: "Badge",
          objectFields: {
            text: { type: "text", label: "Badge tekst" },
          },
        },
        title: {
          type: "text",
          label: "Titel",
        },
        description: {
          type: "textarea",
          label: "Beschrijving",
        },
        gradient: {
          type: "select",
          label: "Gradient",
          options: [
            {
              label: "Sky Blue",
              value: "from-sky-600 via-blue-700 to-indigo-800",
            },
            {
              label: "Indigo Purple",
              value: "from-indigo-600 via-purple-700 to-pink-800",
            },
            {
              label: "Emerald Green",
              value: "from-emerald-600 via-teal-700 to-cyan-800",
            },
            {
              label: "Orange Red",
              value: "from-orange-600 via-red-700 to-pink-800",
            },
          ],
        },
        buttons: {
          type: "array",
          label: "Buttons",
          arrayFields: {
            text: { type: "text", label: "Tekst" },
            link: { type: "text", label: "Link" },
            variant: {
              type: "select",
              label: "Variant",
              options: [
                { label: "Primary", value: "primary" },
                { label: "Secondary", value: "secondary" },
              ],
            },
          },
        },
      },
      defaultProps: {
        breadcrumb: "Oplossingen / Werkplekbeheer",
        badge: { text: "Nieuw" },
        title: "Professioneel Werkplekbeheer",
        description: "Complete IT-oplossingen voor uw bedrijf",
        gradient: "from-sky-600 via-blue-700 to-indigo-800",
        buttons: [
          { text: "Neem contact op", link: "/contact", variant: "primary" },
          { text: "Meer informatie", link: "#", variant: "secondary" },
        ],
      },
      render: ({ breadcrumb, badge, title, description, gradient, buttons }) => {
        return (
          <HeroSection
            breadcrumb={breadcrumb}
            badge={badge}
            title={title}
            description={description}
            gradient={gradient}
            buttons={buttons}
          />
        );
      },
    },

    PageHero: {
      label: "Page Hero",
      fields: {
        breadcrumb: {
          type: "text",
          label: "Breadcrumb (bv. Oplossingen / Werkplekbeheer)",
        },
        badge: {
          type: "object",
          label: "Badge",
          objectFields: {
            text: { type: "text", label: "Badge tekst" },
          },
        },
        title: {
          type: "text",
          label: "Titel",
        },
        description: {
          type: "textarea",
          label: "Beschrijving",
        },
        gradient: {
          type: "select",
          label: "Gradient",
          options: [
            {
              label: "Sky Blue",
              value: "from-sky-600 via-blue-700 to-indigo-800",
            },
            {
              label: "Indigo Purple",
              value: "from-indigo-600 via-purple-700 to-pink-800",
            },
            {
              label: "Emerald Green",
              value: "from-emerald-600 via-teal-700 to-cyan-800",
            },
            {
              label: "Orange Red",
              value: "from-orange-600 via-red-700 to-pink-800",
            },
          ],
        },
        buttons: {
          type: "array",
          label: "Buttons",
          arrayFields: {
            text: { type: "text", label: "Tekst" },
            link: { type: "text", label: "Link" },
            variant: {
              type: "select",
              label: "Variant",
              options: [
                { label: "Primary", value: "primary" },
                { label: "Secondary", value: "secondary" },
              ],
            },
          },
        },
      },
      defaultProps: {
        breadcrumb: "Oplossingen / Werkplekbeheer",
        badge: { text: "Nieuw" },
        title: "Page Hero Titel",
        description: "Inner page hero met breadcrumb",
        gradient: "from-sky-600 via-blue-700 to-indigo-800",
        buttons: [],
      },
      render: ({ breadcrumb, badge, title, description, gradient, buttons }) => {
        return (
          <PageHero
            breadcrumb={breadcrumb}
            badge={badge}
            title={title}
            description={description}
            gradient={gradient}
            buttons={buttons}
          />
        );
      },
    },

    ContentSection: {
      label: "Content Section",
      fields: {
        badge: {
          type: "object",
          label: "Badge",
          objectFields: {
            text: { type: "text", label: "Badge tekst" },
          },
        },
        title: {
          type: "text",
          label: "Titel",
        },
        description: {
          type: "textarea",
          label: "Beschrijving",
        },
        background: {
          type: "select",
          label: "Achtergrond",
          options: [
            { label: "Wit", value: "white" },
            { label: "Grijs", value: "gray" },
            { label: "Gradient", value: "gradient" },
          ],
        },
        centered: {
          type: "radio",
          label: "Gecentreerd",
          options: [
            { label: "Ja", value: true },
            { label: "Nee", value: false },
          ],
        },
      },
      defaultProps: {
        badge: { text: "Onze diensten" },
        title: "Wat wij bieden",
        description: "Ontdek onze complete IT-oplossingen voor uw bedrijf",
        background: "white",
        centered: true,
      },
      render: ({ badge, title, description, background, centered }) => {
        return (
          <ContentSection
            badge={badge}
            title={title}
            description={description}
            background={background}
            centered={centered}
          >
            <div className="h-24 flex items-center justify-center text-gray-400">
              Content placeholder
            </div>
          </ContentSection>
        );
      },
    },

    GridSection: {
      label: "Grid Section",
      fields: {
        items: {
          type: "array",
          label: "Items",
          arrayFields: {
            icon: { type: "text", label: "Icon (emoji of tekst)" },
            title: { type: "text", label: "Titel" },
            description: { type: "textarea", label: "Beschrijving" },
          },
        },
        columns: {
          type: "select",
          label: "Kolommen",
          options: [
            { label: "2 kolommen", value: 2 },
            { label: "3 kolommen", value: 3 },
            { label: "4 kolommen", value: 4 },
          ],
        },
        variant: {
          type: "select",
          label: "Variant",
          options: [
            { label: "Card", value: "card" },
            { label: "Minimal", value: "minimal" },
            { label: "Bordered", value: "bordered" },
          ],
        },
      },
      defaultProps: {
        items: [
          {
            icon: "⚡",
            title: "Snel & Betrouwbaar",
            description: "Maximale uptime voor uw bedrijf",
          },
          {
            icon: "🔒",
            title: "Veilig",
            description: "Enterprise-grade beveiliging",
          },
          {
            icon: "24/7",
            title: "Altijd Support",
            description: "Bereikbaar wanneer u ons nodig heeft",
          },
        ],
        columns: 3,
        variant: "card",
      },
      render: ({ items, columns, variant }) => {
        return <GridSection items={items} columns={columns} variant={variant} />;
      },
    },

    CTASection: {
      label: "Call to Action",
      fields: {
        badge: {
          type: "object",
          label: "Badge",
          objectFields: {
            text: { type: "text", label: "Badge tekst" },
          },
        },
        title: {
          type: "text",
          label: "Titel",
        },
        description: {
          type: "textarea",
          label: "Beschrijving",
        },
        variant: {
          type: "select",
          label: "Variant",
          options: [
            { label: "Card", value: "card" },
            { label: "Gradient", value: "gradient" },
            { label: "Minimal", value: "minimal" },
          ],
        },
        buttons: {
          type: "array",
          label: "Buttons",
          arrayFields: {
            text: { type: "text", label: "Tekst" },
            link: { type: "text", label: "Link" },
            variant: {
              type: "select",
              label: "Variant",
              options: [
                { label: "Primary", value: "primary" },
                { label: "Secondary", value: "secondary" },
              ],
            },
          },
        },
      },
      defaultProps: {
        badge: { text: "Gratis consult" },
        title: "Klaar om te starten?",
        description: "Plan vandaag nog een gratis IT-check",
        variant: "gradient",
        buttons: [
          { text: "Neem contact op", link: "/contact", variant: "primary" },
        ],
      },
      render: ({ badge, title, description, variant, buttons }) => {
        return (
          <CTASection
            badge={badge}
            title={title}
            description={description}
            variant={variant}
            buttons={buttons}
          />
        );
      },
    },

    FeatureSection: {
      label: "Feature List",
      fields: {
        items: {
          type: "array",
          label: "Features",
          arrayFields: {
            icon: { type: "text", label: "Icon" },
            title: { type: "text", label: "Titel" },
            description: { type: "textarea", label: "Beschrijving" },
          },
        },
        columns: {
          type: "select",
          label: "Kolommen",
          options: [
            { label: "2 kolommen", value: 2 },
            { label: "3 kolommen", value: 3 },
            { label: "4 kolommen", value: 4 },
          ],
        },
      },
      defaultProps: {
        items: [
          {
            icon: "✓",
            title: "Proactieve monitoring",
            description: "We lossen problemen op voordat ze ontstaan",
          },
          {
            icon: "✓",
            title: "Persoonlijke support",
            description: "Directe lijn met uw vaste contactpersoon",
          },
          {
            icon: "✓",
            title: "Maandelijkse rapportage",
            description: "Volledig inzicht in uw IT-systemen",
          },
        ],
        columns: 3,
      },
      render: ({ items, columns }) => {
        return <FeatureSection items={items} columns={columns} />;
      },
    },

    StatsBar: {
      label: "Stats Bar",
      fields: {
        stats: {
          type: "array",
          label: "Statistieken",
          arrayFields: {
            value: { type: "text", label: "Waarde" },
            label: { type: "text", label: "Label" },
          },
        },
      },
      defaultProps: {
        stats: [
          { value: "500+", label: "Tevreden klanten" },
          { value: "24/7", label: "Support beschikbaar" },
          { value: "99.9%", label: "Uptime garantie" },
          { value: "15+", label: "Jaar ervaring" },
        ],
      },
      render: ({ stats }) => {
        return <StatsBar stats={stats} />;
      },
    },

    Spacer: {
      label: "Spacer",
      fields: {
        height: {
          type: "number",
          label: "Hoogte (px)",
          min: 0,
          max: 200,
        },
      },
      defaultProps: {
        height: 48,
      },
      render: ({ height }) => {
        return <div style={{ height: `${height}px` }} />;
      },
    },
  },
};