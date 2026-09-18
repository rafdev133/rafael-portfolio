import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Volume2, VolumeX } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import FloatingCube from '../components/FloatingCube';

interface Reel {
  number: string;
  category: string;
  name: string;
  image: string;
  vimeoId?: string;
}

// 9 of these are Rafael's real Vimeo reels, autoplaying and looping on
// mute by default (Vimeo's "background" embed mode, which also crops them
// to fill the frame) with a per-video sound toggle. The 10th slot is still
// a placeholder -- swap `image` for a real thumbnail or add a `vimeoId`
// once a tenth reel is ready.
const REELS: Reel[] = [
  { number: '01', category: 'Talking Head', name: 'Real Estate (House)', image: 'https://picsum.photos/seed/reel-talking-head/450/900', vimeoId: '1226367786' },
  { number: '02', category: 'Faceless', name: 'Talking Head (w/ B-Rolls)', image: 'https://picsum.photos/seed/reel-faceless/450/900', vimeoId: '1226231232' },
  { number: '03', category: 'Trading', name: 'Talking Head\n(w/ Motion Graphics)', image: 'https://picsum.photos/seed/reel-trading/450/900', vimeoId: '1226231094' },
  { number: '04', category: 'Real Estate', name: 'Talking Head\n(w/ Motion Graphics)', image: 'https://picsum.photos/seed/reel-realestate/450/900', vimeoId: '1226231006' },
  { number: '05', category: 'YouTube & Vlogs', name: 'Talking Head\n(w/ Motion Graphics)', image: 'https://picsum.photos/seed/reel-youtube/450/900', vimeoId: '1226231244' },
  { number: '06', category: 'Motion Graphics', name: 'Faceless Reels', image: 'https://picsum.photos/seed/reel-motion/450/900', vimeoId: '1226232474' },
  { number: '07', category: 'Captions & B-Roll', name: 'Real Estate (Condo)', image: 'https://picsum.photos/seed/reel-storycut/450/900', vimeoId: '1226231309' },
  { number: '08', category: 'Faceless', name: 'Vlog Reels', image: 'https://picsum.photos/seed/reel-wealth/450/900', vimeoId: '1226231115' },
  { number: '09', category: 'Real Estate', name: 'Travel Reels', image: 'https://picsum.photos/seed/reel-urbannest/450/900', vimeoId: '1226231114' },
  { number: '10', category: 'YouTube & Vlogs', name: 'Daily Grind', image: 'https://picsum.photos/seed/reel-dailygrind/450/900' },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 50, rotate: -2 },
  show: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } },
};

export default function ProjectsSection() {
  const [unmutedIds, setUnmutedIds] = useState<Set<string>>(new Set());

  const toggleSound = (id: string) => {
    setUnmutedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <section id="projects" className="relative overflow-hidden px-6 md:px-10 py-20 sm:py-24 max-w-6xl mx-auto">
      <FloatingCube size={64} className="top-0 left-2 hidden md:block" duration={19} colors={['#B600A8', '#BE4C00']} />

      <FadeIn delay={0} y={30}>
        <h2 className="hero-heading font-black uppercase tracking-tight text-4xl sm:text-5xl md:text-6xl mb-12 md:mb-16 text-center">
          Projects
        </h2>
      </FadeIn>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 gap-y-8 md:gap-y-10"
      >
        {REELS.map((reel) => (
          <motion.div
            key={reel.number}
            variants={item}
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="group relative w-full"
          >
            {/* iPhone 17 Pro Max style frame on tablet/desktop -- titanium rail, action
                button, camera-control nub. On mobile the chrome is stripped so the
                reel fills the whole tile edge-to-edge. */}
            <div
              className="relative rounded-[1.6rem] md:rounded-[2.4rem] p-0 md:p-[3px]"
              style={{
                background:
                  'linear-gradient(155deg, #5a5a5e 0%, #29292c 16%, #0b0b0d 48%, #302f33 78%, #66656a 100%)',
                boxShadow: '0 20px 40px -14px rgba(0,0,0,0.65), inset 0 0 0 1px rgba(255,255,255,0.06)',
              }}
            >
              {/* Action button */}
              <div className="hidden md:block absolute -left-[3px] top-[18%] w-[3px] h-5 rounded-l-[2px] bg-[#141416]" />
              {/* Volume rocker */}
              <div className="hidden md:block absolute -left-[3px] top-[28%] w-[3px] h-6 rounded-l-[2px] bg-[#141416]" />
              <div className="hidden md:block absolute -left-[3px] top-[38%] w-[3px] h-6 rounded-l-[2px] bg-[#141416]" />
              {/* Camera control / power button */}
              <div className="hidden md:block absolute -right-[3px] top-[32%] w-[3px] h-7 rounded-r-[2px] bg-[#141416]" />

              <div
                className="relative rounded-[1.6rem] md:rounded-[2.1rem] overflow-hidden bg-black md:border md:border-black/60"
                style={{ aspectRatio: '9 / 19.5' }}
              >
                {reel.vimeoId ? (
                  <iframe
                    key={unmutedIds.has(reel.vimeoId) ? 'on' : 'off'}
                    src={
                      unmutedIds.has(reel.vimeoId)
                        ? `https://player.vimeo.com/video/${reel.vimeoId}?autoplay=1&loop=1&muted=0&controls=0&title=0&byline=0&portrait=0&dnt=1`
                        : `https://player.vimeo.com/video/${reel.vimeoId}?background=1&autoplay=1&loop=1&muted=1`
                    }
                    title={`${reel.name} vertical reel`}
                    loading="lazy"
                    allow="autoplay; fullscreen"
                    className="absolute inset-0 w-full h-full transition-transform duration-500 group-hover:scale-110"
                    style={{ border: 0, pointerEvents: 'none' }}
                  />
                ) : (
                  <img
                    src={reel.image}
                    alt={`${reel.name} vertical reel`}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

                {/* Dynamic Island (desktop/tablet frame only) */}
                <div className="hidden md:block absolute top-2 sm:top-2.5 left-1/2 -translate-x-1/2 w-11 sm:w-12 h-3 sm:h-3.5 rounded-full bg-black z-20 border border-white/5" />

                {reel.vimeoId && (
                  <>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/40">
                        <Play size={14} color="#fff" fill="#fff" />
                      </div>
                    </div>

                    {/* Sound on/off toggle */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSound(reel.vimeoId as string);
                      }}
                      aria-label={unmutedIds.has(reel.vimeoId) ? 'Mute video' : 'Unmute video'}
                      className="absolute top-6 sm:top-7 right-3 z-30 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black/50 backdrop-blur-sm border border-white/25 flex items-center justify-center hover:bg-black/70 transition-colors duration-200"
                    >
                      {unmutedIds.has(reel.vimeoId) ? (
                        <Volume2 size={12} color="#fff" />
                      ) : (
                        <VolumeX size={12} color="#fff" />
                      )}
                    </button>
                  </>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-3 flex flex-col gap-1.5">
                  {/* whitespace-pre-line lets a "\n" in reel.name force a
                      real line break (used by the "Talking Head" /
                      "(w/ ...)" two-line names below) while plain
                      single-line names render exactly as before. */}
                  <h3 className="text-white font-medium text-xs sm:text-sm leading-tight whitespace-pre-line">
                    {reel.name}
                  </h3>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
