import { motion } from 'framer-motion';
import ScreenWrapper from '../shared/ScreenWrapper';
import PillButton from '../shared/PillButton';
import { SPRING_SOFT } from '../../constants/motion';

export default function ActivityIntro({ onNext }) {
  return (
    <ScreenWrapper>
      <motion.div
        className="flex max-w-md flex-col items-center rounded-3xl bg-white/90 p-8 text-center shadow-xl"
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={SPRING_SOFT}
      >
        <span className="decor-pulse mb-4 text-5xl">💌</span>
        <h2 className="font-hand text-3xl text-rose-dark sm:text-4xl">
          Before your surprises... let&apos;s play 💌
        </h2>
        <p className="mt-3 text-[#8a6a75]">
          Five little games of love — each one leads somewhere sweeter.
        </p>
        <div className="mt-8">
          <PillButton onClick={onNext}>Let&apos;s go</PillButton>
        </div>
      </motion.div>
    </ScreenWrapper>
  );
}
