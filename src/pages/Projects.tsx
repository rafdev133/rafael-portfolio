import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import LiveProjectButton from '../components/LiveProjectButton';

interface Reel {
  number: string;
  category: string;
  name: string;
  image: string;
}

// Placeholder vertical reel thumbnails -- swap for real exports (9:16, matching
// Rafael's actual reel/shorts format) whenever they're available.
const REELS: Reel[] = [
  { number: '01', category: 'Talking Head', name: 'Real Estate (House)', image: 'https://picsum.photos/seed/reel-talking-head/450/800' },
  { number: '02', category: 'Faceless', name: 'Talking Head', image: 'https://picsum.photos/seed/reel-faceless/450/800' },
  { number: '03', category: 'Trading', name: 'Talking Head', image: 'https://picsum.photos/seed/reel-trading/450/800' },
  { number: '04', category: 'Real Estate', name: 'Skyline Realty', image: 'https://picsum.photos/seed/reel-realestate/450/800' },
  { number: '05', category: 'YouTube', name: 'Weekend Builds', image: 'https://picsum.photos/seed/reel-youtube/450/800' },
  { number: '06', category: 'Vlog', name: 'City Diaries', image: 'https://picsum.photos/seed/reel-vlog/450/800' },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } },
};

export default function Projects() {
  return (
    <section className="px-6 md:px-10 pt-32 sm:pt-36 pb-20 max-w-6xl mx-auto">
      <FadeIn delay={0} y={30}>
        <h1 className="hero-heading font-black uppercase tracking-tight text-4xl sm:text-5xl md:text-6xl mb-3">
          Projects
        </h1>
      </FadeIn>
      <FadeIn delay={0.1} y={20}>
        <p className="text-[#D7E2EA]/60 text-sm sm:text-base mb-10 md:mb-14 max-w-xl">
          Every edit below is vertical -- built for reels, shorts, and TikTok, the format all of
          Rafael's client work lives in.
        </p>
      </FadeIn>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6"
      >
        {REELS.map((reel) => (
          <motion.div
            key={reel.number}
            variants={item}
            whileHover={{ y: -8, scale: 1.03 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="group relative rounded-2xl overflow-hidden border border-white/10"
            style={{ aspectRatio: '9 / 16' }}
          >
            <img
              src={reel.image}
              alt={`${reel.name} vertical reel`}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

            <span className="absolute top-3 left-3 text-white/70 font-mono text-xs">
              {reel.number}
            </span>

            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              whileHover={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/40">
                <Play size={18} color="#fff" fill="#fff" />
              </div>
            </motion.div>

            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 flex flex-col gap-2">
              <div>
                <span className="text-[#D7E2EA]/60 text-[10px] uppercase tracking-widest">
                  {reel.category}
                </span>
                <h3 className="text-white font-medium text-sm sm:text-base leading-tight">
                  {reel.name}
                </h3>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                <LiveProjectButton label="Live Project" compact />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
