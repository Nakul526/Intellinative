import { useState, useEffect } from 'react';
import { X, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import intelliXbomDark from '../../assets/IntelliXbom-Dark.png';
import intelliXbomWhite from '../../assets/IntelliXbom-White.png';

// ─── Paste your Power Automate HTTP trigger URL here ───────────────────────
const POWER_AUTOMATE_URL = 'YOUR_POWER_AUTOMATE_HTTP_TRIGGER_URL';
// ───────────────────────────────────────────────────────────────────────────

export default function DemoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', org: '' });
  const { isDark } = useTheme();

  useEffect(() => {
    const handler = () => {
      setIsOpen(true);
      setSubmitted(false);
      setError('');
      setForm({ name: '', email: '', org: '' });
    };
    window.addEventListener('openDemoModal', handler);
    return () => window.removeEventListener('openDemoModal', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const close = () => setIsOpen(false);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await fetch(POWER_AUTOMATE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          organization: form.org,
          submittedAt: new Date().toISOString(),
        }),
      });
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again or email us directly.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const inputStyle = {
    background: 'var(--app-elevated)',
    border: '1px solid var(--app-border)',
    color: 'var(--app-text-primary)',
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center px-4"
      style={{
        background: isDark ? 'rgba(5,7,15,0.88)' : 'rgba(15,20,40,0.45)',
        backdropFilter: 'blur(10px)'
      }}
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      <div
        className="relative w-full max-w-[500px] rounded-2xl overflow-hidden"
        style={{
          background: 'var(--app-card)',
          border: '1px solid var(--app-border)',
          boxShadow: isDark
            ? '0 40px 100px rgba(0,0,0,0.8), 0 0 60px rgba(0,177,220,0.18)'
            : '0 24px 80px rgba(0,0,0,0.15), 0 0 40px rgba(0,177,220,0.1)'
        }}
      >
        {/* Header strip */}
        <div className="h-1" style={{ background: 'linear-gradient(90deg, var(--c5), var(--c4))' }} />

        {/* Close */}
        <button
          onClick={close}
          className="absolute top-5 right-5 transition-colors"
          style={{ color: 'var(--app-text-dimmer)' }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--app-text-primary)')}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--app-text-dimmer)')}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="px-8 pt-7 pb-8">
          {submitted ? (
            <div className="text-center py-10">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                style={{ background: 'rgba(0,212,170,0.12)', border: '1px solid rgba(0,212,170,0.3)' }}
              >
                <CheckCircle2 className="w-8 h-8 text-[#00D4AA]" />
              </div>
              <h3 className="text-2xl font-bold mb-3" style={{ color: 'var(--app-text-primary)' }}>
                Request Received
              </h3>
              <p className="text-sm leading-[1.7] mb-8" style={{ color: 'var(--app-text-muted)' }}>
                We'll reach out within{' '}
                <span className="font-medium" style={{ color: 'var(--app-text-primary)' }}>24 hours</span>{' '}
                to schedule your personalized demo tailored to your regulatory environment.
              </p>
              <button
                onClick={close}
                className="px-6 py-2.5 text-sm font-semibold rounded-lg transition-all"
                style={{ color: 'var(--app-text-muted)', border: '1px solid var(--app-border)' }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--app-border-dim)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--app-text-primary)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--app-border)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--app-text-muted)';
                }}
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <div className="mb-4">
                  <img
                    src={isDark ? intelliXbomWhite : intelliXbomDark}
                    alt="IntelliXBOM"
                    style={{ height: 28, width: 'auto', display: 'block' }}
                  />
                </div>
                <h2 className="text-2xl font-bold mb-1.5" style={{ color: 'var(--app-text-primary)' }}>
                  Request a Demo
                </h2>
                <p className="text-sm" style={{ color: 'var(--app-text-muted)' }}>
                  See IntelliXBOM in action, tailored to your compliance.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--app-text-muted)' }}>
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="Rahul Sharma"
                      className="w-full px-3 py-2.5 text-sm rounded-lg outline-none transition-colors"
                      style={inputStyle}
                      onFocus={e => (e.currentTarget.style.borderColor = 'rgba(0,177,220,0.6)')}
                      onBlur={e => (e.currentTarget.style.borderColor = 'var(--app-border)')}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--app-text-muted)' }}>
                      Work Email *
                    </label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="you@company.com"
                      className="w-full px-3 py-2.5 text-sm rounded-lg outline-none transition-colors"
                      style={inputStyle}
                      onFocus={e => (e.currentTarget.style.borderColor = 'rgba(0,177,220,0.6)')}
                      onBlur={e => (e.currentTarget.style.borderColor = 'var(--app-border)')}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--app-text-muted)' }}>
                    Organization 
                  </label>
                  <input
                    type="text"
                    value={form.org}
                    onChange={e => setForm(f => ({ ...f, org: e.target.value }))}
                    placeholder="State Bank of India, NTPC, IRCTC..."
                    className="w-full px-3 py-2.5 text-sm rounded-lg outline-none transition-colors"
                    style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderColor = 'rgba(0,177,220,0.6)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'var(--app-border)')}
                  />
                </div>

                {error && (
                  <div
                    className="flex items-start gap-2.5 px-3.5 py-3 rounded-lg text-sm"
                    style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', color: '#f87171' }}
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 text-sm font-semibold text-white rounded-lg transition-all mt-1 flex items-center justify-center gap-2"
                  style={{
                    background: loading ? 'rgba(0,177,220,0.55)' : 'var(--c5)',
                    boxShadow: loading ? 'none' : '0 0 24px rgba(0,177,220,0.4)',
                    cursor: loading ? 'not-allowed' : 'pointer',
                  }}
                >
                  {loading
                    ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</>
                    : 'Request Demo →'
                  }
                </button>

                <p className="text-[11px] text-center" style={{ color: 'var(--app-text-dimmer)' }}>
                  No spam. We'll contact you within 24 hours to confirm.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/** Call this from any button's onClick to open the demo modal */
export function openDemoModal() {
  window.dispatchEvent(new Event('openDemoModal'));
}
