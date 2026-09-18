import { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, LayoutGrid, Wrench, ListChecks, Mail } from 'lucide-react';
import { useSmoothScroll } from '../lib/SmoothScroll';
import { useActiveSection } from '../hooks/useActiveSection';
import VideoHoverPreview from './VideoHoverPreview';

const NAV_LINKS = [
  { label: 'Home', id: 'home', icon: Home },
  { label: 'Projects', id: 'projects', icon: LayoutGrid },
  { label: 'Services', id: 'services', icon: Wrench },
  { label: 'Process', id: 'process', icon: ListChecks },
  { label: 'Contact', id: 'contact', icon: Mail },
];

// Plays when you hover the Rafmedia wordmark -- your own uploaded clip in
// /public, moved here from the Hero name. Hover-triggered (not click, so
// it doesn't fight with the wordmark's existing "scroll to top" click).
const LOGO_VIDEO_SRC = '/quint.mp4';

export default function Navbar() {
  const { scrollTo } = useSmoothScroll();
  const active = useActiveSection(NAV_LINKS.map((l) => l.id));
  const [logoPreviewOpen, setLogoPreviewOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed top-0 inset-x-0 z-50 px-4 sm:px-6 md:px-10 pt-4 sm:pt-6"
    >
      <div className="max-w-6xl mx-auto relative flex items-center">
        {/* Wordmark -- hovering it pops up a video preview (see
            VideoHoverPreview below); clicking it still scrolls to the top,
            unchanged. */}
        <button
          onClick={() => scrollTo('#home')}
          onMouseEnter={() => setLogoPreviewOpen(true)}
          onMouseLeave={() => setLogoPreviewOpen(false)}
          className="hero-heading font-black uppercase tracking-tight text-lg sm:text-xl whitespace-nowrap"
        >
          Rafmedia
        </button>

        {/* Center nav pill -- absolutely centered so it stays centered
            regardless of what sits beside the wordmark */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -inset-3 rounded-full opacity-60 blur-xl"
            style={{ background: 'linear-gradient(90deg, #B600A8, #7621B0, #BE4C00)' }}
            animate={{ opacity: [0.35, 0.55, 0.35] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <nav
            className="relative flex items-center gap-1 rounded-full px-1.5 py-1.5 sm:px-2 sm:py-2 border border-white/15"
            style={{
              background: 'rgba(30, 30, 34, 0.32)',
              backdropFilter: 'blur(18px) saturate(140%)',
              WebkitBackdropFilter: 'blur(18px) saturate(140%)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
            }}
          >
            {NAV_LINKS.map((link) => {
              const isActive = active === link.id;
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(`#${link.id}`)}
                  className={`relative flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium uppercase tracking-wider transition-colors duration-200 ${
                    isActive ? 'text-[#0C0C0C]' : 'text-[#D7E2EA] hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-[#D7E2EA]"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <Icon size={14} />
                    <span className="hidden sm:inline">{link.label}</span>
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Same auto-unmute hover popup that used to live on the Hero name --
          starts muted (a hard browser rule for any autoplay-with-sound),
          then switches to sound-on by itself, no button, the instant the
          visitor clicks/taps anywhere on the page. */}
      <VideoHoverPreview
        active={logoPreviewOpen}
        videoSrc={LOGO_VIDEO_SRC}
        title="Rafmedia"
        aspectRatio="16 / 9"
        maxWidth="720px"
        accentColor="#B600A8"
        autoUnmute
      />
    </motion.header>
  );
}
