import { motion } from 'framer-motion';
import { PAGE_VARIANTS, PAGE_TRANSITION } from '../../constants/motion';

export default function ScreenWrapper({ children, className = '' }) {
  return (
    <motion.div
      className={`absolute inset-0 z-10 flex flex-col items-center justify-center overflow-y-auto overflow-x-hidden px-5 py-8 ${className}`}
      variants={PAGE_VARIANTS}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={PAGE_TRANSITION}
    >
      {children}
    </motion.div>
  );
}
