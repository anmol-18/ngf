const SCALE = 1.17;

const FLORA = [
  { emoji: '🌻', left: '8%', top: '45%', size: 38, delay: 0, duration: 5.5 },
  { emoji: '🌻', left: '92%', top: '35%', size: 42, delay: 0.8, duration: 6 },
  { emoji: '🌻', left: '70%', top: '88%', size: 34, delay: 0.4, duration: 5.2 },
  { emoji: '🌹', left: '15%', top: '15%', size: 36, delay: 0.2, duration: 4.8 },
  { emoji: '🌹', left: '85%', top: '68%', size: 32, delay: 1.2, duration: 5.4 },
  { emoji: '🌹', left: '38%', top: '8%', size: 30, delay: 0.6, duration: 4.6 },
  { emoji: '🌹', left: '58%', top: '52%', size: 28, delay: 1.4, duration: 5.1 },
  { emoji: '🌻', left: '25%', top: '58%', size: 36, delay: 1, duration: 5.8 },
].map((f) => ({ ...f, size: Math.round(f.size * SCALE) }));

export default function FloraDecor() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {FLORA.map((f, i) => (
        <span
          key={i}
          className="decor-sway absolute select-none opacity-[0.2]"
          style={{
            left: f.left,
            top: f.top,
            fontSize: f.size,
            animationDuration: `${f.duration}s`,
            animationDelay: `${f.delay}s`,
          }}
        >
          {f.emoji}
        </span>
      ))}
    </div>
  );
}
