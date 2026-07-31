import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PillButton from '../shared/PillButton';
import HeartRain from '../shared/HeartRain';
import { FINAL_GIFT_LETTER, FINAL_SURPRISE_TEXT, ASSETS } from '../../constants/config';
import { fireworks, playSfx } from '../../utils/effects';

export default function FinalGift({ onNext }) {
  const [phase, setPhase] = useState('heart'); // heart | typing | done | surpriseText
  const [displayedText, setDisplayedText] = useState('');
  const [surpriseText, setSurpriseText] = useState('');
  const bgMusicRef = useRef(null);

  useEffect(() => {
    if (phase !== 'typing') return;
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      if (i <= FINAL_GIFT_LETTER.length) {
        setDisplayedText(FINAL_GIFT_LETTER.slice(0, i));
      } else {
        clearInterval(interval);
        setPhase('done');
        fireworks();
        bgMusicRef.current = playSfx(ASSETS.bgMusic, 0.35);
      }
    }, 38);
    return () => clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'surpriseText') return;
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      if (i <= FINAL_SURPRISE_TEXT.length) {
        setSurpriseText(FINAL_SURPRISE_TEXT.slice(0, i));
      } else {
        clearInterval(interval);
        setTimeout(onNext, 2200);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [phase, onNext]);

  useEffect(() => {
    return () => {
      if (bgMusicRef.current) bgMusicRef.current.pause();
    };
  }, []);

  return (
    <motion.div
      className="absolute inset-0 z-10 flex flex-col items-center justify-center overflow-y-auto px-6 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[#1a0a12]" />

      {(phase === 'done' || phase === 'surpriseText') && <HeartRain count={22} />}

      <div className="relative z-10 flex max-w-lg flex-col items-center text-center">
        <AnimatePresence mode="wait">
          {phase === 'heart' && (
            <motion.div
              key="heart"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <motion.button
                type="button"
                onClick={() => setPhase('typing')}
                className="text-7xl sm:text-8xl"
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                whileTap={{ scale: 0.9 }}
              >
                💗
              </motion.button>
              <p className="mt-6 font-hand text-2xl text-blush">Tap the heart</p>
            </motion.div>
          )}

          {(phase === 'typing' || phase === 'done') && (
            <motion.div
              key="letter-block"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center"
            >
              <div className="rounded-3xl bg-white/10 p-6 backdrop-blur-sm sm:p-8">
                <p className="font-hand text-2xl leading-relaxed text-white sm:text-3xl">
                  {displayedText}
                  {phase === 'typing' && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.55, repeat: Infinity }}
                    >
                      |
                    </motion.span>
                  )}
                </p>
              </div>

              {phase === 'done' && (
                <motion.div
                  className="mt-10"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  <PillButton
                    onClick={() => setPhase('surpriseText')}
                    className="bg-gradient-to-r from-soft-gold to-rose"
                  >
                    ❤️ One Last Surprise
                  </PillButton>
                </motion.div>
              )}
            </motion.div>
          )}

          {phase === 'surpriseText' && (
            <motion.div
              key="surprise"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p className="font-hand text-4xl text-soft-gold sm:text-5xl">{surpriseText}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
