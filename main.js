// ============================================================
// PARCHE ZIPA FEST 2026 — MAIN JS
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ── NAV ──────────────────────────────────────────────────
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navMobile = document.getElementById('navMobile');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });

  navToggle?.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMobile.classList.toggle('open');
    document.body.style.overflow = navMobile.classList.contains('open') ? 'hidden' : '';
  });

  navMobile?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMobile.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ── COUNTDOWN ────────────────────────────────────────────
  function updateCountdown() {
    const target = new Date(window.PARCHE_CONFIG?.EVENT_START_DATE || '2026-09-18T08:00:00');
    const now = new Date();
    const diff = target - now;

    if (diff <= 0) {
      ['days','hours','mins','secs'].forEach(id => {
        const el = document.getElementById(`cd-${id}`);
        if (el) el.textContent = '00';
      });
      return;
    }

    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    const pad = n => String(n).padStart(2, '0');
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = pad(val); };

    set('cd-days', d);
    set('cd-hours', h);
    set('cd-mins', m);
    set('cd-secs', s);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ── STICKER FLOATS ────────────────────────────────────────
  const stickers = ['🎨','🎮','🏆','⭐','🔥','💡','🎵','🎯','✨','🌟','💥'];
  const heroBg = document.querySelector('.hero-bg');

  if (heroBg) {
    stickers.forEach((s, i) => {
      const el = document.createElement('span');
      el.className = 'hero-sticker';
      el.textContent = s;
      el.style.cssText = `
        top: ${Math.random() * 85 + 5}%;
        left: ${Math.random() * 90 + 5}%;
        animation-duration: ${4 + Math.random() * 4}s;
        animation-delay: ${Math.random() * 3}s;
        opacity: ${0.15 + Math.random() * 0.25};
        font-size: ${16 + Math.random() * 20}px;
      `;
      heroBg.appendChild(el);
    });
  }

  // ── ACTIVIDADES (CRONOGRAMA) ──────────────────────────────
  const grid = document.getElementById('actividadesGrid');
  const filters = document.querySelectorAll('.filter-btn');
  let activeFilter = 'all';

  const STATUS_LABELS = {
    open:      ['INSCRIPCIONES ABIERTAS', 'status-open'],
    upcoming:  ['PRÓXIMAMENTE',           'status-upcoming'],
    selection: ['EN SELECCIÓN',           'status-selection'],
    voting:    ['VOTACIONES ABIERTAS',    'status-voting'],
    closed:    ['CERRADO',                'status-closed'],
    finished:  ['FINALIZADO',             'status-finished'],
  };

  function renderCards(items) {
    if (!grid) return;
    grid.innerHTML = '';

    items.forEach((a, idx) => {
      const [statusLabel, statusClass] = STATUS_LABELS[a.status] || STATUS_LABELS.upcoming;
      const card = document.createElement('div');
      card.className = 'actividad-card';
      card.style.setProperty('--accent', a.accentColor);
      card.style.animationDelay = `${idx * 0.07}s`;
      card.dataset.id = a.id;

      card.innerHTML = `
        <div class="card-num">${a.num}</div>
        <div class="card-header">
          <div class="card-icon">${a.icon}</div>
          <span class="card-status ${statusClass}">${statusLabel}</span>
        </div>
        <h3 class="card-title">${a.name}</h3>
        <p class="card-full-name">${a.fullName}</p>
        <div class="card-meta">
          <span class="card-date">${a.dateDisplay}</span>
          <span class="card-cat-tag">${a.categoryLabel}</span>
        </div>
        <p class="card-desc">${a.description}</p>
        <div class="card-cta">
          VER DETALLES
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      `;

      card.addEventListener('click', () => openModal(a));
      grid.appendChild(card);
    });
  }

  function applyFilter(cat) {
    activeFilter = cat;
    const items = cat === 'all'
      ? window.ACTIVIDADES
      : window.ACTIVIDADES.filter(a => a.category === cat);
    renderCards(items);
  }

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilter(btn.dataset.filter);
    });
  });

  if (window.ACTIVIDADES) renderCards(window.ACTIVIDADES);

  // ── MODAL ─────────────────────────────────────────────────
  const modal = document.getElementById('actividadModal');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');

  function openModal(a) {
    if (!modal) return;

    const [statusLabel, statusClass] = STATUS_LABELS[a.status] || STATUS_LABELS.upcoming;

    document.getElementById('modalIcon').textContent = a.icon;
    document.getElementById('modalHero').style.setProperty('--accent', a.accentColor);
    document.getElementById('modalTitle').textContent = a.name;
    document.getElementById('modalFullName').textContent = a.fullName;
    document.getElementById('modalDate').textContent = a.dateDisplay + ' 2026';
    document.getElementById('modalTime').textContent = a.time || 'Por definir';
    document.getElementById('modalLocation').textContent = a.location || 'Por definir';
    document.getElementById('modalAudience').textContent = a.targetAudience || 'Por definir';
    document.getElementById('modalStatus').textContent = statusLabel;
    document.getElementById('modalStatus').className = `card-status ${statusClass}`;
    document.getElementById('modalDesc').textContent = a.description;
    document.getElementById('modalReqs').textContent = a.requirements || 'Por definir';
    document.getElementById('modalCat').textContent = a.categoryLabel;

    // Botón inscripción
    const inscBtn = document.getElementById('modalInscBtn');
    if (inscBtn) {
      if (a.registrationOpen && a.status === 'open') {
        inscBtn.style.display = 'inline-flex';
        inscBtn.href = `#inscripcion`;
        inscBtn.onclick = () => {
          closeModal();
          const nameEl = document.getElementById('formActivityName');
          if (nameEl) nameEl.textContent = a.name;
          const hiddenAct = document.getElementById('formActivityId');
          if (hiddenAct) hiddenAct.value = a.id;
          setTimeout(() => document.getElementById('inscripcion')?.scrollIntoView({behavior:'smooth'}), 100);
        };
      } else {
        inscBtn.style.display = 'none';
      }
    }

    // Fases (Mural On / Colegios)
    const phasesContainer = document.getElementById('modalPhases');
    if (phasesContainer && a.phases) {
      phasesContainer.style.display = 'block';
      phasesContainer.innerHTML = '<div class="phases-track">' +
        a.phases.map((p, i) => `
          <div class="phase-item ${p.active ? 'active' : ''}">
            ${i > 0 ? '<div class="phase-connector"></div>' : ''}
            <div class="phase-dot">
              <div class="phase-circle">${p.id}</div>
              <div class="phase-label">${p.label}</div>
            </div>
          </div>
        `).join('') + '</div>';
    } else if (phasesContainer) {
      phasesContainer.style.display = 'none';
    }

    // Google Maps
    const mapsEl = document.getElementById('modalMaps');
    if (mapsEl) {
      mapsEl.innerHTML = a.googleMapsUrl
        ? `<iframe src="${a.googleMapsUrl}" width="100%" height="260" style="border:0;border-radius:12px;" loading="lazy"></iframe>`
        : `<div style="background:var(--col-bg-card);border-radius:12px;height:120px;display:flex;align-items:center;justify-content:center;border:1px dashed rgba(255,255,255,0.1)"><span style="color:var(--col-muted);font-family:var(--font-heading);font-size:12px;letter-spacing:0.1em;text-transform:uppercase">📍 Ubicación por confirmar</span></div>`;
    }

    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay?.classList.remove('open');
    document.body.style.overflow = '';
  }

  modalClose?.addEventListener('click', closeModal);
  modalOverlay?.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // ── VIDEO ─────────────────────────────────────────────────
  const videoFrame = document.getElementById('videoFrame');
  const videoPlaceholder = document.getElementById('videoPlaceholder');
  const videoUrl = window.PARCHE_CONFIG?.VIDEO_URL;

  if (videoUrl && videoUrl !== 'https://www.youtube.com/embed/TU_VIDEO_ID') {
    if (videoFrame) { videoFrame.src = videoUrl; videoFrame.style.display = 'block'; }
    if (videoPlaceholder) videoPlaceholder.style.display = 'none';
  }

  // ── FORMULARIO ────────────────────────────────────────────
  const form = document.getElementById('inscripcionForm');

  form?.addEventListener('submit', async e => {
    e.preventDefault();

    const authData = document.querySelector('input[name="autorizaDatos"]:checked');
    if (!authData || authData.value !== 'si') {
      showToast('Debes autorizar el tratamiento de datos personales.', true);
      return;
    }

    const submitBtn = document.getElementById('formSubmitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');

    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoader.style.display = 'inline';

    const data = Object.fromEntries(new FormData(form));
    const scriptUrl = window.PARCHE_CONFIG?.APPS_SCRIPT_URL;

    try {
      if (scriptUrl && !scriptUrl.includes('TU_SCRIPT_ID')) {
        await fetch(scriptUrl, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: { 'Content-Type': 'application/json' },
          mode: 'no-cors',
        });
      }

      // Éxito
      form.style.display = 'none';
      document.getElementById('formSuccess').style.display = 'block';
    } catch (err) {
      showToast('Error al enviar. Intenta de nuevo.', true);
    } finally {
      submitBtn.disabled = false;
      btnText.style.display = 'inline';
      btnLoader.style.display = 'none';
    }
  });

  // ── TOAST ─────────────────────────────────────────────────
  function showToast(msg, isError = false) {
    const t = document.getElementById('toast');
    if (!t) return;
    t.textContent = msg;
    t.style.borderColor = isError ? 'rgba(250,51,8,0.4)' : 'rgba(96,227,95,0.3)';
    t.style.color = isError ? 'var(--col-red)' : 'var(--col-green)';
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3500);
  }

  // ── SCROLL REVEAL ─────────────────────────────────────────
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // ── REDES SOCIALES ────────────────────────────────────────
  const socials = ['instagram','facebook','tiktok','youtube'];
  socials.forEach(s => {
    const links = document.querySelectorAll(`.social-${s}`);
    const url = window.PARCHE_CONFIG?.[`${s.toUpperCase()}_URL`];
    links.forEach(link => { if (url) link.href = url; });
  });

  // ── SMOOTH SCROLL para nav links ─────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  console.log('%c🎨 PARCHE ZIPA FEST 2026', 'font-family:Anton,sans-serif;font-size:24px;color:#60E35F;background:#1E2124;padding:8px 16px;border-radius:8px;');
  console.log('%cSemana de la Juventud — Zipaquirá', 'font-size:12px;color:#8899A6;');
});
