import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getCompanySettings, getOpeningStatus } from './cms/CompanySettings';

interface SupportWidgetSettings {
  enabled: boolean;
  autoOpen: boolean;
  title: string;
  subtitle: string;
  description: string;
  availability: string;
  phone: string;
  email: string;
  supportPagePath: string;
  ctaText: string;
  ctaLink: string;
}

const defaultSettings: SupportWidgetSettings = {
  enabled: true,
  autoOpen: false,
  title: 'Systeemlink Support',
  subtitle: 'We helpen je graag verder!',
  description: 'Hoe kunnen we je vandaag helpen? Kies een van de onderstaande opties:',
  availability: 'Online • Ma-Vr 08:00-18:00',
  phone: '+31613777733',
  email: 'info@systeemlink.nl',
  supportPagePath: '/oplossingen/it-support',
  ctaText: '🎯 Vraag gratis IT-check aan',
  ctaLink: '/it-check'
};

export function SupportWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<SupportWidgetSettings>(defaultSettings);
  const [currentStatus, setCurrentStatus] = useState({ text: 'Online • Ma-Vr 08:00-18:00', isOpen: true });
  const [companyInfo, setCompanyInfo] = useState(getCompanySettings());

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('cms_support_widget_settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings({ ...defaultSettings, ...parsed });
        
        // Auto-open if configured
        if (parsed.autoOpen && parsed.enabled) {
          setTimeout(() => setIsOpen(true), 2000); // Open after 2 seconds
        }
      } catch (e) {
        console.error('Failed to parse support widget settings:', e);
      }
    }
    
    // Update status based on company opening hours
    const updateStatus = () => {
      const status = getOpeningStatus();
      setCurrentStatus(status);
    };
    
    updateStatus(); // Initial update
    const interval = setInterval(updateStatus, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, []);

  // If widget is disabled, don't render anything
  if (!settings.enabled) {
    return null;
  }

  return (
    <>
      {/* Floating Support Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 left-8 z-50 group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Support"
      >
        {/* Character Avatar with Headset */}
        <div className="relative">
          {/* Pulse Ring */}
          <div className="absolute inset-0 bg-[#0ea5e9] rounded-full animate-ping opacity-75"></div>
          
          {/* Main Avatar Circle */}
          <div className="relative w-16 h-16 bg-gradient-to-br from-[#0ea5e9] to-[#0284c7] rounded-full shadow-lg flex items-center justify-center border-4 border-white">
            {/* Support Character - Person with Headset */}
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              {/* Head */}
              <circle cx="12" cy="8" r="3.5" />
              {/* Body */}
              <path d="M12 13c-3.5 0-6 2-6 4v2h12v-2c0-2-2.5-4-6-4z" />
              {/* Headset */}
              <path d="M7 9c0-2.76 2.24-5 5-5s5 2.24 5 5v3c0 .55-.45 1-1 1h-1v-2h1V9c0-1.66-1.34-3-3-3S9 7.34 9 9v3h1v2H9c-.55 0-1-.45-1-1V9z" opacity="0.9"/>
              {/* Microphone */}
              <circle cx="16" cy="13" r="1.5" fill="white" opacity="0.9"/>
            </svg>
          </div>

          {/* Online Indicator */}
          <div className={`absolute -top-1 -right-1 w-5 h-5 ${currentStatus.isOpen ? 'bg-green-400' : 'bg-red-400'} border-2 border-white rounded-full flex items-center justify-center`}>
            <div className={`w-2 h-2 ${currentStatus.isOpen ? 'bg-green-600' : 'bg-red-600'} rounded-full animate-pulse`}></div>
          </div>

          {/* Tooltip */}
          <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
            Hulp nodig? Chat met ons!
            <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-gray-900"></div>
          </div>
        </div>
      </motion.button>

      {/* Support Popup */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/30 z-[60] backdrop-blur-sm"
            />

            {/* Popup Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-4 sm:bottom-28 sm:left-8 sm:top-auto sm:right-auto sm:inset-auto sm:w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl z-[70] overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col max-h-[calc(100vh-2rem)]"
            >
              {/* Header with Character */}
              <div className="bg-gradient-to-br from-[#0ea5e9] to-[#0284c7] p-6 text-white relative overflow-hidden flex-shrink-0">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full blur-2xl"></div>
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full blur-2xl"></div>
                </div>

                <div className="relative flex items-start gap-4">
                  {/* Character Avatar */}
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/40 flex-shrink-0">
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                      {/* Head */}
                      <circle cx="12" cy="8" r="3.5" />
                      {/* Body */}
                      <path d="M12 13c-3.5 0-6 2-6 4v2h12v-2c0-2-2.5-4-6-4z" />
                      {/* Headset */}
                      <path d="M7 9c0-2.76 2.24-5 5-5s5 2.24 5 5v3c0 .55-.45 1-1 1h-1v-2h1V9c0-1.66-1.34-3-3-3S9 7.34 9 9v3h1v2H9c-.55 0-1-.45-1-1V9z" opacity="0.9"/>
                      {/* Microphone */}
                      <circle cx="16" cy="13" r="1.5" fill="white" opacity="0.9"/>
                    </svg>
                    {/* Online dot */}
                    <div className="absolute top-0 right-0 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
                  </div>

                  {/* Text */}
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{settings.title}</h3>
                    <p className="text-sm text-white/90">{settings.subtitle}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className={`w-2 h-2 ${currentStatus.isOpen ? 'bg-green-400' : 'bg-red-400'} rounded-full animate-pulse`}></div>
                      <span className="text-xs text-white/80">{currentStatus.text}</span>
                    </div>
                  </div>

                  {/* Close Button */}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-0 right-0 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    aria-label="Sluiten"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Content - Scrollable */}
              <div className="p-6 overflow-y-auto flex-1">
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {settings.description}
                </p>

                {/* Contact Options */}
                <div className="space-y-3">
                  {/* Phone */}
                  <a
                    href={`tel:${settings.phone}`}
                    className="flex items-center gap-4 p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-900/30 dark:hover:to-emerald-900/30 border border-green-200 dark:border-green-800 rounded-xl transition-all group"
                  >
                    <div className="w-12 h-12 bg-green-500 dark:bg-green-600 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 dark:text-gray-100">Bel ons direct</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{settings.phone.replace('+31', '0').replace(/(\d{2})(\d{3})(\d{4})/, '$1 $2 $3')}</div>
                    </div>
                  </a>

                  {/* IT Support */}
                  <Link
                    to={settings.supportPagePath}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-4 p-4 bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-900/20 dark:to-sky-900/20 hover:from-blue-100 hover:to-sky-100 dark:hover:from-blue-900/30 dark:hover:to-sky-900/30 border border-blue-200 dark:border-blue-800 rounded-xl transition-all group"
                  >
                    <div className="w-12 h-12 bg-[#0ea5e9] dark:bg-sky-600 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 1c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9z"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 dark:text-gray-100">IT-Support & Helpdesk</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">24/7 monitoring</div>
                    </div>
                  </Link>

                  {/* Email */}
                  <a
                    href={`mailto:${settings.email}`}
                    className="flex items-center gap-4 p-4 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 hover:from-purple-100 hover:to-indigo-100 dark:hover:from-purple-900/30 dark:hover:to-indigo-900/30 border border-purple-200 dark:border-purple-800 rounded-xl transition-all group"
                  >
                    <div className="w-12 h-12 bg-purple-500 dark:bg-purple-600 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 dark:text-gray-100">Stuur een e-mail</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{settings.email}</div>
                    </div>
                  </a>
                </div>

                {/* Footer */}
                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Link
                    to={settings.ctaLink}
                    onClick={() => setIsOpen(false)}
                    className="block text-center px-4 py-3 bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] hover:from-[#0284c7] hover:to-[#0ea5e9] text-white rounded-xl transition-all"
                  >
                    {settings.ctaText}
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}