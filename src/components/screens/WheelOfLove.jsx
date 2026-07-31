import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScreenWrapper from '../shared/ScreenWrapper';
import PillButton from '../shared/PillButton';
import RewardCard from '../shared/RewardCard';
import { WHEEL_SEGMENTS } from '../../constants/config';
import { burstConfetti } from '../../utils/effects';

const SEGMENT_COUNT = WHEEL_SEGMENTS.length;
const SEGMENT_ANGLE = 360 / SEGMENT_COUNT;

function WheelSVG({ rotation, segments }) {
  const size = 280;
  const r = size / 2 - 4;
  const cx = size / 2;
  const cy = size / 2;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="drop-shadow-lg">
      <motion.g
        style={{ originX: `${cx}px`, originY: `${cy}px` }}
        animate={{ rotate: rotation }}
        transition={{ duration: 3.6, ease: [0.15, 0.85, 0.2, 1] }}
      >
        {segments.map((seg, i) => {
          const startAngle = (i * SEGMENT_ANGLE - 90) * (Math.PI / 180);
          const endAngle = ((i + 1) * SEGMENT_ANGLE - 90) * (Math.PI / 180);
          const x1 = cx + r * Math.cos(startAngle);
          const y1 = cy + r * Math.sin(startAngle);
          const x2 = cx + r * Math.cos(endAngle);
          const y2 = cy + r * Math.sin(endAngle);
          const largeArc = SEGMENT_ANGLE > 180 ? 1 : 0;
          const midAngle = ((i + 0.5) * SEGMENT_ANGLE - 90) * (Math.PI / 180);
          const tx = cx + r * 0.62 * Math.cos(midAngle);
          const ty = cy + r * 0.62 * Math.sin(midAngle);

          return (
            <g key={i}>
              <path
                d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`}
                fill={seg.color}
                stroke="#fff"
                strokeWidth="2"
              />
              <text
                x={tx}
                y={ty}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="14"
                fill="#5c3d4a"
                transform={`rotate(${(i + 0.5) * SEGMENT_ANGLE}, ${tx}, ${ty})`}
              >
                {seg.emoji}
              </text>
            </g>
          );
        })}
        <circle cx={cx} cy={cy} r="18" fill="white" stroke="#e8a0bf" strokeWidth="3" />
      </motion.g>
      {/* Pointer */}
      <polygon
        points={`${cx},8 ${cx - 12},28 ${cx + 12},28`}
        fill="#e8a0bf"
        stroke="#fff"
        strokeWidth="2"
      />
    </svg>
  );
}

export default function WheelOfLove({ onNext }) {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState(null);
  const [showReward, setShowReward] = useState(false);
  const spinLock = useRef(false);

  const spin = () => {
    if (spinLock.current || spinning) return;
    spinLock.current = true;
    setSpinning(true);
    setShowReward(false);
    setWinner(null);

    const winIndex = Math.floor(Math.random() * SEGMENT_COUNT);
    const extraSpins = 5 + Math.floor(Math.random() * 3);
    const targetAngle =
      extraSpins * 360 + (360 - winIndex * SEGMENT_ANGLE - SEGMENT_ANGLE / 2);

    setRotation((prev) => prev + targetAngle);

    setTimeout(() => {
      setSpinning(false);
      setWinner(WHEEL_SEGMENTS[winIndex]);
      burstConfetti({ particleCount: 100, spread: 90 });
      setShowReward(true);
      spinLock.current = false;
    }, 3700);
  };

  return (
    <ScreenWrapper className="justify-start pt-4">
      <h2 className="font-hand mb-1 text-center text-3xl text-rose-dark">Wheel of Love</h2>
      <p className="text-on-bg-muted mb-4 text-center text-sm">Give it a spin — every slice is sweet 🎡</p>

      <div className="flex flex-col items-center">
        <WheelSVG rotation={rotation} segments={WHEEL_SEGMENTS} />

        <div className="mt-6">
          <PillButton onClick={spin} disabled={spinning} glow={!spinning}>
            {spinning ? 'Spinning...' : 'Spin'}
          </PillButton>
        </div>
      </div>

      <AnimatePresence>
        {showReward && winner && (
          <motion.div
            className="mt-6 w-full max-w-sm space-y-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <p className="text-center font-hand text-2xl text-rose-dark">
              You won: {winner.emoji} {winner.label}!
            </p>
            <RewardCard
              emoji={winner.emoji}
              title={winner.label}
              desc={`Your ${winner.label.toLowerCase()} prize is officially yours.`}
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
