(()=>{
'use strict';
const LANG=document.documentElement.lang||'pl';
const I18N={
 pl:{today:'DZIŚ',range:'',calendar:'KALENDARZ WYDARZEŃ',upcoming:'NAJBLIŻSZE WYDARZENIA',full:'PEŁNY HARMONOGRAM',game:'Wydarzenia gry',hoc:'Wydarzenia H0C',alliance:'Wydarzenia sojuszu',next:'Następny tydzień',prev:'Poprzedni tydzień'},
 en:{today:'TODAY',range:'',calendar:'EVENTS CALENDAR',upcoming:'UPCOMING EVENTS',full:'FULL SCHEDULE',game:'Game events',hoc:'H0C events',alliance:'Alliance events',next:'Next week',prev:'Previous week'},
 de:{today:'HEUTE',range:'',calendar:'EREIGNISKALENDER',upcoming:'KOMMENDE EREIGNISSE',full:'VOLLSTÄNDIGER ZEITPLAN',game:'Spielereignisse',hoc:'H0C-Ereignisse',alliance:'Allianz-Ereignisse',next:'Nächste Woche',prev:'Vorherige Woche'},
 ru:{today:'СЕГОДНЯ',range:'',calendar:'КАЛЕНДАРЬ СОБЫТИЙ',upcoming:'БЛИЖАЙШИЕ СОБЫТИЯ',full:'ПОЛНОЕ РАСПИСАНИЕ',game:'Игровые события',hoc:'События H0C',alliance:'События альянса',next:'Следующая неделя',prev:'Предыдущая неделя'}
};
const T=I18N[LANG]||I18N.en;
const previewData={pl:{label:'POLSKI',title:'WYDARZENIA HOC',sub:'Kalendarz wydarzeń sojuszu i gry. Planuj, bądź aktywny i wspieraj swoje królestwo.'},en:{label:'ENGLISH',title:'HOC EVENTS',sub:'Alliance and game events calendar. Plan, be active and support your kingdom.'},de:{label:'DEUTSCH',title:'HOC EREIGNISSE',sub:'Kalender der Allianz- und Spielevents. Plane, sei aktiv und unterstütze dein Königreich.'},ru:{label:'РУССКИЙ',title:'СОБЫТИЯ HOC',sub:'Календарь событий альянса и игры. Планируй, будь активным и поддерживай свое королевство.'}};
const $=s=>document.querySelector(s); const $$=s=>[...document.querySelectorAll(s)];
const parse=s=>{const [y,m,d]=s.split('-').map(Number);return new Date(Date.UTC(y,m-1,d));};
const iso=d=>d.toISOString().slice(0,10); const add=(d,n)=>{const x=new Date(d);x.setUTCDate(x.getUTCDate()+n);return x;};
const monday=d=>{const x=new Date(d),day=x.getUTCDay();x.setUTCDate(x.getUTCDate()+(day===0?-6:1-day));x.setUTCHours(0,0,0,0);return x;};
const fmt=d=>new Intl.DateTimeFormat(LANG,{day:'2-digit',month:'2-digit',year:'numeric',timeZone:'UTC'}).format(d);
const dayfmt=d=>new Intl.DateTimeFormat(LANG,{weekday:'short',timeZone:'UTC'}).format(d).replace(/\.$/,'').toUpperCase();
const title=e=>(e.title&&e.title[LANG])||(e.title&&e.title.en)||e.id; const desc=e=>(e.description&&e.description[LANG])||(e.description&&e.description.en)||'';
const ORDER=['winterfell','hunting','trade','mobilization','kvk','lost-realm'];
const icon={
 winterfell:`<svg viewBox="0 0 48 48"><path d="M24 4l15 6v12c0 10-6 18-15 22C15 40 9 32 9 22V10z" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M14 29h20M17 25l4-7 3 5 4-8 4 10" fill="none" stroke="currentColor" stroke-width="2"/><path d="M20 12h8" stroke="currentColor" stroke-width="2"/></svg>`,
 hunting:`<svg viewBox="0 0 48 48"><path d="M9 35c7-10 13-16 25-20l5 5c-3 5-8 8-14 10l-8 8" fill="none" stroke="currentColor" stroke-width="2.3"/><circle cx="32" cy="14" r="5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M9 35l7 7M23 29l5 5" stroke="currentColor" stroke-width="2.2"/></svg>`,
 trade:`<svg viewBox="0 0 48 48"><path d="M24 6v34M11 14h26M9 14l-7 13c4 5 12 5 16 0zM39 14l-7 13c4 5 12 5 16 0zM14 40h20" fill="none" stroke="currentColor" stroke-width="2"/><path d="M24 6l4 5h-8z" fill="currentColor"/></svg>`,
 mobilization:`<svg viewBox="0 0 48 48"><path d="M24 4l17 7v11c0 10-7 18-17 22C14 40 7 32 7 22V11z" fill="none" stroke="currentColor" stroke-width="2.1"/><path d="M16 24h16M24 16v16" stroke="currentColor" stroke-width="2.8"/><path d="M17 14h14" stroke="currentColor" stroke-width="1.7"/></svg>`,
 kvk:`<svg viewBox="0 0 48 48"><path d="M10 7l14 14M38 7L24 21M7 11l9-4 10 10-4 9M41 11l-9-4-10 10 4 9M14 31l-7 10M34 31l7 10" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/></svg>`,
 'lost-realm':`<svg viewBox="0 0 48 48"><path d="M24 5l16 9v20l-16 9-16-9V14z" fill="none" stroke="currentColor" stroke-width="2.1"/><path d="M15 31l9-15 9 15-9-5z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M19 34h10" stroke="currentColor" stroke-width="2"/></svg>`
};
const flag={pl:'<rect width="60" height="20" fill="#fff"/><rect y="20" width="60" height="20" fill="#dc143c"/>',en:'<rect width="60" height="40" fill="#012169"/><path d="M0 0L60 40M60 0L0 40" stroke="#fff" stroke-width="9"/><path d="M0 0L60 40M60 0L0 40" stroke="#c8102e" stroke-width="5"/><path d="M30 0V40M0 20H60" stroke="#fff" stroke-width="15"/><path d="M30 0V40M0 20H60" stroke="#c8102e" stroke-width="9"/>',de:'<rect width="60" height="40" fill="#ffce00"/><rect width="60" height="13.333" fill="#000"/><rect y="26.667" width="60" height="13.333" fill="#dd0000"/>',ru:'<rect width="60" height="40" fill="#d52b1e"/><rect width="60" height="26.667" fill="#0039a6"/><rect width="60" height="13.333" fill="#fff"/>'};
let events=[]; let weekStart=monday(new Date());
function eventClass(e){return e.id==='trade'?'trade':e.category;}
function eventBar(e,mini=false){const bar=document.createElement(mini?'div':'a');bar.className=`event-bar ${eventClass(e)}`;if(!mini){bar.href=e.url||'#';if(!e.url)bar.addEventListener('click',ev=>ev.preventDefault());bar.title=desc(e);}bar.innerHTML=`<span class="event-icon">${icon[e.id]||icon['lost-realm']}</span><span class="event-title">${title(e)}</span>${e.time?`<span class="event-time">${e.time}</span>`:''}`;return bar;}
function renderMain(){
 const days=$('#timeline-days'),body=$('#timeline-body'),up=$('#upcoming-grid'); if(!days||!body)return; days.innerHTML='';body.innerHTML='';if(up)up.innerHTML='';
 const range=$('.calendar-range-text');if(range)range.textContent=fmt(weekStart)+' – '+fmt(add(weekStart,6));
 const today=iso(new Date());
 for(let i=0;i<7;i++){const d=add(weekStart,i),el=document.createElement('div');el.className='timeline-day'+(iso(d)===today?' today':'');el.textContent=`${dayfmt(d)} ${String(d.getUTCDate()).padStart(2,'0')}.${String(d.getUTCMonth()+1).padStart(2,'0')}`;days.appendChild(el);}
 const todayIdx=Math.floor((parse(today)-weekStart)/86400000);if(todayIdx>=0&&todayIdx<7){const line=document.createElement('div');line.className='today-line';line.style.left=`${((todayIdx+.5)/7)*100}%`;body.appendChild(line);}
 ORDER.map(id=>events.find(e=>e.id===id)).filter(Boolean).forEach(e=>{const row=document.createElement('div');row.className='timeline-row';const s=Math.max(0,Math.floor((parse(e.start)-weekStart)/86400000));const en=Math.min(6,Math.floor((parse(e.end)-weekStart)/86400000));const bar=eventBar(e);bar.style.gridColumn=`${s+1} / ${en+2}`;row.appendChild(bar);body.appendChild(row);});
 ['winterfell','kvk','trade','mobilization'].map(id=>events.find(e=>e.id===id)).filter(Boolean).forEach(e=>{if(!up)return;const card=document.createElement('article');card.className='upcoming-card';card.innerHTML=`<div class="upcoming-card-inner"><div class="upcoming-icon">${icon[e.id]}</div><div><h3>${title(e)}</h3><p class="date">${fmt(parse(e.start))} – ${fmt(parse(e.end))} · ${e.time}</p><p>${desc(e)}</p></div></div>`;up.appendChild(card);});
 const todayBtn=$('#today-btn');if(todayBtn)todayBtn.textContent=T.today;
}
function renderPreview(root,lang){
 const meta=previewData[lang];root.innerHTML=`<div class="preview-head"><svg class="preview-flag" viewBox="0 0 60 40">${flag[lang]}</svg><span>${meta.label}</span></div><div class="preview-hero"></div><h3 class="preview-title">${meta.title}</h3><p class="preview-subtitle">${meta.sub}</p><div class="preview-calendar"><div class="preview-calendar-head"><span>${lang==='pl'?'KALENDARZ WYDARZEŃ':lang==='en'?'EVENTS CALENDAR':lang==='de'?'EREIGNISKALENDER':'КАЛЕНДАРЬ СОБЫТИЙ'}</span><span>${lang==='pl'?'DZIŚ':lang==='en'?'TODAY':lang==='de'?'HEUTE':'СЕГОДНЯ'}</span></div><div class="preview-days"></div></div>`;
 const cal=root.querySelector('.preview-calendar'); const pd=cal.querySelector('.preview-days'); for(let i=0;i<7;i++){const d=add(weekStart,i),x=document.createElement('span');x.textContent=`${dayfmt(d)} ${String(d.getUTCDate()).padStart(2,'0')}`;pd.appendChild(x);} ORDER.map(id=>events.find(e=>e.id===id)).filter(Boolean).forEach(e=>{const row=document.createElement('div');row.className=`preview-bar ${eventClass(e)}`;row.innerHTML=`<span class="preview-icon">${icon[e.id]}</span><span class="preview-name">${(e.title&&e.title[lang])||e.title.en}</span><span class="preview-time">${e.time}</span>`;cal.appendChild(row);});
}
function renderPreviews(){ $$('.language-preview').forEach(root=>renderPreview(root,root.dataset.lang)); }
$('#prev-week')?.addEventListener('click',()=>{weekStart=add(weekStart,-7);renderMain();});$('#next-week')?.addEventListener('click',()=>{weekStart=add(weekStart,7);renderMain();});$('#today-btn')?.addEventListener('click',()=>{weekStart=monday(new Date());renderMain();});
fetch('events.json',{cache:'no-store'}).then(r=>{if(!r.ok)throw Error('events.json');return r.json();}).then(d=>{events=Array.isArray(d.events)?d.events:[];renderMain();renderPreviews();}).catch(()=>{});
})();
