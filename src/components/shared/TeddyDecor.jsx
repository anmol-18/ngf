const SCALE = 1.17;

const TEDDIES = [
  { left: '10%', top: '76%', size: 33, delay: 0 },
  { left: '86%', top: '20%', size: 37, delay: 0.8 },
  { left: '90%', top: '80%', size: 28, delay: 0.4 },
  { left: '4%', top: '28%', size: 31, delay: 1.2 },
  { left: '78%', top: '58%', size: 29, delay: 0.6 },
  { left: '48%', top: '72%', size: 26, delay: 0.2 },
].map((t) => ({ ...t, size: Math.round(t.size * SCALE) }));

export default function TeddyDecor() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {TEDDIES.map((t, i) => (
        <span
          key={i}
          className="decor-sway absolute select-none opacity-[0.2]"
          style={{
            left: t.left,
            top: t.top,
            fontSize: t.size,
            animationDuration: `${4.5 + i * 0.25}s`,
            animationDelay: `${t.delay}s`,
          }}
        >
          🧸
        </span>
      ))}
    </div>
  );
}
