// ===== i18n =====
    const translations = {
      en: {
        subtitle: 'Fast • Accurate • Free Internet Speed Test',
        ping: 'Ping', download: 'Download', upload: 'Upload',
        jitter: 'Jitter', server: 'Server',
        ready: 'Ready when you are',
        start: 'Start Speed Test',
        analyzing: 'Analyzing your speed...',
        cando: 'What can you do with this speed?',
        starting: 'Starting test...',
        measuring: 'Measuring ping & jitter...',
        testingDl: 'Testing download speed...',
        testingUl: 'Testing upload speed...',
        fast: 'Your WiFi is fast ⚡',
        average: 'Your WiFi is average',
        slow: 'Your WiFi is slow 🐢',
        zoom: 'Zoom / Video calls',
        gaming: 'Online gaming',
        hd: 'HD streaming (1080p)',
        uhd: '4K Netflix / YouTube',
        large: 'Large file downloads',
        error: 'Error: Check your connection'
      },
      fil: {
        subtitle: 'Mabilis • Tumpak • Libreng Internet Speed Test',
        ping: 'Ping', download: 'Download', upload: 'Upload',
        jitter: 'Jitter', server: 'Server',
        ready: 'Handa na kapag ikaw ay handa',
        start: 'Simulan ang Speed Test',
        analyzing: 'Sinasuri ang bilis mo...',
        cando: 'Ano ang magagawa mo sa bilis na ito?',
        starting: 'Sinisimulan ang test...',
        measuring: 'Sinasukat ang ping at jitter...',
        testingDl: 'Tinitest ang download speed...',
        testingUl: 'Tinitest ang upload speed...',
        fast: 'Mabilis ang WiFi mo ⚡',
        average: 'Katamtaman ang WiFi mo',
        slow: 'Mabagal ang WiFi mo 🐢',
        zoom: 'Zoom / Video calls',
        gaming: 'Online gaming',
        hd: 'HD streaming (1080p)',
        uhd: '4K Netflix / YouTube',
        large: 'Malalaking file downloads',
        error: 'Error: Suriin ang connection mo'
      }
    };

    let currentLang = localStorage.getItem('lang') || 'en';
    let lastResults = null;

    function t(key) {
      return (translations[currentLang] && translations[currentLang][key]) || translations.en[key] || key;
    }

    function applyLang() {
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (key === 'start' && el.classList.contains('btn-text')) {
          el.textContent = t('start');
        } else {
          el.textContent = t(key);
        }
      });
      document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === currentLang);
      });
      // Re-render can-do if visible
      if (lastResults && document.getElementById('canDo').classList.contains('show')) {
        renderCanDoItems(lastResults.dl, lastResults.ul, lastResults.ping);
      }
    }

    // Expand translations for more languages (fallback to English for missing keys)
    Object.assign(translations, {
      id: {
        subtitle: 'Cepat • Akurat • Tes Kecepatan Internet Gratis',
        ready: 'Siap kapan saja', start: 'Mulai Tes Kecepatan',
        analyzing: 'Menganalisis kecepatan Anda...',
        cando: 'Apa yang bisa Anda lakukan dengan kecepatan ini?',
        starting: 'Memulai tes...', measuring: 'Mengukur ping & jitter...',
        testingDl: 'Menguji kecepatan unduh...', testingUl: 'Menguji kecepatan unggah...',
        fast: 'WiFi Anda cepat ⚡', average: 'WiFi Anda sedang', slow: 'WiFi Anda lambat 🐢',
        zoom: 'Zoom / Panggilan video', gaming: 'Game online',
        hd: 'Streaming HD (1080p)', uhd: '4K Netflix / YouTube',
        large: 'Unduhan file besar', error: 'Error: Periksa koneksi Anda'
      },
      es: {
        subtitle: 'Rápido • Preciso • Test de velocidad gratis',
        ready: 'Listo cuando tú lo estés', start: 'Iniciar test de velocidad',
        analyzing: 'Analizando tu velocidad...',
        cando: '¿Qué puedes hacer con esta velocidad?',
        starting: 'Iniciando prueba...', measuring: 'Midiendo ping y jitter...',
        testingDl: 'Probando descarga...', testingUl: 'Probando subida...',
        fast: 'Tu WiFi es rápido ⚡', average: 'Tu WiFi es promedio', slow: 'Tu WiFi es lento 🐢',
        zoom: 'Zoom / Videollamadas', gaming: 'Juegos en línea',
        hd: 'Streaming HD (1080p)', uhd: '4K Netflix / YouTube',
        large: 'Descargas grandes', error: 'Error: Revisa tu conexión'
      },
      ja: {
        subtitle: '高速 • 正確 • 無料スピードテスト',
        ready: '準備ができたら開始', start: 'スピードテストを開始',
        analyzing: '速度を分析中...',
        cando: 'この速度でできること',
        starting: 'テスト開始...', measuring: 'Pingとジッターを測定中...',
        testingDl: 'ダウンロード速度をテスト中...', testingUl: 'アップロード速度をテスト中...',
        fast: 'WiFiは高速です ⚡', average: 'WiFiは普通です', slow: 'WiFiは低速です 🐢',
        zoom: 'Zoom / ビデオ通話', gaming: 'オンラインゲーム',
        hd: 'HDストリーミング (1080p)', uhd: '4K Netflix / YouTube',
        large: '大きなファイルのダウンロード', error: 'エラー: 接続を確認してください'
      },
      ko: {
        subtitle: '빠름 • 정확 • 무료 속도 테스트',
        ready: '준비되면 시작하세요', start: '속도 테스트 시작',
        analyzing: '속도 분석 중...',
        cando: '이 속도로 할 수 있는 것',
        starting: '테스트 시작...', measuring: '핑 및 지터 측정 중...',
        testingDl: '다운로드 속도 테스트 중...', testingUl: '업로드 속도 테스트 중...',
        fast: 'WiFi가 빠릅니다 ⚡', average: 'WiFi가 보통입니다', slow: 'WiFi가 느립니다 🐢',
        zoom: 'Zoom / 영상 통화', gaming: '온라인 게임',
        hd: 'HD 스트리밍 (1080p)', uhd: '4K Netflix / YouTube',
        large: '대용량 파일 다운로드', error: '오류: 연결을 확인하세요'
      },
      zh: {
        subtitle: '快速 • 准确 • 免费网速测试',
        ready: '准备好即可开始', start: '开始速度测试',
        analyzing: '正在分析网速...',
        cando: '这个网速可以做什么？',
        starting: '开始测试...', measuring: '正在测量延迟...',
        testingDl: '正在测试下载速度...', testingUl: '正在测试上传速度...',
        fast: '你的WiFi很快 ⚡', average: '你的WiFi一般', slow: '你的WiFi较慢 🐢',
        zoom: 'Zoom / 视频通话', gaming: '在线游戏',
        hd: '高清流媒体 (1080p)', uhd: '4K Netflix / YouTube',
        large: '大文件下载', error: '错误：请检查网络连接'
      },
      th: {
        subtitle: 'เร็ว • แม่นยำ • ทดสอบความเร็วฟรี',
        ready: 'พร้อมเมื่อคุณพร้อม', start: 'เริ่มทดสอบความเร็ว',
        analyzing: 'กำลังวิเคราะห์ความเร็ว...',
        cando: 'ความเร็วนี้ทำอะไรได้บ้าง?',
        starting: 'เริ่มทดสอบ...', measuring: 'กำลังวัดปิงและจิทเตอร์...',
        testingDl: 'กำลังทดสอบดาวน์โหลด...', testingUl: 'กำลังทดสอบอัปโหลด...',
        fast: 'WiFi ของคุณเร็ว ⚡', average: 'WiFi ของคุณปานกลาง', slow: 'WiFi ของคุณช้า 🐢',
        zoom: 'Zoom / สายวิดีโอ', gaming: 'เกมออนไลน์',
        hd: 'สตรีมมิ่ง HD (1080p)', uhd: '4K Netflix / YouTube',
        large: 'ดาวน์โหลดไฟล์ใหญ่', error: 'ข้อผิดพลาด: ตรวจสอบการเชื่อมต่อ'
      }
    });

    const langToggle = document.getElementById('langToggle');
    const langMenu = document.getElementById('langMenu');
    const langCurrent = document.getElementById('langCurrent');

    langToggle.onclick = (e) => {
      e.stopPropagation();
      langMenu.classList.toggle('open');
    };
    document.addEventListener('click', () => langMenu.classList.remove('open'));
    langMenu.onclick = (e) => e.stopPropagation();

    const langLoading = document.getElementById('langLoading');

    document.querySelectorAll('.lang-grid button').forEach(btn => {
      btn.onclick = () => {
        if (btn.dataset.lang === currentLang) {
          langMenu.classList.remove('open');
          return;
        }
        langMenu.classList.remove('open');
        langLoading.classList.add('show');

        setTimeout(() => {
          currentLang = btn.dataset.lang;
          localStorage.setItem('lang', currentLang);
          langCurrent.textContent = btn.dataset.name;
          document.querySelectorAll('.lang-grid button').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          applyLang();
          langLoading.classList.remove('show');
        }, 450);
      };
    });

    // Set initial language label
    const initBtn = document.querySelector('.lang-grid button[data-lang="' + currentLang + '"]');
    if (initBtn) {
      langCurrent.textContent = initBtn.dataset.name;
      initBtn.classList.add('active');
    }
    applyLang();

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
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            ctx.beginPath();
            ctx.strokeStyle = colors.line;
            ctx.globalAlpha = (1 - dist / CONNECT_DIST) * 0.8;
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
    const canDoLoading = document.getElementById('canDoLoading');

    function setLoading(v) {
      startBtn.disabled = v;
      startBtn.classList.toggle('loading', v);
      progressWrap.classList.toggle('active', v);
      liveSpeed.classList.toggle('active', v);
      liveLabel.classList.toggle('active', v);
      if (v) { canDo.classList.remove('show'); canDoLoading.classList.remove('show'); }
    }
    function updateProgress(p) { progressBar.style.width = Math.min(100, p) + '%'; }
    function setLive(s) { liveSpeed.textContent = s.toFixed(1); }

    function showMsg(mbps) {
      statusEl.classList.remove('fast','average','slow');
      if (mbps >= 100) { statusEl.textContent = t('fast'); statusEl.classList.add('fast'); }
      else if (mbps >= 30) { statusEl.textContent = t('average'); statusEl.classList.add('average'); }
      else { statusEl.textContent = t('slow'); statusEl.classList.add('slow'); }
    }

    function renderCanDoItems(downloadMbps, uploadMbps, ping) {
      const items = [
        { key: 'zoom', ok: downloadMbps >= 3 && uploadMbps >= 3, warn: downloadMbps >= 1.5 },
        { key: 'gaming', ok: downloadMbps >= 10 && (ping == null || ping <= 80), warn: downloadMbps >= 5 },
        { key: 'hd', ok: downloadMbps >= 8, warn: downloadMbps >= 5 },
        { key: 'uhd', ok: downloadMbps >= 25, warn: downloadMbps >= 15 },
        { key: 'large', ok: downloadMbps >= 50, warn: downloadMbps >= 20 }
      ];
      canDoList.innerHTML = '';
      items.forEach((item, index) => {
        let cls, icon;
        if (item.ok) { cls = 'yes'; icon = '✅'; }
        else if (item.warn) { cls = 'warn'; icon = '⚠️'; }
        else { cls = 'no'; icon = '❌'; }
        const div = document.createElement('div');
        div.className = 'can-do-item ' + cls;
        div.style.animationDelay = (index * 0.18) + 's';
        div.innerHTML = '<span class="can-do-icon">' + icon + '</span><span>' + t(item.key) + '</span>';
        canDoList.appendChild(div);
      });
    }

    function showCanDo(downloadMbps, uploadMbps, ping) {
      lastResults = { dl: downloadMbps, ul: uploadMbps, ping };
      canDo.classList.remove('show');
      canDoList.innerHTML = '';
      canDoLoading.classList.add('show');
      setTimeout(() => {
        canDoLoading.classList.remove('show');
        canDo.classList.add('show');
        renderCanDoItems(downloadMbps, uploadMbps, ping);
      }, 500);
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
      statusEl.textContent = t('starting');
      statusEl.classList.remove('fast','average','slow');
      updateProgress(3); setLive(0); setLoading(true);
      try {
        statusEl.textContent = t('measuring');
        const r = await testPing();
        if (r.ping != null) { pingEl.textContent = Math.round(r.ping); jitterEl.textContent = r.jitter.toFixed(1); }
        statusEl.textContent = t('testingDl'); liveLabel.textContent = 'Download Mbps';
        const dl = await testDownload(); downloadEl.textContent = dl.toFixed(1);
        statusEl.textContent = t('testingUl'); liveLabel.textContent = 'Upload Mbps';
        const ul = await testUpload(); uploadEl.textContent = ul.toFixed(1);
        updateProgress(100); showMsg(dl);
        showCanDo(dl, ul, r.ping);
      } catch(err) {
        statusEl.textContent = t('error');
      } finally {
        setLoading(false); liveSpeed.classList.remove('active'); liveLabel.classList.remove('active');
      }
    };