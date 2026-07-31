export default function HeartRain({ count = 18 }) {
  const hearts = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${(i * 37) % 100}%`,
    delay: (i * 0.12) % 2.5,
    duration: 2.2 + (i % 4) * 0.3,
    emoji: ['💗', '💕', '💖', '❤️', '💝'][i % 5],
    size: 16 + (i % 4) * 6,
  }));

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden>
      {hearts.map((h) => (
        <span
          key={h.id}
          className="heart-rain absolute top-0 select-none will-change-transform"
          style={{
            left: h.left,
            fontSize: h.size,
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
