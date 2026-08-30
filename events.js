const LANG = document.documentElement.lang || 'pl';
const I18N = {
  pl:{today:'DZISIAJ',calendar:'KALENDARZ WYDARZEŃ',daily:'KALENDARZ DZIENNY',game:'Wydarzenia gry',hoc:'Wydarzenia H0C',alliance:'Wydarzenia sojuszu',upcoming:'NAJBLIŻSZE WYDARZENIA',full:'ZOBACZ PEŁNY KALENDARZ',how:'JAK TO DZIAŁA?',range:'31 SIERPNIA – 5 WRZEŚNIA 2026',days:['PON 31.08','WT 01.09','ŚR 02.09','CZW 03.09','PT 04.09','SOB 05.09'],home:'O H0C',rules:'REGULAMIN',ranks:'RANGI',events:'WYDARZENIA',principles:'ZASADY',team:'JEDNA DRUŻYNA',materials:'MATERIAŁY',heroTitle:'WYDARZENIA H0C',heroText:'Kalendarz wydarzeń sojuszu i gry. Planuj, bądź aktywny i wspieraj swoje królestwo.',upText:'Wydarzenia widoczne na podstawie dostarczonych wizualizacji.',howText:'Kalendarz pokazuje wyłącznie wydarzenia widoczne na aktualnych materiałach. Daty i układ nie są uzupełniane domysłami.'},
  en:{today:'TODAY',calendar:'EVENTS CALENDAR',daily:'DAILY CALENDAR',game:'Game events',hoc:'H0C events',alliance:'Alliance events',upcoming:'UPCOMING EVENTS',full:'VIEW FULL CALENDAR',how:'HOW IT WORKS?',range:'31 AUGUST – 5 SEPTEMBER 2026',days:['MON 31.08','TUE 01.09','WED 02.09','THU 03.09','FRI 04.09','SAT 05.09'],home:'ABOUT H0C',rules:'RULES',ranks:'RANKS',events:'EVENTS',principles:'PRINCIPLES',team:'ONE TEAM',materials:'MATERIALS',heroTitle:'H0C EVENTS',heroText:'Alliance and game events calendar. Plan ahead, stay active and support your kingdom.',upText:'Events shown from the supplied visual references.',howText:'The calendar shows only events visible in the current visual references. Dates and layout are never filled in by guesswork.'},
  de:{today:'HEUTE',calendar:'EREIGNISKALENDER',daily:'TAGESKALENDER',game:'Spielereignisse',hoc:'H0C-Ereignisse',alliance:'Bündnisereignisse',upcoming:'BEVORSTEHENDE EREIGNISSE',full:'VOLLSTÄNDIGEN KALENDER ANZEIGEN',how:'WIE FUNKTIONIERT ES?',range:'31. AUGUST – 5. SEPTEMBER 2026',days:['MO 31.08','DI 01.09','MI 02.09','DO 03.09','FR 04.09','SA 05.09'],home:'ÜBER H0C',rules:'REGELN',ranks:'RÄNGE',events:'EREIGNISSE',principles:'PRINZIPIEN',team:'EIN TEAM',materials:'MATERIALIEN',heroTitle:'H0C EREIGNISSE',heroText:'Kalender der Bündnis- und Spielereignisse. Plane voraus, bleib aktiv und unterstütze dein Königreich.',upText:'Ereignisse aus den bereitgestellten visuellen Vorlagen.',howText:'Der Kalender zeigt ausschließlich Ereignisse, die in den aktuellen Vorlagen sichtbar sind. Daten und Layout werden nicht geraten.'},
  ru:{today:'СЕГОДНЯ',calendar:'КАЛЕНДАРЬ СОБЫТИЙ',daily:'ДНЕВНОЙ КАЛЕНДАРЬ',game:'События игры',hoc:'События H0C',alliance:'События альянса',upcoming:'БЛИЖАЙШИЕ СОБЫТИЯ',full:'ПОКАЗАТЬ ПОЛНЫЙ КАЛЕНДАРЬ',how:'КАК ЭТО РАБОТАЕТ?',range:'31 АВГУСТА – 5 СЕНТЯБРЯ 2026',days:['ПН 31.08','ВТ 01.09','СР 02.09','ЧТ 03.09','ПТ 04.09','СБ 05.09'],home:'О H0C',rules:'ПРАВИЛА',ranks:'РАНГИ',events:'СОБЫТИЯ',principles:'ПРИНЦИПЫ',team:'ОДНА КОМАНДА',materials:'МАТЕРИАЛЫ',heroTitle:'СОБЫТИЯ H0C',heroText:'Календарь событий альянса и игры. Планируй заранее, будь активен и поддерживай своё королевство.',upText:'События, показанные на основе предоставленных визуальных материалов.',howText:'Календарь показывает только события, видимые в текущих материалах. Даты и расположение не додумываются.'}
};
const T=I18N[LANG]||I18N.pl;
const events=[
{id:'amber',start:'2026-08-31',end:'2026-09-05',kind:'game',icon:'chest',pl:'Amber Autumn Feast',en:'Amber Autumn Feast',de:'Amber Autumn Feast',ru:'Осенний пир янтаря'},
{id:'return',start:'2026-08-31',end:'2026-09-05',kind:'game',icon:'flame',pl:'Return to Westeros',en:'Return to Westeros',de:'Rückkehr nach Westeros',ru:'Возвращение в Вестерос'},
{id:'elite',start:'2026-08-31',end:'2026-08-31',kind:'game',icon:'trial',pl:'Elitarne próby',en:'Elite Trials',de:'Eliteprüfungen',ru:'Элитные испытания'},
{id:'army',start:'2026-08-31',end:'2026-08-31',kind:'game',icon:'army',pl:'Zbieranie armii',en:'Army Gathering',de:'Armee sammeln',ru:'Сбор армии'},
{id:'fireworks',start:'2026-09-02',end:'2026-09-03',kind:'game',icon:'fireworks',pl:'Falling Fireworks',en:'Falling Fireworks',de:'Fallendes Feuerwerk',ru:'Падающий фейерверк'},
{id:'trial',start:'2026-09-02',end:'2026-09-04',kind:'game',icon:'winter',pl:'Winterfell Trial',en:'Winterfell Trial',de:'Winterfell-Prüfung',ru:'Испытание Винтерфелла'},
{id:'battle',start:'2026-09-02',end:'2026-09-03',kind:'game',icon:'battle',pl:'Pole bitwy',en:'Battlefield',de:'Schlachtfeld',ru:'Поле битвы'},
{id:'navigator',start:'2026-09-02',end:'2026-09-04',kind:'game',icon:'navigator',pl:'Nawigator',en:'Navigator',de:'Navigator',ru:'Навигатор'},
{id:'smoke',start:'2026-09-03',end:'2026-09-05',kind:'game',icon:'smoke',pl:'Lost in the Smoke',en:'Lost in the Smoke',de:'Im Rauch verloren',ru:'Затерянный в дыму'},
{id:'night',start:'2026-09-03',end:'2026-09-05',kind:'game',icon:'night',pl:'Night King Invasion',en:'Night King Invasion',de:'Invasion des Nachtkönigs',ru:'Вторжение Короля Ночи'},
{id:'advisor',start:'2026-09-03',end:'2026-09-05',kind:'game',icon:'advisor',pl:'Limited Time Advisor Card Pool',en:'Limited Time Advisor Card Pool',de:'Zeitlich begrenzter Beraterkarten-Pool',ru:'Ограниченный набор карт советников'},
{id:'trade',start:'2026-08-31',end:'2026-09-04',kind:'hoc',icon:'scales',pl:'Dzień Handlowy',en:'Trade Day',de:'Handelstag',ru:'Торговый день'},
{id:'mobil',start:'2026-08-31',end:'2026-09-04',kind:'alliance',icon:'shield',pl:'Mobilizacja Przymierza',en:'Alliance Mobilization',de:'Bündnismobilisierung',ru:'Мобилизация альянса'}
];
const start=new Date('2026-08-31T00:00:00');
const end=new Date('2026-09-05T00:00:00');
const days=Array.from({length:6},(_,i)=>{const d=new Date(start);d.setDate(d.getDate()+i);return d});
const iso=d=>d.toISOString().slice(0,10);
const dayIndex=d=>Math.max(0,Math.min(5,Math.round((new Date(d+'T00:00:00')-start)/86400000)));
const active=(e,i)=>new Date(e.start)<=days[i]&&new Date(e.end)>=days[i];
const esc=s=>String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
function icon(type){
 const paths={
  chest:'<path d="M9 7h6l2 3v7H7v-7l2-3Z"/><path d="M7 11h10M10 7v4M14 7v4"/>',
  flame:'<path d="M12 20c4 0 6-2.5 6-5.5 0-3.2-2.2-5.1-4.4-7.2.1 2.1-1 3.2-2 3.8.1-3.4-1.6-5.7-3.2-7.1.2 4.1-3 5.9-3 10.1C5.4 17.4 8 20 12 20Z"/>',
  trial:'<path d="M7 8h10v9H7zM9 8V6h6v2M10 12h4M10 15h4"/>',
  army:'<path d="M6 9h12v9H6zM8 9V6h8v3M9 12h6M9 15h6"/>',
  fireworks:'<path d="M12 12v7M12 5l1 2-1 2-1-2 1-2ZM6 7l2 1-1 2-2-1 1-2ZM18 7l-1 2 1 1 2-2-2-1Z"/>',
  winter:'<path d="M12 4l2 2 3-1 1 3 3 1-2 3 2 3-3 1-1 3-3-1-2 2-2-2-3 1-1-3-3-1 2-3-2-3 3-1 1-3 3 1 2-2Z"/><path d="M12 8v8M8.5 10l7 4M15.5 10l-7 4"/>',
  battle:'<path d="M7 17 17 7M7 7l10 10M5 5l2 2M17 17l2 2"/>',
  navigator:'<path d="m12 5 4 9-4 5-4-5 4-9Z"/><circle cx="12" cy="12" r="2"/>',
  smoke:'<path d="M7 18c-2 0-3-1.2-3-2.7 0-1.4 1-2.5 2.4-2.7C6.1 9.8 8.4 8 11 8c1.2 0 2.3.4 3.1 1.1C14.8 7.3 16.3 6 18 6c2.2 0 4 1.8 4 4 0 .6-.1 1.2-.4 1.7 1.1.5 1.9 1.5 1.9 2.8 0 2-1.6 3.5-3.6 3.5H7Z"/>',
  night:'<path d="M12 4c4.2 0 7 2.6 7 6.7 0 4.4-3.1 7.3-7 7.3s-7-2.9-7-7.3C5 6.6 7.8 4 12 4Z"/><path d="M9 10h2M13 10h2M9 14h6"/>',
  advisor:'<path d="M7 5h10v14H7zM9 8h6M9 11h6M9 14h4"/>',
  scales:'<path d="M12 5v13M8 18h8M5 8h6M13 8h6M5 8l-2 5h6L7 8M17 8l-2 5h6l-2-5"/>',
  shield:'<path d="M12 4l7 3v5c0 4.2-2.6 7-7 8-4.4-1-7-3.8-7-8V7l7-3Z"/><path d="M12 8v7M9 11h6"/>'
 };
 return `<svg viewBox="0 0 24 24" aria-hidden="true">${paths[type]||paths.shield}</svg>`;
}
function render(){
 document.querySelectorAll('[data-i18n]').forEach(el=>{const k=el.dataset.i18n;if(T[k])el.textContent=T[k]});
 document.getElementById('range').textContent=T.range;
 const daysEl=document.getElementById('days'); daysEl.innerHTML=T.days.map((d,i)=>`<div class="day ${i===0?'selected':''}">${d}</div>`).join('');
 const body=document.getElementById('timeline'); body.innerHTML='';
 events.forEach((e,row)=>{
   const s=dayIndex(e.start), en=dayIndex(e.end);
   const left=(s/6)*100, width=((en-s+1)/6)*100;
   const el=document.createElement('div'); el.className='event-row'; el.style.top=`${row*54}px`;
   el.innerHTML=`<div class="event-bar ${e.kind}" style="left:${left}%;width:calc(${width}% - 10px)"><span class="event-icon">${icon(e.icon)}</span><span class="event-name">${esc(e[LANG])}</span></div>`;
   body.appendChild(el);
 });
 body.style.height=`${events.length*54+8}px`;
 renderDaily(0);
 renderUpcoming();
}
function renderDaily(i){
 const list=events.filter(e=>active(e,i)).sort((a,b)=>a.start.localeCompare(b.start)||a.id.localeCompare(b.id));
 document.getElementById('daily-date').textContent=T.days[i];
 document.getElementById('daily-list').innerHTML=list.map(e=>`<div class="daily-item ${e.kind}"><span class="daily-icon">${icon(e.icon)}</span><span>${esc(e[LANG])}</span></div>`).join('');
}
function renderUpcoming(){
 const sorted=events.filter(e=>new Date(e.end)>=start).sort((a,b)=>a.start.localeCompare(b.start)).slice(0,4);
 document.getElementById('upcoming-grid').innerHTML=sorted.map(e=>`<article class="up-item"><div class="up-icon ${e.kind}">${icon(e.icon)}</div><div><h3>${esc(e[LANG])}</h3><p>${esc(e.start.slice(8,10)+'.'+e.start.slice(5,7)+' – '+e.end.slice(8,10)+'.'+e.end.slice(5,7)+'.2026')}</p></div></article>`).join('');
}
document.addEventListener('DOMContentLoaded',()=>{
 render();
 const toggle=document.getElementById('menu-toggle'); const nav=document.getElementById('site-nav');
 toggle?.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',open)});
 document.querySelectorAll('.language-link').forEach(a=>a.addEventListener('click',()=>{nav?.classList.remove('open')}));
});
