import { createClient } from '@sanity/client';

// Sanity client configuratie
// BELANGRIJK: Vervang 'your-project-id' met je echte Sanity project ID
const projectId = 'your-project-id'; // Alleen lowercase, cijfers en streepjes toegestaan
const dataset = 'production'; // Of 'development' voor testing

export const sanityClient = createClient({
  projectId,
  dataset,
  useCdn: true, // Voor snellere response times
  apiVersion: '2024-01-01', // Gebruik huidige datum
});

// Check of Sanity correct is geconfigureerd
export const isSanityConfigured = () => {
  return projectId !== 'your-project-id';
};

// Helper functie om afbeeldingen te genereren
export const urlFor = (source: any) => {
  if (!source?.asset?._ref) return '';
  return `https://cdn.sanity.io/images/${sanityClient.config().projectId}/${sanityClient.config().dataset}/${source.asset._ref.split('-')[1]}-${source.asset._ref.split('-')[2]}.${source.asset._ref.split('-')[3]}`;
};