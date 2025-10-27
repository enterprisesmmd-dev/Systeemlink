import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Home, Phone, Headphones, Mail, Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';
import { usePrefetch } from '../hooks/usePrefetch';
import { useTheme } from '../hooks/useTheme';
import { motion, AnimatePresence } from 'motion/react';

// Logo URLs for light and dark mode
const logoLight = 'https://i.ibb.co/Gv0xYGJB/4cc1dfdabb026e08ad887f3b3cf0ef7043a211cb-d-WZj-J9q0.png';
const logoDark = 'https://i.ibb.co/NGFgCxH/4cc1dfdabb026e08ad887f3b3cf0ef7043a211cb-d-WZj-J9q0white.png';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  // Get the appropriate logo based on theme
  const logo = theme === 'dark' ? logoDark : logoLight;

  // Prefetch belangrijke pagina's voor snellere navigatie
  usePrefetch([
    '/',
    '/it-check',
    '/oplossingen',
    '/branches',
    '/bedrijfsinformatie/contact'
  ]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on location change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-50 py-4">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* White rounded background for entire header */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg dark:shadow-gray-800/50 px-6 py-3 border border-transparent dark:border-gray-800">
            {/* Desktop Layout: 3 columns */}
            <div className="hidden lg:grid grid-cols-3 items-center gap-4">
              {/* Left: Desktop Navigation */}
              <div className="flex items-center gap-6 justify-start">
                <Link
                  to="/"
                  className={`transition-colors ${
                    isActive('/') && !location.pathname.includes('oplossingen') && !location.pathname.includes('branches') && !location.pathname.includes('bedrijfsinformatie')
                      ? 'text-[#0ea5e9]'
                      : 'text-gray-700 dark:text-gray-300 hover:text-[#0ea5e9]'
                  }`}
                  aria-label="Home"
                >
                  <Home className="w-6 h-6" strokeWidth={2.5} />
                </Link>
                
                <div className="group relative">
                  <button className={`flex items-center gap-1 transition-colors ${
                    isActive('/oplossingen') ? 'text-[#0ea5e9]' : 'text-gray-700 dark:text-gray-300 hover:text-[#0ea5e9]'
                  }`}>
                    Oplossingen
                    <ChevronDown className="w-5 h-5" strokeWidth={2.5} />
                  </button>
                  <div className="absolute left-0 top-full pt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900/50 rounded-lg border border-gray-100 dark:border-gray-700 py-2">
                      <Link to="/oplossingen" className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-[#0ea5e9]">
                        Alle oplossingen
                      </Link>
                      <Link to="/oplossingen/werkplekbeheer" className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-[#0ea5e9]">
                        Werkplekbeheer
                      </Link>
                      <Link to="/oplossingen/cloud-microsoft-365" className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-[#0ea5e9]">
                        Cloud & Microsoft 365
                      </Link>
                      <Link to="/oplossingen/netwerk-beveiliging" className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-[#0ea5e9]">
                        Netwerk & Beveiliging
                      </Link>
                      <Link to="/oplossingen/it-support" className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-[#0ea5e9]">
                        IT-Support & Monitoring
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="group relative">
                  <button className={`flex items-center gap-1 transition-colors ${
                    isActive('/branches') ? 'text-[#0ea5e9]' : 'text-gray-700 dark:text-gray-300 hover:text-[#0ea5e9]'
                  }`}>
                    Branches
                    <ChevronDown className="w-5 h-5" strokeWidth={2.5} />
                  </button>
                  <div className="absolute left-0 top-full pt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900/50 rounded-lg border border-gray-100 dark:border-gray-700 py-2">
                      <Link to="/branches" className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-[#0ea5e9]">
                        Alle branches
                      </Link>
                      <Link to="/branches/zakelijke-dienstverlening" className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-[#0ea5e9]">
                        Zakelijke dienstverlening
                      </Link>
                      <Link to="/branches/zorg-onderwijs" className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-[#0ea5e9]">
                        Zorg & Onderwijs
                      </Link>
                      <Link to="/branches/retail-logistiek" className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-[#0ea5e9]">
                        Retail & Logistiek
                      </Link>
                      <Link to="/branches/bouw-industrie" className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-[#0ea5e9]">
                        Bouw & Industrie
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="group relative">
                  <button className={`flex items-center gap-1 transition-colors ${
                    isActive('/bedrijfsinformatie') ? 'text-[#0ea5e9]' : 'text-gray-700 dark:text-gray-300 hover:text-[#0ea5e9]'
                  }`}>
                    Bedrijfsinformatie
                    <ChevronDown className="w-5 h-5" strokeWidth={2.5} />
                  </button>
                  <div className="absolute left-0 top-full pt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900/50 rounded-lg border border-gray-100 dark:border-gray-700 py-2">
                      <Link to="/bedrijfsinformatie/over-ons" className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-[#0ea5e9]">
                        Over Systeemlink
                      </Link>
                      <Link to="/bedrijfsinformatie/partners-certificeringen" className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-[#0ea5e9]">
                        Partners
                      </Link>
                      <Link to="/bedrijfsinformatie/vacatures" className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-[#0ea5e9]">
                        Vacatures
                      </Link>
                      <Link to="/bedrijfsinformatie/contact" className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-[#0ea5e9]">
                        Contact
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Center: Logo */}
              <Link to="/" className="flex items-center justify-center">
                <img src={logo} alt="Systeemlink" className="h-[52px]" />
              </Link>

              {/* Right: CTA Button */}
              <div className="flex items-center gap-3 justify-end">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300 hover:text-[#0ea5e9]"
                  aria-label="Toggle dark mode"
                >
                  {theme === 'dark' ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </button>
                <Link to="/it-check">
                  <Button className="bg-[#0ea5e9] hover:bg-[#0284c7] rounded-full">
                    Gratis IT-check
                  </Button>
                </Link>
              </div>
            </div>

            {/* Mobile Layout: Menu icon | Logo | Phone + Helpdesk */}
            <div className="lg:hidden flex items-center justify-between relative">
              {/* Left: Menu Icon */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2.5 text-gray-700 dark:text-gray-300 hover:text-[#0ea5e9] transition-colors z-10 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-[#0ea5e9] -ml-2"
                aria-label="Open menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M3 6h18M3 12h18M3 18h18"/>
                </svg>
              </button>

              {/* Center: Logo - Absolutely Centered */}
              <Link to="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <img src={logo} alt="Systeemlink" className="h-[44px]" />
              </Link>

              {/* Right: Support Icon */}
              <div className="flex items-center z-10 ml-auto -mr-2">
                <Link
                  to="/oplossingen/it-support"
                  className="p-2.5 text-gray-700 dark:text-gray-300 hover:text-[#0ea5e9] transition-colors rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-[#0ea5e9]"
                  aria-label="Helpdesk"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" strokeWidth="0.5">
                    <path d="M12 1c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9z"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-[60] lg:hidden"
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 left-0 w-full sm:w-96 bg-white dark:bg-gray-900 z-[70] shadow-2xl overflow-y-auto lg:hidden"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 flex items-center justify-between border-b border-gray-200 dark:border-gray-800 shadow-sm">
                <div className="flex items-center gap-3">
                  <img src={logo} alt="Systeemlink" className="h-14" />
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  aria-label="Sluit menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Menu Content */}
              <div className="p-6">
                {/* CTA Button */}
                <Link to="/it-check" className="block mb-6">
                  <Button className="w-full bg-[#0ea5e9] hover:bg-[#0284c7] rounded-full h-12">
                    🎯 Gratis IT-check aanvragen
                  </Button>
                </Link>

                {/* Navigation */}
                <nav className="space-y-1">
                  {/* Home */}
                  <Link
                    to="/"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-[#0ea5e9] transition-colors"
                  >
                    <Home className="w-5 h-5" />
                    <span>Home</span>
                  </Link>

                  {/* Oplossingen */}
                  <div className="space-y-1">
                    <Link
                      to="/oplossingen"
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <span className="text-gray-900 dark:text-gray-100">Oplossingen</span>
                    </Link>
                    <div className="pl-8 space-y-1">
                      <Link
                        to="/oplossingen/werkplekbeheer"
                        className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-[#0ea5e9] hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        Werkplekbeheer
                      </Link>
                      <Link
                        to="/oplossingen/cloud-microsoft-365"
                        className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-[#0ea5e9] hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        Cloud & Microsoft 365
                      </Link>
                      <Link
                        to="/oplossingen/netwerk-beveiliging"
                        className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-[#0ea5e9] hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        Netwerk & Beveiliging
                      </Link>
                      <Link
                        to="/oplossingen/it-support"
                        className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-[#0ea5e9] hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        IT-Support & Monitoring
                      </Link>
                    </div>
                  </div>

                  {/* Branches */}
                  <div className="space-y-1">
                    <Link
                      to="/branches"
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <span className="text-gray-900 dark:text-gray-100">Branches</span>
                    </Link>
                    <div className="pl-8 space-y-1">
                      <Link
                        to="/branches/zakelijke-dienstverlening"
                        className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-[#0ea5e9] hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        Zakelijke dienstverlening
                      </Link>
                      <Link
                        to="/branches/zorg-onderwijs"
                        className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-[#0ea5e9] hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        Zorg & Onderwijs
                      </Link>
                      <Link
                        to="/branches/retail-logistiek"
                        className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-[#0ea5e9] hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        Retail & Logistiek
                      </Link>
                      <Link
                        to="/branches/bouw-industrie"
                        className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-[#0ea5e9] hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        Bouw & Industrie
                      </Link>
                    </div>
                  </div>

                  {/* Bedrijfsinformatie */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-3 px-4 py-3">
                      <span className="text-gray-900 dark:text-gray-100">Bedrijfsinformatie</span>
                    </div>
                    <div className="pl-8 space-y-1">
                      <Link
                        to="/bedrijfsinformatie/over-ons"
                        className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-[#0ea5e9] hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        Over Systeemlink
                      </Link>
                      <Link
                        to="/bedrijfsinformatie/partners-certificeringen"
                        className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-[#0ea5e9] hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        Partners
                      </Link>
                      <Link
                        to="/bedrijfsinformatie/vacatures"
                        className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-[#0ea5e9] hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        Vacatures
                      </Link>
                      <Link
                        to="/bedrijfsinformatie/contact"
                        className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-[#0ea5e9] hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        Contact
                      </Link>
                    </div>
                  </div>
                </nav>

                {/* Contact Info */}
                <div className="mt-8 p-4 bg-gradient-to-br from-indigo-50 to-sky-50 dark:from-indigo-950/30 dark:to-sky-950/30 rounded-xl border border-indigo-100 dark:border-indigo-900">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Neem direct contact op</p>
                  <div className="space-y-2">
                    <a
                      href="tel:+31613777733"
                      className="flex items-center gap-3 text-gray-900 dark:text-gray-100 hover:text-[#0ea5e9] transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      <span>06 13777733</span>
                    </a>
                    <a
                      href="mailto:info@systeemlink.nl"
                      className="flex items-center gap-3 text-gray-900 dark:text-gray-100 hover:text-[#0ea5e9] transition-colors text-sm"
                    >
                      <Mail className="w-4 h-4" />
                      <span>info@systeemlink.nl</span>
                    </a>
                  </div>
                </div>

                {/* Dark Mode Toggle */}
                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {theme === 'dark' ? (
                        <Moon className="w-5 h-5 text-gray-900 dark:text-gray-100" />
                      ) : (
                        <Sun className="w-5 h-5 text-gray-900 dark:text-gray-100" />
                      )}
                      <span className="text-sm text-gray-900 dark:text-gray-100">
                        {theme === 'dark' ? 'Donkere modus' : 'Lichte modus'}
                      </span>
                    </div>
                    <button
                      onClick={toggleTheme}
                      className="relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 bg-gray-300 dark:bg-sky-600"
                      aria-label="Toggle dark mode"
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                          theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}