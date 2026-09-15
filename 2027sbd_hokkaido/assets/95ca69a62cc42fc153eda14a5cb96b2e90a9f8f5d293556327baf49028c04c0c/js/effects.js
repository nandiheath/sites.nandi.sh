export function initEffects(hero, canvas, toggle) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(pointer: fine)');
  const context = canvas.getContext('2d');
  const particles = new Float32Array(48 * 5);
  let width = 1;
  let height = 1;
  let count = 24;
  let frame = 0;
  let lastTime = 0;
  let elapsed = 0;
  let inView = false;
  let enabled = false;
  let preferred = true;
  let targetX = 0;
  let targetY = 0;
  let offsetX = 0;
  let offsetY = 0;
  try { preferred = localStorage.getItem('sbd2027-motion') !== 'off'; } catch { /* Motion remains session-only. */ }

  function resize() {
    const rect = hero.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    width = rect.width;
    height = rect.height;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context?.setTransform(ratio, 0, 0, ratio, 0, 0);
    count = width < 600 ? 24 : 48;
    for (let i = 0; i < count; i++) {
      const p = i * 5;
      particles[p] = Math.random() * width;
      particles[p + 1] = Math.random() * height;
      const foreground = i % 5 === 0;
      particles[p + 2] = foreground ? 1.8 + Math.random() * 1.3 : .5 + Math.random();
      particles[p + 3] = foreground ? 42 + Math.random() * 35 : 14 + Math.random() * 20;
      particles[p + 4] = foreground ? .35 + Math.random() * .3 : .12 + Math.random() * .25;
    }
  }

  function stop() {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    lastTime = 0;
    context?.clearRect(0, 0, width, height);
    targetX = targetY = offsetX = offsetY = 0;
    hero.style.setProperty('--parallax-x', '0px');
    hero.style.setProperty('--parallax-y', '0px');
  }

  function draw(time) {
    const delta = lastTime ? Math.min((time - lastTime) / 1000, .05) : 0;
    lastTime = time;
    elapsed += delta;
    const wind = 12 + Math.sin(elapsed * .45) * 10 + targetX * .8;
    context.clearRect(0, 0, width, height);
    context.fillStyle = '#dcf6ff';
    context.strokeStyle = '#b2eaff';
    for (let i = 0; i < count; i++) {
      const p = i * 5;
      particles[p] += delta * (particles[p + 3] * .5 + wind);
      particles[p + 1] += delta * particles[p + 3];
      if (particles[p + 1] > height + 8) { particles[p + 1] = -8; particles[p] = Math.random() * width; }
      if (particles[p] > width + 8) particles[p] = -8;
      context.globalAlpha = particles[p + 4];
      context.beginPath();
      context.arc(particles[p], particles[p + 1], particles[p + 2], 0, Math.PI * 2);
      context.fill();
      if (particles[p + 2] > 2) {
        context.globalAlpha *= .35;
        context.beginPath();
        context.moveTo(particles[p] - 3, particles[p + 1] - 5);
        context.lineTo(particles[p], particles[p + 1]);
        context.stroke();
      }
    }
    context.globalAlpha = 1;
    const ease = 1 - Math.exp(-delta * 6);
    offsetX += (targetX - offsetX) * ease;
    offsetY += (targetY - offsetY) * ease;
    hero.style.setProperty('--parallax-x', `${offsetX.toFixed(2)}px`);
    hero.style.setProperty('--parallax-y', `${offsetY.toFixed(2)}px`);
    frame = requestAnimationFrame(draw);
  }

  function syncPlayback() {
    const playing = enabled && inView && !document.hidden;
    hero.dataset.playback = playing ? 'running' : 'paused';
    if (playing && context) {
      if (!frame) frame = requestAnimationFrame(draw);
    } else stop();
  }

  function syncPreference() {
    enabled = preferred && !reduced.matches;
    document.documentElement.dataset.motion = enabled ? 'on' : 'off';
    toggle.textContent = `動態 ${enabled ? 'ON' : 'OFF'}`;
    toggle.setAttribute('aria-pressed', String(enabled));
    toggle.disabled = reduced.matches;
    toggle.title = reduced.matches ? '已跟隨系統「減少動態」設定' : '開關飄雪、地形視差及文字動態';
    if (!enabled) document.getAnimations().forEach(animation => animation.cancel());
    syncPlayback();
  }

  toggle.addEventListener('click', () => {
    preferred = !preferred;
    try { localStorage.setItem('sbd2027-motion', preferred ? 'on' : 'off'); } catch { /* No persistence available. */ }
    syncPreference();
  });
  hero.addEventListener('pointermove', event => {
    if (!enabled || !inView || !finePointer.matches) return;
    const rect = hero.getBoundingClientRect();
    targetX = ((event.clientX - rect.left) / rect.width - .5) * 18;
    targetY = ((event.clientY - rect.top) / rect.height - .5) * 10;
  }, { passive: true });
  hero.addEventListener('pointerleave', () => { targetX = targetY = 0; }, { passive: true });
  new ResizeObserver(resize).observe(hero);
  new IntersectionObserver(entries => {
    inView = entries[0].isIntersecting;
    syncPlayback();
  }).observe(hero);
  reduced.addEventListener('change', syncPreference);
  document.addEventListener('visibilitychange', syncPlayback);
  window.addEventListener('pagehide', () => { hero.dataset.playback = 'paused'; stop(); });
  window.addEventListener('pageshow', syncPlayback);
  resize();
  syncPreference();
}
