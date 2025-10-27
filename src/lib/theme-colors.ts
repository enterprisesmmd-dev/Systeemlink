// Systeemlink kleurenschema gebaseerd op het logo
// Het logo bestaat uit 3 hoofdkleuren die we door de website gebruiken

export const brandColors = {
  primary: '#0ea5e9',    // Sky blue - Hoofdkleur
  secondary: '#6366f1',   // Indigo - Tweede kleur  
  accent: '#10b981',      // Emerald green - Accent kleur
  dark: '#1e293b',        // Slate dark
  light: '#f8fafc'        // Slate light
};

// Kleurenschema per pagina type
export const pageColors = {
  // Oplossingen pagina's
  solutions: {
    primary: brandColors.primary,
    gradient: 'from-sky-500 to-sky-600',
    hover: 'hover:from-sky-600 hover:to-sky-700',
    light: 'bg-sky-50',
    text: 'text-sky-600'
  },
  workplace: {
    primary: '#0ea5e9',
    gradient: 'from-sky-500 to-sky-600',
    hover: 'hover:from-sky-600 hover:to-sky-700',
    light: 'bg-sky-50',
    text: 'text-sky-600'
  },
  cloud: {
    primary: '#6366f1',
    gradient: 'from-indigo-500 to-indigo-600',
    hover: 'hover:from-indigo-600 hover:to-indigo-700',
    light: 'bg-indigo-50',
    text: 'text-indigo-600'
  },
  network: {
    primary: '#8b5cf6',
    gradient: 'from-violet-500 to-violet-600',
    hover: 'hover:from-violet-600 hover:to-violet-700',
    light: 'bg-violet-50',
    text: 'text-violet-600'
  },
  support: {
    primary: '#10b981',
    gradient: 'from-emerald-500 to-emerald-600',
    hover: 'hover:from-emerald-600 hover:to-emerald-700',
    light: 'bg-emerald-50',
    text: 'text-emerald-600'
  },
  
  // Branches pagina's
  branches: {
    primary: brandColors.secondary,
    gradient: 'from-indigo-500 to-indigo-600',
    hover: 'hover:from-indigo-600 hover:to-indigo-700',
    light: 'bg-indigo-50',
    text: 'text-indigo-600'
  },
  business: {
    primary: '#3b82f6',
    gradient: 'from-blue-500 to-blue-600',
    hover: 'hover:from-blue-600 hover:to-blue-700',
    light: 'bg-blue-50',
    text: 'text-blue-600'
  },
  health: {
    primary: '#10b981',
    gradient: 'from-emerald-500 to-emerald-600',
    hover: 'hover:from-emerald-600 hover:to-emerald-700',
    light: 'bg-emerald-50',
    text: 'text-emerald-600'
  },
  retail: {
    primary: '#f59e0b',
    gradient: 'from-amber-500 to-amber-600',
    hover: 'hover:from-amber-600 hover:to-amber-700',
    light: 'bg-amber-50',
    text: 'text-amber-600'
  },
  construction: {
    primary: '#ef4444',
    gradient: 'from-red-500 to-red-600',
    hover: 'hover:from-red-600 hover:to-red-700',
    light: 'bg-red-50',
    text: 'text-red-600'
  },
  
  // Bedrijfsinformatie pagina's
  about: {
    primary: brandColors.accent,
    gradient: 'from-emerald-500 to-emerald-600',
    hover: 'hover:from-emerald-600 hover:to-emerald-700',
    light: 'bg-emerald-50',
    text: 'text-emerald-600'
  },
  partners: {
    primary: '#8b5cf6',
    gradient: 'from-violet-500 to-violet-600',
    hover: 'hover:from-violet-600 hover:to-violet-700',
    light: 'bg-violet-50',
    text: 'text-violet-600'
  },
  vacancies: {
    primary: '#ec4899',
    gradient: 'from-pink-500 to-pink-600',
    hover: 'hover:from-pink-600 hover:to-pink-700',
    light: 'bg-pink-50',
    text: 'text-pink-600'
  },
  contact: {
    primary: brandColors.primary,
    gradient: 'from-sky-500 to-sky-600',
    hover: 'hover:from-sky-600 hover:to-sky-700',
    light: 'bg-sky-50',
    text: 'text-sky-600'
  }
};

// Homepage service box kleuren (rotatie van logo kleuren)
export const serviceBoxColors = [
  {
    bg: 'bg-gradient-to-br from-sky-500 to-sky-600',
    hover: 'hover:from-sky-600 hover:to-sky-700',
    shadow: 'shadow-sky-200'
  },
  {
    bg: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
    hover: 'hover:from-indigo-600 hover:to-indigo-700',
    shadow: 'shadow-indigo-200'
  },
  {
    bg: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
    hover: 'hover:from-emerald-600 hover:to-emerald-700',
    shadow: 'shadow-emerald-200'
  },
  {
    bg: 'bg-gradient-to-br from-violet-500 to-violet-600',
    hover: 'hover:from-violet-600 hover:to-violet-700',
    shadow: 'shadow-violet-200'
  }
];
