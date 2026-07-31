import { useState } from 'react';
import { motion } from 'framer-motion';
import ScreenWrapper from '../shared/ScreenWrapper';
import PillButton from '../shared/PillButton';
import { CORRECT_NAME } from '../../constants/config';
import { burstConfetti } from '../../utils/effects';

export default function NameGate({ onNext }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (unlocked) return;

    const trimmed = name.trim();
    // Fun gate only — not real security
    if (trimmed.toLowerCase() === CORRECT_NAME.toLowerCase()) {
      setUnlocked(true);
      setError('');
      burstConfetti({ particleCount: 120, spread: 90 });
      setTimeout(onNext, 1600);
    } else {
      setError('hmm, not quite — try again cutie 🥺');
      setShake(true);
      setTimeout(() => setShake(false), 450);
    }
  };

  return (
    <ScreenWrapper>
      <motion.div
        className="w-full max-w-sm text-center"
        animate={shake ? { x: [-8, 8, -8, 8, 0] } : { x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <motion.span
          className="mb-4 inline-block text-5xl"
          animate={unlocked ? { rotate: [0, -10, 10, 0], scale: [1, 1.25, 1] } : {}}
          transition={{ duration: 0.6 }}
        >
          {unlocked ? '🎁' : '🔐'}
        </motion.span>

        <h2 className="font-hand text-3xl text-rose-dark sm:text-4xl">
          Type your name to unlock your surprise 🔐
        </h2>
        <p className="text-on-bg-muted mt-2 text-sm">Only the right name opens the gift box</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError('');
            }}
            disabled={unlocked}
            placeholder="Your name..."
            autoComplete="off"
            className="w-full rounded-2xl border-2 border-blush bg-white px-5 py-4 text-center text-lg text-[#3d2430] outline-none transition-shadow focus:border-rose focus:shadow-lg disabled:opacity-70"
          />
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-medium text-white"
            >
              {error}
            </motion.p>
          )}
          {!unlocked && (
            <PillButton type="submit" className="w-full">
              Unlock 💌
            </PillButton>
          )}
          {unlocked && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-hand text-2xl text-soft-gold"
            >
              Welcome, beautiful! ✨
            </motion.p>
          )}
        </form>
      </motion.div>
    </ScreenWrapper>
  );
}
