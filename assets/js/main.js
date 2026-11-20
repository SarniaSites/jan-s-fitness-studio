/* Jan's Fitness — small vanilla enhancements.
   Header, menu, hero intro, cable rail, rooms, kit counter, steps,
   gallery lightbox, FAQ, form. Everything works without it. */
(function () {
  'use strict';
  var doc = document.documentElement;
  doc.classList.add('js');
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- Hero intro (runs once) ---------- */
  requestAnimationFrame(function () { document.body.classList.add('is-ready'); });

  /* ---------- Header + mobile bar + active nav ---------- */
  var header = $('[data-header]');
  var bar = $('[data-mobile-bar]');
  var hero = $('#top');
  var rail = $('[data-rail]');
  var railFill = $('[data-rail-fill]');
  var pulleys = $$('[data-pulley]');
  var heroImg = $('[data-parallax]');
  var ticking = false;

  function placeRail() {
    if (!rail) return;
    var gym = $('#gym'), contact = $('#contact');
    var top = gym.offsetTop - 22;
    var end = contact.offsetTop + 40;
    rail.style.top = top + 'px';
    rail.style.height = Math.max(0, end - top) + 'px';
    rail._top = top; rail._h = end - top;
  }

  function onScroll() {
    ticking = false;
    var y = window.scrollY;
    var vh = window.innerHeight;
    header.classList.toggle('is-scrolled', y > 40);
    if (bar) bar.classList.toggle('is-on', y > vh * 0.6);
    if (hero) hero.classList.toggle('is-off', y > hero.offsetHeight);
    if (heroImg && !reduce && y < vh * 1.2) heroImg.style.transform = 'translate3d(0,' + (y * 0.12).toFixed(1) + 'px,0)';
    if (rail && rail._h) {
      var p = (y + vh * 0.6 - rail._top) / rail._h;
      p = Math.min(1, Math.max(0, p));
      railFill.style.setProperty('--rail', reduce ? 1 : p.toFixed(4));
      pulleys.forEach(function (el) { el.style.setProperty('--spin', (y * -0.4).toFixed(1) + 'deg'); });
    }
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  window.addEventListener('resize', function () { placeRail(); onScroll(); });
  window.addEventListener('load', function () { placeRail(); onScroll(); });
  placeRail(); onScroll();

  var navLinks = $$('.site-header nav a');
  if ('IntersectionObserver' in window) {
    var secObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        navLinks.forEach(function (a) { a.setAttribute('aria-current', a.getAttribute('href') === '#' + e.target.id ? 'true' : 'false'); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('main section[id]').forEach(function (s) { secObs.observe(s); });
  }

  /* ---------- Mobile menu ---------- */
  var menuBtn = $('[data-menu-btn]'), menu = $('[data-menu]');
  function closeMenu() { menu.hidden = true; menuBtn.setAttribute('aria-expanded', 'false'); header.classList.remove('menu-open'); }
  if (menuBtn) {
    menuBtn.addEventListener('click', function () {
      var open = menu.hidden;
      menu.hidden = !open;
      menuBtn.setAttribute('aria-expanded', String(open));
      header.classList.toggle('menu-open', open);
      if (open) header.classList.add('is-scrolled');
    });
    $$('a', menu).forEach(function (a) { a.addEventListener('click', closeMenu); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !menu.hidden) { closeMenu(); menuBtn.focus(); } });
  }

  /* ---------- Hero rig follows the cursor a touch (desktop only) ---------- */
  var rig = $('[data-rig]');
  if (rig && finePointer && !reduce) {
    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect();
      var dx = (e.clientX - r.left) / r.width - 0.5;
      rig.style.transform = 'translate3d(' + (dx * -14).toFixed(1) + 'px,0,0)';
    });
  }

  /* ---------- Rooms: tap pulls a room out, like a plate off the stack ---------- */
  $$('[data-rooms] .room').forEach(function (room, i, all) {
    room.addEventListener('click', function () {
      all.forEach(function (r) { if (r !== room) r.classList.remove('is-out'); });
      room.classList.toggle('is-out');
    });
    room.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); room.click(); } });
  });

  /* ---------- Kit counter ---------- */
  // Counts are the minimums Jan's give in their own equipment list.
  var KIT = {
    chest: {
      title: 'Chest', icon: 'k-bench',
      img: ['images/work/press.webp', 353, 351, 'A member on a seated press machine'],
      note: 'Benches, presses and pec decks, enough that the chest station you want is usually free.',
      items: [['15+', 'Chest stations', 15], ['8', 'Olympic benches', 8], ['2', 'Pec decks', 2]]
    },
    back: {
      title: 'Back', icon: 'k-pulldown',
      img: ['images/work/cable-pulldown-sm.webp', 800, 360, 'A member pulling two cable handles overhead on the cable crossover'],
      note: 'Lat machines of every kind, plus rear delt and hyperextension kit.',
      items: [['12+', 'Lat machines', 12], ['3', 'Rear delt machines', 3], ['2', 'Hyperextension benches', 2]]
    },
    legs: {
      title: 'Legs', icon: 'k-legpress',
      img: ['images/work/adductor-sm.webp', 727, 700, 'A member on a hip adductor machine'],
      note: 'Four of each of the big leg machines, so leg day doesn’t mean waiting.',
      items: [['4', 'Leg presses', 4], ['4', 'Leg curls', 4, 'Seated, kneeling or lying'], ['4', 'Leg extensions', 4, 'Pin-select or plate-loaded, single or double leg'], ['3', 'Calf machines', 3], ['Both', 'Hack squat and power squat', 2]]
    },
    arms: {
      title: 'Arms & shoulders', icon: 'k-dumbbell',
      img: ['images/work/triceps.webp', 359, 354, 'A member doing an overhead triceps extension on a cable machine'],
      note: 'Dedicated machines for biceps, triceps and shoulders, as well as the cables and dumbbells.',
      items: [['12+', 'Triceps machines', 12], ['10+', 'Biceps machines', 10], ['8+', 'Shoulder machines', 8]]
    },
    glutes: {
      title: 'Glutes & abs', icon: 'k-glute',
      img: ['images/work/hip-machine-sm.webp', 700, 700, 'A member seated on a hip machine'],
      note: 'A whole choice of glute machines, and ab machines in more than one room.',
      items: [['Several', 'Glute machines', 4], ['Several', 'Ab machines', 4]]
    },
    free: {
      title: 'Free weights & cables', icon: 'k-crossover',
      img: ['images/work/cable-crossover-sm.webp', 800, 1067, 'A member using a cable crossover'],
      note: 'Platforms, racks and full sets of dumbbells, with cable crossovers that take every attachment.',
      items: [['3', 'Cable crossovers', 3], ['2', 'Deadlift platforms', 2], ['2', 'Squat racks', 2], ['2', 'Full sets of dumbbells', 2]]
    },
    cardio: {
      title: 'Cardio', icon: 'k-cardio',
      img: ['images/work/cardio-row-sm.webp', 800, 387, 'Treadmills beside a stair climber', '18% 50%'],
      note: 'Treadmills, cross-trainers, bikes and climbers, with a few unusual machines you won’t find in other local gyms.',
      items: [['Lots', 'Treadmills, bikes and cross-trainers', 6], ['A few', 'Unusual cardio machines', 2, 'Something different for every day']]
    }
  };

  var kit = $('[data-kit]');
  if (kit) {
    var tabs = $$('[data-kit-tab]', kit);
    var panel = $('[data-kit-panel]', kit);
    var kImg = $('[data-kit-img]', kit), kTitle = $('[data-kit-title]', kit), kNote = $('[data-kit-note]', kit), kList = $('[data-kit-list]', kit);

    function icons(id, n, isFloor) {
      var out = '';
      var max = Math.min(n, 16);
      for (var i = 0; i < max; i++) out += '<svg aria-hidden="true" style="animation-delay:' + (reduce ? 0 : i * 28) + 'ms"><use href="#' + id + '"/></svg>';
      if (isFloor) out += '<span class="more" aria-hidden="true">+</span>';
      return out;
    }
    function show(key, focus) {
      var d = KIT[key]; if (!d) return;
      tabs.forEach(function (t) {
        var on = t.dataset.kitTab === key;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        if (on) { panel.setAttribute('aria-labelledby', t.id); if (focus) t.focus(); }
      });
      kImg.style.objectPosition = d.img[4] || '50% 50%'; kImg.src = d.img[0]; kImg.width = d.img[1]; kImg.height = d.img[2]; kImg.alt = d.img[3];
      kTitle.textContent = d.title;
      kNote.textContent = d.note;
      kList.innerHTML = d.items.map(function (it) {
        var floor = /\+$/.test(it[0]) || isNaN(parseInt(it[0], 10));
        return '<li><span class="tag tag-sm"><span class="tag-hole"></span>' + it[0] + '</span><span class="kit-name">' + it[1] + '</span>' +
          (it[3] ? '<span class="kit-detail">' + it[3] + '</span>' : '') +
          '<span class="kit-icons">' + icons(d.icon, it[2], floor) + '</span></li>';
      }).join('');
      panel.classList.remove('kit-swap'); void panel.offsetWidth; panel.classList.add('kit-swap');
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { show(t.dataset.kitTab); });
      t.addEventListener('keydown', function (e) {
        var k = e.key, n = null;
        if (k === 'ArrowRight' || k === 'ArrowDown') n = tabs[(i + 1) % tabs.length];
        if (k === 'ArrowLeft' || k === 'ArrowUp') n = tabs[(i - 1 + tabs.length) % tabs.length];
        if (k === 'Home') n = tabs[0];
        if (k === 'End') n = tabs[tabs.length - 1];
        if (n) { e.preventDefault(); show(n.dataset.kitTab, true); n.scrollIntoView({ block: 'nearest', inline: 'nearest' }); }
      });
    });
    show('chest');
  }

  /* ---------- Steps: the cable draws across as the section comes in ---------- */
  var steps = $('[data-steps]');
  if (steps && 'IntersectionObserver' in window && !reduce) {
    steps.style.setProperty('--p', 0);
    var stepEls = $$('.step', steps);
    var stepObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.target === steps) {
          if (e.isIntersecting) {
            steps.style.transition = 'none';
            var start = null;
            var run = function (t) {
              if (!start) start = t;
              var p = Math.min(1, (t - start) / 1400);
              var eased = 1 - Math.pow(1 - p, 3);
              steps.style.setProperty('--p', eased.toFixed(3));
              stepEls.forEach(function (s, i) { if (eased >= i / stepEls.length) s.classList.add('is-on'); });
              if (p < 1) requestAnimationFrame(run);
            };
            requestAnimationFrame(run);
            stepObs.unobserve(steps);
          }
        }
      });
    }, { threshold: 0.35 });
    stepObs.observe(steps);
  }

  /* ---------- Payoff stack: does a rep when contact comes into view ---------- */
  var payoff = $('[data-payoff]');
  if (payoff && 'IntersectionObserver' in window && !reduce) {
    var pObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          payoff.classList.add('is-lifted');
          setTimeout(function () { if (!payoff.dataset.sent) payoff.classList.remove('is-lifted'); }, 1300);
          pObs.disconnect();
        }
      });
    }, { threshold: 0.8 });
    pObs.observe(payoff);
  }

  /* ---------- Gallery lightbox ---------- */
  var lb = $('[data-lightbox]');
  var tiles = $$('[data-gallery] .tile');
  if (lb && tiles.length) {
    var lbImg = $('[data-lb-img]', lb), lbCap = $('[data-lb-cap]', lb), idx = 0, lastFocus = null;
    function open(i) {
      idx = (i + tiles.length) % tiles.length;
      var t = tiles[idx], im = $('img', t);
      lbImg.src = t.dataset.full; lbImg.alt = im.alt; lbCap.textContent = t.dataset.caption || '';
      if (lb.hidden) { lastFocus = document.activeElement; lb.hidden = false; document.body.style.overflow = 'hidden'; $('[data-lb-close]', lb).focus(); }
    }
    function close() { lb.hidden = true; document.body.style.overflow = ''; if (lastFocus) lastFocus.focus(); }
    tiles.forEach(function (t, i) { t.addEventListener('click', function () { open(i); }); });
    $('[data-lb-close]', lb).addEventListener('click', close);
    $('[data-lb-prev]', lb).addEventListener('click', function () { open(idx - 1); });
    $('[data-lb-next]', lb).addEventListener('click', function () { open(idx + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) {
      if (lb.hidden) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') open(idx - 1);
      if (e.key === 'ArrowRight') open(idx + 1);
      if (e.key === 'Tab') { // keep focus inside
        var f = $$('button', lb), first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    var sx = null;
    lb.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) {
      if (sx === null) return;
      var dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 45) open(idx + (dx < 0 ? 1 : -1));
      sx = null;
    });
  }

  /* ---------- FAQ: one open at a time ---------- */
  var faqs = $$('[data-faq] details');
  faqs.forEach(function (d) {
    d.addEventListener('toggle', function () { if (d.open) faqs.forEach(function (o) { if (o !== d) o.open = false; }); });
  });

  /* ---------- Links that preselect the form's service ---------- */
  var serviceSel = $('#f-service');
  $$('[data-service-link]').forEach(function (a) {
    a.addEventListener('click', function () { if (serviceSel) serviceSel.value = a.dataset.serviceLink; });
  });

  /* ---------- Form: inline validation, loading state, the stack lifts ---------- */
  var form = $('[data-form]');
  if (form) {
    var fields = $$('input[required], select[required]', form);
    function check(el, quiet) {
      var ok = el.checkValidity() && el.value.trim() !== '';
      var wrap = el.closest('.field');
      if (!quiet || wrap.classList.contains('is-bad')) {
        wrap.classList.toggle('is-bad', !ok);
        wrap.classList.toggle('is-good', ok && el.tagName === 'INPUT');
      }
      var err = wrap.querySelector('.field-err');
      if (err) { el.setAttribute('aria-describedby', err.id); el.setAttribute('aria-invalid', String(!ok)); }
      return ok;
    }
    fields.forEach(function (el) {
      el.addEventListener('blur', function () { if (el.value) check(el); });
      el.addEventListener('input', function () { check(el, true); });
    });
    form.addEventListener('submit', function (e) {
      if (form.querySelector('[name="_honey"]').value) { e.preventDefault(); return; }
      var bad = fields.filter(function (el) { return !check(el); });
      if (bad.length) { e.preventDefault(); bad[0].focus(); return; }
      e.preventDefault();
      var btn = $('[data-submit]', form);
      btn.classList.add('is-loading');
      $('[data-submit-label]', form).textContent = 'Sending';
      if (payoff) { payoff.dataset.sent = '1'; payoff.classList.add('is-lifted'); }
      setTimeout(function () { form.submit(); }, reduce ? 0 : 750);
    });
  }
})();
