import { Linkedin, Github, Twitter, Mail, Shield } from 'lucide-react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import intelliXbomDark from '../../assets/IntelliXbom-Dark.png';

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: 'var(--p0)', borderTop: '1px solid var(--p3)' }}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(0,177,220,0.5) 35%, rgba(61,224,220,0.3) 65%, transparent 100%)' }} />

      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 pt-10 sm:pt-14 pb-6 sm:pb-8">

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-10 mb-8 md:mb-12">

          {/* Brand column */}
          <div className="md:col-span-2 flex flex-col items-center md:items-start text-center md:text-left">
            <Link to="/" className="inline-flex items-center mb-4">
              <img src={intelliXbomDark} alt="IntelliXBOM" style={{ height: 28, width: 'auto', display: 'block' }} />
            </Link>
            <p className="text-[12px] sm:text-[13px] mb-4 sm:mb-6 max-w-[260px] leading-relaxed"
              style={{ color: 'var(--ink-500)' }}>
              Complete Digital Trust for India's most regulated environments  field by field.
            </p>

            {/* Social icons */}
            <div className="flex items-center justify-center md:justify-start gap-2.5 mb-5">
              {[
                { href: 'https://www.linkedin.com/company/intellinative/', Icon: Linkedin, label: 'LinkedIn' },
              ].map(({ href, Icon, label }) => (
                <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  aria-label={label} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.94 }}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                  style={{ color: 'var(--ink-500)', background: 'var(--p1)', border: '1px solid var(--p3)' }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.color = 'var(--c5)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,177,220,0.4)';
                    (e.currentTarget as HTMLElement).style.background = 'rgba(0,177,220,0.06)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.color = 'var(--ink-500)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--p3)';
                    (e.currentTarget as HTMLElement).style.background = 'var(--p1)';
                  }}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}

              {/* Reddit */}
              <motion.a
                href="https://www.reddit.com/user/intellixbom/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Reddit"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.94 }}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                style={{ color: 'var(--ink-500)', background: 'var(--p1)', border: '1px solid var(--p3)' }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.color = 'var(--c5)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,177,220,0.4)';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(0,177,220,0.06)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.color = 'var(--ink-500)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--p3)';
                  (e.currentTarget as HTMLElement).style.background = 'var(--p1)';
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                </svg>
              </motion.a>
            </div>


          </div>

          {/* 3 link columns  side-by-side on mobile via sub-grid, then each in its own col on md+ */}
          <div className="grid grid-cols-3 md:contents gap-4 md:gap-0">
            <FooterColumn title="Platform" links={[
              { label: 'SBOM', href: '/#sbom' },
              { label: 'CBOM', href: '/#cbom' },
              { label: 'QBOM', href: '/#qbom' },
              { label: 'AIBOM', href: '/#aibom' },
              { label: 'HBOM', href: '/#hbom' },
              { label: 'Platform Overview', href: '/' },
            ]} />

            <FooterColumn title="Compliance" links={[
              { label: 'CERT-In v2.0', href: '/#cert-in' },
              { label: 'RBI Advisory', href: '/#rbi' },
              { label: 'MeitY 2025', href: '/#meity' },
              { label: 'NCIIPC', href: '/#nciipc' },
              { label: 'SEBI', href: '/#sebi' },
            ]} />

            <FooterColumn title="Company" links={[
              { label: 'About Us', href: '/#about' },
              { label: 'Blog', href: '/#blog' },
              { label: 'Why IxBOM', href: '/#why' },
              { label: 'BOM Comparison', href: '/#compare' },
              { label: 'Contact Us', href: '/#contact' },
            ]} />
          </div>
        </div>



        {/* Bottom bar */}
        <div className="pt-4 sm:pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: '1px solid var(--p3)' }}>
          <div className="flex items-center gap-1.5 select-none">
            <span className="text-[12px]" style={{ color: 'var(--ink-400)', fontFamily: 'var(--f-m)' }}>© 2026</span>
            <span className="text-[12px]" style={{ color: 'var(--ink-400)', fontFamily: 'var(--f-m)' }}>Built for India's Digital Sovereignty</span>
          </div>
          <div className="flex items-center gap-5">
            {[
              { label: 'Privacy Policy', href: '/privacy' },
              { label: 'Security',       href: '#' },
            ].map(({ label, href }) => (
              <Link key={label}
                to={href}
                className="text-[12px] transition-colors duration-200"
                style={{ color: 'var(--ink-400)' }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--c5)')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--ink-400)')}>
                {label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="text-[9px] sm:text-[10px] uppercase tracking-[0.1em] sm:tracking-[0.14em] font-bold mb-3 sm:mb-5 select-none"
        style={{ color: 'var(--ink-400)', fontFamily: 'var(--f-m)' }}>
        {title}
      </h4>
      <ul className="space-y-2 sm:space-y-3">
        {links.map(link => (
          <li key={link.label}>
            <Link to={link.href}
              className="text-[11px] sm:text-[13px] transition-colors duration-150"
              style={{ color: 'var(--ink-600)' }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--c5)')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--ink-600)')}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
