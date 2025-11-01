import { useState, useEffect } from 'react';

// Strapi response types
interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface StrapiError {
  status: number;
  name: string;
  message: string;
  details?: any;
}

// Hook return type
interface UseStrapiDataReturn<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

// Options for the hook
interface StrapiOptions extends RequestInit {
  populate?: string | string[];
  filters?: Record<string, any>;
  sort?: string | string[];
  pagination?: {
    page?: number;
    pageSize?: number;
  };
}

/**
 * Custom hook voor het ophalen van data uit Strapi CMS
 * 
 * @param endpoint - Het API endpoint (zonder /api prefix)
 * @param options - Fetch options en Strapi query parameters
 * @returns Data, loading state, error en refetch functie
 * 
 * @example
 * ```tsx
 * const { data, loading, error } = useStrapiData('pages', {
 *   populate: ['sections', 'seo'],
 *   filters: { slug: { $eq: 'home' } }
 * });
 * ```
 */
export function useStrapiData<T = any>(
  endpoint: string,
  options?: StrapiOptions
): UseStrapiDataReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Build URL with query parameters
      const url = buildStrapiUrl(endpoint, options);
      const strapiUrl = import.meta.env.VITE_STRAPI_URL;
      const token = import.meta.env.VITE_STRAPI_API_TOKEN;

      if (!strapiUrl) {
        throw new Error('VITE_STRAPI_URL is not configured in environment variables');
      }

      const response = await fetch(`${strapiUrl}/api/${url}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
          ...options?.headers,
        },
      });

      if (!response.ok) {
        const errorData: StrapiError = await response.json().catch(() => ({
          status: response.status,
          name: 'FetchError',
          message: response.statusText,
        }));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result: StrapiResponse<T> = await response.json();
      setData(result.data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(new Error(errorMessage));
      console.error('Strapi fetch error:', err);
      
      // Fallback to localStorage if Strapi is not available (development mode)
      if (import.meta.env.DEV) {
        console.warn('Strapi not available, using localStorage fallback');
        const fallbackData = getLocalStorageFallback(endpoint);
        if (fallbackData) {
          setData(fallbackData as T);
          setError(null);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint, JSON.stringify(options)]);

  return { data, loading, error, refetch: fetchData };
}

/**
 * Submit data to Strapi (POST request)
 * 
 * @param endpoint - Het API endpoint
 * @param payload - Data om te verzenden
 * @returns Response data
 * 
 * @example
 * ```tsx
 * await submitToStrapi('form-submissions', {
 *   type: 'contact',
 *   data: formData,
 *   metadata: { ip: '127.0.0.1' }
 * });
 * ```
 */
export async function submitToStrapi<T = any>(
  endpoint: string,
  payload: any
): Promise<T> {
  const strapiUrl = import.meta.env.VITE_STRAPI_URL;
  const token = import.meta.env.VITE_STRAPI_API_TOKEN;

  if (!strapiUrl) {
    // Fallback to localStorage in development
    if (import.meta.env.DEV) {
      console.warn('Strapi not available, saving to localStorage');
      saveToLocalStorage(endpoint, payload);
      return payload as T;
    }
    throw new Error('VITE_STRAPI_URL is not configured in environment variables');
  }

  const response = await fetch(`${strapiUrl}/api/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify({ data: payload }),
  });

  if (!response.ok) {
    const errorData: StrapiError = await response.json().catch(() => ({
      status: response.status,
      name: 'SubmitError',
      message: response.statusText,
    }));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  const result: StrapiResponse<T> = await response.json();
  return result.data;
}

/**
 * Update data in Strapi (PUT request)
 */
export async function updateStrapi<T = any>(
  endpoint: string,
  id: number | string,
  payload: any
): Promise<T> {
  const strapiUrl = import.meta.env.VITE_STRAPI_URL;
  const token = import.meta.env.VITE_STRAPI_API_TOKEN;

  if (!strapiUrl) {
    throw new Error('VITE_STRAPI_URL is not configured');
  }

  const response = await fetch(`${strapiUrl}/api/${endpoint}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify({ data: payload }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result: StrapiResponse<T> = await response.json();
  return result.data;
}

/**
 * Delete data from Strapi (DELETE request)
 */
export async function deleteFromStrapi<T = any>(
  endpoint: string,
  id: number | string
): Promise<T> {
  const strapiUrl = import.meta.env.VITE_STRAPI_URL;
  const token = import.meta.env.VITE_STRAPI_API_TOKEN;

  if (!strapiUrl) {
    throw new Error('VITE_STRAPI_URL is not configured');
  }

  const response = await fetch(`${strapiUrl}/api/${endpoint}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result: StrapiResponse<T> = await response.json();
  return result.data;
}

// Helper functions

/**
 * Build Strapi URL with query parameters
 */
function buildStrapiUrl(endpoint: string, options?: StrapiOptions): string {
  if (!options || Object.keys(options).length === 0) {
    return endpoint;
  }

  const params = new URLSearchParams();

  // Populate
  if (options.populate) {
    const populate = Array.isArray(options.populate)
      ? options.populate.join(',')
      : options.populate;
    params.append('populate', populate);
  }

  // Filters
  if (options.filters) {
    Object.entries(options.filters).forEach(([key, value]) => {
      if (typeof value === 'object') {
        Object.entries(value).forEach(([operator, operatorValue]) => {
          params.append(`filters[${key}][${operator}]`, String(operatorValue));
        });
      } else {
        params.append(`filters[${key}]`, String(value));
      }
    });
  }

  // Sort
  if (options.sort) {
    const sort = Array.isArray(options.sort) ? options.sort.join(',') : options.sort;
    params.append('sort', sort);
  }

  // Pagination
  if (options.pagination) {
    if (options.pagination.page) {
      params.append('pagination[page]', String(options.pagination.page));
    }
    if (options.pagination.pageSize) {
      params.append('pagination[pageSize]', String(options.pagination.pageSize));
    }
  }

  const queryString = params.toString();
  return queryString ? `${endpoint}?${queryString}` : endpoint;
}

/**
 * LocalStorage fallback for development
 */
function getLocalStorageFallback(endpoint: string): any {
  try {
    const key = `strapi_fallback_${endpoint}`;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('LocalStorage fallback error:', error);
    return null;
  }
}

/**
 * Save to localStorage as fallback
 */
function saveToLocalStorage(endpoint: string, data: any): void {
  try {
    const key = `strapi_fallback_${endpoint}`;
    const existing = localStorage.getItem(key);
    const existingData = existing ? JSON.parse(existing) : [];
    const newData = Array.isArray(existingData) ? [...existingData, data] : [data];
    localStorage.setItem(key, JSON.stringify(newData));
  } catch (error) {
    console.error('LocalStorage save error:', error);
  }
}

// Export helper to check if Strapi is configured
export function isStrapiConfigured(): boolean {
  return Boolean(import.meta.env.VITE_STRAPI_URL);
}

// Hook to get company settings
export function useCompanySettings() {
  return useStrapiData('company-setting', {
    populate: ['address', 'contact', 'business', 'social', 'logo'],
  });
}

// Hook to get support widget settings
export function useSupportWidgetSettings() {
  return useStrapiData('support-widget-setting');
}

// Hook to get email settings
export function useEmailSettings() {
  return useStrapiData('email-setting');
}

// Hook to get page by slug
export function usePageBySlug(slug: string) {
  return useStrapiData('pages', {
    populate: ['sections', 'seo', 'seo.metaImage'],
    filters: {
      slug: { $eq: slug },
    },
  });
}

// Hook to get all navigation menus
export function useNavigationMenus(position?: string) {
  const filters = position ? { position: { $eq: position } } : undefined;
  
  return useStrapiData('navigation-menus', {
    filters,
    sort: ['order:asc'],
  });
}
