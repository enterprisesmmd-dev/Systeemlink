import { useState, useEffect } from 'react';
import { sanityClient } from '../lib/sanity';

/**
 * Custom hook voor het ophalen van data uit Sanity
 * @param query - GROQ query string
 * @param params - Optional parameters voor de query
 * @returns { data, loading, error }
 */
export function useSanityData<T>(query: string, params?: Record<string, any>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await sanityClient.fetch<T>(query, params);
        setData(result);
        setError(null);
      } catch (err) {
        console.error('Error fetching Sanity data:', err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, JSON.stringify(params)]);

  return { data, loading, error };
}

/**
 * Hook om een enkele vacature op te halen
 */
export function useVacancy(slug: string) {
  const query = `*[_type == "vacancy" && slug.current == $slug][0]`;
  return useSanityData(query, { slug });
}

/**
 * Hook om alle vacatures op te halen
 */
export function useVacancies() {
  const query = `*[_type == "vacancy"] | order(publishedAt desc)`;
  return useSanityData(query);
}

/**
 * Hook om partners op te halen
 */
export function usePartners() {
  const query = `*[_type == "partner" && category == "partner"] | order(order asc)`;
  return useSanityData(query);
}

/**
 * Hook om certificeringen op te halen
 */
export function useCertifications() {
  const query = `*[_type == "partner" && category == "certificering"] | order(order asc)`;
  return useSanityData(query);
}

/**
 * Hook om contactinformatie op te halen
 */
export function useContactInfo() {
  const query = `*[_type == "contactInfo"][0]`;
  return useSanityData(query);
}

/**
 * Hook om de homepage content op te halen
 */
export function useHomePage() {
  const query = `*[_type == "homePage"][0]`;
  return useSanityData(query);
}

/**
 * Hook om de about page content op te halen
 */
export function useAboutPage() {
  const query = `*[_type == "aboutPage"][0]`;
  return useSanityData(query);
}
