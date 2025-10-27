import { Data } from "@measured/puck";
import { CMSPageContent, CMSSection } from "./cms-content-extractor";

/**
 * Converts CMS Section format to Puck Data format
 */
export function convertCMSToPuck(cmsPage: CMSPageContent): Data {
  const content = cmsPage.sections.map((section) => {
    const component = convertSectionToComponent(section);
    return component;
  }).filter(Boolean);

  return {
    content: content as any[],
    root: {
      props: {
        title: cmsPage.name,
      },
    },
  };
}

/**
 * Converts individual CMS section to Puck component
 */
function convertSectionToComponent(section: CMSSection): any {
  const baseProps = {
    id: section.id,
  };

  switch (section.type) {
    case 'hero':
      return {
        type: "HeroSection",
        props: {
          ...baseProps,
          breadcrumb: section.content.breadcrumb || "",
          badge: section.content.badge || { text: "" },
          title: section.content.title || section.title,
          description: section.content.description || "",
          gradient: section.content.gradient || "from-sky-600 via-blue-700 to-indigo-800",
          buttons: section.content.buttons || [],
        },
      };

    case 'slider':
      // For now, convert slider to hero with first slide
      const firstSlide = section.content.slides?.[0];
      if (firstSlide) {
        return {
          type: "HeroSection",
          props: {
            ...baseProps,
            title: firstSlide.title,
            description: firstSlide.description,
            gradient: "from-sky-600 via-blue-700 to-indigo-800",
            buttons: firstSlide.ctaText
              ? [{ text: firstSlide.ctaText, link: firstSlide.ctaLink || "#", variant: "primary" }]
              : [],
          },
        };
      }
      return null;

    case 'content':
      return {
        type: "ContentSection",
        props: {
          ...baseProps,
          badge: section.content.badge || { text: "" },
          title: section.content.title || section.title,
          description: section.content.description || "",
          background: section.content.background || "white",
          centered: section.content.centered !== false,
        },
      };

    case 'stats':
      return {
        type: "StatsBar",
        props: {
          ...baseProps,
          stats: section.content.stats || [],
        },
      };

    case 'features':
      // Convert features to GridSection
      const features = section.content.features || [];
      return {
        type: "GridSection",
        props: {
          ...baseProps,
          items: features.map((f: any) => ({
            icon: f.icon || "✓",
            title: f.title,
            description: f.description,
          })),
          columns: 3,
          variant: "card",
        },
      };

    case 'cards':
      return {
        type: "GridSection",
        props: {
          ...baseProps,
          items: section.content.items || [],
          columns: section.content.columns || 3,
          variant: section.content.variant || "card",
        },
      };

    case 'cta':
      return {
        type: "CTASection",
        props: {
          ...baseProps,
          badge: section.content.badge || { text: "" },
          title: section.content.title || section.title,
          description: section.content.description || "",
          variant: section.content.variant || "gradient",
          buttons: section.content.buttons || [],
        },
      };

    case 'timeline':
    case 'pricing':
    case 'team':
    case 'testimonials':
    case 'faq':
      // Convert these to FeatureSection for now
      return {
        type: "FeatureSection",
        props: {
          ...baseProps,
          items: section.content.items || [],
          columns: 3,
        },
      };

    default:
      console.warn(`Unknown section type: ${section.type}`);
      return null;
  }
}

/**
 * Converts Puck Data back to CMS format (for compatibility)
 */
export function convertPuckToCMS(puckData: Data, pageInfo: { id: string; name: string; path: string; seo: any }): CMSPageContent {
  const sections: CMSSection[] = puckData.content.map((component: any, index: number) => {
    return convertComponentToSection(component, index);
  });

  return {
    id: pageInfo.id,
    name: pageInfo.name,
    path: pageInfo.path,
    seo: pageInfo.seo,
    sections,
  };
}

/**
 * Converts Puck component back to CMS section
 */
function convertComponentToSection(component: any, order: number): CMSSection {
  const baseSection = {
    id: component.props?.id || `section-${Date.now()}-${order}`,
    order: order + 1,
  };

  switch (component.type) {
    case 'HeroSection':
      return {
        ...baseSection,
        type: 'hero' as const,
        title: component.props.title,
        content: component.props,
      };

    case 'ContentSection':
      return {
        ...baseSection,
        type: 'content' as const,
        title: component.props.title,
        content: component.props,
      };

    case 'GridSection':
      return {
        ...baseSection,
        type: 'cards' as const,
        title: 'Grid Section',
        content: component.props,
      };

    case 'CTASection':
      return {
        ...baseSection,
        type: 'cta' as const,
        title: component.props.title,
        content: component.props,
      };

    case 'FeatureSection':
      return {
        ...baseSection,
        type: 'features' as const,
        title: 'Features',
        content: component.props,
      };

    case 'StatsBar':
      return {
        ...baseSection,
        type: 'stats' as const,
        title: 'Statistics',
        content: component.props,
      };

    case 'Spacer':
      return {
        ...baseSection,
        type: 'content' as const,
        title: 'Spacer',
        content: { height: component.props.height },
      };

    default:
      return {
        ...baseSection,
        type: 'content' as const,
        title: 'Unknown',
        content: component.props || {},
      };
  }
}

/**
 * Storage helpers for Puck data
 */
export const PuckStorage = {
  /**
   * Save Puck data for a page
   */
  save(pageId: string, data: Data) {
    localStorage.setItem(`puck_page_${pageId}`, JSON.stringify(data));
  },

  /**
   * Load Puck data for a page
   */
  load(pageId: string): Data | null {
    const stored = localStorage.getItem(`puck_page_${pageId}`);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error(`Failed to parse Puck data for ${pageId}:`, e);
      }
    }
    return null;
  },

  /**
   * Check if page has Puck data
   */
  has(pageId: string): boolean {
    return localStorage.getItem(`puck_page_${pageId}`) !== null;
  },

  /**
   * Delete Puck data for a page
   */
  delete(pageId: string) {
    localStorage.removeItem(`puck_page_${pageId}`);
  },

  /**
   * Get all Puck page IDs
   */
  getAllPageIds(): string[] {
    const keys = Object.keys(localStorage);
    return keys
      .filter(key => key.startsWith('puck_page_'))
      .map(key => key.replace('puck_page_', ''));
  },
};

/**
 * Initialize Puck data from existing CMS data
 */
export function initializePuckFromCMS() {
  const cmsData = localStorage.getItem('cms_pages_data');
  if (!cmsData) return;

  try {
    const pages = JSON.parse(cmsData);
    
    Object.values(pages).forEach((page: any) => {
      const pageId = page.id;
      
      // Only convert if Puck data doesn't exist yet
      if (!PuckStorage.has(pageId)) {
        const puckData = convertCMSToPuck(page);
        PuckStorage.save(pageId, puckData);
        console.log(`✅ Converted ${page.name} to Puck format`);
      }
    });
  } catch (e) {
    console.error('Failed to initialize Puck from CMS:', e);
  }
}
