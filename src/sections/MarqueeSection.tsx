import { useEffect, useRef, useState } from 'react';
import { Play } from 'lucide-react';

// Placeholder thumbnails representing Rafael's content categories.
// Swap these for real project thumbnails/GIFs whenever they're available.
const CATEGORIES = [
  'talking-head', 'faceless', 'youtube', 'vlog', 'trading', 'real-estate',
  'motion-graphics', 'captions', 'broll', 'shortform', 'social',
  'interview', 'podcast', 'travel', 'finance', 'lifestyle', 'tutorial',
  'brand', 'reels', 'documentary', 'commercial',
];

function thumbUrl(seed: string) {
  // Vertical (9:16) placeholders since Rafael's real work is all vertical reels.
  return `https://picsum.photos/seed/${seed}/270/480`;
}

const ROW_1 = CATEGORIES.slice(0, 11);
const ROW_2 = CATEGORIES.slice(11, 21);

function tripled(arr: string[]) {
  return [...arr, ...arr, ...arr];
}

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const raw = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setOffset(raw);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#0C0C0C] pt-12 sm:pt-16 md:pt-20 pb-10 overflow-hidden">
      <MarqueeRow images={tripled(ROW_1)} translateX={offset - 200} prefix="r1" />
      <div className="h-3" />
      <MarqueeRow images={tripled(ROW_2)} translateX={-(offset - 200)} prefix="r2" />
    </section>
  );
}

function MarqueeRow({
  images,
  translateX,
  prefix,
}: {
  images: string[];
  translateX: number;
  prefix: string;
}) {
  return (
    <div className="flex gap-3" style={{ willChange: 'transform', transform: `translateX(${translateX}px)` }}>
      {images.map((seed, i) => (
        <div
          key={`${prefix}-${seed}-${i}`}
          className="relative flex-shrink-0 rounded-2xl overflow-hidden"
          style={{ width: 170, height: 300 }}
        >
          <img
            src={thumbUrl(`${seed}-${i}`)}
            alt={seed.replace('-', ' ')}
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
            <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/40">
              <Play size={16} color="#D7E2EA" fill="#D7E2EA" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
