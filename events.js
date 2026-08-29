(() => {
  "use strict";
  const lang = window.H0C_LANG;
  const text = window.H0C_TEXT || {};
  const $ = (id) => document.getElementById(id);

  const parseDate = (value) => {
    const [year, month, day] = value.split('-').map(Number);
    return new Date(Date.UTC(year, month - 1, day));
  };
  const iso = (date) => date.toISOString().slice(0, 10);
  const addDays = (date, amount) => {
    const copy = new Date(date);
    copy.setUTCDate(copy.getUTCDate() + amount);
    return copy;
  };
  const mondayOf = (date) => {
    const copy = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const weekday = copy.getUTCDay();
    copy.setUTCDate(copy.getUTCDate() + (weekday === 0 ? -6 : 1 - weekday));
    return copy;
  };
  const formatDate = (date) => new Intl.DateTimeFormat(lang, { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC' }).format(date);
  const dayName = (date) => new Intl.DateTimeFormat(lang, { weekday: 'short', timeZone: 'UTC' }).format(date).replace('.', '');
  const eventTitle = (event) => (event.title && event.title[lang]) || (event.title && event.title.en) || event.id;
  const eventDescription = (event) => (event.description && event.description[lang]) || '';
  const icons = { winterfell: '❄', hunting: '◈', trade: '⚖', mobilization: '✦', kvk: '⚔', 'lost-realm': '⬟', 'elite-trials': '✧' };

  let weekStart = mondayOf(new Date());
  let events = [];

  function render() {
    const daysEl = $('calendar-days');
    const rowsEl = $('calendar-rows');
    const upcomingEl = $('up-grid');
    daysEl.innerHTML = '';
    rowsEl.innerHTML = '<div class="today-line" id="today-line"></div>';

    const weekEnd = addDays(weekStart, 6);
    $('range-label').textContent = `${formatDate(weekStart)} – ${formatDate(weekEnd)}`;

    for (let i = 0; i < 7; i += 1) {
      const date = addDays(weekStart, i);
      const head = document.createElement('div');
      head.className = 'day' + (iso(date) === iso(new Date()) ? ' current' : '');
      head.textContent = `${dayName(date).toUpperCase()} ${String(date.getUTCDate()).padStart(2, '0')}.${String(date.getUTCMonth() + 1).padStart(2, '0')}`;
      daysEl.appendChild(head);
    }

    const startIso = iso(weekStart);
    const endIso = iso(weekEnd);
    const visible = events
      .filter((event) => event.end >= startIso && event.start <= endIso)
      .sort((a, b) => a.start.localeCompare(b.start) || a.id.localeCompare(b.id));

    const today = new Date();
    const todayOffset = Math.floor((parseDate(iso(today)) - weekStart) / 86400000);
    if (todayOffset >= 0 && todayOffset <= 6) {
      $('today-line').style.left = `${todayOffset * 14.2857}%`;
    } else {
      $('today-line').style.left = '-10px';
    }

    visible.forEach((event) => {
      const row = document.createElement('div');
      row.className = 'event-row';
      const bar = document.createElement('div');
      bar.className = `event ${event.category}`;
      const startOffset = Math.max(0, Math.floor((parseDate(event.start) - weekStart) / 86400000));
      const endOffset = Math.min(6, Math.floor((parseDate(event.end) - weekStart) / 86400000));
      bar.style.left = `${startOffset * 14.2857}%`;
      bar.style.width = `${(endOffset - startOffset + 1) * 14.2857 - 1}%`;
      bar.innerHTML = `<span class="icon">${icons[event.id] || '◆'}</span><span>${eventTitle(event)}</span>${event.time ? `<span class="time">${event.time}</span>` : ''}`;
      row.appendChild(bar);
      rowsEl.appendChild(row);
    });

    upcomingEl.innerHTML = '';
    visible.slice(0, 4).forEach((event) => {
      const card = document.createElement('article');
      card.className = 'up-card';
      const dateText = `${formatDate(parseDate(event.start))}${event.end !== event.start ? ` – ${formatDate(parseDate(event.end))}` : ''}`;
      card.innerHTML = `<h3>${eventTitle(event)}</h3><p>${dateText} ${event.time || ''}<br>${eventDescription(event)}</p>`;
      upcomingEl.appendChild(card);
    });
    if (!visible.length) {
      upcomingEl.innerHTML = `<article class="up-card"><p>${text.noevents || 'No events.'}</p></article>`;
    }
  }

  $('prev').addEventListener('click', () => { weekStart = addDays(weekStart, -7); render(); });
  $('next').addEventListener('click', () => { weekStart = addDays(weekStart, 7); render(); });
  $('today').addEventListener('click', () => { weekStart = mondayOf(new Date()); render(); });

  fetch('events.json', { cache: 'no-store' })
    .then((response) => {
      if (!response.ok) throw new Error('events.json');
      return response.json();
    })
    .then((data) => {
      events = Array.isArray(data.events) ? data.events : [];
      render();
    })
    .catch(() => {
      $('calendar-rows').innerHTML = '<div style="padding:70px;text-align:center">Unable to load events.json.</div>';
    });
})();
