import { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import ScreenWrapper from '../shared/ScreenWrapper';
import PillButton from '../shared/PillButton';
import { SCRATCH_CARD_TEXTS } from '../../constants/config';
import { burstConfetti } from '../../utils/effects';

const REVEAL_THRESHOLD = 50;
const BRUSH_RADIUS = 30;

export default function ScratchCard({ onNext }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const ctxRef = useRef(null);
  const sizeRef = useRef({ w: 0, h: 0 });
  const isDrawing = useRef(false);
  const revealedRef = useRef(false);
  const lastPos = useRef(null);
  const readyRef = useRef(false);

  const [revealed, setRevealed] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const [ready, setReady] = useState(false);

  const hiddenText = useMemo(
    () => SCRATCH_CARD_TEXTS[Math.floor(Math.random() * SCRATCH_CARD_TEXTS.length)],
    []
  );

  const drawFoil = useCallback((ctx, w, h) => {
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.restore();

    ctx.globalCompositeOperation = 'source-over';
    const gradient = ctx.createLinearGradient(0, 0, w, h);
    gradient.addColorStop(0, '#b0b0b0');
    gradient.addColorStop(0.25, '#e8dce8');
    gradient.addColorStop(0.5, '#ffc8d8');
    gradient.addColorStop(0.75, '#e8dce8');
    gradient.addColorStop(1, '#a8a8a8');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);

    // Hint text on foil
    ctx.fillStyle = 'rgba(80,40,55,0.45)';
    ctx.font = '600 16px Quicksand, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Scratch here ✨', w / 2, h / 2);

    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    for (let i = 0; i < 40; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * w, Math.random() * h, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || revealedRef.current) return;

    const rect = container.getBoundingClientRect();
    if (rect.width < 10 || rect.height < 10) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawFoil(ctx, rect.width, rect.height);

    ctxRef.current = ctx;
    sizeRef.current = { w: rect.width, h: rect.height };
    readyRef.current = true;
    setReady(true);
  }, [drawFoil]);

  useEffect(() => {
    let raf = 0;
    let attempts = 0;

    const tryInit = () => {
      attempts += 1;
      initCanvas();
      if (!readyRef.current && attempts < 20) {
        raf = requestAnimationFrame(tryInit);
      }
    };

    raf = requestAnimationFrame(tryInit);

    const onResize = () => {
      if (!revealedRef.current) {
        readyRef.current = false;
        initCanvas();
      }
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, [initCanvas]);

  const getPos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches?.[0] ?? e.changedTouches?.[0];
    const clientX = touch ? touch.clientX : e.clientX;
    const clientY = touch ? touch.clientY : e.clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const eraseAt = (x, y) => {
    const ctx = ctxRef.current;
    if (!ctx) return;

    const last = lastPos.current;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = '#000';
    ctx.strokeStyle = '#000';

    if (last) {
      ctx.lineWidth = BRUSH_RADIUS * 2;
      ctx.beginPath();
      ctx.moveTo(last.x, last.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.arc(x, y, BRUSH_RADIUS, 0, Math.PI * 2);
    ctx.fill();

    lastPos.current = { x, y };
  };

  const measureScratched = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx || revealedRef.current) return 0;

    try {
      const { width, height } = canvas;
      const imageData = ctx.getImageData(0, 0, width, height);
      const pixels = imageData.data;
      let clear = 0;
      let sampled = 0;

      // Sample every 4th pixel for speed
      for (let i = 3; i < pixels.length; i += 16) {
        sampled += 1;
        if (pixels[i] < 128) clear += 1;
      }

      return sampled ? (clear / sampled) * 100 : 0;
    } catch {
      return 0;
    }
  }, []);

  const tryReveal = useCallback(() => {
    if (revealedRef.current) return;

    const percent = measureScratched();
    setScratchPercent(percent);

    if (percent >= REVEAL_THRESHOLD) {
      revealedRef.current = true;
      setRevealed(true);
      setScratchPercent(100);
      burstConfetti({ particleCount: 80, spread: 70 });

      const ctx = ctxRef.current;
      const { w, h } = sizeRef.current;
      if (ctx) {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillRect(0, 0, w + 4, h + 4);
      }
    }
  }, [measureScratched]);

  const startDraw = (e) => {
    if (revealedRef.current || !readyRef.current) return;
    e.preventDefault();
    isDrawing.current = true;
    lastPos.current = null;
    const { x, y } = getPos(e);
    eraseAt(x, y);
  };

  const moveDraw = (e) => {
    if (!isDrawing.current || revealedRef.current) return;
    e.preventDefault();
    const { x, y } = getPos(e);
    eraseAt(x, y);
  };

  const endDraw = (e) => {
    if (!isDrawing.current) return;
    if (e) e.preventDefault();
    isDrawing.current = false;
    lastPos.current = null;
    tryReveal();
  };

  return (
    <ScreenWrapper className="justify-start pt-4">
      <h2 className="font-hand mb-1 text-center text-3xl text-rose-dark">Scratch & Win</h2>
      <p className="text-on-bg-muted mb-6 text-center text-sm">
        {revealed ? 'Prize revealed!' : 'Scratch the foil to reveal your prize ✨'}
      </p>

      <div
        ref={containerRef}
        className="relative w-full max-w-sm overflow-hidden rounded-3xl border-2 border-soft-gold/50 bg-white shadow-xl"
        style={{ aspectRatio: '4 / 3' }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          <span className="mb-3 text-4xl">🎟️</span>
          <p className="font-hand text-2xl text-rose-dark sm:text-3xl">{hiddenText}</p>
        </div>

        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-10 touch-none cursor-crosshair"
          style={{
            opacity: revealed ? 0 : 1,
            pointerEvents: revealed ? 'none' : 'auto',
            transition: 'opacity 0.55s ease',
          }}
          onMouseDown={startDraw}
          onMouseMove={moveDraw}
          onMouseUp={endDraw}
          onMouseLeave={endDraw}
          onTouchStart={startDraw}
          onTouchMove={moveDraw}
          onTouchEnd={endDraw}
          onTouchCancel={endDraw}
        />
      </div>

      {!ready && !revealed && (
        <p className="text-on-bg-muted mt-3 text-center text-xs">Loading scratch card…</p>
      )}

      {!revealed && scratchPercent > 0 && (
        <p className="text-on-bg-muted mt-3 text-center text-xs">
          Scratched: {Math.min(Math.round(scratchPercent), 100)}% — need {REVEAL_THRESHOLD}%
        </p>
      )}

      {revealed && (
        <motion.div
          className="mt-8 flex justify-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <PillButton onClick={onNext}>Continue</PillButton>
        </motion.div>
      )}
    </ScreenWrapper>
  );
}
