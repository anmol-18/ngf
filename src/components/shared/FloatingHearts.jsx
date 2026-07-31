const SCALE = 1.17;
const HEARTS = ['💗', '💕', '💖', '💝', '✨', '💫'];

function seededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export default function FloatingHearts({ count = 12 }) {
  const items = Array.from({ length: count }, (_, i) => ({
    id: i,
    emoji: HEARTS[i % HEARTS.length],
    left: `${seededRandom(i * 7) * 100}%`,
    top: `${seededRandom(i * 13) * 100}%`,
    size: (14 + seededRandom(i * 3) * 16) * SCALE,
    duration: 7 + seededRandom(i * 5) * 5,
    delay: seededRandom(i * 11) * 4,
    drift: (seededRandom(i * 17) - 0.5) * 28,
  }));

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {items.map((h) => (
        <span
          key={h.id}
          className="decor-float absolute select-none opacity-[0.2]"
          style={{
            left: h.left,
            top: h.top,
            fontSize: h.size,
            '--drift': `${h.drift}px`,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
}
