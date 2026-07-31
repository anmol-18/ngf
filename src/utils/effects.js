import confetti from 'canvas-confetti';

export function burstConfetti(options = {}) {
  const defaults = {
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#ffb3c6', '#ffd1dc', '#f5d78e', '#e8d5f2', '#ff6b9d'],
  };
  confetti({ ...defaults, ...options });
}

export function goldenBurst(x = 0.5, y = 0.5) {
  confetti({
    particleCount: 60,
    spread: 100,
    origin: { x, y },
    colors: ['#f5d78e', '#ffd700', '#ffb3c6', '#fff'],
    ticks: 200,
    gravity: 0.8,
    scalar: 1.1,
  });
}

export function fireworks() {
  const duration = 2500;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: ['#ffb3c6', '#f5d78e', '#e8d5f2'],
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: ['#ffb3c6', '#f5d78e', '#e8d5f2'],
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  };
  frame();
}

export function playSfx(src, volume = 0.5) {
  try {
    const audio = new Audio(src);
    audio.volume = volume;
    audio.play().catch(() => {});
    return audio;
  } catch {
    return null;
  }
}
