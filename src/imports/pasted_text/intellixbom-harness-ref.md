IntelliXBOM Redesign Prompt — Harness Reference
Harness.io design DNA extracted → mapped to IntelliXBOM · dark-first · mesh gradient · tab switcher · logo ticker · dashboard preview
Website Redesign · Harness.io Reference
IntelliXBOM — Ultra-Detailed Design Prompt
Based on deep analysis of Harness.io. Pick a tab, copy the prompt, paste into v0.dev / Framer AI / Figma AI.
Harness Colors
Near-black base · blue/cyan gradient accents · pure white headlines
Harness Layout
Centered hero · full-bleed dark sections · light compliance break
Harness Components
Tab switchers · logo marquee · floating dashboard preview
Harness Copy Style
Short punchy H1 · gradient text accent · one bold primary CTA
Global Tokens
Navbar
Hero
Social Proof
BOM Types
Capabilities
Compliance
Blog Page
Footer
⚡ Full Prompt
Design System
Colors, Typography, Spacing — paste into Figma local styles
/* ── COLORS ── */
--color-bg-primary:     #05070F;   /* near-black base */
--color-bg-surface:     #0D1117;   /* card surfaces */
--color-bg-elevated:    #141A26;   /* hover state */
--color-bg-light:       #F7F8FC;   /* light section bg */
--color-bg-white:       #FFFFFF;

--color-accent-blue:    #4361EE;   /* primary CTA, links, SBOM */
--color-accent-teal:    #00D4AA;   /* live status, pass, CBOM */
--color-accent-purple:  #8B5CF6;   /* quantum, QBOM */
--color-accent-amber:   #F59E0B;   /* warning, AIBOM */
--color-accent-red:     #EF4444;   /* fail, HBOM */

--color-text-primary:   #FFFFFF;
--color-text-secondary: #94A3B8;
--color-text-muted:     #4B5563;
--color-text-dark:      #0F172A;
--color-text-dark-sub:  #374151;

--color-border-dark:    rgba(255,255,255,0.07);
--color-border-light:   rgba(0,0,0,0.08);
--color-border-accent:  rgba(67,97,238,0.4);

/* ── GRADIENTS ── */
Hero mesh (Harness-style top glow):
  background: radial-gradient(ellipse 80% 60% at 50% -10%,
    rgba(67,97,238,0.25) 0%, transparent 70%),
    radial-gradient(ellipse 40% 40% at 80% 50%,
    rgba(0,212,170,0.12) 0%, transparent 60%),
    #05070F;

CTA button:
  background: linear-gradient(135deg, #4361EE 0%, #3A0CA3 100%);

Gradient headline text (CSS):
  background: linear-gradient(90deg, #4361EE, #00D4AA);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

/* ── TYPOGRAPHY ── */
Font stack: "Inter", system-ui, sans-serif
Mono stack: "JetBrains Mono", "Fira Code", monospace

Display H1:  72px / line-height 1.05 / weight 700 / tracking -0.03em
Section H2:  44px / line-height 1.15 / weight 700 / tracking -0.02em
Sub H3:      28px / line-height 1.3  / weight 600 / tracking -0.01em
Card H4:     18px / line-height 1.4  / weight 600
Body Large:  18px / line-height 1.75 / weight 400
Body:        16px / line-height 1.7  / weight 400
Label/Tag:   12px / weight 500 / uppercase / letter-spacing 0.08em
Mono code:   13px / line-height 1.8

/* ── SPACING (8px base) ── */
xs: 4px  | sm: 8px  | md: 16px | lg: 24px
xl: 40px | 2xl: 64px | 3xl: 96px | 4xl: 128px
Section padding: 120px top/bottom (desktop) / 72px (tablet) / 48px (mobile)

/* ── RADIUS ── */
sm: 4px | md: 8px | lg: 12px | xl: 16px | pill: 999px

/* ── SHADOWS ── */
Card:       0 0 0 1px rgba(255,255,255,0.06), 0 4px 24px rgba(0,0,0,0.4)
Glow:       0 0 32px rgba(67,97,238,0.3)
Dashboard:  0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)

/* ── GRID ── */
Max content width: 1200px, centered, 40px side padding
Full-bleed sections: 100vw with bg color, content inside max-width
Copy Global Tokens ↗
Section 1 · Navigation
Sticky frosted-glass navbar with BOM types mega-dropdown
NAVBAR — sticky, top: 0, z-index: 100, height: 64px

Default state: background transparent
On scroll >80px:
  background: rgba(5,7,15,0.85)
  backdrop-filter: blur(16px) saturate(1.8)
  border-bottom: 1px solid rgba(255,255,255,0.07)
  transition: all 300ms ease

Inner: flex, align-center, space-between, max-width 1200px, auto margins

── LEFT: LOGO ──
"Intelli" — Inter 600, #FFFFFF
"✕" — Inter 700, #4361EE, text-shadow: 0 0 12px rgba(67,97,238,0.8)
"BOM" — Inter 700, #FFFFFF

── CENTER: NAV LINKS ──
"Why IxBOM" · "BOM Types ▾" · "Platform" · "Compliance" · "Blog"
Font: Inter 14px 500, color #94A3B8
Hover: color #FFFFFF, 150ms transition
"BOM Types ▾" chevron rotates 180° on open

BOM TYPES MEGA DROPDOWN:
  Full-width panel, bg #0D1117
  Border: 1px solid rgba(255,255,255,0.07)
  Border-radius: 0 0 16px 16px
  Padding: 32px 40px
  5-column grid, one per BOM type:
    · SBOM  — icon #4361EE — "Software packages & dependencies"
    · CBOM  — icon #00D4AA — "Cryptographic assets & certs"
    · QBOM  — icon #8B5CF6 — "Quantum-vulnerable crypto"
    · AIBOM — icon #F59E0B — "AI/ML models & training data"
    · HBOM  — icon #EF4444 — "Hardware & firmware inventory"
  Bottom: "View All BOM Types →" right-aligned link

── RIGHT ──
"Sign In" — ghost 14px, #94A3B8, hover #FFFFFF
"Request Demo →" — gradient button:
  background: linear-gradient(135deg, #4361EE, #3A0CA3)
  color: #FFFFFF, padding: 10px 20px, radius: 8px, font: 14px 600
  box-shadow: 0 0 20px rgba(67,97,238,0.4)
  hover: brightness(1.15), scale(1.02)

MOBILE (
<
768px):
  Hamburger icon right, slides down full-screen dark menu
  All links stacked, 48px tap targets
Copy Navbar Prompt ↗
Section 2 · Hero
Full-bleed centered hero — Harness mesh gradient + animated grid + terminal product visual
HERO SECTION

Background: Harness-style mesh gradient
  radial-gradient(ellipse 80% 60% at 50% -10%, rgba(67,97,238,0.25), transparent 70%),
  radial-gradient(ellipse 40% 40% at 80% 50%, rgba(0,212,170,0.12), transparent 60%),
  #05070F

Background extras:
  CSS grid overlay: background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
  linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
  background-size: 60px 60px
  animation: gridPan 20s linear infinite
  @keyframes gridPan { from{background-position:0 0} to{background-position:0 60px} }

Min-height: 100vh, flex column center, padding-top: 80px (navbar offset)
Layout: single column, center-aligned, max-width: 860px, auto margins

── EYEBROW PILL ──
display: inline-flex, align-items: center, gap: 8px
background: rgba(67,97,238,0.1)
border: 1px solid rgba(67,97,238,0.35)
border-radius: 999px, padding: 6px 16px
Left: 8px pulsing green dot (#00D4AA, animation: pulse 2s infinite)
Text: Inter 12px 500, color #94A3B8
"India's BOM Compliance & Digital Trust Platform"

── H1 HEADLINE ──
72px, Inter 700, line-height 1.05, tracking -0.03em, center
Line 1: "BOM Compliance." — color #FFFFFF
Line 2: "Field by Field." — gradient text:
  background: linear-gradient(90deg, #4361EE, #00D4AA)
  -webkit-background-clip: text; -webkit-text-fill-color: transparent
Line 3: "Proven." — color #FFFFFF

── SUBHEADING ──
20px, Inter 400, #94A3B8, max-width 620px, center, line-height 1.75
"Verify every SBOM, CBOM, QBOM, AIBOM, and HBOM your vendors deliver —
against CERT-In's 21 mandatory fields, automatically, at every software update."

── CTA ROW ──
flex, center, gap 12px, margin-top 40px

Primary: "Get a Free Demo →"
  background: linear-gradient(135deg, #4361EE, #3A0CA3)
  padding: 14px 28px, radius 8px, Inter 16px 600, color #fff
  box-shadow: 0 0 32px rgba(67,97,238,0.45)
  hover: translateY(-1px), shadow intensifies, transition 150ms

Secondary: "Explore Platform"
  background: transparent
  border: 1px solid rgba(255,255,255,0.2)
  padding: 14px 28px, radius 8px, Inter 16px 500, color #fff
  hover: border rgba(255,255,255,0.5), bg rgba(255,255,255,0.05)

── TRUST MICRO-STATS ──
flex row, center, gap 0, margin-top 24px
3 stats separated by 1px dividers (rgba(255,255,255,0.15), height 28px)
Each: padding 0 24px
  Number: 24px 700, #FFFFFF
  Label: 13px, #94A3B8

"5" Regulated sectors covered
"21" CERT-In mandatory fields
"100%" Field-level traceability

── PRODUCT VISUAL (terminal card) ──
margin-top: 72px
Container: max-width 960px, centered, position relative

Card:
  background: #0D1117
  border: 1px solid rgba(255,255,255,0.08)
  border-radius: 16px
  box-shadow: 0 32px 80px rgba(0,0,0,0.7), 0 0 80px rgba(67,97,238,0.12)
  overflow: hidden

Top bar (32px height, bg #141A26):
  Left: 3 dots — #EF4444, #F59E0B, #22C55E (12px circles, gap 6px)
  Center: JetBrains Mono 12px, color #4B5563 — "ixbom://sbom/cert-in-validator · live"
  Right: pill badge — "● LIVE", bg rgba(0,212,170,0.15), color #00D4AA, 10px

Content area: two-column split, padding 24px
  LEFT — CERT-In field list (scrollable, ~12 rows visible):
    Each row: field name (mono 12px #94A3B8) + status badge
    Badges:  ✓ PASS (bg rgba(0,212,170,0.15), color #00D4AA)
             ✗ FAIL (bg rgba(239,68,68,0.15), color #EF4444)
             △ WARN (bg rgba(245,158,11,0.15), color #F59E0B)
  RIGHT — Donut chart:
    SVG donut, 140px: ~33% green (#00D4AA), ~67% red (#EF4444)
    Center label: "~66.7%" 18px 700 white + "Non-Compliant" 10px muted
    Below chart: 3 mini stats in a row

Bottom strip (32px, bg #141A26, border-top rgba(255,255,255,0.06)):
  "10 components · 7 failing · Last scan: just now"  Inter 11px #4B5563
Copy Hero Prompt ↗
Section 3 · Social Proof
Regulatory logo marquee + customer quote — Harness ticker style
SOCIAL PROOF SECTION

── PART A: REGULATORY LOGO TICKER ──
bg: #0D1117
border-top: 1px solid rgba(255,255,255,0.07)
border-bottom: 1px solid rgba(255,255,255,0.07)
padding: 40px 0
overflow: hidden

Eyebrow: "TRUSTED BY TEAMS OPERATING UNDER"
  11px, uppercase, letter-spacing 0.1em, #4B5563, text-align center, margin-bottom 24px

Marquee container: overflow hidden
Inner track: display flex, gap 64px, width: max-content
Animation: @keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  animation: ticker 30s linear infinite
  Pause on hover: animation-play-state: paused

Logos (duplicate set for seamless loop):
  CERT-In · RBI · SEBI · NCIIPC · MeitY · NIC · PSU · IRDAI
  Each: height 28px, filter grayscale(100%) brightness(0.6)
  Hover: filter none, opacity 1, transition 200ms

── PART B: CUSTOMER QUOTE CAROUSEL ──
bg: #05070F, padding 96px 0
Max-width: 720px, centered

Opening quote mark:
  font-size: 120px, line-height 0.5
  color: rgba(67,97,238,0.2)
  font-family: Georgia, serif

Quote text:
  22px, Inter 400, #E2E8F0, line-height 1.7, italic

"IntelliXBOM found 14 critical CERT-In violations in our vendor's SBOM
that our procurement team had completely missed. We caught this before
signing a ₹2 crore contract."

Attribution row (margin-top 32px):
  flex, align-center, gap 12px
  Avatar: 44px circle, bg #4361EE, initials Inter 14px 600 white
  Right column:
    Name: 15px 600 #FFFFFF
    Title + company: 13px #94A3B8

Navigation: 3 dots below (8px circles)
  Active: #4361EE, Inactive: rgba(255,255,255,0.2)
  JS: click to switch quote (fade transition 300ms)
Copy Social Proof Prompt ↗
Section 4 · BOM Types
Interactive 5-tab product switcher — Harness's signature pattern
BOM TYPES SECTION

bg: #05070F, padding 120px 0

── HEADER (centered) ──
Eyebrow: "FIVE BOM TYPES. ONE PLATFORM." — 11px uppercase, #4B5563
H2: "Complete Visibility Across Every Layer" — 44px 700 white, tracking -0.02em
Sub: 18px #94A3B8, max-width 560px, center
"From software packages to quantum cryptography — governed, validated, and compliant."

── TAB ROW ──
flex, justify-center, gap 8px, margin-top 48px
5 pill tabs: SBOM · CBOM · QBOM · AIBOM · HBOM

Inactive tab:
  bg: rgba(255,255,255,0.04)
  border: 1px solid rgba(255,255,255,0.08)
  border-radius: 999px, padding: 10px 24px
  font: Inter 14px 600, color #94A3B8
  left: 8px colored dot (each BOM's accent color)

Active tab:
  bg: rgba(accent,0.15), border: 1px solid rgba(accent,0.5)
  color: #FFFFFF
  box-shadow: 0 0 16px rgba(accent,0.25)

── TAB CONTENT PANEL ──
margin-top: 56px
Layout: flex, gap 64px, align-items center
50% left / 50% right

LEFT — Text:
  BOM badge (10px pill, accent bg/color)
  H3: 36px 700 white, margin-top 12px
  Category: 11px uppercase, accent color, tracking 0.08em
  Description: 18px #94A3B8, line-height 1.75, 2–3 sentences
  Feature list (4 items, margin-top 24px):
    Row: checkmark SVG (16px, accent color) + 16px #fff text, gap 10px, mb 12px
  Tags (margin-top 20px): pill row (11px, bg rgba(accent,0.1), color accent, radius 999px)
  CTA link: "Explore [BOM TYPE] →" 14px 600, accent color, arrow icon, margin-top 20px

RIGHT — Terminal card:
  bg: #0D1117, border: 1px solid rgba(255,255,255,0.08), radius 12px
  Top bar (28px, bg #141A26):
    dots + path in mono 11px: ixbom://[type]/inventory

  JSON content (JetBrains Mono 12px, padding 20px):
    Keys: #94A3B8 | String values: accent teal #00D4AA | Numbers: #F59E0B
    Booleans true: #22C55E | false: #EF4444 | Status comments: italic #4B5563

  Per BOM type sample data:
    SBOM:  components, vulnerabilities, licenseTypes, certInStatus
    CBOM:  tlsVersions, certificates{expiring, weakKey}, certInStatus:"ACTION REQUIRED"
    QBOM:  quantumVulnerable{RSA-2048,ECDSA-P256}, quantumSafe{CRYSTALS-Kyber}, migrationScore
    AIBOM: model, framework, trainingData{records,piiPresent}, biasScore, govStatus
    HBOM:  server, cpu, firmware{bios,updateRequired:true}, tpm, supplyChainRisk

BOM TYPE ACCENT COLORS:
  SBOM → #4361EE | CBOM → #00D4AA | QBOM → #8B5CF6 | AIBOM → #F59E0B | HBOM → #EF4444

TRANSITION (tab switch):
  Content: opacity 0→1, 200ms ease
  Terminal card: translateX(20px)→0, opacity 0→1, 200ms ease

BELOW TABS — comparison teaser banner:
  bg: rgba(67,97,238,0.07), border: 1px solid rgba(67,97,238,0.2), radius 12px
  padding: 16px 24px, margin-top 48px, flex space-between
  Left text: "Need to compare BOM types for your compliance team?"
  Right link: "View Full Comparison →" in accent blue
Copy BOM Types Prompt ↗
Section 5 · Capabilities + Dashboard
Feature grid with grid-line style + floating dashboard preview
CAPABILITIES SECTION

bg: #0D1117, padding 120px 0

Eyebrow: "PLATFORM CAPABILITIES" — 11px uppercase, #4B5563
H2: "Enterprise-Grade. Built for India." — 44px 700 white
Sub: 18px #94A3B8, max-width 500px

── 6-CARD GRID (Harness grid-line style) ──
Parent: display grid, grid-template-columns: repeat(3,1fr)
Parent background: rgba(255,255,255,0.05) — this creates the border lines
Gap: 1px (the parent bg shows through as 1px grid lines)
Responsive: 2-col tablet, 1-col mobile

Each card:
  bg: #0D1117, padding: 36px
  Icon container: 56px × 56px, bg rgba(accent,0.1), border-radius 12px
    Icon SVG: 24px, stroke accent color
  Title: 18px 600 #FFFFFF, margin-top 20px
  Description: 14px #94A3B8, line-height 1.7, margin-top 8px
  "Learn more →" link: 12px accent color, shows on :hover only

  Hover state:
    bg: #141A26
    border-top: 2px solid accent-color (appears via pseudo-element)
    transition: 200ms ease

6 cards:
  1. Automatic BOM Generation    — accent #4361EE — icon: code-bracket
  2. Continuous Field Validation  — accent #00D4AA — icon: shield-check
  3. Vendor Compliance Scoring    — accent #8B5CF6 — icon: chart-bar
  4. Air-Gapped Deployment        — accent #F59E0B — icon: server
  5. Regulator-Ready Reports      — accent #EF4444 — icon: document-text
  6. Project-Level BOM Controls   — accent #00D4AA — icon: adjustments

── DASHBOARD PREVIEW ──
bg: #05070F, padding 120px 0
H2 centered: "See Everything. Miss Nothing." — 44px 700 white
Sub centered: 18px #94A3B8, max-width 520px
"A unified command center for BOM governance, real-time risk scoring, and one-click audit exports."

Dashboard container: max-width 1100px, centered, position relative

Behind dashboard:
  A soft radial glow: background radial-gradient(ellipse 70% 30% at 50% 100%, rgba(67,97,238,0.15), transparent)
  This makes it float with a light source

Dashboard card:
  width: 100%, border-radius: 16px
  border: 1px solid rgba(255,255,255,0.08)
  box-shadow: 0 48px 120px rgba(0,0,0,0.8), 0 0 80px rgba(67,97,238,0.12)
  overflow: hidden
  Shows a dark UI mockup with: sidebar nav, compliance score gauges, BOM type tabs, risk table

3 FLOATING ANNOTATION CALLOUTS (position: absolute, outside card):
  Each: bg #FFFFFF, border-radius 8px, padding 10px 14px, box-shadow 0 4px 16px rgba(0,0,0,0.3)
  Font: Inter 12px 600, color #0F172A
  Connected by: dashed SVG line (stroke #4361EE, stroke-dasharray 4 4)

  Callout 1 (top-left, points to risk panel): "Real-time risk scoring"
  Callout 2 (right, points to chart): "Intelligent compliance gaps"
  Callout 3 (bottom, points to table): "One-click audit export"
Copy Capabilities Prompt ↗
Section 6 · Compliance + Stats + CTA
Light section break with compliance meters, proof numbers, and conversion CTA
COMPLIANCE SECTION — LIGHT (visual break from dark)

bg: #F7F8FC, padding 120px 0
All text: dark mode — headlines #0F172A, body #374151

Eyebrow: "COMPLIANCE BUILT-IN. NOT BOLTED-ON." — 11px uppercase, #9CA3AF
H2: "Every Regulation. Every Requirement." — 44px 700 #0F172A
Sub: 18px #374151, max-width 520px

── 3 COMPLIANCE METER CARDS ──
3-column grid, gap 24px

Each card:
  bg: #FFFFFF, border: 1px solid #E5E7EB, border-radius 16px, padding 36px
  text-align: center

  Regulation badge (top): 10px pill, accent color bg
  Regulation name: 13px 600 #0F172A
  
  Circular progress meter (SVG, 130px):
    Track: #F3F4F6 (full circle)
    Progress: colored arc (green for high %, red for low %)
    Center: percentage 36px 700 (color matches arc)
    Below center: "Compliance Rate" 11px #9CA3AF
  
  3 bullet requirements (margin-top 20px):
    Each: 12px #374151, left dot accent color
  
  Bottom badge: "Actively monitored" — bg #DCFCE7, color #166534, 10px pill

3 frameworks:
  · CERT-In SBOM Technical Guidelines v2.0 — meter color #22C55E
  · RBI Advisory 11/2024 — meter color #4361EE
  · MeitY 2025 Software Security Guidelines — meter color #8B5CF6

── PROOF STATS ROW ──
4-column grid, margin-top 80px, gap 0
Each stat column: centered, padding 0 40px, border-right 1px solid #E5E7EB (last no border)
  Number: 56px 700 #4361EE
  Label: 14px #6B7280, margin-top 4px

"162"   — Regulated entities protected
"55"    — PSU clients onboarded
"21K+"  — BOM fields validated daily
"99%"   — Audit pass rate post-IntelliXBOM

── FINAL CTA SECTION ──
bg: #05070F, full-bleed, padding 120px 0
Centered, max-width 700px

Background: radial-gradient(ellipse 80% 80% at 50% 50%, rgba(67,97,238,0.18), transparent)

H2: "Ready to Achieve Complete Digital Trust?" — 44px 700 white
Sub: 18px #94A3B8
"Start with a free CERT-In compliance audit of your vendor's SBOM.
Results in 60 seconds."

CTA row (centered, gap 12px, margin-top 40px):
  Primary: "Get Free Compliance Audit →" — gradient blue + glow
  Secondary: "Talk to an Expert" — white ghost border

Trust line (margin-top 20px):
  Inter 13px #4B5563, flex center gap 16px
  "✓ No credit card" · "✓ Instant validation" · "✓ CERT-In report in 60s"
Copy Compliance Prompt ↗
Page 2 · Blog
Journal page — featured + grid + newsletter — editorial layout
BLOG PAGE — "BOM Governance & Digital Trust"

── BLOG HERO ──
bg: same mesh gradient as homepage, height 320px
flex column, justify-center, align-center
padding-top: 64px (navbar)

Eyebrow: "JOURNAL" — 11px uppercase #4361EE, letter-spacing 0.12em
H1: "BOM Governance & Digital Trust" — 52px 700 white, tracking -0.02em
Sub: 18px #94A3B8, max-width 500px, center
"Engineering notes, compliance patterns, and platform updates —
SBOM through HBOM, built for regulated teams."

TAG FILTER PILLS (margin-top 32px):
  Horizontal flex, center, gap 8px, flex-wrap wrap
  Pills: All · CERT-In · SBOM · Compliance · Supply Chain · India · CycloneDX · Quantum

  Inactive: bg rgba(255,255,255,0.06), border 1px rgba(255,255,255,0.1), color #94A3B8
  Active:   bg #4361EE, border transparent, color #fff, font 12px 600
  Hover:    border rgba(255,255,255,0.3), color #fff

── BLOG CONTENT AREA ──
bg: #F7F8FC, padding 80px 0, max-width 1200px centered

FEATURED POST CARD:
  width 100%, bg white, border 1px #E5E7EB, border-radius 16px
  padding 0, overflow hidden
  hover: box-shadow 0 12px 40px rgba(0,0,0,0.08), translateY(-3px), 200ms

  Layout: flex row (text 55% left, image 45% right)

  LEFT (padding 40px):
    Category badge: "COMPLIANCE" — 10px, bg #EEF2FF, color #4361EE, radius 999px, padding 4px 12px
    H2: 30px 700 #0F172A, line-height 1.25, margin-top 12px
      "Don't Trust the SBOM Your Vendor Gave You"
    Excerpt: 16px #374151, 3 lines, line-height 1.7, margin-top 12px
    Author row (margin-top 20px):
      Avatar 32px circle + name 14px 600 #0F172A + "·" + date + "·" + "6 min read"
      All in flex, gap 8px, font 13px #6B7280
    CTA: "Read article →" 14px 600 #4361EE, margin-top 20px

  RIGHT (min-height 300px):
    bg #0D1117, padding 24px, display flex, align-center, justify-center
    Shows: the compliance donut chart from the blog post
    (dark card matching the terminal card style)

SECONDARY POST GRID (3 columns, gap 24px, margin-top 24px):

Each card:
  bg white, border 1px #E5E7EB, border-radius 12px
  overflow hidden
  hover: box-shadow 0 8px 24px rgba(0,0,0,0.07), translateY(-2px), 200ms ease

  Thumbnail (top): aspect-ratio 16/9, bg #0D1117
    Shows a relevant dark UI visual matching post topic
    Object-fit: cover

  Body (padding 24px):
    Category badge (top): colored pill per category
    Title: 19px 600 #0F172A, line-height 1.35, margin-top 8px
    Excerpt: 14px #374151, 2 lines, line-height 1.6, margin-top 8px
    Meta row: 28px avatar circle + name + "·" + date + "·" + read time
      Font: 12px #9CA3AF, flex, gap 6px, margin-top 16px

  Tags (padding 0 24px 20px):
    2–3 pill tags, 10px, 4px radius, bg rgba(accent,0.08), color accent

── NEWSLETTER BANNER ──
Dark card inside light bg section:
  bg #0D1117, border-radius 16px, border 1px rgba(255,255,255,0.08)
  padding 48px, margin-top 64px
  flex row: text left + form right, align-center, gap 40px

  Left:
    H3: "Stay ahead of India's compliance landscape." — 22px 600 white
    Sub: "Monthly BOM governance insights for regulated teams." — 14px #94A3B8

  Right:
    flex row, gap 8px
    Input: height 44px, bg rgba(255,255,255,0.05), border 1px rgba(255,255,255,0.1)
      radius 8px, color white, placeholder #4B5563, padding 0 16px, min-width 280px
    Button: "Subscribe →" — gradient blue, height 44px, padding 0 20px
      radius 8px, Inter 14px 600, white
Copy Blog Page Prompt ↗
Section · Footer
Dark multi-column footer with ghost wordmark
FOOTER

bg: #0D1117, border-top: 1px solid rgba(255,255,255,0.07)
padding: 80px 0 40px, position: relative, overflow: hidden

── GHOST WORDMARK (decorative) ──
position: absolute, bottom: -20px, left: 50%, transform: translateX(-50%)
font: Inter 900 200px, color: rgba(255,255,255,0.018)
pointer-events: none, white-space: nowrap
Text: "INTELLIXBOM"
This creates the Harness-style large ghost text behind footer content

── MAIN FOOTER GRID ──
display grid, grid-template-columns: 2fr 1fr 1fr 1fr 1fr
gap: 40px, relative z-index 1

Column 1 — Brand:
  Logo ("Intelli✕BOM" same navbar style, smaller: 20px)
  Tagline (14px #94A3B8, mt 8px): "Complete Digital Trust for India's Regulated Infrastructure"
  Social icons (mt 20px, gap 12px, color #4B5563, hover #FFFFFF):
    LinkedIn · GitHub · Twitter/X

Columns 2–5 — Links:
  Column header: 11px uppercase, letter-spacing 0.08em, color #4B5563, mb 16px
  Links: 14px Inter 400, #94A3B8, hover #FFFFFF, mb 10px, display block

  Platform: SBOM · CBOM · QBOM · AIBOM · HBOM · Dashboard · API Docs
  Compliance: CERT-In v2.0 · RBI Advisory · MeitY 2025 · NCIIPC · SEBI
  Resources: Blog · Case Studies · Documentation · Changelog · Webinars
  Company: About · Careers · Security · Press · Partners · Contact Us

── BOTTOM BAR ──
border-top: 1px solid rgba(255,255,255,0.06)
padding-top: 24px, margin-top: 48px
flex, space-between, align-center

Left: "© 2025 IntelliXBOM · Built for India's Digital Sovereignty"
  14px #4B5563

Right: flex, gap 16px
  "Privacy Policy" · "Terms of Service" · "Security"
  14px #4B5563, links hover #94A3B8
Copy Footer Prompt ↗
Complete Prompt — All Sections
⚡ Paste this entire block into v0.dev, Framer AI, or Figma AI for a complete build
Design a complete website for IntelliXBOM — India's premier B2B SaaS platform for BOM (Bill of Materials) compliance: SBOM, CBOM, QBOM, AIBOM, and HBOM, targeting CERT-In, RBI, SEBI, NCIIPC, and MeitY regulated entities.

REFERENCE SITE: harness.io
Match Harness's exact visual DNA: near-black dark base, centered hero with top-glow mesh gradient, animated background grid, blue/cyan gradient headline text, 5-product tab switcher with terminal cards, horizontal logo marquee, full-bleed floating dashboard preview, grid-line capability section, light compliance section as contrast break, and ghost wordmark in footer.

═══════════════════════════════
GLOBAL TOKENS
═══════════════════════════════
Colors: bg-base:#05070F | bg-surface:#0D1117 | bg-elevated:#141A26 | bg-light:#F7F8FC
Accents: blue:#4361EE | teal:#00D4AA | purple:#8B5CF6 | amber:#F59E0B | red:#EF4444
Text: primary:#FFFFFF | secondary:#94A3B8 | muted:#4B5563 | dark:#0F172A
Borders: dark:rgba(255,255,255,0.07) | light:rgba(0,0,0,0.08)

Hero gradient: radial-gradient(ellipse 80% 60% at 50% -10%,rgba(67,97,238,0.25),transparent 70%), radial-gradient(ellipse 40% 40% at 80% 50%,rgba(0,212,170,0.12),transparent 60%), #05070F

Typography: Inter (all UI) + JetBrains Mono (code only)
H1:72px/1.05/700/-0.03em | H2:44px/700 | H3:28px/600 | Body:16px/1.7/400
Section padding: 120px desktop / 72px tablet / 48px mobile

═══════════════════════════════
HOMEPAGE
═══════════════════════════════

[NAVBAR] Sticky 64px. Transparent → frosted glass on scroll (blur 16px, bg rgba(5,7,15,0.85), border-bottom). Logo: "Intelli✕BOM" (✕ in #4361EE with glow). Center: Why IxBOM / BOM Types▾ / Platform / Compliance / Blog. Right: Sign In (ghost) + "Request Demo →" (gradient blue, glow). BOM Types mega-dropdown: 5 columns, icon+name+desc for each BOM type.

[HERO] 100vh min-height. Mesh gradient bg + animated CSS grid overlay (1px rgba(255,255,255,0.03), 60px cells, 20s pan animation). CENTERED single column, max-width 860px.
  Eyebrow pill: pulsing green dot + "India's BOM Compliance & Digital Trust Platform" (blue border pill)
  H1 (72px 700): Line 1 "BOM Compliance." white | Line 2 "Field by Field." gradient text (blue→teal CSS gradient-clip) | Line 3 "Proven." white
  Sub (20px muted): "Verify every SBOM, CBOM, QBOM, AIBOM, and HBOM your vendors deliver — against CERT-In's 21 mandatory fields, automatically, at every software update."
  CTA row: "Get a Free Demo →" (gradient blue, 0 0 32px rgba(67,97,238,0.45) glow) + "Explore Platform" (ghost white border)
  Trust stats row: "5 Sectors" · "21 Fields" · "100% Traceability" (divided by 1px lines)
  Product terminal card (960px, dark, huge shadow+blue glow): top bar with dots+live path, left=CERT-In 21 field audit list with PASS/FAIL/WARN badges, right=donut chart (~67% fail), bottom strip with scan summary. Entry animation: typewriter line reveal.

[SOCIAL PROOF] bg #0D1117. Marquee of regulatory logos (CERT-In/RBI/SEBI/NCIIPC/MeitY/NIC/PSU — grayscale, hover color, 30s loop, pauses on hover). Below: single customer quote (centered, large opening quote mark rgba(67,97,238,0.2), attribution row with avatar).

[BOM TYPES] bg #05070F. Centered H2 "Complete Visibility Across Every Layer." 5 pill tabs (SBOM/CBOM/QBOM/AIBOM/HBOM — active tab gets accent color glow border). Tab content 50/50: left=badge+H3+desc+4 features+tags+CTA link; right=dark terminal card with syntax-highlighted JSON. Crossfade+slide transition. Each BOM accent: SBOM=#4361EE, CBOM=#00D4AA, QBOM=#8B5CF6, AIBOM=#F59E0B, HBOM=#EF4444. Comparison teaser banner below.

[CAPABILITIES] bg #0D1117. 3×2 card grid with 1px grid-line borders (parent bg rgba(255,255,255,0.05), gap:1px). Cards: icon in colored rounded square + title + desc. Hover: bg elevates + accent top border appears. 6 caps: Auto BOM Generation / Continuous Validation / Vendor Scoring / Air-Gapped Deploy / Regulator Reports / Project Controls.

[DASHBOARD] bg #05070F. "See Everything. Miss Nothing." Large dark dashboard mockup 1100px — radius 16px, massive shadow, blue underglow radial gradient. 3 white floating annotation callouts with dashed SVG connectors.

[COMPLIANCE] bg #F7F8FC LIGHT. 3 circular meter cards (CERT-In/RBI/MeitY, SVG arc progress rings, centered percentage, 3 bullet requirements each). 4-col stat row: 162 entities / 55 PSUs / 21K+ fields/day / 99% audit pass.

[CTA] bg #05070F, centered, radial glow. "Ready to Achieve Complete Digital Trust?" + dual CTA + trust micro-line.

[FOOTER] bg #0D1117. 5-col grid (brand+4 link cols: Platform/Compliance/Resources/Company). Ghost wordmark "INTELLIXBOM" at 2% opacity behind content. Bottom bar: copyright + legal links.

═══════════════════════════════
BLOG PAGE
═══════════════════════════════

[BLOG HERO] 320px, same mesh gradient. "BOM Governance & Digital Trust" H1 52px white. Tag filter pills (All/CERT-In/SBOM/Compliance/Supply Chain/Quantum/CycloneDX — active=solid blue, inactive=ghost dark).

[BLOG GRID] bg #F7F8FC. Featured card: full width, 2-col (text 55% left + dark thumbnail 45% right), radius 16px. 3-col grid below: white cards, thumbnail top, badge+title+excerpt+author meta+tag pills. All cards: hover lift+shadow.

[NEWSLETTER] Dark card (#0D1117) inset in light section: headline + email input + gradient blue subscribe button.

═══════════════════════════════
ANIMATIONS
═══════════════════════════════
Hero grid: slow pan 20s linear infinite
Gradient headline: subtle shimmer shift 4s ease infinite
Logo marquee: translateX scroll 30s, pauses on hover
Tab switch: crossfade + 20px slide, 200ms ease
Cards: hover translateY(-2px) + shadow, 200ms
CTA buttons: hover translateY(-1px) + glow intensifies
Terminal card: typewriter line-reveal on first load, 50ms/line
Dashboard: subtle parallax on scroll (0.08 factor)
Stats: count-up on IntersectionObserver enter

═══════════════════════════════
RESPONSIVE
═══════════════════════════════
1440px: Full as described
1280px: H1→64px, section padding→96px
1024px: Hero stacks, 2-col caps grid
768px: Single col all, 48px padding, hamburger nav, terminal card hides right panel
375px: H1→42px, blog grid→1col, stat row→2×2 grid
⚡ Copy Complete Prompt ↗
Best tools to paste this into
v0.dev
Best for code
Generates deploy-ready Next.js + Tailwind CSS in minutes
Framer AI
Best for live site
Interactive animations, no-code, hostable instantly
Figma AI
Full design file with components, auto layout, local styles
Builder.io
Design-to-production with visual CMS built in