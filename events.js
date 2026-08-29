(() => {
'use strict';
const LANG=document.documentElement.lang||'pl';
const I18N={
 pl:{today:'DZIŚ',calendar:'KALENDARZ WYDARZEŃ',upcoming:'NAJBLIŻSZE WYDARZENIA',full:'PEŁNY HARMONOGRAM',game:'Wydarzenia gry',hoc:'Wydarzenia H0C',alliance:'Wydarzenia sojuszu',empty:'Brak wydarzeń w tym tygodniu.',next:'Następny tydzień',prev:'Poprzedni tydzień'},
 en:{today:'TODAY',calendar:'EVENTS CALENDAR',upcoming:'UPCOMING EVENTS',full:'FULL SCHEDULE',game:'Game events',hoc:'H0C events',alliance:'Alliance events',empty:'No events this week.',next:'Next week',prev:'Previous week'},
 de:{today:'HEUTE',calendar:'EREIGNISKALENDER',upcoming:'KOMMENDE EREIGNISSE',full:'VOLLSTÄNDIGER ZEITPLAN',game:'Spielereignisse',hoc:'H0C-Ereignisse',alliance:'Allianz-Ereignisse',empty:'Keine Ereignisse in dieser Woche.',next:'Nächste Woche',prev:'Vorherige Woche'},
 ru:{today:'СЕГОДНЯ',calendar:'КАЛЕНДАРЬ СОБЫТИЙ',upcoming:'БЛИЖАЙШИЕ СОБЫТИЯ',full:'ПОЛНОЕ РАСПИСАНИЕ',game:'Игровые события',hoc:'События H0C',alliance:'События альянса',empty:'На этой неделе нет событий.',next:'Следующая неделя',prev:'Предыдущая неделя'}
};
const T=I18N[LANG]||I18N.en;
const $=s=>document.querySelector(s);
const parse=s=>{const [y,m,d]=s.split('-').map(Number);return new Date(Date.UTC(y,m-1,d));};
const iso=d=>d.toISOString().slice(0,10);
const add=(d,n)=>{const x=new Date(d);x.setUTCDate(x.getUTCDate()+n);return x;};
const monday=d=>{const x=new Date(d),day=x.getUTCDay();x.setUTCDate(x.getUTCDate()+(day===0?-6:1-day));x.setUTCHours(0,0,0,0);return x;};
const fmt=d=>new Intl.DateTimeFormat(LANG,{day:'2-digit',month:'2-digit',year:'numeric',timeZone:'UTC'}).format(d);
const DAYNAMES={pl:['PON','WTO','ŚRO','CZW','PT','SOB','ND'],en:['MON','TUE','WED','THU','FRI','SAT','SUN'],de:['MO','DI','MI','DO','FR','SA','SO'],ru:['ПН','ВТ','СР','ЧТ','ПТ','СБ','ВС']}; const dayfmt=(d,i)=>DAYNAMES[LANG][i];
const title=e=>(e.title&&e.title[LANG])||(e.title&&e.title.en)||e.id;
const desc=e=>(e.description&&e.description[LANG])||(e.description&&e.description.en)||'';
const ORDER=['winterfell','hunting','trade','mobilization','kvk','lost-realm'];

const icon={
 winterfell:`<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 4l15 7v11c0 10-6 18-15 22C15 40 9 32 9 22V11z" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M24 11v25M13 24h22M16 16l16 16M32 16L16 32" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>`,
 hunting:`<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 5l16 7v11c0 10-7 17-16 20C15 40 8 33 8 23V12z" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M16 17c4 4 12 4 16 0M18 22l-3 5 5-2M30 22l3 5-5-2M24 17v12M20 34h8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
 trade:`<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 6v34M11 14h26M9 14l-7 13c4 5 12 5 16 0zM39 14l-7 13c4 5 12 5 16 0zM14 40h20" fill="none" stroke="currentColor" stroke-width="2"/><path d="M24 6l4 5h-8z" fill="currentColor"/></svg>`,
 mobilization:`<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 4l17 7v11c0 10-7 18-17 22C14 40 7 32 7 22V11z" fill="none" stroke="currentColor" stroke-width="2.1"/><path d="M16 24h16M24 16v16" stroke="currentColor" stroke-width="2.8"/><path d="M17 14h14" stroke="currentColor" stroke-width="1.7"/></svg>`,
 kvk:`<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 9l14 14M40 9L26 23M6 13l9-4 12 12-4 9M42 13l-9-4-12 12 4 9M15 32L8 41M33 32l7 9" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/></svg>`,
 'lost-realm':`<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 4l16 9v21l-16 10-16-10V13z" fill="none" stroke="currentColor" stroke-width="2.1"/><path d="M14 30l10-16 10 16-10-5z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M19 34h10" stroke="currentColor" stroke-width="2"/></svg>`
};

let events=[];
let weekStart=parse('2026-08-25');

function eventClass(e){
  if(e.id==='hunting') return 'hunting';
  if(e.id==='trade') return 'trade';
  if(e.id==='mobilization') return 'mobilization';
  if(e.id==='kvk') return 'kvk';
  if(e.id==='winterfell') return 'winterfell';
  return 'lost-realm';
}
function categoryClass(e){return e.category||'game';}
function eventBar(e,mini=false){
  const bar=document.createElement(mini?'div':'a');
  bar.className=`event-bar ${eventClass(e)} ${categoryClass(e)}`;
  if(!mini){
    bar.href=e.url||'#';
    if(!e.url)bar.addEventListener('click',ev=>ev.preventDefault());
    bar.title=desc(e);
  }
  bar.innerHTML=`<span class="event-icon">${icon[e.id]||icon['lost-realm']}</span><span class="event-title">${title(e)}</span>${e.time?`<span class="event-time">${e.time}</span>`:''}`;
  return bar;
}
function renderMain(){
  const days=$('#timeline-days'),body=$('#timeline-body'),up=$('#upcoming-grid');
  if(!days||!body)return;
  days.innerHTML=''; body.innerHTML=''; if(up)up.innerHTML='';
  const range=$('.calendar-range-text');
  if(range)range.textContent=`${fmt(weekStart)} – ${fmt(add(weekStart,6))}`;
  const today=iso(new Date());

  for(let i=0;i<7;i++){
    const d=add(weekStart,i),el=document.createElement('div');
    el.className='timeline-day'+(iso(d)===today?' today':'');
    el.textContent=`${dayfmt(d,i)} ${String(d.getUTCDate()).padStart(2,'0')}.${String(d.getUTCMonth()+1).padStart(2,'0')}`;
    days.appendChild(el);
  }

  const todayIdx=Math.floor((parse(today)-weekStart)/86400000);
  if(todayIdx>=0&&todayIdx<7){
    const line=document.createElement('div');
    line.className='today-line';
    line.style.left=`${((todayIdx+.5)/7)*100}%`;
    body.appendChild(line);
  }

  const visible=ORDER.map(id=>events.find(e=>e.id===id)).filter(Boolean);
  visible.forEach(e=>{
    const row=document.createElement('div');
    row.className='timeline-row';
    const s=Math.max(0,Math.floor((parse(e.start)-weekStart)/86400000));
    const en=Math.min(6,Math.floor((parse(e.end)-weekStart)/86400000));
    const bar=eventBar(e);
    bar.style.gridColumn=`${s+1} / ${en+2}`;
    bar.dataset.start=e.start;
    bar.dataset.end=e.end;
    row.appendChild(bar);
    body.appendChild(row);
  });

  if(!visible.length){
    const empty=document.createElement('div');
    empty.className='empty-calendar';
    empty.textContent=T.empty;
    body.appendChild(empty);
  }

  ['winterfell','kvk','trade','mobilization'].map(id=>events.find(e=>e.id===id)).filter(Boolean).forEach(e=>{
    if(!up)return;
    const card=document.createElement('article');
    card.className=`upcoming-card ${eventClass(e)}`;
    card.innerHTML=`<div class="upcoming-card-inner"><div class="upcoming-icon">${icon[e.id]}</div><div><h3>${title(e)}</h3><p class="date">${fmt(parse(e.start))} – ${fmt(parse(e.end))} · ${e.time}</p><p>${desc(e)}</p></div></div>`;
    up.appendChild(card);
  });

  const todayBtn=$('#today-btn');
  if(todayBtn)todayBtn.textContent=T.today;
}
$('#prev-week')?.addEventListener('click',()=>{weekStart=add(weekStart,-7);renderMain();});
$('#next-week')?.addEventListener('click',()=>{weekStart=add(weekStart,7);renderMain();});
$('#today-btn')?.addEventListener('click',()=>{weekStart=parse('2026-08-25');renderMain();});

fetch('events.json',{cache:'no-store'})
  .then(r=>{if(!r.ok)throw Error('events.json');return r.json();})
  .then(d=>{events=Array.isArray(d.events)?d.events:[];renderMain();})
  .catch(()=>{events=[];renderMain();});
})();
