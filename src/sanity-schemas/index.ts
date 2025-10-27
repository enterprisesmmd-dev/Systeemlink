// Sanity Schema Definitions
// Deze schemas kun je importeren in je Sanity Studio

export const homePage = {
  name: 'homePage',
  title: 'Startpagina',
  type: 'document',
  fields: [
    {
      name: 'heroTitle',
      title: 'Hero Titel',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'heroSubtitle',
      title: 'Hero Ondertitel',
      type: 'string',
    },
    {
      name: 'heroDescription',
      title: 'Hero Beschrijving',
      type: 'text',
      rows: 4,
    },
    {
      name: 'ctaButtonPrimary',
      title: 'Primaire Button Tekst',
      type: 'string',
    },
    {
      name: 'ctaButtonSecondary',
      title: 'Secondaire Button Tekst',
      type: 'string',
    },
  ],
};

export const vacancy = {
  name: 'vacancy',
  title: 'Vacatures',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Functietitel',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'location',
      title: 'Locatie',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'department',
      title: 'Afdeling',
      type: 'string',
      options: {
        list: [
          { title: 'Support', value: 'Support' },
          { title: 'Engineering', value: 'Engineering' },
          { title: 'Sales', value: 'Sales' },
          { title: 'Projectmanagement', value: 'Projectmanagement' },
        ],
      },
    },
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Fulltime', value: 'Fulltime' },
          { title: 'Parttime', value: 'Parttime' },
        ],
      },
    },
    {
      name: 'description',
      title: 'Beschrijving',
      type: 'text',
      rows: 6,
    },
    {
      name: 'requirements',
      title: 'Vereisten',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'responsibilities',
      title: 'Verantwoordelijkheden',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'benefits',
      title: 'Wat wij bieden',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'publishedAt',
      title: 'Publicatiedatum',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'location',
    },
  },
};

export const partner = {
  name: 'partner',
  title: 'Partners & Certificeringen',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Naam',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'description',
      title: 'Beschrijving',
      type: 'text',
      rows: 3,
    },
    {
      name: 'category',
      title: 'Categorie',
      type: 'string',
      options: {
        list: [
          { title: 'Partner', value: 'partner' },
          { title: 'Certificering', value: 'certificering' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'order',
      title: 'Volgorde',
      type: 'number',
      description: 'Lagere nummers verschijnen eerst',
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'logo',
      subtitle: 'category',
    },
  },
};

export const contactInfo = {
  name: 'contactInfo',
  title: 'Contactinformatie',
  type: 'document',
  fields: [
    {
      name: 'phone',
      title: 'Telefoonnummer',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'email',
      title: 'E-mailadres',
      type: 'string',
      validation: (Rule: any) => Rule.required().email(),
    },
    {
      name: 'address',
      title: 'Adres',
      type: 'string',
    },
    {
      name: 'city',
      title: 'Plaats',
      type: 'string',
    },
    {
      name: 'openingHours',
      title: 'Openingstijden',
      type: 'string',
    },
  ],
};

export const aboutPage = {
  name: 'aboutPage',
  title: 'Over Ons Pagina',
  type: 'document',
  fields: [
    {
      name: 'heroTitle',
      title: 'Hero Titel',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'heroDescription',
      title: 'Hero Beschrijving',
      type: 'text',
      rows: 4,
    },
    {
      name: 'missionTitle',
      title: 'Missie Titel',
      type: 'string',
    },
    {
      name: 'missionDescription',
      title: 'Missie Beschrijving',
      type: 'text',
      rows: 4,
    },
    {
      name: 'visionTitle',
      title: 'Visie Titel',
      type: 'string',
    },
    {
      name: 'visionDescription',
      title: 'Visie Beschrijving',
      type: 'text',
      rows: 4,
    },
    {
      name: 'teamMembers',
      title: 'Teamleden',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Naam',
              type: 'string',
            },
            {
              name: 'role',
              title: 'Functie',
              type: 'string',
            },
            {
              name: 'bio',
              title: 'Biografie',
              type: 'text',
              rows: 3,
            },
            {
              name: 'image',
              title: 'Foto',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
          ],
        },
      ],
    },
  ],
};

// Export alle schemas
export const schemaTypes = [
  homePage,
  vacancy,
  partner,
  contactInfo,
  aboutPage,
];
