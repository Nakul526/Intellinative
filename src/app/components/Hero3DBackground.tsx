import { useEffect, useRef } from 'react';

export default function Hero3DBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Node network data
    const nodes: Array<{ x: number; y: number; vx: number; vy: number; color: string; cluster: number }> = [];
    const clusters = [
      { x: canvas.width * 0.3, y: canvas.height * 0.5, color: '#00D4FF', count: 30 },
      { x: canvas.width * 0.5, y: canvas.height * 0.5, color: '#7B2FFF', count: 35 },
      { x: canvas.width * 0.7, y: canvas.height * 0.5, color: '#00FF88', count: 30 },
    ];

    // Create nodes
    clusters.forEach((cluster, clusterIndex) => {
      for (let i = 0; i < cluster.count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 200;
        nodes.push({
          x: cluster.x + Math.cos(angle) * distance,
          y: cluster.y + Math.sin(angle) * distance,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          color: cluster.color,
          cluster: clusterIndex
        });
      }
    });

    let animationId: number;
    let time = 0;

    const animate = () => {
      ctx.fillStyle = 'rgba(5, 8, 16, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.001;

      // Update and draw nodes
      nodes.forEach((node, i) => {
        // Slow drift
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.globalAlpha = 0.6;
        ctx.fill();

        // Draw connections to nearby nodes
        nodes.slice(i + 1).forEach((otherNode) => {
          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.strokeStyle = node.color;
            ctx.globalAlpha = (1 - distance / 150) * 0.2;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-30"
        style={{ background: '#050810' }}
      />
    </div>
  );
}
