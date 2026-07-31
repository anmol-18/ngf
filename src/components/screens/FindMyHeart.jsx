import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScreenWrapper from '../shared/ScreenWrapper';
import PillButton from '../shared/PillButton';
import RewardCard from '../shared/RewardCard';
import {
  FIND_HEART_MISS_MESSAGES,
  FIND_HEART_LETTER,
  FIND_HEART_COUPON,
  ASSETS,
} from '../../constants/config';
import { burstConfetti, goldenBurst } from '../../utils/effects';
import { SPRING_SOFT } from '../../constants/motion';

function seededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export default function FindMyHeart({ onNext }) {
  const correctIndex = useMemo(() => Math.floor(Math.random() * 20), []);
  const [found, setFound] = useState(false);
  const [bubble, setBubble] = useState(null);
  const [wiggleId, setWiggleId] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const hearts = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: `${8 + seededRandom(i * 3) * 84}%`,
        top: `${10 + seededRandom(i * 7) * 75}%`,
        size: 22 + seededRandom(i * 11) * 14,
        delay: seededRandom(i * 13) * 2,
        duration: 3 + seededRandom(i * 5) * 2,
        drift: (seededRandom(i * 17) - 0.5) * 18,
      })),
    []
  );

  const revealItems = [
    { type: 'letter', content: FIND_HEART_LETTER },
    { type: 'photo', src: ASSETS.photo1 },
    { type: 'audio', src: ASSETS.voiceNote },
    { type: 'coupon', ...FIND_HEART_COUPON },
  ];

  const handleHeartTap = (id) => {
    if (found) return;

    if (id === correctIndex) {
      setFound(true);
      goldenBurst(0.5, 0.4);
      burstConfetti({ particleCount: 90, spread: 80 });
    } else {
      setWiggleId(id);
      const msg =
        FIND_HEART_MISS_MESSAGES[Math.floor(Math.random() * FIND_HEART_MISS_MESSAGES.length)];
      setBubble({ id, msg });
      setTimeout(() => {
        setWiggleId(null);
        setBubble(null);
      }, 1400);
    }
  };

  return (
    <ScreenWrapper className="justify-start pt-4">
      <h2 className="font-hand mb-1 text-center text-3xl text-rose-dark">Find My Heart</h2>
      <p className="text-on-bg-muted mb-4 text-center text-sm">
        {found ? 'You found it!' : 'One of these hearts is yours — find it 💕'}
      </p>

      <div className="relative h-[45vh] min-h-[280px] w-full max-w-lg">
        {hearts.map((h) => {
          const isCorrect = h.id === correctIndex;
          const dimmed = found && !isCorrect;
          const isWiggle = wiggleId === h.id;

          if (found && isCorrect) {
            return (
              <motion.span
                key={h.id}
                className="absolute z-10 select-none"
                style={{ left: h.left, top: h.top, fontSize: h.size }}
                initial={{ scale: 1 }}
                animate={{ scale: 1.7 }}
                transition={SPRING_SOFT}
              >
                💖
              </motion.span>
            );
          }

          return (
            <button
              key={h.id}
              type="button"
              disabled={found}
              onClick={() => handleHeartTap(h.id)}
              className={`absolute z-10 select-none ${dimmed ? 'pointer-events-none opacity-20' : ''} ${
                !found && !isWiggle ? 'decor-float' : ''
              } ${isWiggle ? 'decor-wiggle' : ''}`}
              style={{
                left: h.left,
                top: h.top,
                fontSize: h.size,
                '--drift': `${h.drift}px`,
                animationDuration: `${h.duration}s`,
                animationDelay: `${h.delay}s`,
              }}
            >
              💗
            </button>
          );
        })}

        <AnimatePresence>
          {bubble && (
            <motion.div
              className="pointer-events-none absolute z-20 max-w-[180px] rounded-2xl bg-white px-3 py-2 text-sm text-[#5c3d4a] shadow-lg"
              style={{
                left: hearts[bubble.id]?.left,
                top: `calc(${hearts[bubble.id]?.top} - 44px)`,
                transform: 'translateX(-40%)',
              }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {bubble.msg}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {found && (
          <motion.div
            className="mt-4 w-full max-w-md space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-center font-hand text-2xl text-rose-dark">
              Congratulations ❤️ — You found the heart you stole long ago.
            </p>

            <div className="overflow-hidden rounded-3xl bg-white p-4 shadow-xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={carouselIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.28 }}
                >
                  {revealItems[carouselIndex].type === 'letter' && (
                    <p className="whitespace-pre-line text-center text-sm leading-relaxed text-[#5c3d4a]">
                      {revealItems[carouselIndex].content}
                    </p>
                  )}
                  {revealItems[carouselIndex].type === 'photo' && (
                    <div className="flex flex-col items-center">
                      <img
                        src={revealItems[carouselIndex].src}
                        alt="Us"
                        className="h-48 w-full rounded-2xl object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="hidden h-48 w-full items-center justify-center rounded-2xl bg-blush/50 text-sm text-[#8a6a75]">
                        📷 Add photo1.jpg to /public/assets/
                      </div>
                    </div>
                  )}
                  {revealItems[carouselIndex].type === 'audio' && (
                    <div className="flex flex-col items-center gap-3 py-4">
                      <span className="text-3xl">🎙️</span>
                      <p className="text-sm text-[#8a6a75]">A voice note, just for you</p>
                      <audio controls className="w-full max-w-xs" src={revealItems[carouselIndex].src}>
                        Your browser does not support audio.
                      </audio>
                    </div>
                  )}
                  {revealItems[carouselIndex].type === 'coupon' && (
                    <RewardCard
                      emoji={revealItems[carouselIndex].emoji}
                      title={revealItems[carouselIndex].title}
                      desc={revealItems[carouselIndex].desc}
                      className="shadow-none"
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="mt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCarouselIndex((i) => Math.max(0, i - 1))}
                  disabled={carouselIndex === 0}
                  className="rounded-full px-3 py-1 text-sm text-rose-dark disabled:opacity-30"
                >
                  ← Prev
                </button>
                <div className="flex gap-1.5">
                  {revealItems.map((_, i) => (
                    <span
                      key={i}
                      className={`h-2 w-2 rounded-full ${i === carouselIndex ? 'bg-rose' : 'bg-blush'}`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setCarouselIndex((i) => Math.min(revealItems.length - 1, i + 1))}
                  disabled={carouselIndex === revealItems.length - 1}
                  className="rounded-full px-3 py-1 text-sm text-rose-dark disabled:opacity-30"
                >
                  Next →
                </button>
              </div>
            </div>

            <div className="flex justify-center">
              <PillButton onClick={onNext}>Continue</PillButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ScreenWrapper>
  );
}
