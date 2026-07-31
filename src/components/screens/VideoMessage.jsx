import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import ScreenWrapper from '../shared/ScreenWrapper';
import PillButton from '../shared/PillButton';
import { ASSETS } from '../../constants/config';

export default function VideoMessage({ onNext }) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <ScreenWrapper>
      <motion.div
        className="flex w-full max-w-lg flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="font-hand mb-2 text-center text-2xl text-rose-dark sm:text-3xl">
          One last surprise, for real this time... 🎥
        </h2>

        <div className="relative mt-4 w-full">
          {/* Decorative ribbon frame */}
          <div className="absolute -left-2 -top-2 h-8 w-16 rotate-[-25deg] rounded-full bg-rose/40" />
          <div className="absolute -right-2 -top-2 h-8 w-16 rotate-[25deg] rounded-full bg-lavender/60" />
          <div className="absolute -bottom-2 -left-2 h-6 w-12 rotate-[15deg] rounded-full bg-soft-gold/50" />
          <div className="absolute -bottom-2 -right-2 h-6 w-12 rotate-[-15deg] rounded-full bg-blush" />

          <div className="relative overflow-hidden rounded-3xl border-4 border-white bg-black shadow-2xl">
            <video
              ref={videoRef}
              className="aspect-video w-full object-cover"
              src={ASSETS.messageVideo}
              controls={playing}
              playsInline
              onEnded={() => setPlaying(false)}
              poster=""
            >
              {/* TODO: Add message.mp4 to /public/assets/ */}
              Your browser does not support video.
            </video>

            {!playing && (
              <motion.button
                type="button"
                onClick={handlePlay}
                className="absolute inset-0 flex items-center justify-center bg-black/30"
                whileHover={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.span
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-2xl shadow-lg"
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ▶️
                </motion.span>
              </motion.button>
            )}
          </div>
        </div>

        <p className="text-on-bg-muted mt-4 text-center text-sm">
          Gotcha, no surprise but my shoni do a task, you have to make a video in which you need to express your time with your bf, I will put it here! 💌
        </p>

        <div className="mt-8">
          <PillButton onClick={onNext}>Continue</PillButton>
        </div>
      </motion.div>
    </ScreenWrapper>
  );
}
