// Smooth motion presets — polished, not rushed
export const PAGE_TRANSITION = {
  duration: 0.45,
  ease: [0.25, 0.1, 0.25, 1],
};

export const PAGE_VARIANTS = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

export const SPRING_SOFT = {
  type: 'spring',
  stiffness: 260,
  damping: 24,
};

export const SPRING_BOUNCE = {
  type: 'spring',
  stiffness: 400,
  damping: 22,
};
