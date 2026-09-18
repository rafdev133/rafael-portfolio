import { useState } from 'react';
import {
  Mic,
  VenetianMask,
  Podcast,
  Camera,
  TrendingUp,
  Home,
  Wand2,
  Captions,
  Film,
  BookOpen,
} from 'lucide-react';
import FadeIn from '../components/FadeIn';
import { motion } from 'framer-motion';
import FloatingCube from '../components/FloatingCube';
import VideoHoverPreview from '../components/VideoHoverPreview';

const COLORS = ['#B600A8', '#7621B0', '#BE4C00'];

// 10 individual specialties instead of 5 combined ones -- each of these
// used to be one half of a paired service card. Each also has a real
// YouTube Shorts example (`videoId`) that plays in a popup on hover.
const SERVICES = [
  {
    number: '01',
    term: 'Talking Head',
    description: 'You, speaking directly to camera -- the classic vlog, podcast-clip, or explainer format.',
    icon: Mic,
    videoId: 'KtXQpmIUoMU',
  },
  {
    number: '02',
    term: 'Faceless',
    description: 'Content built without ever showing your face -- voiceover, B-roll, and text-driven storytelling.',
    icon: VenetianMask,
    videoId: 'V2Me830aBfM',
  },
  {
    number: '03',
    term: 'Podcast',
    description: 'Long-form conversations and interviews, cleaned up and cut into clips that still land without the full context.',
    icon: Podcast,
    videoId: 'Q0BOH_s9gSU',
  },
  {
    number: '04',
    term: 'Vlogs',
    description: 'Day-in-the-life style videos that follow your story as it happens.',
    icon: Camera,
    videoId: 'WwP6kJNFmag',
  },
  {
    number: '05',
    term: 'Trading',
    description: 'Market breakdowns, chart walkthroughs, and trading-education style videos.',
    icon: TrendingUp,
    videoId: 'Igr06xn2oz0',
  },
  {
    number: '06',
    term: 'Real Estate',
    description: 'Property walkthroughs and listing videos built to sell trust as much as space.',
    icon: Home,
    videoId: '6cXawULEjlE',
  },
  {
    number: '07',
    term: 'Motion Graphics',
    description: 'Animated text, shapes, and overlays that add energy and rhythm to a scene.',
    icon: Wand2,
    videoId: '4RJjhQcvjtY',
  },
  {
    number: '08',
    term: 'Captions',
    description: 'Kinetic, styled subtitles that keep viewers watching even with the sound off.',
    icon: Captions,
    videoId: 'EYKFb8MVG70',
  },
  {
    number: '09',
    term: 'B-Roll',
    description: 'Supplementary footage cut in alongside the main shot to add visual interest.',
    icon: Film,
    videoId: 'yTLlFCt0WlI',
  },
  {
    number: '10',
    term: 'Story Structuring',
    description: 'Arranging clips into a clear beginning, middle, and end that holds attention.',
    icon: BookOpen,
    videoId: 'acT7O_q5dCk',
  },
];

export default function ServicesSection() {
  const [hoveredNumber, setHoveredNumber] = useState<string | null>(null);
  const hovered = SERVICES.find((s) => s.number === hoveredNumber) ?? null;
  const hoveredIndex = hovered ? SERVICES.indexOf(hovered) : 0;
  const hoveredColor = COLORS[hoveredIndex % COLORS.length];

  return (
    <section
      id="services"
      className="relative overflow-hidden rounded-[32px] border border-white/10 mx-4 sm:mx-6 md:mx-10 mb-16 px-5 sm:px-8 md:px-12 py-16 sm:py-20"
      style={{ background: '#111214' }}
    >
      <FloatingCube size={70} className="top-10 right-8 hidden md:block" duration={16} colors={['#B600A8', '#7621B0']} />
      <FloatingCube size={50} className="bottom-16 left-8 hidden md:block" duration={22} colors={['#BE4C00', '#7621B0']} />

      <FadeIn delay={0} y={30}>
        <h2 className="hero-heading font-black uppercase text-center mb-14 sm:mb-16 text-4xl sm:text-5xl md:text-6xl">
          Services
        </h2>
      </FadeIn>

      <div className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 max-w-6xl mx-auto">
        {SERVICES.map((service, i) => {
          const Icon = service.icon;
          const color = COLORS[i % COLORS.length];
          return (
            <FadeIn key={service.number} delay={i * 0.05} y={24}>
              <motion.div
                onMouseEnter={() => setHoveredNumber(service.number)}
                onMouseLeave={() => setHoveredNumber((cur) => (cur === service.number ? null : cur))}
                whileHover={{ y: -6, scale: 1.04 }}
                transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                className="group relative rounded-2xl border border-white/10 p-3.5 sm:p-4 aspect-[4/5] flex flex-col justify-center overflow-hidden cursor-pointer"
                style={{ background: 'linear-gradient(165deg, #1b1c20 0%, #0c0c0c 100%)' }}
              >
                <motion.span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `radial-gradient(circle at 50% 30%, ${color}26, transparent 65%)` }}
                />

                <span className="absolute top-3 right-3.5 text-lg sm:text-xl font-black text-white/10 select-none">
                  {service.number}
                </span>

                {/* Big icon, centered -- the card's default, always-on
                    focal point (not something that only shows up on hover). */}
                <div className="relative flex flex-col items-center text-center gap-2.5 sm:gap-3">
                  <span
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${color}26`, border: `1px solid ${color}55` }}
                  >
                    <Icon size={28} style={{ color }} />
                  </span>
                  <h3 className="font-semibold uppercase text-white text-[11px] sm:text-xs leading-snug">
                    {service.term}
                  </h3>
                </div>

                <p className="relative text-[#D7E2EA]/50 text-[9.5px] sm:text-[10.5px] leading-relaxed line-clamp-3 text-center mt-3">
                  {service.description}
                </p>
              </motion.div>
            </FadeIn>
          );
        })}
      </div>

      {/* Hover preview -- plays that specialty's real YouTube Short, centered
          on screen with sound on, and disappears the moment you move off
          the card. */}
      <VideoHoverPreview
        active={!!hovered}
        videoId={hovered ? hovered.videoId : ''}
        title={hovered ? `${hovered.term} example` : ''}
        aspectRatio="9 / 16"
        maxWidth="300px"
        accentColor={hoveredColor}
        icon={hovered ? hovered.icon : undefined}
        label={hovered ? hovered.term : undefined}
        muted={false}
      />
    </section>
  );
}
