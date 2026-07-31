import { useState } from 'react';
import { motion } from 'framer-motion';
import ScreenWrapper from '../shared/ScreenWrapper';
import PillButton from '../shared/PillButton';
import { CLOSING_MESSAGE, COUPLE_PHOTO_MESSAGE, ASSETS } from '../../constants/config';
import { SPRING_SOFT } from '../../constants/motion';

export default function ClosingScreen({ onReplay }) {
  const [photoFailed, setPhotoFailed] = useState(false);

  return (
    <ScreenWrapper className="justify-start pt-6">
      <motion.div
        className="flex w-full max-w-md flex-col items-center text-center"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={SPRING_SOFT}
      >
        <span className="decor-pulse mb-4 text-5xl">💗</span>

        {!photoFailed ? (
          <img
            src={ASSETS.couplePhoto}
            alt="Us"
            className="mb-5 max-h-[48vh] w-full rounded-3xl object-contain shadow-xl"
            onError={() => setPhotoFailed(true)}
          />
        ) : (
          <div className="mb-5 flex min-h-48 w-full items-center justify-center rounded-3xl bg-white/70 px-4 text-sm text-[#8a6a75] shadow-xl">
            📷 Add couple-photo.jpeg to /public/assets/
          </div>
        )}

        <p className="font-hand text-2xl leading-relaxed text-rose-dark sm:text-3xl">
          {COUPLE_PHOTO_MESSAGE}
        </p>

        <p className="text-on-bg-muted mt-4 text-sm leading-relaxed sm:text-base">
          {CLOSING_MESSAGE}
        </p>

        <div className="mt-8 pb-6">
          <PillButton onClick={onReplay} glow>
            Replay 💕
          </PillButton>
        </div>
      </motion.div>
    </ScreenWrapper>
  );
}
