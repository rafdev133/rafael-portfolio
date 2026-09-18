import { Facebook, MessageCircle, Send, Mail, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import FadeIn from '../components/FadeIn';
import FloatingCube from '../components/FloatingCube';

const CHANNELS = [
  {
    label: 'Facebook',
    handle: 'rafmedia133',
    href: 'https://www.facebook.com/rafmedia133',
    icon: Facebook,
    color: '#B600A8',
  },
  {
    label: 'WhatsApp',
    handle: '+63 961 097 9529',
    href: 'https://wa.me/639610979529',
    icon: MessageCircle,
    color: '#7621B0',
  },
  {
    label: 'Telegram',
    handle: '+63 994 208 2301',
    href: 'https://t.me/+639942082301',
    icon: Send,
    color: '#BE4C00',
  },
  {
    label: 'Gmail',
    handle: 'rafaelporgatorio133@gmail.com',
    href: 'mailto:rafaelporgatorio133@gmail.com',
    icon: Mail,
    color: '#B600A8',
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="relative overflow-hidden px-6 md:px-10 py-20 sm:py-24 max-w-5xl mx-auto">
      <FloatingCube size={60} className="top-4 left-0 hidden md:block" duration={20} colors={['#B600A8', '#BE4C00']} />
      <FloatingCube size={44} className="bottom-8 right-4 hidden md:block" duration={17} colors={['#7621B0', '#B600A8']} />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 50% 40% at 50% 20%, rgba(182,0,168,0.14), transparent 70%)' }}
      />

      <FadeIn delay={0} y={30}>
        <h2 className="hero-heading font-black uppercase tracking-tight text-4xl sm:text-5xl md:text-6xl mb-4 text-center">
          Let's Talk
        </h2>
      </FadeIn>
      <FadeIn delay={0.1} y={20}>
        <p className="text-[#D7E2EA]/60 text-sm sm:text-base mb-12 sm:mb-14 max-w-lg mx-auto text-center">
          Got a project in mind? Reach out on whichever platform is easiest for you -- I reply fast.
        </p>
      </FadeIn>

      <div className="relative grid sm:grid-cols-2 gap-4 sm:gap-5 max-w-3xl mx-auto mb-12">
        {CHANNELS.map((channel, i) => {
          const Icon = channel.icon;
          return (
            <FadeIn key={channel.label} delay={0.15 + i * 0.08} y={20}>
              <motion.a
                href={channel.href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                className="group relative flex items-center gap-4 rounded-2xl border border-white/10 p-5 overflow-hidden"
                style={{ background: 'linear-gradient(160deg, #17181c 0%, #0c0c0c 100%)' }}
              >
                <motion.span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `radial-gradient(circle at 20% 20%, ${channel.color}22, transparent 65%)` }}
                />
                <span
                  className="relative z-10 flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: `${channel.color}26`, border: `1px solid ${channel.color}55` }}
                >
                  <Icon size={20} style={{ color: channel.color }} />
                </span>
                <span className="relative z-10 flex flex-col gap-0.5 min-w-0">
                  <span className="text-white font-semibold uppercase text-sm tracking-tight">
                    {channel.label}
                  </span>
                  <span className="text-[#D7E2EA]/50 text-xs truncate">{channel.handle}</span>
                </span>
                <motion.span
                  className="relative z-10 ml-auto flex-shrink-0 text-[#D7E2EA]/30"
                  animate={{ x: 0, y: 0 }}
                  whileHover={{ x: 2, y: -2 }}
                >
                  <ArrowUpRight size={18} className="group-hover:text-white transition-colors duration-200" />
                </motion.span>
              </motion.a>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}
