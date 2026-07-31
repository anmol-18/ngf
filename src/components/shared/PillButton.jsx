import { motion } from 'framer-motion';
import { SPRING_BOUNCE } from '../../constants/motion';

export default function PillButton({
  children,
  onClick,
  className = '',
  glow = false,
  disabled = false,
  type = 'button',
}) {
  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`rounded-full bg-gradient-to-r from-rose to-rose-dark px-8 py-3.5 text-base font-semibold text-white shadow-lg disabled:cursor-not-allowed disabled:opacity-50 ${glow ? 'btn-glow' : ''} ${className}`}
      whileHover={disabled ? undefined : { scale: 1.05 }}
      whileTap={disabled ? undefined : { scale: 0.96 }}
      transition={SPRING_BOUNCE}
    >
      {children}
    </motion.button>
  );
}
