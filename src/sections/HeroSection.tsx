import { useRef, useState } from 'react';
import { Facebook, MessageCircle, Send, Mail, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeIn from '../components/FadeIn';
import AnimatedText from '../components/AnimatedText';
import TiltPhoto from '../components/TiltPhoto';
import FloatingCube from '../components/FloatingCube';
import ContactButton from '../components/ContactButton';
import LiveProjectButton from '../components/LiveProjectButton';
import { useSmoothScroll } from '../lib/SmoothScroll';

// Your resume, saved in /public. Filename has spaces, so it's encoded
// wherever it's used as a URL (src/href) below.
const RESUME_PATH = '/Rafael Porgatorio RESUME.pdf';

const BIO =
  "I'm a freelance video editor with 4+ years of experience in short-form and social media content. I work across talking head, faceless, YouTube, vlogs, trading, and real estate videos, blending motion graphics, captions, and B-roll into edits that grab attention and keep viewers watching.";

const STATS = [
  { value: '4+ Yrs', label: 'Experience' },
  { value: 'Freelance', label: 'Role' },
  { value: 'Local & Global', label: 'Clients' },
  { value: 'CapCut Pro', label: 'Main Tool' },
];

const SOCIALS = [
  { icon: Facebook, label: 'facebook', href: 'https://www.facebook.com/rafmedia133', color: '#1877F2' },
  { icon: MessageCircle, label: 'whatsapp', href: 'https://wa.me/639610979529', color: '#25D366' },
  { icon: Send, label: 'telegram', href: 'https://t.me/+639942082301', color: '#29B6F6' },
  { icon: Mail, label: 'email', href: 'mailto:rafaelporgatorio133@gmail.com', color: '#EA4335' },
];

export default function HeroSection() {
  const { scrollTo } = useSmoothScroll();

  // Resume preview stays open while hovering either the button or the
  // popup itself, with a short grace period so there's a real path to
  // move the cursor from one to the other to reach the Download link
  // (same "hover bridge" pattern used for the video popups elsewhere).
  const [resumeOpen, setResumeOpen] = useState(false);
  const resumeCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openResume = () => {
    if (resumeCloseTimer.current) {
      clearTimeout(resumeCloseTimer.current);
      resumeCloseTimer.current = null;
    }
    setResumeOpen(true);
  };
  const closeResumeSoon = () => {
    resumeCloseTimer.current = setTimeout(() => setResumeOpen(false), 220);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden flex items-center px-5 sm:px-8 md:px-10 pt-28 pb-16"
    >
      {/* Ambient decoration */}
      <FloatingCube
        size={70}
        className="top-24 left-4 hidden md:block"
        duration={17}
        colors={['#B600A8', '#7621B0']}
      />
      <FloatingCube
        size={50}
        className="bottom-16 right-10 hidden md:block"
        duration={22}
        colors={['#BE4C00', '#B600A8']}
        opacity={0.14}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 75% 40%, rgba(182,0,168,0.18), transparent 70%)' }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto grid md:grid-cols-[1.05fr_0.95fr] gap-12 md:gap-10 items-center">
        {/* Text column */}
        <div>
          <FadeIn delay={0} y={20}>
            <span className="inline-block text-xs sm:text-sm uppercase tracking-[0.2em] text-[#D7E2EA]/60 mb-4">
              Freelance Video Editor
            </span>
          </FadeIn>

          <FadeIn delay={0.1} y={20}>
            <h1
              className="hero-heading font-black uppercase tracking-tight leading-[0.95] mb-5"
              style={{ fontSize: 'clamp(2.25rem, 6vw, 4.5rem)' }}
            >
              Rafael Porgatorio
            </h1>
          </FadeIn>

          <AnimatedText
            text={BIO}
            className="text-[#D7E2EA]/70 text-sm sm:text-base leading-relaxed max-w-lg mb-8"
          />

          <FadeIn delay={0.2} y={20}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4 mb-8 max-w-lg">
              {STATS.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-0.5">
                  <span className="text-white text-base sm:text-lg font-semibold">{stat.value}</span>
                  <span className="text-[#D7E2EA]/45 text-[10px] uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.3} y={20}>
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <ContactButton onClick={() => scrollTo('#contact')} />
              {/* Hover shows a preview centered on the Hero with a
                  Download option; clicking opens the PDF directly, so it
                  still works as a plain link on touch devices where
                  hovering isn't a thing. */}
              <div onMouseEnter={openResume} onMouseLeave={closeResumeSoon}>
                <LiveProjectButton label="My Resume" href={RESUME_PATH} />
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.4} y={20}>
            <div className="flex items-center gap-3">
              {SOCIALS.map((s) => {
                const Icon = s.icon;
                return (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="relative w-10 h-10 rounded-full flex items-center justify-center border border-white/15 text-[#D7E2EA]/55"
                    style={{ background: 'rgba(255,255,255,0.04)' }}
                    whileHover={{
                      scale: 1.35,
                      color: '#ffffff',
                      backgroundColor: s.color,
                      borderColor: s.color,
                      boxShadow: `0 0 22px ${s.color}99`,
                    }}
                    whileTap={{ scale: 1.15 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 14 }}
                  >
                    <Icon size={17} />
                  </motion.a>
                );
              })}
            </div>
          </FadeIn>
        </div>

        {/* Big 1:1 portrait that tilts gently toward the cursor */}
        <FadeIn delay={0.2} y={20} className="flex justify-center md:justify-end">
          <TiltPhoto
            src="/rafael-portrait.jpg"
            alt="Rafael Porgatorio"
            className="w-full max-w-[440px] sm:max-w-[480px] md:max-w-[520px]"
          />
        </FadeIn>
      </div>

      {/* Resume preview -- centered on the Hero, shows the actual PDF with
          a Download button, and disappears when you move off both the
          button and the popup. */}
      <AnimatePresence>
        {resumeOpen && (
          <motion.div
            key="resume-popup"
            aria-hidden
            className="absolute inset-0 z-[60] flex items-center justify-center p-6 pointer-events-none"
            style={{ background: 'rgba(0,0,0,0.38)', backdropFilter: 'blur(3px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              onMouseEnter={openResume}
              onMouseLeave={closeResumeSoon}
              className="relative rounded-2xl overflow-hidden border"
              style={{
                width: 'min(520px, 90vw)',
                height: 'min(680px, 78vh)',
                borderColor: '#B600A866',
                boxShadow: '0 0 60px #B600A866, 0 30px 60px rgba(0,0,0,0.6)',
                background: '#1b1c20',
                pointerEvents: 'auto',
              }}
              initial={{ opacity: 0, scale: 0.9, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 10 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            >
              <iframe
                src={`${encodeURI(RESUME_PATH)}#toolbar=0&navpanes=0`}
                title="Rafael Porgatorio Resume"
                className="absolute inset-0 w-full h-full"
                style={{ border: 0 }}
              />
              <a
                href={encodeURI(RESUME_PATH)}
                download
                className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-black/60 backdrop-blur-sm border border-white/25 text-white text-xs font-semibold uppercase tracking-wide hover:bg-black/80 transition-colors duration-200"
              >
                <Download size={13} />
                Download
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
