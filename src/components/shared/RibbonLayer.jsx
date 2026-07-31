const SCALE = 1.17;

const RIBBONS = [
  { color: '#e8a0bf', left: '6%', top: '10%', rotate: -25, w: 70 },
  { color: '#f5d78e', left: '82%', top: '6%', rotate: 35, w: 58 },
  { color: '#e8d5f2', left: '72%', top: '68%', rotate: -15, w: 64 },
  { color: '#ffc8dd', left: '3%', top: '62%', rotate: 20, w: 52 },
  { color: '#ffd1dc', left: '42%', top: '88%', rotate: -40, w: 47 },
  { color: '#d4789f', left: '55%', top: '5%', rotate: 15, w: 55 },
  { color: '#f5d78e', left: '18%', top: '38%', rotate: -30, w: 48 },
  { color: '#e8a0bf', left: '90%', top: '48%', rotate: 42, w: 60 },
].map((r) => ({ ...r, w: Math.round(r.w * SCALE) }));

export default function RibbonLayer() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {RIBBONS.map((r, i) => (
        <div
          key={i}
          className="decor-ribbon absolute opacity-[0.18] will-change-transform"
          style={{
            left: r.left,
            top: r.top,
            width: r.w,
            height: r.w * 0.35,
            rotate: `${r.rotate}deg`,
            animationDuration: `${4 + i * 0.4}s`,
            animationDelay: `${i * 0.3}s`,
          }}
        >
          <div
            className="h-full w-full rounded-full"
            style={{ background: `linear-gradient(90deg, transparent, ${r.color}, transparent)` }}
          />
          <div
            className="absolute -right-1 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rotate-45 rounded-sm"
            style={{ backgroundColor: r.color }}
          />
        </div>
      ))}
    </div>
  );
}
