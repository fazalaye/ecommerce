import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const banners = [
  {
    title: 'Méga Soldes d\'Été',
    subtitle: 'Jusqu\'à -50% sur l\'électronique • Livraison 24h à Dakar',
    cta: 'Découvrir',
    bg: 'from-primary via-primary-dark to-emerald-900',
    emoji: '🔥',
  },
  {
    title: 'Livraison Gratuite',
    subtitle: 'Sur toutes les commandes > 25 000 FCFA à Dakar',
    cta: 'En profiter',
    bg: 'from-blue-600 via-blue-700 to-indigo-900',
    emoji: '🚚',
  },
  {
    title: 'Artisanat Sénégalais',
    subtitle: 'Découvrez notre sélection de produits locaux authentiques',
    cta: 'Explorer',
    bg: 'from-amber-600 via-orange-600 to-red-700',
    emoji: '🎨',
  },
  {
    title: 'Nouveautés Mode',
    subtitle: 'Collection Wax 2026 disponible • Qualité garantie',
    cta: 'Voir la collection',
    bg: 'from-pink-600 via-purple-600 to-indigo-700',
    emoji: '✨',
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (index: number) => setCurrent(index);
  const prev = () => setCurrent((current - 1 + banners.length) % banners.length);
  const next = () => setCurrent((current + 1) % banners.length);

  const banner = banners[current];

  return (
    <div className="relative overflow-hidden rounded-2xl">
      <div className={`bg-gradient-to-r ${banner.bg} transition-all duration-500`}>
        <div className="px-6 sm:px-12 py-10 sm:py-16 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-white text-center sm:text-left">
            <span className="text-4xl mb-3 block">{banner.emoji}</span>
            <h2 className="text-2xl sm:text-4xl font-bold mb-2">{banner.title}</h2>
            <p className="text-white/80 text-sm sm:text-lg mb-6">{banner.subtitle}</p>
            <button className="px-6 py-3 bg-secondary text-gray-900 font-bold rounded-xl hover:bg-secondary-dark transition-colors shadow-lg">
              {banner.cta}
            </button>
          </div>
          <div className="hidden sm:flex items-center justify-center w-48 h-48 bg-white/10 rounded-full">
            <span className="text-8xl">{banner.emoji}</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              idx === current ? 'bg-white w-6' : 'bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
