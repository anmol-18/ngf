import { motion } from 'framer-motion';
import ScreenWrapper from '../shared/ScreenWrapper';
import PillButton from '../shared/PillButton';
import { CLOSING_MESSAGE } from '../../constants/config';
import { SPRING_SOFT } from '../../constants/motion';

export default function ClosingScreen({ onReplay }) {
  return (
    <ScreenWrapper>
      <motion.div
        className="flex max-w-md flex-col items-center text-center"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={SPRING_SOFT}
      >
        <span className="decor-pulse mb-6 text-6xl">💗</span>
        <p className="font-hand text-2xl leading-relaxed text-rose-dark sm:text-3xl">
          {CLOSING_MESSAGE}
        </p>
        <div className="mt-10">
          <PillButton onClick={onReplay} glow>
            Replay 💕
          </PillButton>
        </div>
      </motion.div>
    </ScreenWrapper>
  );
}
