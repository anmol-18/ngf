import { useState } from 'react';
import { motion } from 'framer-motion';
import ScreenWrapper from '../shared/ScreenWrapper';
import PillButton from '../shared/PillButton';
import { downloadICS, daysUntil, formatDate } from '../../utils/calendar';
import { burstConfetti } from '../../utils/effects';

export default function SaveTheDate({ onNext }) {
  const [selectedDate, setSelectedDate] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const minDate = new Date().toISOString().split('T')[0];

  const handleConfirm = () => {
    if (!selectedDate) return;
    setConfirmed(true);
    burstConfetti({ particleCount: 80, spread: 70 });
  };

  const countdown = selectedDate ? daysUntil(selectedDate) : null;

  return (
    <ScreenWrapper>
      <motion.div
        className="flex w-full max-w-md flex-col items-center text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="font-hand text-3xl text-rose-dark sm:text-4xl">
          Now let&apos;s pick when I get to see you in person 💗
        </h2>

        <div className="relative mt-8 w-full rounded-3xl bg-white p-6 shadow-xl">
          <span className="absolute -right-2 -top-2 text-2xl">💕</span>
          <span className="absolute -left-2 -top-2 text-xl">💌</span>

          {!confirmed ? (
            <>
              <label htmlFor="date-picker" className="mb-3 block text-sm text-[#8a6a75]">
                Pick our next date
              </label>
              <input
                id="date-picker"
                type="date"
                min={minDate}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full rounded-2xl border-2 border-blush bg-baby-pink/30 px-4 py-3 text-center text-lg outline-none focus:border-rose focus:shadow-md"
              />
              <div className="mt-6">
                <PillButton onClick={handleConfirm} disabled={!selectedDate}>
                  Confirm Date 💗
                </PillButton>
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              <motion.span
                className="text-5xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                💌
              </motion.span>
              <p className="font-hand text-2xl text-rose-dark">
                It&apos;s a date! 💌 {formatDate(selectedDate)}
              </p>
              {countdown !== null && countdown >= 0 && (
                <motion.p
                  className="text-lg font-semibold text-soft-gold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {countdown === 0
                    ? "Today's the day! 🎉"
                    : `${countdown} day${countdown === 1 ? '' : 's'} to go`}
                </motion.p>
              )}
              <button
                type="button"
                onClick={() => downloadICS(selectedDate)}
                className="rounded-full border-2 border-rose/40 px-5 py-2 text-sm text-rose-dark transition-colors hover:bg-blush/30"
              >
                📅 Add to Calendar
              </button>
            </motion.div>
          )}
        </div>

        {confirmed && (
          <motion.div className="mt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <PillButton onClick={onNext}>Continue</PillButton>
          </motion.div>
        )}
      </motion.div>
    </ScreenWrapper>
  );
}
