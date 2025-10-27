import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Facebook, Linkedin, Twitter, Moon, Sun } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { getCompanySettings } from './cms/CompanySettings';
import { useTheme } from '../hooks/useTheme';

// Use external URL for footer logo
const logo = 'https://i.ibb.co/FkdQzhts/cc1c034c-d843-4cf1-affa-95f62f7a5413.jpg';

export function Footer() {
  const navigate = useNavigate();
  const [clickCount, setClickCount] = useState(0);
  const [resetTimer, setResetTimer] = useState<NodeJS.Timeout | null>(null);
  const [companyInfo, setCompanyInfo] = useState(getCompanySettings());
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (clickCount === 5) {
      // Navigate to CMS after 5 clicks
      navigate('/be-he-er-admin');
      setClickCount(0);
    }
  }, [clickCount, navigate]);

  const handleSecretClick = () => {
    setClickCount(prev => prev + 1);

    // Reset counter after 3 seconds of inactivity
    if (resetTimer) {
      clearTimeout(resetTimer);
    }
    const timer = setTimeout(() => {
      setClickCount(0);
    }, 3000);
    setResetTimer(timer);

    // Optional: Visual feedback
    if (clickCount === 4) {
      // Next click will navigate
      console.log('🔓 One more click to access CMS...');
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Company Info - Spans 2 columns on large screens */}
          <div className="lg:col-span-2">
            <div 
              onClick={handleSecretClick}
              className={`cursor-pointer select-none inline-block transition-transform mb-6 ${
                clickCount > 0 ? 'scale-110' : ''
              }`}
              title={clickCount > 0 ? `${clickCount}/5` : ''}
              style={{
                animation: clickCount > 0 ? 'pulse 0.3s ease-in-out' : 'none'
              }}
            >
              <ImageWithFallback
                src={logo}
                alt="Systeemlink"
                className="h-10"
                fallback={<img src={logo} alt="Systeemlink" className="h-10" />}
              />
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm">
              Uw betrouwbare partner in werkplekbeheer en IT-oplossingen. 
              Wij helpen bedrijven met professionele IT-diensten die écht werken.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#0ea5e9]/10 dark:bg-[#0ea5e9]/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-[#0ea5e9]" />
                </div>
                <span>{companyInfo.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#0ea5e9]/10 dark:bg-[#0ea5e9]/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-[#0ea5e9]" />
                </div>
                <span>{companyInfo.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#0ea5e9]/10 dark:bg-[#0ea5e9]/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-[#0ea5e9]" />
                </div>
                <span>{companyInfo.address.city}, {companyInfo.address.country}</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex gap-3">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-[#0ea5e9] flex items-center justify-center transition-all duration-300 group"
              >
                <Linkedin className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-[#0ea5e9] flex items-center justify-center transition-all duration-300 group"
              >
                <Twitter className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-[#0ea5e9] flex items-center justify-center transition-all duration-300 group"
              >
                <Facebook className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <button
                onClick={toggleTheme}
                className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-[#0ea5e9] flex items-center justify-center transition-all duration-300 group"
                aria-label="Toggle dark mode"
                title={theme === 'dark' ? 'Schakel naar lichte modus' : 'Schakel naar donkere modus'}
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-white transition-colors" />
                ) : (
                  <Moon className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-white transition-colors" />
                )}
              </button>
            </div>
          </div>

          {/* Oplossingen */}
          <div>
            <h3 className="text-gray-900 dark:text-gray-100 mb-5 tracking-tight">Oplossingen</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/oplossingen" className="text-gray-600 dark:text-gray-400 hover:text-[#0ea5e9] transition-colors inline-flex items-center group">
                  <span className="w-1 h-1 rounded-full bg-[#0ea5e9] mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Overzicht
                </Link>
              </li>
              <li>
                <Link to="/oplossingen/werkplekbeheer" className="text-gray-600 dark:text-gray-400 hover:text-[#0ea5e9] transition-colors inline-flex items-center group">
                  <span className="w-1 h-1 rounded-full bg-[#0ea5e9] mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Werkplekbeheer
                </Link>
              </li>
              <li>
                <Link to="/oplossingen/cloud-microsoft-365" className="text-gray-600 dark:text-gray-400 hover:text-[#0ea5e9] transition-colors inline-flex items-center group">
                  <span className="w-1 h-1 rounded-full bg-[#0ea5e9] mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Cloud & Microsoft 365
                </Link>
              </li>
              <li>
                <Link to="/oplossingen/netwerk-beveiliging" className="text-gray-600 dark:text-gray-400 hover:text-[#0ea5e9] transition-colors inline-flex items-center group">
                  <span className="w-1 h-1 rounded-full bg-[#0ea5e9] mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Netwerk & Beveiliging
                </Link>
              </li>
              <li>
                <Link to="/oplossingen/it-support" className="text-gray-600 dark:text-gray-400 hover:text-[#0ea5e9] transition-colors inline-flex items-center group">
                  <span className="w-1 h-1 rounded-full bg-[#0ea5e9] mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  IT-Support & Monitoring
                </Link>
              </li>
            </ul>
          </div>

          {/* Branches */}
          <div>
            <h3 className="text-gray-900 dark:text-gray-100 mb-5 tracking-tight">Branches</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/branches" className="text-gray-600 dark:text-gray-400 hover:text-[#0ea5e9] transition-colors inline-flex items-center group">
                  <span className="w-1 h-1 rounded-full bg-[#0ea5e9] mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Overzicht
                </Link>
              </li>
              <li>
                <Link to="/branches/zakelijke-dienstverlening" className="text-gray-600 dark:text-gray-400 hover:text-[#0ea5e9] transition-colors inline-flex items-center group">
                  <span className="w-1 h-1 rounded-full bg-[#0ea5e9] mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Zakelijke dienstverlening
                </Link>
              </li>
              <li>
                <Link to="/branches/zorg-onderwijs" className="text-gray-600 dark:text-gray-400 hover:text-[#0ea5e9] transition-colors inline-flex items-center group">
                  <span className="w-1 h-1 rounded-full bg-[#0ea5e9] mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Zorg & Onderwijs
                </Link>
              </li>
              <li>
                <Link to="/branches/retail-logistiek" className="text-gray-600 dark:text-gray-400 hover:text-[#0ea5e9] transition-colors inline-flex items-center group">
                  <span className="w-1 h-1 rounded-full bg-[#0ea5e9] mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Retail & Logistiek
                </Link>
              </li>
              <li>
                <Link to="/branches/bouw-industrie" className="text-gray-600 dark:text-gray-400 hover:text-[#0ea5e9] transition-colors inline-flex items-center group">
                  <span className="w-1 h-1 rounded-full bg-[#0ea5e9] mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Bouw & Industrie
                </Link>
              </li>
            </ul>
          </div>

          {/* Bedrijfsinformatie */}
          <div>
            <h3 className="text-gray-900 dark:text-gray-100 mb-5 tracking-tight">Bedrijfsinformatie</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/bedrijfsinformatie/over-ons" className="text-gray-600 dark:text-gray-400 hover:text-[#0ea5e9] transition-colors inline-flex items-center group">
                  <span className="w-1 h-1 rounded-full bg-[#0ea5e9] mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Over Systeemlink
                </Link>
              </li>
              <li>
                <Link to="/bedrijfsinformatie/partners-certificeringen" className="text-gray-600 dark:text-gray-400 hover:text-[#0ea5e9] transition-colors inline-flex items-center group">
                  <span className="w-1 h-1 rounded-full bg-[#0ea5e9] mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Partners
                </Link>
              </li>
              <li>
                <Link to="/bedrijfsinformatie/vacatures" className="text-gray-600 dark:text-gray-400 hover:text-[#0ea5e9] transition-colors inline-flex items-center group">
                  <span className="w-1 h-1 rounded-full bg-[#0ea5e9] mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Vacatures
                </Link>
              </li>
              <li>
                <Link to="/bedrijfsinformatie/contact" className="text-gray-600 dark:text-gray-400 hover:text-[#0ea5e9] transition-colors inline-flex items-center group">
                  <span className="w-1 h-1 rounded-full bg-[#0ea5e9] mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Contact
                </Link>
              </li>
              <li className="pt-2">
                <Link 
                  to="/it-check" 
                  className="inline-flex items-center gap-2 text-sm bg-[#0ea5e9] text-white px-4 py-2 rounded-full hover:bg-[#0284c7] transition-all duration-300 hover:gap-3"
                >
                  <span>Gratis IT-check</span>
                  <span className="text-xs">→</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-800 my-10"></div>

        {/* Bottom Section */}
        <div className="space-y-6">
          {/* Copyright & Legal */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="text-sm text-gray-500 dark:text-gray-400 max-w-3xl">
              <p className="mb-2">
                &copy; {new Date().getFullYear()} Systeemlink. Alle rechten voorbehouden.
              </p>
              <p className="text-xs leading-relaxed text-gray-400 dark:text-gray-500">
                Alle content, logo's en handelsmerken op deze website zijn eigendom van Systeemlink of haar licentiegevers. 
                Ongeautoriseerd gebruik is verboden. De informatie op deze website is uitsluitend bedoeld voor algemene informatieve doeleinden. 
                Systeemlink aanvaardt geen aansprakelijkheid voor eventuele schade voortvloeiend uit het gebruik van deze website.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 text-xs text-gray-400 dark:text-gray-500">
              <span>KvK: {companyInfo.kvk}</span>
              <span>BTW: {companyInfo.btw}</span>
            </div>
          </div>

          {/* Realisatie & Ontwikkeling */}
          <div className="border-t border-gray-100 dark:border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <p className="text-xs text-gray-400 dark:text-gray-500">Realisatie & Ontwikkeling:</p>
            <a
              href="https://buju.group"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-60 hover:opacity-100 transition-opacity"
            >
              <ImageWithFallback
                src="https://buju.group/wp-content/uploads/2025/09/ogo-2048x710-1-300x1041-1.png"
                alt="Buju Group"
                className="h-10 object-contain"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}