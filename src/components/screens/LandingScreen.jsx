import { motion } from 'framer-motion';
import ScreenWrapper from '../shared/ScreenWrapper';
import PillButton from '../shared/PillButton';
import { SPRING_SOFT } from '../../constants/motion';

export default function LandingScreen({ onNext }) {
  return (
    <ScreenWrapper>
      <motion.div
        className="flex max-w-md flex-col items-center text-center"
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={SPRING_SOFT}
      >
        <span className="decor-pulse mb-4 text-6xl">💗</span>
        <h1 className="font-hand text-4xl leading-tight text-rose-dark sm:text-5xl">
          Are you ready for the pampering? 💗
        </h1>
        <p className="text-on-bg-muted mt-4 text-base sm:text-lg">
          A little arcade of love, just for you — tap in when your heart says yes.
        </p>
        <div className="mt-10">
          <PillButton glow onClick={onNext}>
            Yes, I&apos;m ready
          </PillButton>
        </div>
      </motion.div>
    </ScreenWrapper>
  );
}
