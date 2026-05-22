import { motion } from 'motion/react';
import { Rocket, Target, Users, Award, TrendingUp, Globe } from 'lucide-react';
import PageHero from '../components/PageHero';

export default function About() {
  const values = [
    {
      icon: Target,
      title: 'Customer-Centric Excellence',
      description: 'Every decision we make starts with understanding your unique challenges and business objectives.'
    },
    {
      icon: Users,
      title: 'Deep Technical Expertise',
      description: 'Our team comprises certified cloud architects, security experts, and platform engineers with decades of combined experience.'
    },
    {
      icon: Award,
      title: 'Quality Without Compromise',
      description: 'We deliver production-ready solutions, not prototypes. Every line of code, every architecture decision is built to last.'
    },
    {
      icon: TrendingUp,
      title: 'Innovation-Driven',
      description: 'We stay ahead of the curve, leveraging cutting-edge AI, cloud-native patterns, and emerging technologies.'
    }
  ];

  const timeline = [
    { year: '2020', event: 'Founded', description: 'Started with a vision to transform enterprise cloud infrastructure' },
    { year: '2021', event: 'First Fortune 500 Client', description: 'Delivered mission-critical platform modernization' },
    { year: '2022', event: 'AI Integration', description: 'Pioneered AI-powered infrastructure automation' },
    { year: '2023', event: 'Global Expansion', description: 'Expanded services across North America, Europe, and Asia' },
    { year: '2024', event: 'Industry Recognition', description: 'Named Top Cloud-Native Partner by leading analysts' },
  ];

  const stats = [
    { value: '500+', label: 'Projects Delivered' },
    { value: '50+', label: 'Enterprise Clients' },
    { value: '99.99%', label: 'Uptime SLA' },
    { value: '24/7', label: 'Support Coverage' }
  ];

  return (
    <div className="min-h-screen">
      <PageHero
        badge="WHO WE ARE"
        headline="Engineering for the"
        headlineGradient="AI-Native Era."
        subtext="A team of platform engineers, cloud architects, and AI specialists building the infrastructure that powers tomorrow's enterprises."
        variant="about"
      />

      {/* Stats Grid */}
      <section className="relative py-16">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl border border-[rgba(255,255,255,0.07)]"
                style={{ background: 'rgba(255,255,255,0.03)' }}
              >
                <div className="text-4xl font-bold mb-2" style={{
                  background: 'linear-gradient(135deg, #7B2FFF 0%, #00D4FF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontFamily: 'var(--font-display)'
                }}>
                  {stat.value}
                </div>
                <p className="text-sm text-[#8A9BB5]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 border-t border-[rgba(255,255,255,0.05)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-10 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(123,47,255,0.1) 0%, rgba(0,212,255,0.05) 100%)',
                border: '1px solid rgba(123,47,255,0.2)'
              }}
            >
              <Globe className="text-[#7B2FFF] mb-4" size={40} />
              <h2 className="text-3xl mb-4">Our Vision</h2>
              <p className="text-lg text-[#8A9BB5] leading-relaxed">
                To be the global leader in intelligent platform engineering, where AI and cloud-native
                infrastructure converge to create unprecedented business value.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-10 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(0,255,136,0.1) 0%, rgba(0,212,255,0.05) 100%)',
                border: '1px solid rgba(0,255,136,0.2)'
              }}
            >
              <Rocket className="text-[#00FF88] mb-4" size={40} />
              <h2 className="text-3xl mb-4">Our Mission</h2>
              <p className="text-lg text-[#8A9BB5] leading-relaxed">
                Empower enterprises to achieve cloud-native excellence through AI-driven platform
                engineering, security-first design, and unwavering commitment to operational excellence.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="mb-4">Our Core Values</h2>
            <p className="text-lg text-[#8A9BB5] max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 p-8 rounded-2xl border border-[rgba(255,255,255,0.07)] hover:border-[rgba(0,212,255,0.3)] transition-all"
                style={{ background: 'rgba(255,255,255,0.03)' }}
              >
                <div className="p-3 rounded-xl h-fit" style={{ background: 'rgba(0,212,255,0.1)' }}>
                  <value.icon size={28} className="text-[#00D4FF]" />
                </div>
                <div>
                  <h3 className="text-xl mb-3 text-[#F0F4FF]">{value.title}</h3>
                  <p className="text-[#8A9BB5] leading-relaxed">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 border-t border-[rgba(255,255,255,0.05)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="mb-4">Our Journey</h2>
            <p className="text-lg text-[#8A9BB5] max-w-2xl mx-auto">
              Key milestones in our evolution
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#7B2FFF] via-[#00D4FF] to-[#00FF88] hidden md:block" />

            <div className="space-y-12">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`flex items-center gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="text-4xl font-bold mb-2" style={{
                      background: 'linear-gradient(135deg, #7B2FFF 0%, #00D4FF 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      fontFamily: 'var(--font-display)'
                    }}>
                      {item.year}
                    </div>
                    <h3 className="text-xl mb-2 text-[#F0F4FF]">{item.event}</h3>
                    <p className="text-[#8A9BB5]">{item.description}</p>
                  </div>

                  <div className="w-4 h-4 rounded-full bg-[#00D4FF] border-4 border-[#050810] z-10 hidden md:block" />

                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
