import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogType?: string;
  ogImage?: string;
  canonical?: string;
  structuredData?: object;
  noindex?: boolean;
}

export function SEO({
  title,
  description,
  keywords = '',
  ogType = 'website',
  ogImage = 'https://systeemlink.nl/og-image.jpg',
  canonical,
  structuredData,
  noindex = false
}: SEOProps) {
  useEffect(() => {
    // Set page title
    document.title = title;

    // Update or create meta tags
    updateMetaTag('description', description);
    if (keywords) updateMetaTag('keywords', keywords);
    
    // Robots
    if (noindex) {
      updateMetaTag('robots', 'noindex, nofollow');
    } else {
      updateMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    }

    // Open Graph tags
    updateMetaTag('og:title', title, 'property');
    updateMetaTag('og:description', description, 'property');
    updateMetaTag('og:type', ogType, 'property');
    updateMetaTag('og:image', ogImage, 'property');
    updateMetaTag('og:site_name', 'Systeemlink', 'property');
    updateMetaTag('og:locale', 'nl_NL', 'property');
    
    if (canonical) {
      updateMetaTag('og:url', canonical, 'property');
    }

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);

    // Canonical URL
    if (canonical) {
      updateLinkTag('canonical', canonical);
    }

    // Structured Data (JSON-LD)
    if (structuredData) {
      updateStructuredData(structuredData);
    }

    // Google verification and other meta tags
    updateMetaTag('author', 'Systeemlink');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1');
    updateMetaTag('theme-color', '#0ea5e9');

    // Language
    const htmlElement = document.documentElement;
    htmlElement.setAttribute('lang', 'nl');
  }, [title, description, keywords, ogType, ogImage, canonical, structuredData, noindex]);

  return null;
}

function updateMetaTag(name: string, content: string, attribute: string = 'name') {
  let element = document.querySelector(`meta[${attribute}="${name}"]`);
  
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }
  
  element.setAttribute('content', content);
}

function updateLinkTag(rel: string, href: string) {
  let element = document.querySelector(`link[rel="${rel}"]`);
  
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  
  element.setAttribute('href', href);
}

function updateStructuredData(data: object) {
  const id = 'structured-data';
  let script = document.getElementById(id);
  
  if (!script) {
    script = document.createElement('script');
    script.setAttribute('id', id);
    script.setAttribute('type', 'application/ld+json');
    document.head.appendChild(script);
  }
  
  script.textContent = JSON.stringify(data);
}
