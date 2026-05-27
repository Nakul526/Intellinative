import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Mail, ChevronRight } from 'lucide-react';

/* ─────────────────────────────────────────────
   Shared fade-in wrapper used for every section
───────────────────────────────────────────── */
function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Section heading with numbered accent
───────────────────────────────────────────── */
function SectionHeading({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span
        className="flex-shrink-0 text-[11px] font-bold tabular-nums px-2.5 py-1 rounded-lg"
        style={{
          background: 'rgba(0,177,220,0.08)',
          border: '1px solid rgba(0,177,220,0.22)',
          color: 'var(--c5)',
          fontFamily: 'var(--f-m)',
          letterSpacing: '0.04em',
        }}
      >
        {num}
      </span>
      <h2
        className="text-[18px] md:text-[20px] font-bold leading-tight"
        style={{ color: 'var(--ink-950)', letterSpacing: '-0.02em' }}
      >
        {title}
      </h2>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Styled table
───────────────────────────────────────────── */
function PolicyTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div
      className="rounded-xl overflow-hidden mb-5"
      style={{ border: '1px solid var(--p3)' }}
    >
      <table className="w-full text-left border-collapse">
        <thead>
          <tr style={{ background: 'var(--p2)' }}>
            {headers.map(h => (
              <th
                key={h}
                className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.08em]"
                style={{ color: 'var(--ink-500)', fontFamily: 'var(--f-m)', borderBottom: '1px solid var(--p3)' }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              style={{ background: i % 2 === 0 ? 'var(--p0)' : 'var(--p1)', borderBottom: i < rows.length - 1 ? '1px solid var(--p3)' : 'none' }}
            >
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="px-4 py-3 text-[13px] leading-[1.6]"
                  style={{ color: j === 0 ? 'var(--ink-700)' : 'var(--ink-600)', fontWeight: j === 0 ? 600 : 400 }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Bullet list
───────────────────────────────────────────── */
function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 mb-5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5">
          <ChevronRight
            className="w-3.5 h-3.5 flex-shrink-0 mt-[3px]"
            style={{ color: 'var(--c5)' }}
          />
          <span className="text-[14px] leading-[1.7]" style={{ color: 'var(--ink-600)' }}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

/* ─────────────────────────────────────────────
   Body paragraph
───────────────────────────────────────────── */
function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[14px] leading-[1.75] mb-4" style={{ color: 'var(--ink-600)' }}>
      {children}
    </p>
  );
}

/* ─────────────────────────────────────────────
   Sub-heading (3.1, 3.2 etc.)
───────────────────────────────────────────── */
function SubHeading({ title }: { title: string }) {
  return (
    <h3
      className="text-[14px] font-bold mb-2 mt-5"
      style={{ color: 'var(--ink-950)', letterSpacing: '-0.01em' }}
    >
      {title}
    </h3>
  );
}

/* ─────────────────────────────────────────────
   Callout box (note / highlight)
───────────────────────────────────────────── */
function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-xl px-5 py-4 mb-5"
      style={{
        background: 'rgba(0,177,220,0.05)',
        border: '1px solid rgba(0,177,220,0.20)',
        borderLeft: '3px solid var(--c5)',
      }}
    >
      <p className="text-[13px] leading-[1.7]" style={{ color: 'var(--ink-600)' }}>
        {children}
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════ */
export default function PrivacyPolicyPage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <div style={{ background: 'var(--p0)' }}>

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden"
        style={{ background: 'var(--p1)', borderBottom: '1px solid var(--p3)' }}
      >
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px]"
            style={{ background: 'radial-gradient(ellipse, rgba(0,177,220,0.07), transparent 65%)' }}
          />
        </div>

        <div className="relative max-w-[860px] mx-auto px-5 sm:px-8 pt-12 sm:pt-16 pb-12 sm:pb-14">
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="font-bold leading-[1.05] mb-4"
            style={{
              color: 'var(--ink-950)',
              letterSpacing: '-0.035em',
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontFamily: 'var(--f-d)',
            }}
          >
            Privacy Policy
          </motion.h1>

          {/* Meta row */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="flex flex-wrap items-center gap-3"
          >
            {[
              { label: 'Effective Date', value: 'June 1, 2025' },
              { label: 'Version', value: '1.0' },
              { label: 'Jurisdiction', value: 'India (DPDP Act 2023)' },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px]"
                style={{
                  background: 'var(--p2)',
                  border: '1px solid var(--p3)',
                  fontFamily: 'var(--f-m)',
                }}
              >
                <span style={{ color: 'var(--ink-400)' }}>{label}:</span>
                <span style={{ color: 'var(--ink-700)', fontWeight: 600 }}>{value}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── BODY ── */}
      <div className="max-w-[860px] mx-auto px-5 sm:px-8 py-10 sm:py-14 space-y-12">

        {/* AT A GLANCE */}
        <FadeIn>
          <div
            className="rounded-2xl p-6 sm:p-8"
            style={{ background: 'var(--p1)', border: '1px solid var(--p3)' }}
          >
            <div
              className="text-[10px] uppercase tracking-[0.12em] font-bold mb-3"
              style={{ color: 'var(--c5)', fontFamily: 'var(--f-m)' }}
            >
              At a Glance
            </div>
            <p className="text-[14px] leading-[1.8]" style={{ color: 'var(--ink-600)' }}>
              IntellixBOM (operated by <strong style={{ color: 'var(--ink-950)' }}>IntelliNative Technologies</strong>) provides
              enterprise software and services for Bill of Materials (BOM) governance, supply chain security,
              and compliance management. This Privacy Policy describes how we collect, use, and protect personal
              data in connection with our website, platform, and professional services. This policy has been
              drafted in compliance with India's{' '}
              <strong style={{ color: 'var(--ink-950)' }}>Digital Personal Data Protection (DPDP) Act, 2023</strong>,
              the Information Technology Act, 2000, and applicable CERT-In guidelines.
            </p>
          </div>
        </FadeIn>

        {/* SECTION 1 — Data Fiduciary */}
        <FadeIn>
          <div style={{ borderTop: '1px solid var(--p3)', paddingTop: '2.5rem' }}>
            <SectionHeading num="01" title="Data Fiduciary Information" />
            <P>
              IntellixBOM, operated by IntelliNative Technologies, is the <strong style={{ color: 'var(--ink-950)' }}>Data Fiduciary</strong> as
              defined under the Digital Personal Data Protection Act, 2023 (DPDP Act). We are responsible
              for determining the purposes and means of processing your personal data.
            </P>
            <PolicyTable
              headers={['Field', 'Details']}
              rows={[
                ['Entity Name', 'IntelliNative Technologies (operating as IntellixBOM)'],
                ['Registered Address', 'India'],
                ['Website', 'www.intellixbom.com'],
                ['Contact Email', 'privacy@intellixbom.com'],
                ['Grievance Officer', 'Designated Grievance Officer — Contact via privacy@intellixbom.com'],
              ]}
            />
          </div>
        </FadeIn>

        {/* SECTION 2 — Scope */}
        <FadeIn>
          <div style={{ borderTop: '1px solid var(--p3)', paddingTop: '2.5rem' }}>
            <SectionHeading num="02" title="Scope and Applicability" />
            <P>This Privacy Policy applies to:</P>
            <BulletList items={[
              'Visitors to our website at www.intellixbom.com',
              'Registered users of the IntellixBOM platform',
              'Business contacts, prospects, and representatives of client organisations',
              'Participants in demonstrations, webinars, or events organised by IntellixBOM',
            ]} />
            <Callout>
              IntellixBOM is a <strong>B2B enterprise platform</strong>. We primarily process business contact
              information and professional data of individuals acting in their organisational capacity.
              We do not knowingly collect personal data from individuals below the age of 18.
            </Callout>
          </div>
        </FadeIn>

        {/* SECTION 3 — Data We Collect */}
        <FadeIn>
          <div style={{ borderTop: '1px solid var(--p3)', paddingTop: '2.5rem' }}>
            <SectionHeading num="03" title="Personal Data We Collect" />
            <P>
              We collect only such personal data as is necessary for the purposes described in this policy.
              The categories of data we may collect include:
            </P>

            <SubHeading title="3.1  Data You Provide Directly" />
            <BulletList items={[
              'Contact details: full name, business email address, phone number, designation, company name',
              'Account credentials: username and encrypted password (for platform users)',
              'Correspondence: messages submitted via contact forms, support tickets, or email enquiries',
              'Event registrations: data submitted when registering for webinars or product demonstrations',
            ]} />

            <SubHeading title="3.2  Data Collected Automatically" />
            <BulletList items={[
              'Technical data: IP address, browser type and version, device type, operating system',
              'Usage data: pages visited, session duration, navigation paths, feature interactions',
              'Cookie data: as described in Section 9 of this policy',
            ]} />

            <SubHeading title="3.3  Data from Third Parties" />
            <BulletList items={[
              'Publicly available professional information (e.g., LinkedIn profiles for business outreach)',
              'Referrals from existing clients or partner organisations',
            ]} />

            <Callout>
              We do <strong>not</strong> collect sensitive personal data such as financial information, health data,
              biometric data, religious or political beliefs, or any data relating to an individual's personal
              life unless specifically required and separately consented to.
            </Callout>
          </div>
        </FadeIn>

        {/* SECTION 4 — Purposes */}
        <FadeIn>
          <div style={{ borderTop: '1px solid var(--p3)', paddingTop: '2.5rem' }}>
            <SectionHeading num="04" title="Purposes of Processing and Legal Basis" />
            <P>
              We process personal data only for legitimate, specified purposes. Under the DPDP Act, 2023,
              we rely on the following legal bases:
            </P>
            <PolicyTable
              headers={['Purpose', 'Data Used', 'Legal Basis']}
              rows={[
                ['Platform access & account management', 'Name, email, credentials', 'Consent / Contract'],
                ['Responding to enquiries and support', 'Name, email, message content', 'Consent / Legitimate Interest'],
                ['Providing licensed software & services', 'Business contact, usage data', 'Contract Performance'],
                ['Product updates and security notices', 'Email address', 'Legitimate Interest'],
                ['Marketing communications (opt-in only)', 'Name, email, company', 'Consent'],
                ['Compliance & legal obligations', 'As required by law', 'Legal Obligation'],
                ['Security monitoring & fraud prevention', 'IP, access logs, usage data', 'Legitimate Interest'],
                ['Analytics and product improvement', 'Anonymised usage data', 'Legitimate Interest'],
                ['CERT-In compliance and incident reporting', 'As mandated by CERT-In', 'Legal Obligation'],
              ]}
            />
          </div>
        </FadeIn>

        {/* SECTION 5 — Consent */}
        <FadeIn>
          <div style={{ borderTop: '1px solid var(--p3)', paddingTop: '2.5rem' }}>
            <SectionHeading num="05" title="Consent and Notice" />
            <P>
              In accordance with the DPDP Act, 2023, where we rely on consent as the legal basis for processing:
            </P>
            <BulletList items={[
              'We will provide a clear and itemised notice describing the personal data being collected, the purpose of processing, and how consent may be withdrawn',
              'Consent will be obtained freely, specifically, informedly, unconditionally, and unambiguously through a clear affirmative action',
              'We will not process personal data for purposes beyond those notified without obtaining fresh consent',
              'You may withdraw consent at any time by contacting us at privacy@intellixbom.com; withdrawal does not affect the lawfulness of processing prior to withdrawal',
            ]} />
            <Callout>
              <strong>Marketing emails:</strong> We will only send promotional communications where you have opted in.
              Each communication includes an unsubscribe option.
            </Callout>
          </div>
        </FadeIn>

        {/* SECTION 6 — Sharing */}
        <FadeIn>
          <div style={{ borderTop: '1px solid var(--p3)', paddingTop: '2.5rem' }}>
            <SectionHeading num="06" title="Sharing and Disclosure of Personal Data" />
            <P>IntellixBOM does not sell, rent, or trade personal data. We may share data with trusted parties solely as needed:</P>

            <SubHeading title="6.1  Within Our Organisation" />
            <P>
              Personal data is shared internally only with staff who need it to fulfil a business purpose,
              subject to confidentiality obligations.
            </P>

            <SubHeading title="6.2  Authorised Service Providers (Data Processors)" />
            <P>We engage third-party service providers to assist with platform operations, analytics, communication, and cloud infrastructure. These providers are:</P>
            <BulletList items={[
              'Bound by written data processing agreements ensuring DPDP Act compliance',
              'Prohibited from using your data for any purpose other than providing the contracted service',
              'Vetted for security and data protection standards',
            ]} />

            <SubHeading title="6.3  Law Enforcement and Regulatory Bodies" />
            <P>
              We may disclose personal data where required by law, court order, CERT-In directives, or
              directions from any competent Indian government authority. We will, to the extent permitted
              by law, notify affected Data Principals before such disclosure.
            </P>

            <SubHeading title="6.4  Business Transfers" />
            <P>
              In the event of a merger, acquisition, or sale of assets, personal data may be transferred to
              the successor entity, subject to equivalent privacy protections.
            </P>

            <Callout>
              We ensure that all third parties with whom we share personal data are contractually obligated to
              protect it to a standard consistent with this policy and applicable law.
            </Callout>
          </div>
        </FadeIn>

        {/* SECTION 7 — Cross-Border */}
        <FadeIn>
          <div style={{ borderTop: '1px solid var(--p3)', paddingTop: '2.5rem' }}>
            <SectionHeading num="07" title="Cross-Border Data Transfers" />
            <P>
              IntellixBOM primarily processes and stores personal data within India. Where we transfer
              personal data outside India (for example, to cloud infrastructure providers), such transfers will be:
            </P>
            <BulletList items={[
              'Made only to countries or entities notified as permissible under the DPDP Act, 2023 or as directed by the Central Government',
              'Subject to contractual safeguards ensuring equivalent data protection',
              'Conducted only to the extent necessary for delivering our services',
            ]} />
            <Callout>
              We will update this section as and when the Central Government issues further rules and
              whitelisted jurisdictions under the DPDP Act.
            </Callout>
          </div>
        </FadeIn>

        {/* SECTION 8 — Retention */}
        <FadeIn>
          <div style={{ borderTop: '1px solid var(--p3)', paddingTop: '2.5rem' }}>
            <SectionHeading num="08" title="Data Retention" />
            <P>
              We retain personal data only for as long as necessary to fulfil the purposes for which it was
              collected, or as required by applicable law. Our retention principles:
            </P>
            <BulletList items={[
              'Account data is retained for the duration of your engagement with us and up to 3 years thereafter for legal and audit purposes',
              'Marketing contact data is retained until consent is withdrawn or you opt out',
              'Security and access logs are retained for 1 year in line with CERT-In guidelines (or such period as mandated by law)',
              'Legal correspondence and compliance records are retained for such periods as required under applicable Indian law',
            ]} />
            <P>
              Upon expiry of the applicable retention period, personal data will be securely deleted or anonymised.
            </P>
          </div>
        </FadeIn>

        {/* SECTION 9 — Cookies */}
        <FadeIn>
          <div style={{ borderTop: '1px solid var(--p3)', paddingTop: '2.5rem' }}>
            <SectionHeading num="09" title="Cookies and Tracking Technologies" />
            <P>
              Our website uses cookies and similar technologies to enhance user experience and analyse site
              performance. We use:
            </P>
            <PolicyTable
              headers={['Cookie Type', 'Purpose', 'Can be Disabled?']}
              rows={[
                ['Essential Cookies', 'Required for website functionality and security; cannot be disabled without affecting site operation', 'No'],
                ['Analytics Cookies', 'Help us understand how visitors interact with our site (e.g., Google Analytics — anonymised)', 'Yes'],
                ['Preference Cookies', 'Remember your settings and preferences across sessions', 'Yes'],
                ['Marketing Cookies', 'Used only if you have opted in to marketing communications', 'Yes'],
              ]}
            />
            <P>
              You may manage cookie preferences via your browser settings or our cookie consent banner.
              Disabling non-essential cookies will not affect your ability to use our core services.
            </P>
          </div>
        </FadeIn>

        {/* SECTION 10 — Rights */}
        <FadeIn>
          <div style={{ borderTop: '1px solid var(--p3)', paddingTop: '2.5rem' }}>
            <SectionHeading num="10" title="Rights of Data Principals" />
            <P>
              As a Data Principal under the DPDP Act, 2023, you have the following rights in relation to
              your personal data:
            </P>
            <PolicyTable
              headers={['Right', 'What This Means']}
              rows={[
                ['Right to Information', 'You may request a summary of the personal data we hold about you and the purposes for which it is being processed.'],
                ['Right to Correction', 'You may request correction of inaccurate or outdated personal data. You may also request completion of incomplete data.'],
                ['Right to Erasure', 'You may request deletion of your personal data where the purpose for processing has been fulfilled, subject to our legal retention obligations.'],
                ['Right to Grievance Redressal', 'You have the right to a timely response to any privacy complaint or grievance raised with our Grievance Officer.'],
                ['Right to Nominate', 'You may nominate an individual to exercise your rights in the event of your death or incapacity.'],
                ['Right to Withdraw Consent', 'Where processing is based on consent, you may withdraw consent at any time. This does not affect prior processing.'],
              ]}
            />
            <P>
              To exercise any of these rights, submit a written request to{' '}
              <a
                href="mailto:privacy@intellixbom.com"
                style={{ color: 'var(--c5)', fontWeight: 500 }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--c6)')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--c5)')}
              >
                privacy@intellixbom.com
              </a>
              . We will respond within the timeframes prescribed by the DPDP Act (generally within 30 days,
              or as legally required).
            </P>
            <Callout>
              We reserve the right to verify the identity of the requestor before acting on any data rights
              request. Requests that are manifestly unfounded, repetitive, or excessive may be refused or a
              reasonable administrative fee charged, in accordance with DPDP Act provisions.
            </Callout>
          </div>
        </FadeIn>

        {/* SECTION 11 — Security */}
        <FadeIn>
          <div style={{ borderTop: '1px solid var(--p3)', paddingTop: '2.5rem' }}>
            <SectionHeading num="11" title="Security Safeguards" />
            <P>
              IntellixBOM takes the security of personal data seriously. As a cybersecurity and BOM
              governance company, we apply industry-leading security controls:
            </P>
            <BulletList items={[
              'Encryption: Data in transit is protected by TLS 1.2+ encryption; data at rest is encrypted using AES-256 or equivalent',
              'Access Control: Role-based access control (RBAC) ensures data is accessible only on a need-to-know basis',
              'Infrastructure Security: Our platform is hosted on secure, certified cloud infrastructure with regular vulnerability assessments',
              'Incident Response: We maintain a documented incident response plan aligned with CERT-In guidelines (IT Amendment Act, 2008 and CERT-In Directions 2022)',
              'Data Breach Notification: In the event of a personal data breach that is likely to cause harm, we will notify the Data Protection Board of India and affected Data Principals as required under the DPDP Act',
              'Security Audits: We conduct periodic internal and third-party security audits and penetration tests',
            ]} />
            <Callout>
              While we implement robust security measures, no system can guarantee absolute security.
              We encourage users to safeguard their account credentials and report any suspected security
              incidents promptly.
            </Callout>
          </div>
        </FadeIn>

        {/* SECTION 12 — Children */}
        <FadeIn>
          <div style={{ borderTop: '1px solid var(--p3)', paddingTop: '2.5rem' }}>
            <SectionHeading num="12" title="Children's Privacy" />
            <P>
              IntellixBOM's platform and services are intended exclusively for business and enterprise use.
              We do not knowingly collect, process, or store personal data of individuals below the age of
              18 years. If we become aware that personal data of a minor has been inadvertently collected,
              we will promptly delete it. If you believe we may have collected data belonging to a minor,
              please contact us at{' '}
              <a
                href="mailto:privacy@intellixbom.com"
                style={{ color: 'var(--c5)', fontWeight: 500 }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--c6)')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--c5)')}
              >
                privacy@intellixbom.com
              </a>{' '}
              immediately.
            </P>
          </div>
        </FadeIn>

        {/* SECTION 13 — Third-Party Links */}
        <FadeIn>
          <div style={{ borderTop: '1px solid var(--p3)', paddingTop: '2.5rem' }}>
            <SectionHeading num="13" title="Third-Party Links and Integrations" />
            <P>
              Our website and platform may contain links to third-party websites, integration partners,
              or embedded content. This Privacy Policy does not apply to such third-party sites.
              IntellixBOM is not responsible for the privacy practices of any third party. We recommend
              that you review the privacy policies of any third-party service you access through our platform.
            </P>
          </div>
        </FadeIn>

        {/* SECTION 14 — Grievance */}
        <FadeIn>
          <div style={{ borderTop: '1px solid var(--p3)', paddingTop: '2.5rem' }}>
            <SectionHeading num="14" title="Grievance Redressal" />
            <div
              className="rounded-2xl p-6 sm:p-7"
              style={{ background: 'var(--p1)', border: '1px solid var(--p3)' }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(0,177,220,0.08)', border: '1px solid rgba(0,177,220,0.22)' }}
                >
                  <Mail className="w-4.5 h-4.5" style={{ color: 'var(--c5)' }} />
                </div>
                <div>
                  <div className="text-[15px] font-bold mb-1" style={{ color: 'var(--ink-950)' }}>
                    Grievance Officer
                  </div>
                  <div className="text-[13px] mb-1" style={{ color: 'var(--ink-600)' }}>
                    IntelliNative Technologies (IntellixBOM)
                  </div>
                  <a
                    href="mailto:privacy@intellixbom.com"
                    className="text-[13px] font-medium"
                    style={{ color: 'var(--c5)' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--c6)')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--c5)')}
                  >
                    privacy@intellixbom.com
                  </a>
                  <div className="text-[12px] mt-2" style={{ color: 'var(--ink-500)', fontFamily: 'var(--f-m)' }}>
                    Response time: Within 30 days of receipt of grievance, or as prescribed by applicable law
                  </div>
                </div>
              </div>
            </div>
            <P className="mt-4">
              If your grievance is not resolved to your satisfaction, you may approach the{' '}
              <strong style={{ color: 'var(--ink-950)' }}>Data Protection Board of India</strong>, once
              established under the DPDP Act, 2023.
            </P>
          </div>
        </FadeIn>

        {/* SECTION 15 — Updates */}
        <FadeIn>
          <div style={{ borderTop: '1px solid var(--p3)', paddingTop: '2.5rem' }}>
            <SectionHeading num="15" title="Updates to This Privacy Policy" />
            <P>
              IntellixBOM may update this Privacy Policy from time to time to reflect changes in our
              practices, legal obligations, or the introduction of new features. When we make material
              changes, we will:
            </P>
            <BulletList items={[
              'Post the updated policy on our website with a revised effective date',
              'Notify registered users via email or an in-platform notification where required',
              'Obtain fresh consent where a material change affects how we process data based on consent',
            ]} />
            <P>
              Continued use of our website or platform after the effective date of a revised policy
              constitutes acceptance of the updated terms, subject to any applicable consent requirements
              under the DPDP Act.
            </P>
          </div>
        </FadeIn>

        {/* SECTION 16 — Governing Law */}
        <FadeIn>
          <div style={{ borderTop: '1px solid var(--p3)', paddingTop: '2.5rem' }}>
            <SectionHeading num="16" title="Governing Law and Jurisdiction" />
            <P>
              This Privacy Policy is governed by the laws of India, including but not limited to:
            </P>
            <BulletList items={[
              'The Digital Personal Data Protection Act, 2023 (DPDP Act)',
              'The Information Technology Act, 2000, and rules made thereunder',
              'CERT-In Directions on Cybersecurity, 2022',
              'Any rules, regulations, and guidelines issued by the Data Protection Board of India',
            ]} />
            <P>
              Any disputes arising out of or in connection with this Privacy Policy shall be subject to
              the exclusive jurisdiction of courts in India.
            </P>
          </div>
        </FadeIn>

        {/* ── FOOTER CARD ── */}
        <FadeIn>
          <div
            className="rounded-2xl p-6 sm:p-8 text-center"
            style={{ background: 'var(--p1)', border: '1px solid var(--p3)' }}
          >
            <div className="text-[12px] uppercase tracking-[0.1em] font-bold mb-3"
              style={{ color: 'var(--ink-400)', fontFamily: 'var(--f-m)' }}>
              IntellixBOM Privacy Policy · Version 1.0 · Effective June 1, 2025
            </div>
            <p className="text-[13px] mb-4" style={{ color: 'var(--ink-500)' }}>
              For questions, contact:{' '}
              <a
                href="mailto:privacy@intellixbom.com"
                style={{ color: 'var(--c5)', fontWeight: 500 }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--c6)')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--c5)')}
              >
                privacy@intellixbom.com
              </a>
            </p>
            <p className="text-[12px]" style={{ color: 'var(--ink-400)', fontFamily: 'var(--f-m)' }}>
              © 2025 IntelliNative Technologies. All rights reserved.
            </p>
          </div>
        </FadeIn>

      </div>
    </div>
  );
}
