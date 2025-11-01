import React from 'react';
import { useCompanySettings, useSupportWidgetSettings, usePageBySlug, isStrapiConfigured } from '../hooks/useStrapiData';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

/**
 * Component die Strapi integratie status toont en helpt bij development
 * 
 * Gebruik dit component in je App.tsx tijdens development om te zien
 * of Strapi correct is geconfigureerd en werkt.
 */
export function StrapiStatus() {
  const strapiConfigured = isStrapiConfigured();
  const strapiUrl = import.meta.env.VITE_STRAPI_URL;
  const hasToken = Boolean(import.meta.env.VITE_STRAPI_API_TOKEN);

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      {strapiConfigured ? (
        <Alert className="border-green-500 bg-green-50">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Strapi Connected</AlertTitle>
          <AlertDescription className="text-green-700 text-sm">
            <div className="mt-1 space-y-1">
              <div>URL: {strapiUrl}</div>
              <div>Token: {hasToken ? '✓ Configured' : '✗ Missing'}</div>
            </div>
          </AlertDescription>
        </Alert>
      ) : (
        <Alert className="border-yellow-500 bg-yellow-50">
          <AlertCircle className="h-4 w-4 text-yellow-600" />
          <AlertTitle className="text-yellow-800">Strapi Not Configured</AlertTitle>
          <AlertDescription className="text-yellow-700 text-sm">
            <div className="mt-1">
              Using localStorage fallback for development.
              <br />
              Add VITE_STRAPI_URL to .env to enable.
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}

/**
 * Example component dat laat zien hoe je Company Settings gebruikt
 */
export function CompanyInfoExample() {
  const { data: company, loading, error } = useCompanySettings();

  if (loading) {
    return (
      <div className="p-4 border rounded-lg">
        <div className="animate-pulse space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error Loading Company Settings</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  }

  if (!company) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No Data</AlertTitle>
        <AlertDescription>
          Company settings not found. Please configure in Strapi admin.
        </AlertDescription>
      </Alert>
    );
  }

  const { attributes } = company;

  return (
    <div className="p-6 border rounded-lg space-y-4">
      <div>
        <h2 className="mb-2">{attributes.name}</h2>
        {attributes.tagline && <p className="text-gray-600">{attributes.tagline}</p>}
      </div>

      {attributes.address && (
        <div>
          <h3 className="mb-2">Adres</h3>
          <p className="text-gray-700">
            {attributes.address.street}<br />
            {attributes.address.postalCode} {attributes.address.city}<br />
            {attributes.address.country}
          </p>
        </div>
      )}

      {attributes.contact && (
        <div>
          <h3 className="mb-2">Contact</h3>
          <p className="text-gray-700">
            Tel: {attributes.contact.phone}<br />
            Email: {attributes.contact.email}
          </p>
        </div>
      )}

      {attributes.business && (
        <div>
          <h3 className="mb-2">Bedrijfsgegevens</h3>
          <p className="text-gray-700">
            KVK: {attributes.business.kvk}<br />
            BTW: {attributes.business.btw}
          </p>
        </div>
      )}
    </div>
  );
}

/**
 * Example component dat laat zien hoe je Support Widget Settings gebruikt
 */
export function SupportWidgetExample() {
  const { data: settings, loading } = useSupportWidgetSettings();

  if (loading || !settings) return null;

  const { attributes } = settings;

  if (!attributes.enabled) return null;

  return (
    <div
      className="fixed p-4 bg-white rounded-lg shadow-lg max-w-sm"
      style={{
        [attributes.position.includes('bottom') ? 'bottom' : 'top']: '1rem',
        [attributes.position.includes('right') ? 'right' : 'left']: '1rem',
      }}
    >
      <div className="space-y-3">
        <h3 style={{ color: attributes.primaryColor }}>{attributes.greeting}</h3>
        
        <p className="text-sm text-gray-600">{attributes.offlineMessage}</p>
        
        <div className="text-xs text-gray-500">
          <p>{attributes.availabilityText}</p>
          <p className="mt-1">
            <a href={`tel:${attributes.contactPhone}`} className="text-blue-600">
              {attributes.contactPhone}
            </a>
          </p>
          <p>
            <a href={`mailto:${attributes.contactEmail}`} className="text-blue-600">
              {attributes.contactEmail}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Example component dat laat zien hoe je een pagina op basis van slug ophaalt
 */
export function DynamicPageExample({ slug }: { slug: string }) {
  const { data, loading, error } = usePageBySlug(slug);

  if (loading) {
    return (
      <div className="container mx-auto py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-12">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error Loading Page</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <div className="container mx-auto py-12">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Page Not Found</AlertTitle>
          <AlertDescription>
            The page "{slug}" could not be found in Strapi.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const page = data[0];
  const { attributes } = page;

  return (
    <div className="container mx-auto py-12">
      {/* SEO Meta Tags */}
      {attributes.seo && (
        <>
          <title>{attributes.seo.metaTitle}</title>
          <meta name="description" content={attributes.seo.metaDescription} />
          {attributes.seo.keywords && (
            <meta name="keywords" content={attributes.seo.keywords} />
          )}
        </>
      )}

      {/* Page Content */}
      <div className="space-y-8">
        <h1>{attributes.title}</h1>

        {/* Render Sections */}
        {attributes.sections && attributes.sections.length > 0 && (
          <div className="space-y-12">
            {attributes.sections
              .sort((a: any, b: any) => a.order - b.order)
              .filter((section: any) => section.enabled)
              .map((section: any) => (
                <div key={section.id} className="section">
                  <h2>{section.name}</h2>
                  <p className="text-sm text-gray-500">Type: {section.type}</p>
                  <pre className="mt-4 p-4 bg-gray-100 rounded overflow-auto">
                    {JSON.stringify(section.content, null, 2)}
                  </pre>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Helper component om Strapi integration te testen
 * Voeg dit toe aan je App.tsx tijdens development:
 * 
 * {import.meta.env.DEV && <StrapiDebugPanel />}
 */
export function StrapiDebugPanel() {
  const [isOpen, setIsOpen] = React.useState(false);
  const strapiConfigured = isStrapiConfigured();

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 z-50 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 text-sm"
      >
        🔌 Strapi Debug
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 w-96 max-h-96 overflow-auto bg-white border rounded-lg shadow-xl p-4">
      <div className="flex justify-between items-center mb-4">
        <h3>Strapi Debug Panel</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      <div className="space-y-4 text-sm">
        <div>
          <strong>Status:</strong>{' '}
          {strapiConfigured ? (
            <span className="text-green-600">✓ Connected</span>
          ) : (
            <span className="text-yellow-600">⚠ Not Configured</span>
          )}
        </div>

        <div>
          <strong>URL:</strong>{' '}
          <code className="text-xs bg-gray-100 px-1 rounded">
            {import.meta.env.VITE_STRAPI_URL || 'Not set'}
          </code>
        </div>

        <div>
          <strong>Token:</strong>{' '}
          <span className={import.meta.env.VITE_STRAPI_API_TOKEN ? 'text-green-600' : 'text-red-600'}>
            {import.meta.env.VITE_STRAPI_API_TOKEN ? '✓ Set' : '✗ Missing'}
          </span>
        </div>

        <div className="pt-2 border-t">
          <strong>Test Endpoints:</strong>
          <div className="mt-2 space-y-1 text-xs">
            <div>
              <a
                href={`${import.meta.env.VITE_STRAPI_URL}/admin`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Strapi Admin →
              </a>
            </div>
            <div>
              <a
                href={`${import.meta.env.VITE_STRAPI_URL}/api/company-setting`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                API: Company Setting →
              </a>
            </div>
            <div>
              <a
                href={`${import.meta.env.VITE_STRAPI_URL}/api/pages`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                API: Pages →
              </a>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t">
          <strong>Quick Setup:</strong>
          <ol className="mt-2 space-y-1 text-xs list-decimal list-inside">
            <li>Start Strapi: <code className="bg-gray-100 px-1">npm run develop</code></li>
            <li>Open <a href="http://localhost:1337/admin" target="_blank" className="text-blue-600">admin panel</a></li>
            <li>Create API Token in Settings</li>
            <li>Add to .env: <code className="bg-gray-100 px-1">VITE_STRAPI_API_TOKEN</code></li>
          </ol>
        </div>
      </div>
    </div>
  );
}
