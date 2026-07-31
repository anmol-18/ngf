import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScreenWrapper from '../shared/ScreenWrapper';
import PillButton from '../shared/PillButton';
import RewardCard from '../shared/RewardCard';
import { SLOT_MACHINE_REWARD } from '../../constants/config';
import { burstConfetti, goldenBurst } from '../../utils/effects';

const SYMBOLS = ['❤️', '💋', '🥺', '🧸', '🌹', '👑'];
const REEL_COUNT = 3;

function ReelDisplay({ symbol, spinning }) {
  return (
    <div className="flex h-24 w-20 items-center justify-center overflow-hidden rounded-2xl border-2 border-rose/30 bg-white shadow-inner sm:h-28 sm:w-24">
      <motion.span
        key={symbol + spinning}
        className="text-4xl sm:text-5xl"
        animate={spinning ? { y: [-40, 0], opacity: [0.5, 1] } : { y: 0 }}
        transition={{ duration: 0.15 }}
      >
        {symbol}
      </motion.span>
    </div>
  );
}

export default function LoveSlotMachine({ onNext }) {
  const [spinning, setSpinning] = useState(false);
  const [reelSymbols, setReelSymbols] = useState(['❤️', '💋', '🌹']);
  const [done, setDone] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const spinLock = useRef(false);

  const spin = () => {
    if (spinLock.current || spinning) return;
    spinLock.current = true;
    setSpinning(true);
    setDone(false);
    setShowReward(false);

    const stops = [800, 1400, 2000];

    stops.forEach((stopAt, reelIdx) => {
      let idx = 0;
      let elapsed = 0;
      let speed = 70;

      const tick = () => {
        idx = (idx + 1) % SYMBOLS.length;
        elapsed += speed;
        setReelSymbols((prev) => {
          const next = [...prev];
          next[reelIdx] = SYMBOLS[idx];
          return next;
        });

        if (elapsed < stopAt) {
          speed = Math.min(speed + 1.5, 100);
          setTimeout(tick, speed);
        } else {
          // Rigged: always land on ❤️
          setReelSymbols((prev) => {
            const next = [...prev];
            next[reelIdx] = '❤️';
            return next;
          });
          if (reelIdx === REEL_COUNT - 1) {
            setTimeout(() => {
              setSpinning(false);
              setDone(true);
              goldenBurst(0.5, 0.5);
              burstConfetti({ particleCount: 100, spread: 90 });
              setShowReward(true);
              spinLock.current = false;
            }, 400);
          }
        }
      };
      tick();
    });
  };

  return (
    <ScreenWrapper className="justify-start pt-4">
      <h2 className="font-hand mb-1 text-center text-3xl text-rose-dark">Love Slot Machine</h2>
      <p className="text-on-bg-muted mb-6 text-center text-sm">Pull the lever — luck is on your side 🎰</p>

      <div className="rounded-3xl border-2 border-soft-gold/40 bg-gradient-to-b from-white to-blush/30 p-6 shadow-xl">
        <div className="flex justify-center gap-3 sm:gap-4">
          {reelSymbols.map((sym, i) => (
            <ReelDisplay key={i} symbol={sym} spinning={spinning} />
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <PillButton onClick={spin} disabled={spinning} glow={!spinning && !done}>
            {spinning ? 'Spinning...' : 'SPIN'}
          </PillButton>
        </div>
      </div>

      <AnimatePresence>
        {showReward && (
          <motion.div
            className="mt-6 w-full max-w-sm space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-center font-hand text-2xl text-rose-dark">
              You unlocked today&apos;s surprise.
            </p>
            <RewardCard
              emoji={SLOT_MACHINE_REWARD.emoji}
              title={SLOT_MACHINE_REWARD.title}
              desc={SLOT_MACHINE_REWARD.desc}
            />
            <div className="flex justify-center">
              <PillButton onClick={onNext}>Continue</PillButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ScreenWrapper>
  );
}
