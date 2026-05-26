import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie, X, Shield } from 'lucide-react';

const STORAGE_KEY = 'intellixbom_cookie_consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      // Slight delay so it doesn't flash on first paint
      const t = setTimeout(() => setVisible(true), 900);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, 'declined');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-[300] w-full"
        >
          <div
            className="relative w-full px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center gap-4"
            style={{
              background: 'var(--p0)',
              borderTop: '1px solid var(--p3)',
              boxShadow: '0 -8px 40px rgba(14,26,46,0.10)',
            }}
          >
            {/* Icon */}
            <div
              className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(0,177,220,0.08)', border: '1px solid rgba(0,177,220,0.2)' }}
            >
              <Cookie className="w-4 h-4" style={{ color: 'var(--c5)' }} />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-[13px] leading-[1.6]" style={{ color: 'var(--ink-600)' }}>
                <span className="font-semibold" style={{ color: 'var(--ink-950)' }}>We use cookies</span>
                {' '}to improve your experience and analyse site usage.
                By accepting, you agree to our{' '}
                <a
                  href="#"
                  className="underline underline-offset-2"
                  style={{ color: 'var(--c5)' }}
                >
                  Privacy Policy
                </a>.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={decline}
                className="px-4 py-2 text-[13px] font-medium rounded-lg transition-all duration-150"
                style={{ color: 'var(--ink-500)', border: '1px solid var(--p3)', background: 'transparent' }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--p4)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--ink-700)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--p3)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--ink-500)';
                }}
              >
                Decline
              </button>
              <button
                onClick={accept}
                className="px-4 py-2 text-[13px] font-semibold text-white rounded-lg transition-all duration-150"
                style={{
                  background: 'var(--c5)',
                  boxShadow: '0 2px 10px rgba(0,177,220,0.35)',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 18px rgba(0,177,220,0.5)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 10px rgba(0,177,220,0.35)'}
              >
                Accept All
              </button>
            </div>

            {/* Dismiss × */}
            <button
              onClick={decline}
              className="absolute top-3 right-3 transition-colors"
              style={{ color: 'var(--ink-400)' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--ink-700)')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--ink-400)')}
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
