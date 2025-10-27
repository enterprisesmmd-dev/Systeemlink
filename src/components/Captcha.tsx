import { useEffect, useRef, useState } from 'react';

interface CaptchaProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: (error: string) => void;
}

// Global flag to track if hCaptcha script is loaded
let hCaptchaLoaded = false;
let hCaptchaLoadCallbacks: (() => void)[] = [];

// Global callback when hCaptcha loads
(window as any).onHCaptchaLoad = () => {
  hCaptchaLoaded = true;
  hCaptchaLoadCallbacks.forEach(callback => callback());
  hCaptchaLoadCallbacks = [];
};

export function Captcha({ onVerify, onExpire, onError }: CaptchaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check if script already exists
    const existingScript = document.querySelector('script[src*="hcaptcha.com/1/api.js"]');
    
    if (!existingScript) {
      // Load hCaptcha script with render=explicit
      const script = document.createElement('script');
      script.src = 'https://js.hcaptcha.com/1/api.js?render=explicit&onload=onHCaptchaLoad';
      script.async = true;
      script.defer = true;
      
      script.onerror = () => {
        console.error('Failed to load hCaptcha script');
        onError?.('Failed to load captcha');
      };

      document.head.appendChild(script);
    }

    // Wait for hCaptcha to be ready
    const initCaptcha = () => {
      if ((window as any).hcaptcha && containerRef.current) {
        // Make sure container is empty before rendering
        if (containerRef.current.innerHTML) {
          containerRef.current.innerHTML = '';
        }

        // Only render if we don't already have a widget
        if (widgetIdRef.current === null) {
          try {
            widgetIdRef.current = (window as any).hcaptcha.render(containerRef.current, {
              sitekey: '10000000-ffff-ffff-ffff-000000000001', // hCaptcha test key
              callback: (token: string) => {
                onVerify(token);
              },
              'expired-callback': () => {
                onExpire?.();
              },
              'error-callback': () => {
                onError?.('Captcha verification failed');
              },
              theme: 'light',
              size: 'normal'
            });
            setIsReady(true);
          } catch (e) {
            console.error('Error rendering hCaptcha:', e);
            onError?.('Failed to render captcha');
          }
        }
      }
    };

    if (hCaptchaLoaded) {
      initCaptcha();
    } else {
      hCaptchaLoadCallbacks.push(initCaptcha);
    }

    // Cleanup on unmount
    return () => {
      if (widgetIdRef.current !== null && (window as any).hcaptcha) {
        try {
          (window as any).hcaptcha.remove(widgetIdRef.current);
          widgetIdRef.current = null;
        } catch (e) {
          console.error('Error removing hCaptcha widget:', e);
        }
      }
    };
  }, []);

  return (
    <div className="flex justify-center my-4">
      <div ref={containerRef}></div>
    </div>
  );
}

export function resetCaptcha(widgetId?: string) {
  if ((window as any).hcaptcha) {
    try {
      if (widgetId) {
        (window as any).hcaptcha.reset(widgetId);
      } else {
        (window as any).hcaptcha.reset();
      }
    } catch (e) {
      console.error('Error resetting captcha:', e);
    }
  }
}
