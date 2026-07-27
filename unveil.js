/* Soft unconcealment field — not a status meter, just presence on the page. */
(function () {
  const canvas = document.getElementById('unveil');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, t = 0, points = [];

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seed();
  }

  function seed() {
    points = [];
    const n = 48;
    for (let i = 0; i < n; i++) {
      points.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.6 + Math.random() * 1.8,
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 0.8,
      });
    }
  }

  function frame() {
    t += 0.008;
    ctx.clearRect(0, 0, w, h);

    // horizon veil
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, 'rgba(20, 24, 40, 0)');
    g.addColorStop(0.45, 'rgba(30, 40, 70, 0.15)');
    g.addColorStop(1, 'rgba(10, 10, 18, 0.4)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    // slow reveal line (unconcealment edge)
    const edge = (0.35 + 0.12 * Math.sin(t * 0.7)) * h;
    ctx.beginPath();
    ctx.moveTo(0, edge);
    for (let x = 0; x <= w; x += 4) {
      const y = edge + Math.sin(x * 0.02 + t) * 6 + Math.sin(x * 0.05 - t * 0.5) * 3;
      ctx.lineTo(x, y);
    }
    ctx.strokeStyle = 'rgba(140, 170, 255, 0.25)';
    ctx.lineWidth = 1;
    ctx.stroke();

    for (const p of points) {
      const pulse = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * p.speed + p.phase));
      // points below the edge are brighter (disclosed)
      const below = p.y > edge ? 1 : 0.25;
      const a = pulse * below * 0.7;
      ctx.beginPath();
      ctx.arc(p.x, p.y + Math.sin(t * p.speed + p.phase) * 2, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(180, 200, 255, ${a})`;
      ctx.fill();
    }

    requestAnimationFrame(frame);
  }

  window.addEventListener('resize', resize);
  resize();
  frame();
})();
