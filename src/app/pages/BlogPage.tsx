import { Link } from 'react-router';
import { ArrowRight, Clock, Calendar, Shield, Code, Lock, Cpu, Brain, Building2 } from 'lucide-react';
import { motion } from 'motion/react';

export const blogPosts = [
  {
    slug: 'dont-trust-the-sbom-your-vendor-gave-you',
    category: 'COMPLIANCE',
    categoryColor: '#4361EE',
    title: "Don't Trust the SBOM Your Vendor Gave You",
    excerpt: "We built a tool to prove whether your CycloneDX SBOM meets CERT-In's 21 mandatory fieldsfield by field, with a clear compliance ceiling.",
    author: 'IntelliXBOM',
    date: 'Apr 9, 2026',
    readTime: '6 min read',
    tags: ['SBOM', 'CERT-In', 'Compliance'],
    featured: true,
    coverGradient: 'linear-gradient(135deg, #0D1127 0%, #1A1F3E 50%, #0F1620 100%)',
    coverAccent: '#4361EE',
    coverIcon: Shield,
    coverLabel: 'CERT-In v2.0',
  },
  {
    slug: 'understanding-cert-in-sbom-requirements',
    category: 'GUIDE',
    categoryColor: '#00D4AA',
    title: "Understanding CERT-In's 21 Mandatory SBOM Fields",
    excerpt: "A field-by-field breakdown of what India's CERT-In v2.0 actually requires in an SBOM and why most auto-generated BOMs fall short.",
    author: 'IntelliXBOM',
    date: 'Mar 28, 2026',
    readTime: '9 min read',
    tags: ['CERT-In', 'SBOM', 'India'],
    featured: false,
    coverGradient: 'linear-gradient(135deg, #071A18 0%, #0D2620 50%, #061512 100%)',
    coverAccent: '#00D4AA',
    coverIcon: Code,
    coverLabel: '21 Fields',
  },
  {
    slug: 'quantum-readiness-cbom-guide',
    category: 'SECURITY',
    categoryColor: '#8B5CF6',
    title: 'Is Your Infrastructure Quantum-Ready? Start with a CBOM',
    excerpt: "Post-quantum cryptography migration is no longer theoretical. Here's how a Cryptographic Bill of Materials helps you track and prioritize.",
    author: 'IntelliXBOM',
    date: 'Mar 14, 2026',
    readTime: '7 min read',
    tags: ['CBOM', 'QBOM', 'Post-Quantum'],
    featured: false,
    coverGradient: 'linear-gradient(135deg, #110D22 0%, #1A1230 50%, #0D0A1A 100%)',
    coverAccent: '#8B5CF6',
    coverIcon: Lock,
    coverLabel: 'Post-Quantum',
  },
  {
    slug: 'hbom-hardware-supply-chain',
    category: 'HARDWARE',
    categoryColor: '#EF4444',
    title: 'Hardware Supply Chain Risk: Why HBOM Matters for Indian PSUs',
    excerpt: 'State-sponsored hardware tampering is a growing threat. An HBOM gives you visibility into every chip, firmware version, and vendor before deployment.',
    author: 'IntelliXBOM',
    date: 'Feb 22, 2026',
    readTime: '8 min read',
    tags: ['HBOM', 'Supply Chain', 'PSU'],
    featured: false,
    coverGradient: 'linear-gradient(135deg, #1A0D0D 0%, #2A1212 50%, #150808 100%)',
    coverAccent: '#EF4444',
    coverIcon: Cpu,
    coverLabel: 'Hardware BOM',
  },
  {
    slug: 'aibom-ai-governance',
    category: 'AI GOVERNANCE',
    categoryColor: '#F59E0B',
    title: 'The Rise of AIBOM: Governing AI Models in Regulated Sectors',
    excerpt: 'As AI adoption accelerates in banking and healthcare, regulators are asking: what exactly is in your AI system? The AIBOM answers that question.',
    author: 'IntelliXBOM',
    date: 'Feb 5, 2026',
    readTime: '5 min read',
    tags: ['AIBOM', 'AI Governance', 'Compliance'],
    featured: false,
    coverGradient: 'linear-gradient(135deg, #1A1408 0%, #261C08 50%, #150F05 100%)',
    coverAccent: '#F59E0B',
    coverIcon: Brain,
    coverLabel: 'AI BOM',
  },
  {
    slug: 'rbi-sbom-advisory-breakdown',
    category: 'FINANCE',
    categoryColor: '#4361EE',
    title: "RBI's SBOM Advisory: What Banks Need to Do Now",
    excerpt: 'RBI Advisory 11/2024 requires banks to maintain software supply chain transparency. Here\'s what IntelliXBOM helps you automate.',
    author: 'IntelliXBOM',
    date: 'Jan 18, 2026',
    readTime: '6 min read',
    tags: ['RBI', 'SBOM', 'Banking'],
    featured: false,
    coverGradient: 'linear-gradient(135deg, #0A0F1E 0%, #121830 50%, #080C18 100%)',
    coverAccent: '#4361EE',
    coverIcon: Building2,
    coverLabel: 'RBI Advisory',
  },
];

type Post = typeof blogPosts[0];

function CoverImage({ post, tall = false }: { post: Post; tall?: boolean }) {
  const Icon = post.coverIcon;
  return (
    <div
      className={`relative w-full overflow-hidden ${tall ? 'h-52' : 'h-36'}`}
      style={{ background: post.coverGradient }}
    >
      {/* Diagonal stripe texture */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            ${post.coverAccent} 0px,
            ${post.coverAccent} 1px,
            transparent 1px,
            transparent 14px
          )`
        }}
      />
      {/* Corner glow */}
      <div
        className="absolute top-0 right-0 w-40 h-40 pointer-events-none"
        style={{ background: `radial-gradient(circle at top right, ${post.coverAccent}30, transparent 65%)` }}
      />
      <div
        className="absolute bottom-0 left-0 w-32 h-32 pointer-events-none"
        style={{ background: `radial-gradient(circle at bottom left, ${post.coverAccent}20, transparent 60%)` }}
      />
      {/* Center icon cluster */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{
            background: `${post.coverAccent}18`,
            border: `1px solid ${post.coverAccent}35`,
            boxShadow: `0 0 32px ${post.coverAccent}20`
          }}
        >
          <Icon className="w-6 h-6" style={{ color: post.coverAccent }} />
        </div>
      </div>
      {/* Label chip */}
      <div className="absolute top-3 left-3">
        <span
          className="text-[9px] font-black uppercase tracking-[0.14em] px-2 py-1 rounded-md"
          style={{ background: `${post.coverAccent}22`, color: post.coverAccent, border: `1px solid ${post.coverAccent}30` }}
        >
          {post.coverLabel}
        </span>
      </div>
      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(13,17,23,0.8), transparent)' }}
      />
    </div>
  );
}

function PostCard({ post, index }: { post: Post; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link to={`/blog/${post.slug}`}>
        <div
          className="group rounded-xl overflow-hidden h-full flex flex-col transition-all duration-300 hover:-translate-y-1"
          style={{
            background: 'var(--app-card)',
            border: '1px solid var(--app-border)',
            boxShadow: '0 0 0 0 transparent',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.borderColor = `${post.coverAccent}40`;
            (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px ${post.coverAccent}15`;
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.borderColor = 'var(--app-border)';
            (e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 0 transparent';
          }}
        >
          <CoverImage post={post} />
          <div className="p-6 flex flex-col flex-1">
            <div className="mb-3">
              <span
                className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wide"
                style={{ background: `${post.categoryColor}18`, color: post.categoryColor }}
              >
                {post.category}
              </span>
            </div>
            <h3 className="text-[15px] font-bold mb-2.5 transition-colors leading-snug flex-1" style={{ color: 'var(--app-text-primary)' }}>
              {post.title}
            </h3>
            <p className="text-[13px] leading-[1.65] mb-4 line-clamp-2" style={{ color: 'var(--app-text-muted)' }}>
              {post.excerpt}
            </p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {post.tags.slice(0, 2).map(tag => (
                <span key={tag} className="px-2 py-0.5 rounded text-[10px]" style={{ color: 'var(--app-text-dimmer)', background: 'var(--app-elevated)', border: '1px solid var(--app-border-subtle)' }}>
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between text-[11px] mt-auto pt-4" style={{ color: 'var(--app-text-dimmer)', borderTop: '1px solid var(--app-border-subtle)' }}>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3 h-3" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3 h-3" />
                {post.readTime}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function FeaturedVisual() {
  return (
    <div className="p-8 w-full h-full flex items-center justify-center">
      <div
        className="rounded-xl overflow-hidden w-full max-w-[280px]"
        style={{ background: '#0A0E1A', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        <div className="h-7 bg-[#0D1117] flex items-center px-3 gap-1.5 border-b border-white/[0.06]">
          <div className="w-2 h-2 rounded-full bg-[#EF4444]" />
          <div className="w-2 h-2 rounded-full bg-[#F59E0B]" />
          <div className="w-2 h-2 rounded-full bg-[#22C55E]" />
          <span className="ml-2 font-mono text-[9px] text-[#4B5563]">sbom-validator</span>
        </div>
        <div className="p-4 space-y-2">
          {[
            { label: 'Supplier Name',      s: 'pass' },
            { label: 'Component Name',     s: 'pass' },
            { label: 'Version',            s: 'pass' },
            { label: 'Dependencies',       s: 'fail' },
            { label: 'License',            s: 'fail' },
            { label: 'Hash',               s: 'pass' },
            { label: 'Download Location',  s: 'fail' },
          ].map((f, i) => (
            <div key={i} className="flex items-center justify-between gap-3">
              <span className="font-mono text-[10px] text-[#64748B] truncate">{f.label}</span>
              <span
                className="text-[9px] font-black px-1.5 py-0.5 rounded flex-shrink-0"
                style={f.s === 'pass'
                  ? { background: 'rgba(0,212,170,0.12)', color: '#00D4AA' }
                  : { background: 'rgba(239,68,68,0.12)', color: '#EF4444' }
                }
              >
                {f.s.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
        <div className="px-4 pb-3.5 flex items-center justify-between border-t border-white/[0.05] pt-3">
          <span className="font-mono text-[9px] text-[#3D4A5C]">3/7 non-compliant</span>
          <ArrowRight className="w-3 h-3 text-[#4B5563]" />
        </div>
      </div>
    </div>
  );
}

export default function BlogPage() {
  const featured = blogPosts.find(p => p.featured)!;
  const rest = blogPosts.filter(p => !p.featured);

  return (
    <main className="min-h-screen" style={{ background: 'var(--app-bg)' }}>
      {/* Hero Header */}
      <section
        className="pt-24 pb-10 px-6"
        style={{
          background: `radial-gradient(ellipse 70% 50% at 50% -5%, rgba(67,97,238,0.18) 0%, transparent 65%), var(--app-bg)`
        }}
      >
        <div className="max-w-[1440px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5"
              style={{ background: 'rgba(67,97,238,0.08)', border: '1px solid rgba(67,97,238,0.22)' }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#4361EE]" />
              <span className="text-[11px] uppercase tracking-[0.14em] text-[#4361EE] font-bold select-none">
                Journal
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-4 max-w-[700px] tracking-tight leading-[1.05]" style={{ color: 'var(--app-text-primary)' }}>
              BOM Governance &amp;{' '}
              <span
                style={{
                  background: 'linear-gradient(90deg, #4361EE 0%, #00D4AA 65%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Digital Trust
              </span>
            </h1>
            <p className="text-lg max-w-[520px] leading-relaxed" style={{ color: 'var(--app-text-muted)' }}>
              Engineering notes, compliance patterns, and platform updates SBOM through HBOM, built for regulated teams.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 pb-14">
        <div className="max-w-[1440px] mx-auto">

          {/* Featured Post */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mb-14"
          >
            <div className="text-[10px] uppercase tracking-[0.14em] font-black mb-5 select-none" style={{ color: 'var(--app-text-dimmer)' }}>
              Featured
            </div>
            <Link to={`/blog/${featured.slug}`}>
              <div
                className="group rounded-2xl overflow-hidden grid md:grid-cols-[1fr_340px] gap-0 transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: 'var(--app-card)',
                  border: '1px solid var(--app-border)',
                  boxShadow: '0 0 0 0 transparent',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${featured.coverAccent}45`;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 60px ${featured.coverAccent}18`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--app-border)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 0 transparent';
                }}
              >
                {/* Left: Content */}
                <div className="p-10">
                  <div className="flex items-center gap-3 mb-5">
                    <span
                      className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wide"
                      style={{ background: `${featured.categoryColor}18`, color: featured.categoryColor }}
                    >
                      {featured.category}
                    </span>
                    <span
                      className="text-[10px] font-bold uppercase tracking-[0.1em] px-2 py-0.5 rounded"
                      style={{ background: 'var(--app-elevated)', color: 'var(--app-text-dimmer)' }}
                    >
                      FEATURED
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black mb-4 transition-colors leading-tight tracking-tight" style={{ color: 'var(--app-text-primary)' }}>
                    {featured.title}
                  </h2>
                  <p className="leading-[1.75] mb-8 text-[15px]" style={{ color: 'var(--app-text-muted)' }}>
                    {featured.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {featured.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-1 rounded text-[11px]" style={{ color: 'var(--app-text-dimmer)', background: 'var(--app-elevated)', border: '1px solid var(--app-border)' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-5 text-[12px]" style={{ color: 'var(--app-text-dimmer)' }}>
                    <span className="font-bold" style={{ color: 'var(--app-text-muted)' }}>{featured.author}</span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" />
                      {featured.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3" />
                      {featured.readTime}
                    </span>
                  </div>
                </div>
                {/* Right: Visual */}
                <div
                  className="hidden md:block"
                  style={{ borderLeft: '1px solid var(--app-border)', background: 'var(--app-bg)' }}
                >
                  <FeaturedVisual />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Post Grid */}
          <div>
            <div className="text-[10px] uppercase tracking-[0.14em] font-black mb-7 select-none" style={{ color: 'var(--app-text-dimmer)' }}>
              All Posts
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {rest.map((post, i) => (
                <PostCard key={post.slug} post={post} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
