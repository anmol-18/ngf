import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import ScreenWrapper from '../shared/ScreenWrapper';
import PillButton from '../shared/PillButton';
import RewardCard from '../shared/RewardCard';
import { LUCKY_CARD_REWARDS, ASSETS } from '../../constants/config';
import { burstConfetti, goldenBurst, playSfx } from '../../utils/effects';
import { SPRING_SOFT } from '../../constants/motion';

const PREVIEW_SECONDS = 10;
const SHUFFLE_ROUNDS = 5;
const SHUFFLE_INTERVAL_MS = 650;

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function HeartBurst() {
  const hearts = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    angle: (i / 12) * Math.PI * 2,
    emoji: ['💗', '💕', '💖', '❤️'][i % 4],
  }));

  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
      {hearts.map((h) => (
        <motion.span
          key={h.id}
          className="absolute text-xl"
          initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
          animate={{
            x: Math.cos(h.angle) * 80,
            y: Math.sin(h.angle) * 80,
            opacity: 0,
            scale: 1.4,
          }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          {h.emoji}
        </motion.span>
      ))}
    </div>
  );
}

export default function LuckyLoveCards({ onNext }) {
  const [cardOrder, setCardOrder] = useState(() =>
    shuffleArray(LUCKY_CARD_REWARDS.map((r, i) => ({ ...r, id: i }))).slice(0, 5)
  );
  const [phase, setPhase] = useState('preview');
  const [countdown, setCountdown] = useState(PREVIEW_SECONDS);
  const [selectedId, setSelectedId] = useState(null);
  const [reward, setReward] = useState(null);
  const [showBurst, setShowBurst] = useState(false);
  const shuffleRoundRef = useRef(0);
  const shuffleTimerRef = useRef(null);

  const runShuffleRound = useCallback(() => {
    setCardOrder((prev) => shuffleArray(prev));
    shuffleRoundRef.current += 1;
    if (shuffleRoundRef.current >= SHUFFLE_ROUNDS) {
      clearInterval(shuffleTimerRef.current);
      setTimeout(() => setPhase('select'), 350);
    }
  }, []);

  useEffect(() => {
    if (phase !== 'preview') return;
    if (countdown <= 0) {
      setPhase('shuffling');
      return;
    }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, countdown]);

  useEffect(() => {
    if (phase !== 'shuffling') return;
    shuffleRoundRef.current = 0;
    // Flip face-down first, then start shuffling
    const start = setTimeout(() => {
      shuffleTimerRef.current = setInterval(runShuffleRound, SHUFFLE_INTERVAL_MS);
    }, 450);
    return () => {
      clearTimeout(start);
      clearInterval(shuffleTimerRef.current);
    };
  }, [phase, runShuffleRound]);

  const handleCardTap = (card, index) => {
    if (phase !== 'select') return;

    setPhase('revealed');
    setSelectedId(card.id);
    setReward(card);
    setShowBurst(true);

    const rect = document.getElementById(`lucky-card-${card.id}`)?.getBoundingClientRect();
    const x = rect ? (rect.left + rect.width / 2) / window.innerWidth : 0.5;
    const y = rect ? (rect.top + rect.height / 2) / window.innerHeight : 0.5;

    goldenBurst(x, y);
    burstConfetti({ particleCount: 90, spread: 75, origin: { x, y } });
    playSfx(ASSETS.revealChime);
    setTimeout(() => setShowBurst(false), 800);
  };

  const canSelect = phase === 'select';
  const isRevealed = phase === 'revealed';

  const statusText = {
    preview: `Memorize the prizes… ${countdown}s`,
    shuffling: 'Shuffling… watch closely! 👀',
    select: 'Pick your lucky card ✨',
    revealed: 'Your prize awaits!',
  }[phase];

  return (
    <ScreenWrapper className="justify-start pt-6">
      <h2 className="font-hand mb-2 text-center text-3xl text-rose-dark">Lucky Love Cards</h2>
      <p className="text-on-bg-muted mb-6 text-center text-sm">{statusText}</p>

      {phase === 'preview' && (
        <div className="mb-4 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-white/30">
          <div
            className="h-full rounded-full bg-rose transition-[width] duration-1000 ease-linear"
            style={{ width: `${((PREVIEW_SECONDS - countdown) / PREVIEW_SECONDS) * 100}%` }}
          />
        </div>
      )}

      <LayoutGroup>
        <div className="relative flex w-full max-w-lg flex-wrap justify-center gap-3 sm:gap-4">
          {cardOrder.map((card) => {
            const isSelected = selectedId === card.id;
            const showFace =
              phase === 'preview' || (isRevealed && isSelected);

            return (
              <motion.div
                key={card.id}
                layout
                id={`lucky-card-${card.id}`}
                className="relative"
                transition={SPRING_SOFT}
              >
                {showBurst && isSelected && <HeartBurst />}
                <motion.button
                  type="button"
                  disabled={!canSelect}
                  onClick={() => handleCardTap(card)}
                  className={`relative h-24 w-[4.5rem] sm:h-28 sm:w-20 ${
                    canSelect ? 'cursor-pointer' : 'cursor-default'
                  } ${phase === 'shuffling' ? 'decor-wiggle' : ''}`}
                  style={{ perspective: 800 }}
                  whileTap={canSelect ? { scale: 0.94 } : undefined}
                  whileHover={canSelect ? { scale: 1.04 } : undefined}
                >
                  <motion.div
                    className="relative h-full w-full"
                    animate={{ rotateY: showFace ? 180 : 0 }}
                    transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div
                      className="absolute inset-0 flex items-center justify-center rounded-2xl border-2 border-rose/30 bg-gradient-to-br from-rose to-rose-dark shadow-lg"
                      style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                    >
                      <span className="text-2xl">💗</span>
                    </div>
                    <div
                      className="absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-2xl border-2 border-soft-gold bg-white p-1 shadow-lg"
                      style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                      }}
                    >
                      <span className="text-2xl sm:text-3xl">{card.emoji}</span>
                      {phase === 'preview' && (
                        <span className="line-clamp-2 px-1 text-center text-[8px] leading-tight text-[#8a6a75] sm:text-[9px]">
                          {card.title}
                        </span>
                      )}
                    </div>
                  </motion.div>
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </LayoutGroup>

      <AnimatePresence>
        {reward && (
          <motion.div
            className="mt-8 w-full max-w-sm"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <RewardCard emoji={reward.emoji} title={reward.title} desc={reward.desc} />
            <div className="mt-6 flex justify-center">
              <PillButton onClick={onNext}>Continue</PillButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ScreenWrapper>
  );
}
