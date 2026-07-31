import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScreenWrapper from '../shared/ScreenWrapper';
import PillButton from '../shared/PillButton';
import RewardCard from '../shared/RewardCard';
import {
  FIND_HEART_MISS_MESSAGES,
  FIND_HEART_LETTER,
  FIND_HEART_COUPON,
  PHOTO2_MESSAGE,
  ASSETS,
} from '../../constants/config';
import { burstConfetti, goldenBurst } from '../../utils/effects';

function seededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function PhotoSlide({ src, message, placeholderLabel }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="flex flex-col items-center gap-3">
      {!failed ? (
        <img
          src={src}
          alt=""
          className="max-h-[52vh] w-full rounded-2xl object-contain"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="flex min-h-40 w-full items-center justify-center rounded-2xl bg-blush/50 px-4 text-center text-sm text-[#8a6a75]">
          📷 Add {placeholderLabel} to /public/assets/
        </div>
      )}
      {message && (
        <p className="whitespace-pre-line text-center font-hand text-xl leading-relaxed text-rose-dark sm:text-2xl">
          {message}
        </p>
      )}
    </div>
  );
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

  // Letter is under photo1 — not its own slide
  const revealItems = [
    {
      type: 'photo',
      src: ASSETS.photo1,
      message: FIND_HEART_LETTER,
      placeholder: 'photo1.jpeg',
    },
    {
      type: 'photo',
      src: ASSETS.photo2,
      message: PHOTO2_MESSAGE,
      placeholder: 'photo2.jpeg',
    },
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

  const current = revealItems[carouselIndex];

  return (
    <ScreenWrapper className="justify-start pt-4">
      <h2 className="font-hand mb-1 text-center text-3xl text-rose-dark">Find My Heart</h2>
      <p className="text-on-bg-muted mb-4 text-center text-sm">
        {found ? 'You found it!' : 'One of these hearts is yours — find it 💕'}
      </p>

      {!found && (
        <div className="relative h-[45vh] min-h-[280px] w-full max-w-lg">
          {hearts.map((h) => {
            const isWiggle = wiggleId === h.id;

            return (
              <button
                key={h.id}
                type="button"
                onClick={() => handleHeartTap(h.id)}
                className={`absolute z-10 select-none ${!isWiggle ? 'decor-float' : ''} ${
                  isWiggle ? 'decor-wiggle' : ''
                }`}
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
      )}

      <AnimatePresence>
        {found && (
          <motion.div
            className="mt-2 w-full max-w-md space-y-4"
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
                  {current.type === 'photo' && (
                    <PhotoSlide
                      src={current.src}
                      message={current.message}
                      placeholderLabel={current.placeholder}
                    />
                  )}
                  {current.type === 'audio' && (
                    <div className="flex flex-col items-center gap-3 py-4">
                      <span className="text-3xl">🎙️</span>
                      <p className="text-sm text-[#8a6a75]">A voice note, just for you</p>
                      <audio controls className="w-full max-w-xs" src={current.src}>
                        Your browser does not support audio.
                      </audio>
                    </div>
                  )}
                  {current.type === 'coupon' && (
                    <RewardCard
                      emoji={current.emoji}
                      title={current.title}
                      desc={current.desc}
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

            <div className="flex justify-center pb-4">
              <PillButton onClick={onNext}>Continue</PillButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ScreenWrapper>
  );
}
