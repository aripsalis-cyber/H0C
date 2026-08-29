(function(){
"use strict";
const state={weekStart:null,events:[]};
const text=window.H0C_TEXT,lang=window.H0C_LANG;
const mobileToggle=document.querySelector(".calendar-mobile-toggle");
const calendarNav=document.querySelector(".calendar-nav");
if(mobileToggle&&calendarNav){mobileToggle.addEventListener("click",()=>{const open=calendarNav.classList.toggle("is-open");mobileToggle.setAttribute("aria-expanded",String(open));});}
const $=id=>document.getElementById(id);
const parseDate=v=>{const [y,m,d]=v.split("-").map(Number);return new Date(Date.UTC(y,m-1,d));};
const iso=d=>d.toISOString().slice(0,10);
const addDays=(d,n)=>{const x=new Date(d);x.setUTCDate(x.getUTCDate()+n);return x;};
const mondayOf=d=>{const x=new Date(d),day=x.getUTCDay();x.setUTCDate(x.getUTCDate()+(day===0?-6:1-day));x.setUTCHours(0,0,0,0);return x;};
const fmt=d=>new Intl.DateTimeFormat(lang,{day:"2-digit",month:"2-digit",year:"numeric",timeZone:"UTC"}).format(d);
const dayName=d=>new Intl.DateTimeFormat(lang,{weekday:"short",timeZone:"UTC"}).format(d).replace(".","");
const title=ev=>(ev.title&&ev.title[lang])||(ev.title&&ev.title.en)||ev.id;
const cls=c=>c==="alliance"?"alliance":c==="hoc"?"hoc":"game";
function render(){
  const days=$("calendar-days"),body=$("calendar-body"),range=$("range-label");
  days.innerHTML="";body.innerHTML="";
  range.textContent=`${fmt(state.weekStart)} – ${fmt(addDays(state.weekStart,6))}`;
  for(let i=0;i<7;i++){const d=addDays(state.weekStart,i),h=document.createElement("div");h.className="day-head"+(iso(d)===iso(new Date())?" today":"");h.innerHTML=`<span class="day-name">${dayName(d)}</span><span class="day-date">${String(d.getUTCDate()).padStart(2,"0")}.${String(d.getUTCMonth()+1).padStart(2,"0")}</span>`;days.appendChild(h);}
  const start=iso(state.weekStart),end=iso(addDays(state.weekStart,6));
  const events=state.events.filter(e=>e.end>=start&&e.start<=end).sort((a,b)=>a.start.localeCompare(b.start)||a.id.localeCompare(b.id));
  if(!events.length){body.innerHTML=`<div class="empty-calendar">${text.noevents}</div>`;}
  else events.forEach(e=>{
    const s=Math.max(0,Math.floor((parseDate(e.start)-state.weekStart)/86400000));
    const en=Math.min(6,Math.floor((parseDate(e.end)-state.weekStart)/86400000));
    const row=document.createElement("div");row.className="calendar-row";
    const bar=document.createElement("a");bar.className=`event-bar ${cls(e.category)}`;bar.href=e.url||"#";
    if(!e.url)bar.addEventListener("click",ev=>ev.preventDefault());
    bar.setAttribute("aria-label",`${title(e)}${e.time?", "+e.time:""}`);
    bar.style.gridColumn=`${s+1} / ${en+2}`;
    bar.innerHTML=`<span class="event-title">${title(e)}</span>${e.time?`<span class="event-time">${e.time}</span>`:""}`;
    row.appendChild(bar);body.appendChild(row);
  });
  const list=$("upcoming-list");list.innerHTML="";
  events.slice(0,4).forEach(e=>{const item=document.createElement("article");item.className="upcoming-item";item.innerHTML=`<div class="small-date">${fmt(parseDate(e.start))}</div><strong>${title(e)}</strong><span>${e.time||""}</span>`;list.appendChild(item);});
  if(!events.length)list.innerHTML=`<div class="upcoming-item">${text.noevents}</div>`;
}
function shift(n){state.weekStart=addDays(state.weekStart,n*7);render();}
$("prev-week").addEventListener("click",()=>shift(-1));
$("next-week").addEventListener("click",()=>shift(1));
$("today-btn").addEventListener("click",()=>{state.weekStart=mondayOf(new Date());render();});
fetch("events.json",{cache:"no-store"}).then(r=>{if(!r.ok)throw new Error("events.json");return r.json();}).then(d=>{state.events=Array.isArray(d.events)?d.events:[];state.weekStart=mondayOf(new Date());render();}).catch(()=>{$("calendar-body").innerHTML='<div class="empty-calendar">events.json could not be loaded.</div>';});
})();
