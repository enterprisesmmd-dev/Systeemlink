import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { X, Cookie } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Show after 1 second delay for better UX
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 bg-[#0ea5e9]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Cookie className="w-6 h-6 text-[#0ea5e9]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2">Wij gebruiken cookies</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Wij gebruiken cookies om uw ervaring te verbeteren, verkeer te analyseren en
                      gepersonaliseerde inhoud te tonen. Door op "Accepteren" te klikken, stemt u in met ons gebruik van cookies.
                      {' '}
                      <a href="/privacy" className="text-[#0ea5e9] hover:underline">
                        Meer informatie
                      </a>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <Button
                    variant="outline"
                    onClick={declineCookies}
                    className="flex-1 md:flex-none"
                  >
                    Weigeren
                  </Button>
                  <Button
                    onClick={acceptCookies}
                    className="flex-1 md:flex-none bg-[#0ea5e9] hover:bg-[#0284c7]"
                  >
                    Accepteren
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
