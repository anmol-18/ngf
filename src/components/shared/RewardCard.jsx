import { motion } from 'framer-motion';
import { SPRING_SOFT } from '../../constants/motion';

export default function RewardCard({ emoji, title, desc, className = '' }) {
  return (
    <motion.div
      className={`w-full max-w-sm rounded-3xl border-2 border-soft-gold/60 bg-white p-6 text-center shadow-xl ${className}`}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={SPRING_SOFT}
    >
      <span className="decor-pulse mb-3 block text-5xl">{emoji}</span>
      <h3 className="font-hand text-3xl text-rose-dark">{title}</h3>
      {desc && <p className="mt-2 text-sm text-[#8a6a75]">{desc}</p>}
    </motion.div>
  );
}
