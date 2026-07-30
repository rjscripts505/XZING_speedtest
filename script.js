// ===== Particle Network =====
const canvas = document.getElementById('networkCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) || window.innerWidth < 768;
const isLowEnd = isMobile || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
const PARTICLE_COUNT = isLowEnd ? 22 : 50;
const CONNECT_DIST = isLowEnd ? 90 : 130;
const SPEED = isLowEnd ? 0.25 : 0.4;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

function createParticles() {
  particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * SPEED,
      vy: (Math.random() - 0.5) * SPEED,
      r: isLowEnd ? 1.2 + Math.random() : 1.5 + Math.random() * 1.5
    });
  }
}
createParticles();

function getColors() {
  const style = getComputedStyle(document.documentElement);
  return {
    particle: style.getPropertyValue('--particle').trim(),
    line: style.getPropertyValue('--line').trim()
  };
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const colors = getColors();
  for (const p of particles) {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
  }
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const a = particles[i], b = particles[j];
      const dx = a.x - b.x, dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < CONNECT_DIST) {
        const alpha = 1 - dist / CONNECT_DIST;
        ctx.beginPath();
        ctx.strokeStyle = colors.line;
        ctx.globalAlpha = alpha * 0.8;
        ctx.lineWidth = 1;
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }
  }
  for (const p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = colors.particle;
    ctx.fill();
  }
  requestAnimationFrame(draw);
}
draw();

// Theme
const themeBtn = document.getElementById('themeBtn');
const saved = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', saved);
themeBtn.textContent = saved === 'dark' ? '☀️' : '🌙';
themeBtn.onclick = () => {
  const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  themeBtn.textContent = next === 'dark' ? '☀️' : '🌙';
};

function shortIsp(name) {
  if (!name) return 'Unknown';
  const n = name.toLowerCase();
  if (n.includes('philippine long distance') || n.includes('pldt')) return 'PLDT';
  if (n.includes('smart')) return 'Smart';
  if (n.includes('globe')) return 'Globe';
  if (n.includes('converge')) return 'Converge';
  if (n.includes('dito')) return 'DITO';
  if (n.includes('sky')) return 'Sky Fiber';
  if (n.includes('radius')) return 'Radius';
  if (name.length > 28) return name.split(/[ ,]+/).slice(0, 2).join(' ');
  return name;
}

async function loadNetworkInfo() {
  try {
    const res = await fetch('https://ipapi.co/json/');
    const data = await res.json();
    let ip = data.ip || '—';
    let isp = data.org || data.asn || null;
    try {
      const res2 = await fetch('https://ipwho.is/');
      const d2 = await res2.json();
      if (d2.success !== false) {
        if (d2.ip) ip = d2.ip;
        if (d2.connection && d2.connection.isp) isp = d2.connection.isp;
        else if (d2.isp) isp = d2.isp;
        else if (d2.org) isp = d2.org;
      }
    } catch(e) {}
    document.getElementById('ipAddr').textContent = ip;
    document.getElementById('ispName').textContent = shortIsp(isp);
  } catch(e) {
    document.getElementById('ipAddr').textContent = '—';
    document.getElementById('ispName').textContent = '—';
  }
}
loadNetworkInfo();

const startBtn = document.getElementById('startBtn');
const statusEl = document.getElementById('status');
const pingEl = document.getElementById('ping');
const downloadEl = document.getElementById('download');
const uploadEl = document.getElementById('upload');
const jitterEl = document.getElementById('jitter');
const progressWrap = document.getElementById('progressWrap');
const progressBar = document.getElementById('progressBar');
const liveSpeed = document.getElementById('liveSpeed');
const liveLabel = document.getElementById('liveLabel');
const canDo = document.getElementById('canDo');
const canDoList = document.getElementById('canDoList');

function setLoading(v) {
  startBtn.disabled = v;
  startBtn.classList.toggle('loading', v);
  progressWrap.classList.toggle('active', v);
  liveSpeed.classList.toggle('active', v);
  liveLabel.classList.toggle('active', v);
  if (v) canDo.classList.remove('show');
}
function updateProgress(p) { progressBar.style.width = Math.min(100, p) + '%'; }
function setLive(s) { liveSpeed.textContent = s.toFixed(1); }

function showMsg(mbps) {
  statusEl.classList.remove('fast','average','slow');
  if (mbps >= 100) { statusEl.textContent = 'Your WiFi is fast ⚡'; statusEl.classList.add('fast'); }
  else if (mbps >= 30) { statusEl.textContent = 'Your WiFi is average'; statusEl.classList.add('average'); }
  else { statusEl.textContent = 'Your WiFi is slow 🐢'; statusEl.classList.add('slow'); }
}

function showCanDo(downloadMbps, uploadMbps, ping) {
  const items = [
    { name: 'Zoom / Video calls', ok: downloadMbps >= 3 && uploadMbps >= 3, warn: downloadMbps >= 1.5 },
    { name: 'Online gaming', ok: downloadMbps >= 10 && (ping == null || ping <= 80), warn: downloadMbps >= 5 },
    { name: 'HD streaming (1080p)', ok: downloadMbps >= 8, warn: downloadMbps >= 5 },
    { name: '4K Netflix / YouTube', ok: downloadMbps >= 25, warn: downloadMbps >= 15 },
    { name: 'Large file downloads', ok: downloadMbps >= 50, warn: downloadMbps >= 20 }
  ];
  canDoList.innerHTML = items.map(item => {
    let cls, icon;
    if (item.ok) { cls = 'yes'; icon = '✅'; }
    else if (item.warn) { cls = 'warn'; icon = '⚠️'; }
    else { cls = 'no'; icon = '❌'; }
    return `<div class="can-do-item ${cls}"><span class="can-do-icon">${icon}</span><span>${item.name}</span></div>`;
  }).join('');
  canDo.classList.add('show');
}

async function testPing(count=8) {
  const times = [];
  for (let i=0; i<count; i++) {
    const t0 = performance.now();
    try { await fetch('https://speed.cloudflare.com/__down?bytes=0', {cache:'no-store', mode:'cors'}); times.push(performance.now()-t0); } catch(e){}
    updateProgress(5+(i+1)*2);
  }
  if (times.length < 2) return {ping:null, jitter:null};
  times.sort((a,b)=>a-b);
  const ping = times[Math.floor(times.length/2)];
  let j=0; for (let i=1;i<times.length;i++) j += Math.abs(times[i]-times[i-1]);
  return {ping, jitter: j/(times.length-1)};
}

async function testDownload() {
  const sizes = [1e6,3e6,8e6,15e6];
  let bytes=0, time=0;
  for (let i=0;i<sizes.length;i++) {
    const t0 = performance.now();
    const res = await fetch('https://speed.cloudflare.com/__down?bytes='+sizes[i]+'&t='+Date.now(), {cache:'no-store', mode:'cors'});
    const blob = await res.blob();
    const d = (performance.now()-t0)/1000;
    bytes += blob.size; time += d;
    setLive((blob.size*8/d)/1e6);
    updateProgress(25+(i+1)*12);
  }
  return (bytes*8/time)/1e6;
}

async function testUpload() {
  const sizes = [4e5,1e6,2.5e6];
  let bytes=0, time=0;
  for (let i=0;i<sizes.length;i++) {
    const data = new Uint8Array(sizes[i]);
    for (let o=0; o<sizes[i]; o+=65536) crypto.getRandomValues(data.subarray(o, Math.min(o+65536, sizes[i])));
    const t0 = performance.now();
    await fetch('https://speed.cloudflare.com/__up', {method:'POST', body:data, mode:'cors'});
    const d = (performance.now()-t0)/1000;
    bytes += sizes[i]; time += d;
    setLive((sizes[i]*8/d)/1e6);
    updateProgress(75+(i+1)*7);
  }
  return (bytes*8/time)/1e6;
}

startBtn.onclick = async () => {
  pingEl.textContent = downloadEl.textContent = uploadEl.textContent = jitterEl.textContent = '—';
  statusEl.textContent = 'Starting test...';
  statusEl.classList.remove('fast','average','slow');
  updateProgress(3); setLive(0); setLoading(true);
  try {
    statusEl.textContent = 'Measuring ping & jitter...';
    const r = await testPing();
    if (r.ping != null) { pingEl.textContent = Math.round(r.ping); jitterEl.textContent = r.jitter.toFixed(1); }
    statusEl.textContent = 'Testing download speed...'; liveLabel.textContent = 'Download Mbps';
    const dl = await testDownload(); downloadEl.textContent = dl.toFixed(1);
    statusEl.textContent = 'Testing upload speed...'; liveLabel.textContent = 'Upload Mbps';
    const ul = await testUpload(); uploadEl.textContent = ul.toFixed(1);
    updateProgress(100); showMsg(dl);
    showCanDo(dl, ul, r.ping);
  } catch(err) {
    statusEl.textContent = 'Error: ' + (err.message || 'Check your connection');
  } finally {
    setLoading(false); liveSpeed.classList.remove('active'); liveLabel.classList.remove('active');
  }
};
