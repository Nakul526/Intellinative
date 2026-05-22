import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin, Phone, Send, Linkedin, Github, Lock } from 'lucide-react';
import PageHero from '../components/PageHero';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'hello@intellinative.com',
      link: 'mailto:hello@intellinative.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      link: 'tel:+15551234567'
    },
    {
      icon: MapPin,
      label: 'Headquarters',
      value: 'San Francisco, CA',
      link: null
    }
  ];

  const offices = [
    { city: 'San Francisco', country: 'USA', role: 'Global HQ' },
    { city: 'New York', country: 'USA', role: 'East Coast Hub' },
    { city: 'London', country: 'UK', role: 'EMEA Operations' },
    { city: 'Singapore', country: 'Singapore', role: 'APAC Hub' }
  ];

  return (
    <div className="min-h-screen">
      <PageHero
        badge="GET IN TOUCH"
        headline="Let's build"
        headlineGradient="something extraordinary."
        subtext="Whether you're modernizing legacy infrastructure or building AI-native platforms from scratch — we're ready to partner."
        variant="contact"
      />

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl mb-6">Send us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm text-[#8A9BB5] mb-2">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] text-[#F0F4FF] focus:border-[#00D4FF] focus:outline-none transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#8A9BB5] mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] text-[#F0F4FF] focus:border-[#00D4FF] focus:outline-none transition-colors"
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#8A9BB5] mb-2">Company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] text-[#F0F4FF] focus:border-[#00D4FF] focus:outline-none transition-colors"
                    placeholder="Your Company"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#8A9BB5] mb-2">Message *</label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] text-[#F0F4FF] focus:border-[#00D4FF] focus:outline-none transition-colors resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 rounded-full font-bold text-[#050810] hover:scale-[1.02] transition-all inline-flex items-center justify-center gap-2"
                  style={{
                    background: 'linear-gradient(135deg, #00FF88 0%, #00D4FF 100%)',
                  }}
                >
                  {submitted ? 'Message Sent!' : 'Send Message'}
                  <Send size={18} />
                </button>

                <div className="flex items-center gap-2 text-sm text-[#4A5568]">
                  <Lock size={14} />
                  <span>Your data is safe. We reply within 24 hours.</span>
                </div>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl mb-6">Contact Information</h2>
                <div className="space-y-4">
                  {contactInfo.map((item, i) => (
                    <a
                      key={i}
                      href={item.link || '#'}
                      className="flex items-start gap-4 p-4 rounded-xl border border-[rgba(255,255,255,0.07)] hover:border-[rgba(0,212,255,0.3)] transition-all"
                      style={{ background: 'rgba(255,255,255,0.03)' }}
                    >
                      <div className="p-2 rounded-lg" style={{ background: 'rgba(0,212,255,0.1)' }}>
                        <item.icon size={20} className="text-[#00D4FF]" />
                      </div>
                      <div>
                        <div className="text-sm text-[#8A9BB5] mb-1">{item.label}</div>
                        <div className="text-[#F0F4FF]">{item.value}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl border border-[rgba(255,255,255,0.1)] hover:border-[rgba(0,212,255,0.4)] hover:bg-[rgba(0,212,255,0.05)] transition-all"
                    style={{ background: 'rgba(255,255,255,0.03)' }}
                  >
                    <Linkedin size={24} className="text-[#8A9BB5]" />
                  </a>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl border border-[rgba(255,255,255,0.1)] hover:border-[rgba(0,212,255,0.4)] hover:bg-[rgba(0,212,255,0.05)] transition-all"
                    style={{ background: 'rgba(255,255,255,0.03)' }}
                  >
                    <Github size={24} className="text-[#8A9BB5]" />
                  </a>
                </div>
              </div>

              <div className="p-6 rounded-2xl" style={{
                background: 'linear-gradient(135deg, rgba(0,255,136,0.1) 0%, rgba(0,212,255,0.05) 100%)',
                border: '1px solid rgba(0,255,136,0.2)'
              }}>
                <h3 className="text-xl mb-4">Why Choose Intellinative?</h3>
                <ul className="space-y-2 text-sm text-[#8A9BB5]">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00FF88] mt-1.5" />
                    Fortune 500 trusted partner
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00FF88] mt-1.5" />
                    99.99% uptime SLA guarantee
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00FF88] mt-1.5" />
                    24/7 enterprise support
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00FF88] mt-1.5" />
                    ISO 27001 & SOC 2 certified
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Global Offices */}
      <section className="py-20 border-t border-[rgba(255,255,255,0.05)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="mb-4">Global Presence</h2>
            <p className="text-lg text-[#8A9BB5]">Our offices around the world</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {offices.map((office, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl border border-[rgba(255,255,255,0.07)] text-center"
                style={{ background: 'rgba(255,255,255,0.03)' }}
              >
                <div className="w-12 h-12 rounded-full mx-auto mb-4" style={{
                  background: 'linear-gradient(135deg, #7B2FFF 0%, #00D4FF 100%)'
                }} />
                <h3 className="text-lg mb-1 text-[#F0F4FF]">{office.city}</h3>
                <p className="text-sm text-[#8A9BB5] mb-2">{office.country}</p>
                <div className="text-xs px-3 py-1 rounded-full inline-block" style={{
                  background: 'rgba(0,212,255,0.1)',
                  color: '#00D4FF'
                }}>
                  {office.role}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
