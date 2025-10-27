import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ScrollToTop } from '../components/ScrollToTop';
import { BackToTop } from '../components/BackToTop';
import { SupportWidget } from '../components/SupportWidget';
import { CookieConsent } from '../components/CookieConsent';
import { Toaster } from '../components/ui/sonner';
import { ThemeProvider } from '../hooks/useTheme';

// Pages
import { HomePage } from '../components/pages/HomePage';
import { SolutionsPage } from '../components/pages/SolutionsPage';
import { WorkplacePage } from '../components/pages/WorkplacePage';
import { CloudPage } from '../components/pages/CloudPage';
import { NetworkPage } from '../components/pages/NetworkPage';
import { SupportPage } from '../components/pages/SupportPage';
import { BranchesPage } from '../components/pages/BranchesPage';
import { BusinessServicesPage } from '../components/pages/BusinessServicesPage';
import { HealthEducationPage } from '../components/pages/HealthEducationPage';
import { RetailLogisticsPage } from '../components/pages/RetailLogisticsPage';
import { ConstructionPage } from '../components/pages/ConstructionPage';
import { AboutPage } from '../components/pages/AboutPage';
import { PartnersPage } from '../components/pages/PartnersPage';
import { CertificationsPage } from '../components/pages/CertificationsPage';
import { VacanciesPage } from '../components/pages/VacanciesPage';
import { ContactPage } from '../components/pages/ContactPage';
import { ITCheckPage } from '../components/pages/ITCheckPage';
import { WorkplaceScanPage } from '../components/pages/WorkplaceScanPage';
import { CloudScanPage } from '../components/pages/CloudScanPage';
import { NetworkScanPage } from '../components/pages/NetworkScanPage';
import { WorkplaceManagementLanding } from '../components/pages/WorkplaceManagementLanding';

// 404 Page
function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center max-w-md px-4">
        <h1 className="text-9xl font-bold text-sky-600 dark:text-sky-400 mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-4">Pagina niet gevonden</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          De pagina die u zoekt bestaat niet of is verplaatst.
        </p>
        <a 
          href="/" 
          className="inline-block px-8 py-3 bg-gradient-to-r from-sky-600 to-indigo-700 text-white rounded-lg hover:from-sky-700 hover:to-indigo-800 transition-all font-semibold"
        >
          Terug naar home
        </a>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <Toaster />
        
        <div className="min-h-screen flex flex-col">
          <Header />
          
          <main className="flex-1">
            <Routes>
              {/* Main Pages */}
              <Route path="/" element={<HomePage />} />
              <Route path="/it-check" element={<ITCheckPage />} />
              
              {/* Scan Pages */}
              <Route path="/scan/modern-workplace" element={<WorkplaceScanPage />} />
              <Route path="/scan/cloud-readiness" element={<CloudScanPage />} />
              <Route path="/scan/security" element={<NetworkScanPage />} />
              
              {/* Landing Pages */}
              <Route path="/landings/werkplekbeheer" element={<WorkplaceManagementLanding />} />
              
              {/* Solutions */}
              <Route path="/oplossingen" element={<SolutionsPage />} />
              <Route path="/oplossingen/werkplekbeheer" element={<WorkplacePage />} />
              <Route path="/oplossingen/cloud-microsoft-365" element={<CloudPage />} />
              <Route path="/oplossingen/netwerk-beveiliging" element={<NetworkPage />} />
              <Route path="/oplossingen/it-support" element={<SupportPage />} />
              
              {/* Branches */}
              <Route path="/branches" element={<BranchesPage />} />
              <Route path="/branches/zakelijke-dienstverlening" element={<BusinessServicesPage />} />
              <Route path="/branches/zorg-onderwijs" element={<HealthEducationPage />} />
              <Route path="/branches/retail-logistiek" element={<RetailLogisticsPage />} />
              <Route path="/branches/bouw-industrie" element={<ConstructionPage />} />
              
              {/* Company Info */}
              <Route path="/bedrijfsinformatie/over-ons" element={<AboutPage />} />
              <Route path="/bedrijfsinformatie/partners-certificeringen" element={<PartnersPage />} />
              <Route path="/bedrijfsinformatie/certificeringen" element={<CertificationsPage />} />
              <Route path="/bedrijfsinformatie/vacatures" element={<VacanciesPage />} />
              <Route path="/bedrijfsinformatie/contact" element={<ContactPage />} />
              
              {/* 404 */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          
          <Footer />
          <BackToTop />
          <CookieConsent />
          <SupportWidget />
        </div>
      </Router>
    </ThemeProvider>
  );
}
