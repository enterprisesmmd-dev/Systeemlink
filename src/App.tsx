import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { BackToTop } from './components/BackToTop';
import { SupportWidget } from './components/SupportWidget';
import { CookieConsent } from './components/CookieConsent';
import { PerformanceMonitor } from './components/PerformanceMonitor';
import { CMSAdmin } from './components/CMSAdmin';
import { PuckPageRenderer } from './components/PuckPageRenderer';
import { Toaster } from './components/ui/sonner';
import { ThemeProvider } from './hooks/useTheme';
import { HomePage } from './components/pages/HomePage';
import { SolutionsPage } from './components/pages/SolutionsPage';
import { WorkplacePage } from './components/pages/WorkplacePage';
import { CloudPage } from './components/pages/CloudPage';
import { NetworkPage } from './components/pages/NetworkPage';
import { SupportPage } from './components/pages/SupportPage';
import { BranchesPage } from './components/pages/BranchesPage';
import { BusinessServicesPage } from './components/pages/BusinessServicesPage';
import { HealthEducationPage } from './components/pages/HealthEducationPage';
import { RetailLogisticsPage } from './components/pages/RetailLogisticsPage';
import { ConstructionPage } from './components/pages/ConstructionPage';
import { AboutPage } from './components/pages/AboutPage';
import { PartnersPage } from './components/pages/PartnersPage';
import { CertificationsPage } from './components/pages/CertificationsPage';
import { VacanciesPage } from './components/pages/VacanciesPage';
import { ContactPage } from './components/pages/ContactPage';
import { ITCheckPage } from './components/pages/ITCheckPage';
import { WorkplaceScanPage } from './components/pages/WorkplaceScanPage';
import { CloudScanPage } from './components/pages/CloudScanPage';
import { NetworkScanPage } from './components/pages/NetworkScanPage';
import { WorkplaceManagementLanding } from './components/pages/WorkplaceManagementLanding';
import { PuckPreviewPage } from './components/pages/PuckPreviewPage';

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <PerformanceMonitor />
        <Toaster />
        <Routes>
          {/* CMS Admin Route - No Header/Footer */}
          <Route path="/be-he-er-admin" element={<CMSAdmin />} />
          
          {/* Puck Preview Route - Minimal UI */}
          <Route path="/preview/:pageId" element={<PuckPreviewPage />} />
          
          {/* Regular Pages with Header/Footer */}
          <Route path="*" element={
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/it-check" element={<ITCheckPage />} />
                  
                  {/* Scan Pages */}
                  <Route path="/scan/modern-workplace" element={<WorkplaceScanPage />} />
                  <Route path="/scan/cloud-readiness" element={<CloudScanPage />} />
                  <Route path="/scan/security" element={<NetworkScanPage />} />
                  
                  {/* Landing Pages - Hidden from navigation */}
                  <Route path="/landings/werkplekbeheer" element={<WorkplaceManagementLanding />} />
                  
                  <Route path="/oplossingen" element={<SolutionsPage />} />
                  <Route path="/oplossingen/werkplekbeheer" element={<WorkplacePage />} />
                  <Route path="/oplossingen/cloud-microsoft-365" element={<CloudPage />} />
                  <Route path="/oplossingen/netwerk-beveiliging" element={<NetworkPage />} />
                  <Route path="/oplossingen/it-support" element={<SupportPage />} />
                  <Route path="/branches" element={<BranchesPage />} />
                  <Route path="/branches/zakelijke-dienstverlening" element={<BusinessServicesPage />} />
                  <Route path="/branches/zorg-onderwijs" element={<HealthEducationPage />} />
                  <Route path="/branches/retail-logistiek" element={<RetailLogisticsPage />} />
                  <Route path="/branches/bouw-industrie" element={<ConstructionPage />} />
                  <Route path="/bedrijfsinformatie/over-ons" element={<AboutPage />} />
                  <Route path="/bedrijfsinformatie/partners-certificeringen" element={<PartnersPage />} />
                  <Route path="/bedrijfsinformatie/certificeringen" element={<CertificationsPage />} />
                  <Route path="/bedrijfsinformatie/vacatures" element={<VacanciesPage />} />
                  <Route path="/bedrijfsinformatie/contact" element={<ContactPage />} />
                </Routes>
              </main>
              <Footer />
              <BackToTop />
              <CookieConsent />
              <SupportWidget />
            </div>
          } />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
