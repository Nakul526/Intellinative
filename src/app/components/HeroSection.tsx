import { useRef, useEffect } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';

// ─── Interfaces ───────────────────────────────────────────────────────────────

interface Node {
  x: number; y: number; baseX: number; baseY: number;
  radius: number; baseRadius: number; color: string; glowColor: string;
  pulsePhase: number; pulseSpeed: number; vx: number; vy: number; connections: number[];
}

interface Packet {
  fromNode: number; toNode: number; progress: number; speed: number; color: string;
}

interface DashboardRect {
  x: number; y: number; width: number; height: number;
  color: string; opacity: number; phase: number;
}

// ─── Neural Canvas ────────────────────────────────────────────────────────────

function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const CYAN = '#00D4FF';
    const VIOLET = '#7B2FFF';
    const EMERALD = '#00FF88';
    const COLORS = [CYAN, VIOLET, EMERALD];
    const GLOW_COLORS = ['rgba(0,212,255,', 'rgba(123,47,255,', 'rgba(0,255,136,'];

    let width = 0, height = 0;
    let nodes: Node[] = [];
    let packets: Packet[] = [];
    let dashboards: DashboardRect[] = [];

    function resize() {
      const rect = canvas.parentElement!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width;
      canvas.height = height;
      init();
    }

    function init() {
      nodes = []; packets = [];
      for (let i = 0; i < 55; i++) {
        const ci = Math.floor(Math.random() * 3);
        const bx = Math.random() * width;
        const by = Math.random() * height;
        nodes.push({
          x: bx, y: by, baseX: bx, baseY: by,
          radius: 1.5 + Math.random() * 4,
          baseRadius: 1.5 + Math.random() * 4,
          color: COLORS[ci], glowColor: GLOW_COLORS[ci],
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.018 + Math.random() * 0.028,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12,
          connections: [],
        });
      }
      for (let i = 0; i < nodes.length; i++) {
        const distances: { idx: number; d: number }[] = [];
        for (let j = 0; j < nodes.length; j++) {
          if (i === j) continue;
          const dx = nodes[i].baseX - nodes[j].baseX;
          const dy = nodes[i].baseY - nodes[j].baseY;
          distances.push({ idx: j, d: Math.sqrt(dx * dx + dy * dy) });
        }
        distances.sort((a, b) => a.d - b.d);
        nodes[i].connections = distances.slice(0, 2 + Math.floor(Math.random() * 3)).map(d => d.idx);
      }
      for (let p = 0; p < 18; p++) spawnPacket();
      dashboards = [
        { x: width * 0.05, y: height * 0.08, width: 160, height: 80, color: CYAN, opacity: 0.14, phase: 0 },
        { x: width * 0.55, y: height * 0.12, width: 130, height: 65, color: VIOLET, opacity: 0.12, phase: 1.2 },
        { x: width * 0.08, y: height * 0.74, width: 150, height: 72, color: EMERALD, opacity: 0.12, phase: 2.4 },
        { x: width * 0.6, y: height * 0.70, width: 120, height: 55, color: CYAN, opacity: 0.10, phase: 0.8 },
        { x: width * 0.28, y: height * 0.04, width: 95, height: 48, color: VIOLET, opacity: 0.10, phase: 1.8 },
      ];
    }

    function spawnPacket() {
      const fromIdx = Math.floor(Math.random() * nodes.length);
      const node = nodes[fromIdx];
      if (!node.connections.length) return;
      const toIdx = node.connections[Math.floor(Math.random() * node.connections.length)];
      packets.push({ fromNode: fromIdx, toNode: toIdx, progress: 0, speed: 0.004 + Math.random() * 0.008, color: node.color });
    }

    let t = 0;

    function drawSphere(mx: number, my: number) {
      const cx = width * 0.5 + mx * 0.15;
      const cy = height * 0.5 + my * 0.12;
      const R = Math.min(width, height) * 0.38;

      // Central glow
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.65);
      grd.addColorStop(0, 'rgba(0,212,255,0.07)');
      grd.addColorStop(0.45, 'rgba(123,47,255,0.04)');
      grd.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.beginPath(); ctx.arc(cx, cy, R * 0.65, 0, Math.PI * 2);
      ctx.fillStyle = grd; ctx.fill();

      // Latitude lines
      for (let i = -4; i <= 4; i++) {
        const lat = i / 4;
        const latR = R * Math.sqrt(Math.max(0, 1 - lat * lat));
        const latY = cy + R * lat;
        const alpha = 0.035 + 0.015 * (1 - Math.abs(lat));
        ctx.beginPath();
        ctx.ellipse(cx, latY, latR, latR * 0.22, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,212,255,${alpha})`;
        ctx.lineWidth = 0.5; ctx.stroke();
      }

      // Longitude lines (slowly rotating)
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI + t * 0.06;
        ctx.save();
        ctx.translate(cx, cy); ctx.rotate(angle);
        ctx.beginPath();
        ctx.ellipse(0, 0, R * 0.2, R, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(123,47,255,0.04)';
        ctx.lineWidth = 0.5; ctx.stroke();
        ctx.restore();
      }

      // Sphere outline
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0,212,255,0.05)';
      ctx.lineWidth = 1; ctx.stroke();

      // Orbit ring 1 — equatorial, cyan
      const ang1 = t * 0.22;
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(ang1); ctx.scale(1, 0.22);
      ctx.beginPath(); ctx.arc(0, 0, R * 1.12, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0,212,255,0.22)'; ctx.lineWidth = 1.2; ctx.stroke();
      ctx.restore();
      // dot on orbit 1
      const d1x = cx + Math.cos(ang1) * R * 1.12;
      const d1y = cy + Math.sin(ang1) * R * 1.12 * 0.22;
      ctx.shadowColor = '#00D4FF'; ctx.shadowBlur = 12;
      ctx.beginPath(); ctx.arc(d1x, d1y, 2.8, 0, Math.PI * 2);
      ctx.fillStyle = '#00D4FF'; ctx.fill(); ctx.shadowBlur = 0;

      // Orbit ring 2 — inclined, violet
      const ang2 = -t * 0.16 + Math.PI * 0.4;
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(Math.PI * 0.3); ctx.scale(0.75, 0.25);
      ctx.beginPath(); ctx.arc(0, 0, R * 1.28, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(123,47,255,0.16)'; ctx.lineWidth = 1; ctx.stroke();
      ctx.restore();
      // dot on orbit 2
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(Math.PI * 0.3);
      const d2x = Math.cos(ang2) * R * 1.28 * 0.75;
      const d2y = Math.sin(ang2) * R * 1.28 * 0.25;
      ctx.shadowColor = '#7B2FFF'; ctx.shadowBlur = 10;
      ctx.beginPath(); ctx.arc(d2x, d2y, 2.2, 0, Math.PI * 2);
      ctx.fillStyle = '#7B2FFF'; ctx.fill(); ctx.shadowBlur = 0;
      ctx.restore();

      // Orbit ring 3 — emerald, different angle
      const ang3 = t * 0.32 + Math.PI * 0.7;
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(-Math.PI * 0.22); ctx.scale(0.55, 0.28);
      ctx.beginPath(); ctx.arc(0, 0, R * 0.88, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0,255,136,0.13)'; ctx.lineWidth = 1; ctx.stroke();
      ctx.restore();
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(-Math.PI * 0.22);
      const d3x = Math.cos(ang3) * R * 0.88 * 0.55;
      const d3y = Math.sin(ang3) * R * 0.88 * 0.28;
      ctx.shadowColor = '#00FF88'; ctx.shadowBlur = 8;
      ctx.beginPath(); ctx.arc(d3x, d3y, 2, 0, Math.PI * 2);
      ctx.fillStyle = '#00FF88'; ctx.fill(); ctx.shadowBlur = 0;
      ctx.restore();
    }

    function drawGlow(x: number, y: number, r: number, glowColor: string, solidColor: string) {
      const grad = ctx.createRadialGradient(x, y, 0, x, y, r * 4);
      grad.addColorStop(0, glowColor + '0.6)');
      grad.addColorStop(0.4, glowColor + '0.15)');
      grad.addColorStop(1, glowColor + '0)');
      ctx.beginPath(); ctx.arc(x, y, r * 4, 0, Math.PI * 2);
      ctx.fillStyle = grad; ctx.fill();
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = solidColor; ctx.fill();
    }

    function tick() {
      t += 0.016;
      ctx.clearRect(0, 0, width, height);

      const mx = (mouseRef.current.x / window.innerWidth - 0.5) * 18;
      const my = (mouseRef.current.y / window.innerHeight - 0.5) * 12;

      drawSphere(mx, my);

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.baseX += n.vx; n.baseY += n.vy;
        if (n.baseX < -20) n.baseX = width + 20;
        if (n.baseX > width + 20) n.baseX = -20;
        if (n.baseY < -20) n.baseY = height + 20;
        if (n.baseY > height + 20) n.baseY = -20;
        n.x = n.baseX + mx * (n.baseRadius / 7);
        n.y = n.baseY + my * (n.baseRadius / 7);
        n.pulsePhase += n.pulseSpeed;
        n.radius = n.baseRadius + Math.sin(n.pulsePhase) * n.baseRadius * 0.4;
      }

      const drawn = new Set<string>();
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        for (const j of n.connections) {
          const key = i < j ? `${i}-${j}` : `${j}-${i}`;
          if (drawn.has(key)) continue;
          drawn.add(key);
          const m = nodes[j];
          const dx = n.x - m.x, dy = n.y - m.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const alpha = Math.max(0, 0.22 - dist / 1200);
          if (alpha <= 0) continue;
          ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(m.x, m.y);
          ctx.strokeStyle = `rgba(${n.color === CYAN ? '0,212,255' : n.color === VIOLET ? '123,47,255' : '0,255,136'},${alpha})`;
          ctx.lineWidth = 0.6; ctx.stroke();
        }
      }

      for (const db of dashboards) {
        const pulse = 0.5 + 0.5 * Math.sin(t * 0.8 + db.phase);
        const op = db.opacity * (0.7 + 0.3 * pulse);
        const rx = db.x + mx * 0.3, ry = db.y + my * 0.3;
        ctx.save(); ctx.globalAlpha = op;
        ctx.shadowColor = db.color; ctx.shadowBlur = 10 * pulse;
        ctx.strokeStyle = db.color; ctx.lineWidth = 1;
        ctx.strokeRect(rx, ry, db.width, db.height);
        ctx.globalAlpha = op * 0.35; ctx.lineWidth = 0.5;
        const lineY = ry + 10 + ((t * 28) % (db.height - 10));
        ctx.beginPath(); ctx.moveTo(rx + 4, lineY); ctx.lineTo(rx + db.width - 4, lineY); ctx.stroke();
        ctx.globalAlpha = op * 0.8; ctx.lineWidth = 1.5;
        const cs = 7;
        ctx.beginPath(); ctx.moveTo(rx, ry + cs); ctx.lineTo(rx, ry); ctx.lineTo(rx + cs, ry); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(rx + db.width - cs, ry); ctx.lineTo(rx + db.width, ry); ctx.lineTo(rx + db.width, ry + cs); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(rx, ry + db.height - cs); ctx.lineTo(rx, ry + db.height); ctx.lineTo(rx + cs, ry + db.height); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(rx + db.width - cs, ry + db.height); ctx.lineTo(rx + db.width, ry + db.height); ctx.lineTo(rx + db.width, ry + db.height - cs); ctx.stroke();
        ctx.restore(); ctx.shadowBlur = 0;
      }

      for (const n of nodes) {
        ctx.shadowColor = n.color; ctx.shadowBlur = n.radius * 3;
        drawGlow(n.x, n.y, n.radius, n.glowColor, n.color);
        ctx.shadowBlur = 0;
      }

      const dead: number[] = [];
      for (let p = 0; p < packets.length; p++) {
        const pk = packets[p];
        pk.progress += pk.speed;
        if (pk.progress >= 1) { dead.push(p); spawnPacket(); continue; }
        const from = nodes[pk.fromNode], to = nodes[pk.toNode];
        const px = from.x + (to.x - from.x) * pk.progress;
        const py = from.y + (to.y - from.y) * pk.progress;
        ctx.shadowColor = pk.color; ctx.shadowBlur = 6;
        ctx.beginPath(); ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = pk.color; ctx.fill(); ctx.shadowBlur = 0;
        const trail = Math.max(0, pk.progress - 0.05);
        const tx2 = from.x + (to.x - from.x) * trail;
        const ty2 = from.y + (to.y - from.y) * trail;
        const trailGrad = ctx.createLinearGradient(tx2, ty2, px, py);
        const rgb = pk.color === CYAN ? '0,212,255' : pk.color === VIOLET ? '123,47,255' : '0,255,136';
        trailGrad.addColorStop(0, `rgba(${rgb},0)`);
        trailGrad.addColorStop(1, `rgba(${rgb},0.5)`);
        ctx.beginPath(); ctx.moveTo(tx2, ty2); ctx.lineTo(px, py);
        ctx.strokeStyle = trailGrad; ctx.lineWidth = 1.5; ctx.stroke();
      }
      for (let d = dead.length - 1; d >= 0; d--) packets.splice(dead[d], 1);
      rafRef.current = requestAnimationFrame(tick);
    }

    resize();
    rafRef.current = requestAnimationFrame(tick);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);
    const onMouse = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', onMouse);
    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect(); window.removeEventListener('mousemove', onMouse); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ display: 'block' }} />;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const TRUST_BADGES = ['AI Driven', 'Cloud Native', 'Secure by Design', 'Enterprise Ready'];
const BADGE_COLORS: Record<string, string> = {
  'AI Driven': '#00FF88', 'Cloud Native': '#00D4FF',
  'Secure by Design': '#7B2FFF', 'Enterprise Ready': '#00D4FF',
};

const LIVE_METRICS = [
  { dot: '#00D4FF', label: 'Enterprises', value: '50+' },
  { dot: '#00FF88', label: 'Uptime', value: '99.9%' },
  { dot: '#7B2FFF', label: 'Faster Deploy', value: '3×' },
];

const PARTNERS = [
  { name: 'CNCF', color: '#00D4FF' },
  { name: 'AWS Partner', color: '#FF9D00' },
  { name: 'Google Cloud', color: '#00FF88' },
  { name: 'HashiCorp', color: '#7B2FFF' },
];

const TECH_TICKER = [
  'Kubernetes', 'Istio', 'Cilium', 'eBPF', 'Prometheus', 'OpenTelemetry',
  'Terraform', 'ArgoCD', 'HashiCorp Vault', 'Falco', 'OPA', 'Crossplane',
  'Grafana', 'Loki', 'Jaeger', 'Helm', 'Kyverno', 'FluxCD', 'Argo Rollouts',
];

const HERO_STATS = [
  { value: '500+', label: 'Projects Delivered' },
  { value: '50+', label: 'Enterprise Clients' },
  { value: '99.99%', label: 'Uptime SLA' },
  { value: '<2min', label: 'Mean Incident Response' },
];

// ─── Floating Card ────────────────────────────────────────────────────────────

interface FloatingCardProps {
  top?: string; bottom?: string; left?: string; right?: string;
  glow: string; glowRgb: string; delay: number;
  icon: React.ReactNode; title: string; subtitle: string;
  alert?: boolean; sparkData?: number[];
}

function FloatingCard({ top, bottom, left, right, glow, glowRgb, delay, icon, title, subtitle, alert, sparkData }: FloatingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        position: 'absolute', top, bottom, left, right, zIndex: 20,
        background: 'var(--glass-bg, rgba(5,8,16,0.75))',
        border: `1px solid ${glow}4D`, borderRadius: '14px',
        backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        padding: '12px 16px', minWidth: '190px',
        boxShadow: `0 0 28px ${glow}20, 0 2px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)`,
        animation: 'heroFloat 4s ease-in-out infinite',
        animationDelay: `${delay * 0.6}s`,
      }}
    >
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '26px', height: '26px', borderRadius: '8px', background: `${glow}18`, flexShrink: 0 }}>
          <span style={{ color: glow, display: 'flex', alignItems: 'center' }}>{icon}</span>
        </div>
        {alert && (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', marginLeft: 'auto', fontSize: '0.6rem', color: glow, fontFamily: 'var(--font-body, Inter)', letterSpacing: '0.06em' }}>
            <span style={{ display: 'inline-block', width: '5px', height: '5px', borderRadius: '50%', background: glow, boxShadow: `0 0 6px 2px ${glow}`, animation: 'pulse 1.4s ease-in-out infinite' }} />
            LIVE
          </span>
        )}
      </div>
      <div style={{ color: 'var(--text-primary)', fontSize: '0.82rem', fontWeight: 700, fontFamily: 'var(--font-display, Space Grotesk)', lineHeight: 1.2, marginBottom: '2px' }}>
        {title}
      </div>
      <div style={{ color: `rgba(${glowRgb},0.72)`, fontSize: '0.68rem', fontFamily: 'var(--font-body, Inter)', marginBottom: sparkData ? '8px' : 0 }}>
        {subtitle}
      </div>
      {/* Sparkline bars */}
      {sparkData && (
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: '22px' }}>
          {sparkData.map((v, i) => (
            <div key={i} style={{
              flex: 1, height: `${v}%`, borderRadius: '2px',
              background: `rgba(${glowRgb},${0.25 + (i / sparkData.length) * 0.55})`,
              transition: 'height 0.3s ease',
            }} />
          ))}
        </div>
      )}
    </motion.div>
  );
}

// ─── Motion variants ──────────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function HeroSection() {
  return (
    <>
      <style>{`
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes blobDrift1 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          30% { transform: translate(50px, -35px) scale(1.07); }
          70% { transform: translate(-25px, 22px) scale(0.95); }
        }
        @keyframes blobDrift2 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          40% { transform: translate(-40px, 50px) scale(1.1); }
          75% { transform: translate(30px, -18px) scale(0.93); }
        }
        @keyframes blobDrift3 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(35px, -28px) scale(1.08); }
        }
        @keyframes tickerMove {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes borderPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>

      <section className="relative min-h-screen flex flex-col overflow-hidden" style={{ background: 'var(--bg-primary, #050810)' }}>

        {/* ── Ambient blobs ── */}
        <div style={{
          position: 'absolute', top: '-15%', right: '8%', width: '680px', height: '680px',
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,212,255,0.09) 0%, transparent 65%)',
          animation: 'blobDrift1 10s ease-in-out infinite', pointerEvents: 'none', zIndex: 0,
        }} />
        <div style={{
          position: 'absolute', top: '15%', left: '-6%', width: '580px', height: '580px',
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(123,47,255,0.11) 0%, transparent 65%)',
          animation: 'blobDrift2 13s ease-in-out infinite', pointerEvents: 'none', zIndex: 0,
        }} />
        <div style={{
          position: 'absolute', bottom: '5%', right: '22%', width: '460px', height: '460px',
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,255,136,0.06) 0%, transparent 65%)',
          animation: 'blobDrift3 16s ease-in-out infinite', pointerEvents: 'none', zIndex: 0,
        }} />

        {/* Hex grid */}
        <div className="absolute inset-0 z-0 pointer-events-none" style={{
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='69' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='30,1 59,16.5 59,52.5 30,68 1,52.5 1,16.5' fill='none' stroke='%2300D4FF' stroke-width='0.6'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 69px',
        }} />

        {/* Center-left bloom */}
        <div className="absolute inset-0 z-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 65% 65% at 26% 50%, rgba(123,47,255,0.09) 0%, rgba(0,212,255,0.04) 42%, transparent 70%)',
        }} />

        {/* ── Main hero content (grows to fill, leaves room for stats + ticker) ── */}
        <div className="relative z-10 flex flex-1 min-h-0" style={{ minHeight: 'calc(100vh - 120px)' }}>

          {/* LEFT */}
          <div className="relative flex items-center w-1/2 pl-16 pr-10 py-24">
            <motion.div variants={containerVariants} initial="hidden" animate="show" className="max-w-[580px]">

              {/* Badge */}
              <motion.div variants={itemVariants} className="mb-7">
                <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-sm tracking-wide" style={{
                  background: 'rgba(0,255,136,0.07)',
                  border: '1px solid rgba(0,255,136,0.25)',
                  color: '#8A9BB5',
                  fontFamily: 'var(--font-body, Inter)',
                  animation: 'borderPulse 3s ease-in-out infinite',
                }}>
                  <span className="inline-block w-2 h-2 rounded-full" style={{ background: '#00FF88', boxShadow: '0 0 10px 3px rgba(0,255,136,0.6)', animation: 'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite' }} />
                  AI-Native Platform Engineering
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1 variants={itemVariants} className="mb-7 leading-[1.0]" style={{ fontFamily: 'var(--font-display, Space Grotesk)' }}>
                <span className="block" style={{ fontSize: 'clamp(62px, 6.8vw, 108px)', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                  Engineering
                </span>
                <span className="block" style={{
                  fontSize: 'clamp(62px, 6.8vw, 108px)', fontWeight: 700, letterSpacing: '-0.02em',
                  background: 'linear-gradient(130deg, #7B2FFF 0%, #00D4FF 55%, #00FF88 100%)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  animation: 'shimmer 6s linear infinite',
                }}>
                  Intelligence.
                </span>
                <span className="block" style={{ fontSize: 'clamp(42px, 4.6vw, 76px)', fontWeight: 500, letterSpacing: '-0.01em', color: 'var(--text-secondary)' }}>
                  Built Native.
                </span>
              </motion.h1>

              {/* Subtext */}
              <motion.p variants={itemVariants} className="mb-8 leading-relaxed" style={{ color: '#8A9BB5', fontSize: '1.05rem', fontFamily: 'var(--font-body, Inter)', maxWidth: '460px' }}>
                Cloud-native platforms, AI-driven operations, and enterprise engineering designed for modern digital infrastructure.
              </motion.p>

              {/* Partner chips */}
              <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2 mb-8">
                <span style={{ color: '#4A5568', fontSize: '0.72rem', fontFamily: 'var(--font-body, Inter)', letterSpacing: '0.05em', textTransform: 'uppercase', marginRight: '4px' }}>
                  Trusted partner of
                </span>
                {PARTNERS.map((p) => (
                  <span key={p.name} style={{
                    display: 'inline-flex', alignItems: 'center', gap: '5px',
                    padding: '3px 10px', borderRadius: '100px',
                    background: `${p.color}0E`, border: `1px solid ${p.color}28`,
                    color: p.color, fontSize: '0.7rem', fontWeight: 600,
                    fontFamily: 'var(--font-body, Inter)', letterSpacing: '0.02em',
                  }}>
                    <span style={{ display: 'inline-block', width: '4px', height: '4px', borderRadius: '50%', background: p.color, flexShrink: 0 }} />
                    {p.name}
                  </span>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 mb-8">
                <Link to="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold transition-transform hover:scale-[1.04] active:scale-[0.98]"
                  style={{
                    background: 'linear-gradient(135deg, #00FF88 0%, #00D4FF 100%)', color: '#050810',
                    fontFamily: 'var(--font-body, Inter)', fontSize: '0.95rem',
                    boxShadow: '0 0 36px rgba(0,255,136,0.28), 0 4px 28px rgba(0,212,255,0.18)',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 56px rgba(0,255,136,0.45), 0 4px 36px rgba(0,212,255,0.3)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 36px rgba(0,255,136,0.28), 0 4px 28px rgba(0,212,255,0.18)'; }}
                >
                  Start Building
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 7h12M8 2l5 5-5 5" stroke="#050810" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <Link to="/services"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium transition-all hover:scale-[1.03] active:scale-[0.98]"
                  style={{ color: '#8A9BB5', fontFamily: 'var(--font-body, Inter)', fontSize: '0.95rem', background: 'rgba(128,128,128,0.05)', border: '1px solid rgba(128,128,128,0.15)', backdropFilter: 'blur(8px)' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'; (e.currentTarget as HTMLElement).style.border = '1px solid rgba(128,128,128,0.3)'; (e.currentTarget as HTMLElement).style.background = 'rgba(128,128,128,0.1)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#8A9BB5'; (e.currentTarget as HTMLElement).style.border = '1px solid rgba(128,128,128,0.15)'; (e.currentTarget as HTMLElement).style.background = 'rgba(128,128,128,0.05)'; }}
                >
                  Explore Platform
                </Link>
              </motion.div>

              {/* Trust micro-badges */}
              <motion.div variants={itemVariants} className="flex flex-wrap gap-2.5 mb-7">
                {TRUST_BADGES.map((badge) => {
                  const color = BADGE_COLORS[badge];
                  const rgb = color === '#00FF88' ? '0,255,136' : color === '#00D4FF' ? '0,212,255' : '123,47,255';
                  return (
                    <span key={badge} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs" style={{ background: `rgba(${rgb},0.07)`, border: `1px solid rgba(${rgb},0.18)`, color: '#8A9BB5', fontFamily: 'var(--font-body, Inter)' }}>
                      <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                      {badge}
                    </span>
                  );
                })}
              </motion.div>

              {/* Live metrics */}
              <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
                {LIVE_METRICS.map((metric) => {
                  const rgb = metric.dot === '#00D4FF' ? '0,212,255' : metric.dot === '#00FF88' ? '0,255,136' : '123,47,255';
                  return (
                    <span key={metric.label} className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: 'rgba(128,128,128,0.06)', border: '1px solid rgba(128,128,128,0.12)', fontFamily: 'var(--font-body, Inter)' }}>
                      <span style={{ display: 'inline-block', width: '7px', height: '7px', borderRadius: '50%', background: metric.dot, boxShadow: `0 0 6px 2px rgba(${rgb},0.55)`, animation: 'pulse 2s ease-in-out infinite', flexShrink: 0 }} />
                      <span style={{ color: '#8A9BB5', fontSize: '0.75rem' }}>{metric.label}</span>
                      <span style={{ color: 'var(--text-primary)', fontSize: '0.78rem', fontWeight: 700 }}>{metric.value}</span>
                    </span>
                  );
                })}
              </motion.div>
            </motion.div>

            {/* Scroll hint */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 0.8 }}
              style={{ position: 'absolute', bottom: '36px', left: '64px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}
            >
              <span style={{ color: '#8A9BB5', fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'var(--font-body, Inter)', opacity: 0.5 }}>Scroll to explore</span>
              <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }} style={{ opacity: 0.45, color: '#8A9BB5' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
            </motion.div>
          </div>

          {/* RIGHT — Canvas + Floating Cards */}
          <div className="relative w-1/2 overflow-hidden">
            {/* seam vignette */}
            <div className="absolute inset-y-0 left-0 w-28 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, var(--bg-primary, #050810), transparent)' }} />

            <NeuralCanvas />

            <FloatingCard
              top="16%" right="6%" glow="#00D4FF" glowRgb="0,212,255" delay={0.9}
              title="99.9% Uptime" subtitle="Platform SLA — 30 day avg"
              sparkData={[60, 75, 55, 85, 90, 80, 95, 88, 92, 96]}
              icon={<svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1.5a5 5 0 100 10 5 5 0 000-10zM6.5 3.5v3.2l1.8 1.3" stroke="#00D4FF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>}
            />

            <FloatingCard
              top="46%" right="4%" glow="#00FF88" glowRgb="0,255,136" delay={1.15}
              title="AI Anomaly Detected" subtitle="Auto-remediated in 2.3s" alert={true}
              sparkData={[30, 45, 38, 80, 20, 15, 10, 8, 5, 4]}
              icon={<svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1L1 11.5h11L6.5 1z" stroke="#00FF88" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /><path d="M6.5 5v2.5M6.5 9v.5" stroke="#00FF88" strokeWidth="1.4" strokeLinecap="round" /></svg>}
            />

            <FloatingCard
              bottom="20%" left="5%" glow="#7B2FFF" glowRgb="123,47,255" delay={1.4}
              title="47 Deployments Today" subtitle="+12% vs yesterday"
              sparkData={[40, 55, 48, 62, 70, 65, 78, 72, 85, 90]}
              icon={<svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M1.5 9.5l3-3 2 2 5-5" stroke="#7B2FFF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /><path d="M8.5 3.5h3v3" stroke="#7B2FFF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>}
            />
          </div>
        </div>

        {/* ── Stats ribbon ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0 }}
          className="relative z-10"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.18)', backdropFilter: 'blur(12px)' }}
        >
          <div className="max-w-[1200px] mx-auto px-16 py-5 flex items-center justify-between flex-wrap gap-4">
            {HERO_STATS.map((stat, i) => (
              <div key={i} className="flex items-center gap-3">
                {i > 0 && <div style={{ width: '1px', height: '28px', background: 'rgba(255,255,255,0.07)', marginRight: '12px' }} />}
                <div>
                  <div style={{
                    fontSize: '1.35rem', fontWeight: 800, lineHeight: 1,
                    fontFamily: 'var(--font-display, Space Grotesk)',
                    background: i % 2 === 0
                      ? 'linear-gradient(135deg, #00D4FF 0%, #00FF88 100%)'
                      : 'linear-gradient(135deg, #7B2FFF 0%, #00D4FF 100%)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#4A5568', fontFamily: 'var(--font-body, Inter)', marginTop: '2px', letterSpacing: '0.02em' }}>
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Tech ticker ── */}
        <div className="relative z-10 overflow-hidden" style={{
          borderTop: '1px solid rgba(255,255,255,0.04)',
          background: 'rgba(0,0,0,0.25)',
          height: '38px', display: 'flex', alignItems: 'center',
        }}>
          {/* Fade edges */}
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '80px', background: 'linear-gradient(to right, var(--bg-primary, #050810), transparent)', zIndex: 2, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px', background: 'linear-gradient(to left, var(--bg-primary, #050810), transparent)', zIndex: 2, pointerEvents: 'none' }} />
          <div style={{ display: 'flex', animation: 'tickerMove 36s linear infinite', whiteSpace: 'nowrap', willChange: 'transform' }}>
            {[...TECH_TICKER, ...TECH_TICKER].map((tech, i) => (
              <span key={i} style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '0 20px', color: '#4A5568',
                fontSize: '0.72rem', fontFamily: 'var(--font-body, Inter)',
                letterSpacing: '0.06em', textTransform: 'uppercase',
              }}>
                <span style={{ display: 'inline-block', width: '3px', height: '3px', borderRadius: '50%', background: i % 3 === 0 ? '#00D4FF' : i % 3 === 1 ? '#7B2FFF' : '#00FF88', opacity: 0.6 }} />
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
