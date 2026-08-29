(()=>{
"use strict";
const LANG=document.documentElement.lang||"pl";
const I18N={
 pl:{today:"DZIŚ",range:"{a} – {b}",noevents:"Brak wydarzeń w tym zakresie.",upcoming:"NAJBLIŻSZE WYDARZENIA",full:"PEŁNY HARMONOGRAM",game:"Wydarzenia gry",hoc:"Wydarzenia H0C",alliance:"Wydarzenia sojuszu"},
 en:{today:"TODAY",range:"{a} – {b}",noevents:"No events in this range.",upcoming:"UPCOMING EVENTS",full:"FULL SCHEDULE",game:"Game events",hoc:"H0C events",alliance:"Alliance events"},
 de:{today:"HEUTE",range:"{a} – {b}",noevents:"Keine Ereignisse in diesem Zeitraum.",upcoming:"KOMMENDE EREIGNISSE",full:"VOLLSTÄNDIGER ZEITPLAN",game:"Spielereignisse",hoc:"H0C-Ereignisse",alliance:"Allianz-Ereignisse"},
 ru:{today:"СЕГОДНЯ",range:"{a} – {b}",noevents:"В этом диапазоне нет событий.",upcoming:"БЛИЖАЙШИЕ СОБЫТИЯ",full:"ПОЛНОЕ РАСПИСАНИЕ",game:"Игровые события",hoc:"События H0C",alliance:"События альянса"}
};
const T=I18N[LANG]||I18N.en;
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const parse=s=>{const [y,m,d]=s.split("-").map(Number);return new Date(Date.UTC(y,m-1,d));};
const iso=d=>d.toISOString().slice(0,10); const add=(d,n)=>{const x=new Date(d);x.setUTCDate(x.getUTCDate()+n);return x;};
const monday=d=>{const x=new Date(d),day=x.getUTCDay();x.setUTCDate(x.getUTCDate()+(day===0?-6:1-day));x.setUTCHours(0,0,0,0);return x;};
const fmt=d=>new Intl.DateTimeFormat(LANG,{day:"2-digit",month:"2-digit",year:"numeric",timeZone:"UTC"}).format(d);
const dayfmt=d=>new Intl.DateTimeFormat(LANG,{weekday:"short",timeZone:"UTC"}).format(d).replace(/\.$/,"").toUpperCase();
const title=e=>(e.title&&e.title[LANG])||(e.title&&e.title.en)||e.id;
const desc=e=>(e.description&&e.description[LANG])||(e.description&&e.description.en)||"";
const icon={winterfell:`<svg viewBox="0 0 48 48"><path d="M24 4l15 6v11c0 10-6 18-15 23C15 39 9 31 9 21V10z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M17 27l5-8 4 5 4-7 4 10" fill="none" stroke="currentColor" stroke-width="2"/></svg>`,hunting:`<svg viewBox="0 0 48 48"><path d="M8 33c8-11 15-17 27-19l5 5c-3 5-8 8-14 10l-8 8" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="31" cy="15" r="5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8 33l7 7" stroke="currentColor" stroke-width="2"/></svg>`,trade:`<svg viewBox="0 0 48 48"><path d="M24 7v30M11 14h26M8 14l-6 13c4 5 12 5 16 0zM40 14l-6 13c4 5 12 5 16 0zM13 39h22" fill="none" stroke="currentColor" stroke-width="2"/><path d="M24 7l4 5h-8z" fill="currentColor"/></svg>`,mobilization:`<svg viewBox="0 0 48 48"><path d="M24 4l17 7v11c0 10-7 18-17 22C14 40 7 32 7 22V11z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M16 24h16M24 16v16" stroke="currentColor" stroke-width="3"/></svg>`,kvk:`<svg viewBox="0 0 48 48"><path d="M10 7l14 14M38 7L24 21M7 11l9-4 10 10-4 9M41 11l-9-4-10 10 4 9M14 31l-7 10M34 31l7 10" fill="none" stroke="currentColor" stroke-width="2.5"/></svg>`,'lost-realm':`<svg viewBox="0 0 48 48"><path d="M24 5l16 9v20l-16 9-16-9V14z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M16 29l8-13 8 13-8-4z" fill="none" stroke="currentColor" stroke-width="2"/></svg>`};
let events=[],weekStart=monday(parse("2026-08-25"));
function render(){
 const days=$("#timeline-days"),body=$("#timeline-body"),up=$("#upcoming-grid"); days.innerHTML=""; body.innerHTML=""; up.innerHTML="";
 $(".calendar-range-text").textContent=T.range.replace("{a}",fmt(weekStart)).replace("{b}",fmt(add(weekStart,6)));
 const today=iso(new Date());
 for(let i=0;i<7;i++){const d=add(weekStart,i);const el=document.createElement("div");el.className="timeline-day"+(iso(d)===today?" today":"");el.innerHTML=`<span>${dayfmt(d)} ${String(d.getUTCDate()).padStart(2,"0")}.${String(d.getUTCMonth()+1).padStart(2,"0")}</span>`;days.appendChild(el);}
 const line=document.createElement("div");line.className="today-line";const todayIdx=Math.floor((parse(today)-weekStart)/86400000);line.style.left=`${((Math.max(0,Math.min(6,todayIdx))+0.5)/7)*100}%`; if(todayIdx>=0&&todayIdx<7) body.appendChild(line);
 const visible=events.filter(e=>e.end>=iso(weekStart)&&e.start<=iso(add(weekStart,6))).sort((a,b)=>a.start.localeCompare(b.start)||a.id.localeCompare(b.id));
 if(!visible.length){body.innerHTML+=`<div class="empty-calendar">${T.noevents}</div>`;}
 visible.forEach(e=>{const row=document.createElement("div");row.className="timeline-row";const s=Math.max(0,Math.floor((parse(e.start)-weekStart)/86400000));const en=Math.min(6,Math.floor((parse(e.end)-weekStart)/86400000));const bar=document.createElement("a");bar.className=`event-bar ${e.category}`;bar.style.gridColumn=`${s+1} / ${en+2}`;bar.href=e.url||"#";if(!e.url)bar.addEventListener("click",ev=>ev.preventDefault());bar.title=desc(e);bar.innerHTML=`<span class="event-icon">${icon[e.id]||icon['lost-realm']}</span><span class="event-title">${title(e)}</span>${e.time?`<span class="event-time">${e.time}</span>`:""}`;row.appendChild(bar);body.appendChild(row);});
 const order=['winterfell','kvk','trade','mobilization'];order.map(id=>events.find(e=>e.id===id)).filter(Boolean).forEach(e=>{const card=document.createElement("article");card.className="upcoming-card";card.innerHTML=`<div class="upcoming-card-inner"><div class="upcoming-icon">${icon[e.id]||icon['lost-realm']}</div><div><h3>${title(e)}</h3><p class="date">${fmt(parse(e.start))} – ${fmt(parse(e.end))}${e.time?` · ${e.time}`:""}</p><p>${desc(e)}</p></div></div>`;up.appendChild(card);});
}
$("#prev-week").addEventListener("click",()=>{weekStart=add(weekStart,-7);render();});$("#next-week").addEventListener("click",()=>{weekStart=add(weekStart,7);render();});$("#today-btn").addEventListener("click",()=>{weekStart=monday(new Date());render();});
fetch("events.json",{cache:"no-store"}).then(r=>{if(!r.ok)throw Error("events.json");return r.json();}).then(d=>{events=Array.isArray(d.events)?d.events:[];render();}).catch(()=>{$("#timeline-body").innerHTML=`<div class="empty-calendar">${T.noevents}</div>`;});
})();