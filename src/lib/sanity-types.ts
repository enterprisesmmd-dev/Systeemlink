// Type definitions voor Sanity content

export interface HomePage {
  _id: string;
  _type: 'homePage';
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  ctaButtonPrimary: string;
  ctaButtonSecondary: string;
}

export interface Vacancy {
  _id: string;
  _type: 'vacancy';
  title: string;
  location: string;
  department: string;
  type: string; // 'Fulltime', 'Parttime', etc.
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  slug: {
    current: string;
  };
  publishedAt: string;
}

export interface Partner {
  _id: string;
  _type: 'partner';
  name: string;
  logo: {
    asset: {
      _ref: string;
    };
  };
  description?: string;
  category: 'partner' | 'certificering';
  order: number;
}

export interface SolutionPage {
  _id: string;
  _type: 'solutionPage';
  slug: {
    current: string;
  };
  title: string;
  heroTitle: string;
  heroDescription: string;
  benefits: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  features: Array<{
    title: string;
    description: string;
  }>;
}

export interface ContactInfo {
  _id: string;
  _type: 'contactInfo';
  phone: string;
  email: string;
  address: string;
  city: string;
  openingHours: string;
}

export interface AboutPage {
  _id: string;
  _type: 'aboutPage';
  heroTitle: string;
  heroDescription: string;
  missionTitle: string;
  missionDescription: string;
  visionTitle: string;
  visionDescription: string;
  teamMembers: Array<{
    name: string;
    role: string;
    bio: string;
    image?: {
      asset: {
        _ref: string;
      };
    };
  }>;
}
