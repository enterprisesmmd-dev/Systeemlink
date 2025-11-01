import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Home, Phone, Headphones, Mail, Moon, Sun, Settings, Briefcase, Building2, Users, Zap, Cloud, Shield, HeadphonesIcon, ChevronRight, Sparkles } from 'lucide-react';
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
                  className={`transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0ea5e9]/50 focus-visible:ring-offset-2 rounded-lg ${
                    isActive('/') && !location.pathname.includes('oplossingen') && !location.pathname.includes('branches') && !location.pathname.includes('bedrijfsinformatie')
                      ? 'text-[#0ea5e9]'
                      : 'text-gray-700 dark:text-gray-300 hover:text-[#0ea5e9]'
                  }`}
                  aria-label="Home"
                >
                  <Home className="w-6 h-6" strokeWidth={2.5} />
                </Link>
                
                <div className="group relative">
                  <button className={`flex items-center gap-1 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0ea5e9]/50 focus-visible:ring-offset-2 rounded-lg ${
                    isActive('/oplossingen') ? 'text-[#0ea5e9]' : 'text-gray-700 dark:text-gray-300 hover:text-[#0ea5e9]'
                  }`}>
                    Oplossingen
                    <ChevronDown className="w-5 h-5" strokeWidth={2.5} />
                  </button>
                  <div className="absolute left-0 top-full pt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900/50 rounded-lg border border-gray-100 dark:border-gray-700 py-2">
                      <Link to="/oplossingen" className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-[#0ea5e9] focus:outline-none focus-visible:bg-gray-50 dark:focus-visible:bg-gray-700">
                        Alle oplossingen
                      </Link>
                      <Link to="/oplossingen/werkplekbeheer" className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-[#0ea5e9] focus:outline-none focus-visible:bg-gray-50 dark:focus-visible:bg-gray-700">
                        Werkplekbeheer
                      </Link>
                      <Link to="/oplossingen/cloud-microsoft-365" className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-[#0ea5e9] focus:outline-none focus-visible:bg-gray-50 dark:focus-visible:bg-gray-700">
                        Cloud & Microsoft 365
                      </Link>
                      <Link to="/oplossingen/netwerk-beveiliging" className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-[#0ea5e9] focus:outline-none focus-visible:bg-gray-50 dark:focus-visible:bg-gray-700">
                        Netwerk & Beveiliging
                      </Link>
                      <Link to="/oplossingen/it-support" className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-[#0ea5e9] focus:outline-none focus-visible:bg-gray-50 dark:focus-visible:bg-gray-700">
                        IT-Support & Monitoring
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="group relative">
                  <button className={`flex items-center gap-1 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0ea5e9]/50 focus-visible:ring-offset-2 rounded-lg ${
                    isActive('/branches') ? 'text-[#0ea5e9]' : 'text-gray-700 dark:text-gray-300 hover:text-[#0ea5e9]'
                  }`}>
                    Branches
                    <ChevronDown className="w-5 h-5" strokeWidth={2.5} />
                  </button>
                  <div className="absolute left-0 top-full pt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900/50 rounded-lg border border-gray-100 dark:border-gray-700 py-2">
                      <Link to="/branches" className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-[#0ea5e9] focus:outline-none focus-visible:bg-gray-50 dark:focus-visible:bg-gray-700">
                        Alle branches
                      </Link>
                      <Link to="/branches/zakelijke-dienstverlening" className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-[#0ea5e9] focus:outline-none focus-visible:bg-gray-50 dark:focus-visible:bg-gray-700">
                        Zakelijke dienstverlening
                      </Link>
                      <Link to="/branches/zorg-onderwijs" className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-[#0ea5e9] focus:outline-none focus-visible:bg-gray-50 dark:focus-visible:bg-gray-700">
                        Zorg & Onderwijs
                      </Link>
                      <Link to="/branches/retail-logistiek" className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-[#0ea5e9] focus:outline-none focus-visible:bg-gray-50 dark:focus-visible:bg-gray-700">
                        Retail & Logistiek
                      </Link>
                      <Link to="/branches/bouw-industrie" className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-[#0ea5e9] focus:outline-none focus-visible:bg-gray-50 dark:focus-visible:bg-gray-700">
                        Bouw & Industrie
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="group relative">
                  <button className={`flex items-center gap-1 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0ea5e9]/50 focus-visible:ring-offset-2 rounded-lg ${
                    isActive('/bedrijfsinformatie') ? 'text-[#0ea5e9]' : 'text-gray-700 dark:text-gray-300 hover:text-[#0ea5e9]'
                  }`}>
                    Bedrijfsinformatie
                    <ChevronDown className="w-5 h-5" strokeWidth={2.5} />
                  </button>
                  <div className="absolute left-0 top-full pt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900/50 rounded-lg border border-gray-100 dark:border-gray-700 py-2">
                      <Link to="/bedrijfsinformatie/over-ons" className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-[#0ea5e9] focus:outline-none focus-visible:bg-gray-50 dark:focus-visible:bg-gray-700">
                        Over Systeemlink
                      </Link>
                      <Link to="/bedrijfsinformatie/partners-certificeringen" className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-[#0ea5e9] focus:outline-none focus-visible:bg-gray-50 dark:focus-visible:bg-gray-700">
                        Partners
                      </Link>
                      <Link to="/bedrijfsinformatie/vacatures" className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-[#0ea5e9] focus:outline-none focus-visible:bg-gray-50 dark:focus-visible:bg-gray-700">
                        Vacatures
                      </Link>
                      <Link to="/bedrijfsinformatie/contact" className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-[#0ea5e9] focus:outline-none focus-visible:bg-gray-50 dark:focus-visible:bg-gray-700">
                        Contact
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Center: Logo */}
              <Link to="/" className="flex items-center justify-center !outline-none !border-0 focus:!outline-none active:!outline-none focus-visible:!outline-none focus-visible:!ring-0">
                <img src={logo} alt="Systeemlink" className="h-[52px] !outline-none !border-0 focus:!outline-none active:!outline-none" />
              </Link>

              {/* Right: CTA Button */}
              <div className="flex items-center gap-3 justify-end">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300 hover:text-[#0ea5e9] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0ea5e9]/50 focus-visible:ring-offset-2"
                  aria-label="Toggle dark mode"
                >
                  {theme === 'dark' ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </button>
                <Link to="/it-check">
                  <Button className="bg-[#0ea5e9] hover:bg-[#0284c7] rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0ea5e9]/50 focus-visible:ring-offset-2">
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
                className="p-2.5 text-gray-700 dark:text-gray-300 hover:text-[#0ea5e9] transition-colors z-10 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-[#0ea5e9] -ml-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0ea5e9]/50 focus-visible:ring-offset-2"
                aria-label="Open menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M3 6h18M3 12h18M3 18h18"/>
                </svg>
              </button>

              {/* Center: Logo - Absolutely Centered */}
              <Link to="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0ea5e9]/50 focus-visible:ring-offset-2 rounded-lg">
                <img src={logo} alt="Systeemlink" className="h-[44px]" />
              </Link>

              {/* Right: Support Icon */}
              <div className="flex items-center z-10 ml-auto -mr-2">
                <Link
                  to="/oplossingen/it-support"
                  className="p-2.5 text-gray-700 dark:text-gray-300 hover:text-[#0ea5e9] transition-colors rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-[#0ea5e9] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0ea5e9]/50 focus-visible:ring-offset-2"
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
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0ea5e9]/50"
                  aria-label="Sluit menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Menu Content */}
              <div className="p-6">
                {/* Quick Actions Grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <Link 
                    to="/it-check" 
                    className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0ea5e9] to-[#0284c7] p-4 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative">
                      <Sparkles className="w-6 h-6 mb-2" />
                      <p className="text-sm font-medium">Gratis IT-check</p>
                    </div>
                  </Link>
                  
                  <Link 
                    to="/bedrijfsinformatie/contact"
                    className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 p-4 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    <div className="absolute inset-0 bg-[#0ea5e9]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative">
                      <Mail className="w-6 h-6 mb-2 text-gray-700 dark:text-gray-300" />
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Contact</p>
                    </div>
                  </Link>
                </div>

                {/* Navigation with Icons & Animations */}
                <nav className="space-y-2">
                  {/* Home */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Link
                      to="/"
                      className="flex items-center justify-between group px-4 py-3.5 rounded-xl hover:bg-gradient-to-r hover:from-[#0ea5e9]/10 hover:to-transparent transition-all duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0ea5e9]/10 to-[#0ea5e9]/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Home className="w-5 h-5 text-[#0ea5e9]" />
                        </div>
                        <span className="font-medium text-gray-900 dark:text-gray-100">Home</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </motion.div>

                  {/* Oplossingen Section */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                    className="space-y-2"
                  >
                    <div className="px-4 py-2 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/10 to-purple-500/5 flex items-center justify-center">
                        <Settings className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      </div>
                      <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Oplossingen</span>
                    </div>
                    <div className="ml-4 space-y-1 border-l-2 border-gray-100 dark:border-gray-800 pl-4">
                      <Link
                        to="/oplossingen"
                        className="flex items-center justify-between group px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                      >
                        <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-[#0ea5e9]">Alle oplossingen</span>
                        <ChevronRight className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                      <Link
                        to="/oplossingen/werkplekbeheer"
                        className="flex items-center gap-2 group px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                      >
                        <Briefcase className="w-4 h-4 text-gray-400 group-hover:text-[#0ea5e9]" />
                        <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-[#0ea5e9]">Werkplekbeheer</span>
                      </Link>
                      <Link
                        to="/oplossingen/cloud-microsoft-365"
                        className="flex items-center gap-2 group px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                      >
                        <Cloud className="w-4 h-4 text-gray-400 group-hover:text-[#0ea5e9]" />
                        <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-[#0ea5e9]">Cloud & Microsoft 365</span>
                      </Link>
                      <Link
                        to="/oplossingen/netwerk-beveiliging"
                        className="flex items-center gap-2 group px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                      >
                        <Shield className="w-4 h-4 text-gray-400 group-hover:text-[#0ea5e9]" />
                        <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-[#0ea5e9]">Netwerk & Beveiliging</span>
                      </Link>
                      <Link
                        to="/oplossingen/it-support"
                        className="flex items-center gap-2 group px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                      >
                        <HeadphonesIcon className="w-4 h-4 text-gray-400 group-hover:text-[#0ea5e9]" />
                        <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-[#0ea5e9]">IT-Support & Monitoring</span>
                      </Link>
                    </div>
                  </motion.div>

                  {/* Branches Section */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-2"
                  >
                    <div className="px-4 py-2 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-500/5 flex items-center justify-center">
                        <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Branches</span>
                    </div>
                    <div className="ml-4 space-y-1 border-l-2 border-gray-100 dark:border-gray-800 pl-4">
                      <Link
                        to="/branches"
                        className="flex items-center justify-between group px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                      >
                        <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-[#0ea5e9]">Alle branches</span>
                        <ChevronRight className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                      <Link
                        to="/branches/zakelijke-dienstverlening"
                        className="block px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 hover:text-[#0ea5e9] transition-all"
                      >
                        Zakelijke dienstverlening
                      </Link>
                      <Link
                        to="/branches/zorg-onderwijs"
                        className="block px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 hover:text-[#0ea5e9] transition-all"
                      >
                        Zorg & Onderwijs
                      </Link>
                      <Link
                        to="/branches/retail-logistiek"
                        className="block px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 hover:text-[#0ea5e9] transition-all"
                      >
                        Retail & Logistiek
                      </Link>
                      <Link
                        to="/branches/bouw-industrie"
                        className="block px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 hover:text-[#0ea5e9] transition-all"
                      >
                        Bouw & Industrie
                      </Link>
                    </div>
                  </motion.div>

                  {/* Bedrijfsinformatie Section */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 }}
                    className="space-y-2"
                  >
                    <div className="px-4 py-2 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500/10 to-green-500/5 flex items-center justify-center">
                        <Users className="w-4 h-4 text-green-600 dark:text-green-400" />
                      </div>
                      <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Bedrijfsinformatie</span>
                    </div>
                    <div className="ml-4 space-y-1 border-l-2 border-gray-100 dark:border-gray-800 pl-4">
                      <Link
                        to="/bedrijfsinformatie/over-ons"
                        className="block px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 hover:text-[#0ea5e9] transition-all"
                      >
                        Over Systeemlink
                      </Link>
                      <Link
                        to="/bedrijfsinformatie/partners-certificeringen"
                        className="block px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 hover:text-[#0ea5e9] transition-all"
                      >
                        Partners
                      </Link>
                      <Link
                        to="/bedrijfsinformatie/vacatures"
                        className="block px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 hover:text-[#0ea5e9] transition-all"
                      >
                        Vacatures
                      </Link>
                      <Link
                        to="/bedrijfsinformatie/contact"
                        className="block px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 hover:text-[#0ea5e9] transition-all"
                      >
                        Contact
                      </Link>
                    </div>
                  </motion.div>
                </nav>

                {/* Divider */}
                <div className="my-6 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent"></div>

                {/* Contact Card - Modern Design */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-50 via-sky-50 to-blue-50 dark:from-indigo-950/30 dark:via-sky-950/30 dark:to-blue-950/30 p-5 border border-indigo-100/50 dark:border-indigo-900/50"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#0ea5e9]/20 to-transparent rounded-full blur-2xl"></div>
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Direct beschikbaar</p>
                    </div>
                    <div className="space-y-3">
                      <a
                        href="tel:+31613777733"
                        className="flex items-center gap-3 group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Phone className="w-4 h-4 text-[#0ea5e9]" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Bel ons direct</p>
                          <p className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-[#0ea5e9] transition-colors">06 13777733</p>
                        </div>
                      </a>
                      <a
                        href="mailto:info@systeemlink.nl"
                        className="flex items-center gap-3 group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Mail className="w-4 h-4 text-[#0ea5e9]" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Email ons</p>
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-[#0ea5e9] transition-colors">info@systeemlink.nl</p>
                        </div>
                      </a>
                    </div>
                  </div>
                </motion.div>

                {/* Dark Mode Toggle - Redesigned */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="mt-5"
                >
                  <button
                    onClick={toggleTheme}
                    className="w-full flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0ea5e9]/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500/10 to-amber-500/5 dark:from-blue-500/10 dark:to-blue-500/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                        {theme === 'dark' ? (
                          <Moon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        ) : (
                          <Sun className="w-5 h-5 text-amber-600" />
                        )}
                      </div>
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {theme === 'dark' ? 'Donkere modus' : 'Lichte modus'}
                      </span>
                    </div>
                    <div className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                      theme === 'dark' ? 'bg-[#0ea5e9]' : 'bg-gray-300'
                    }`}>
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform ${
                          theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </div>
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}