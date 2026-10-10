/* ---------- data ---------- */
const services = [
  {t:"Custom Software Development", d:"We develop software designed around your business processes, helping reduce manual work and improve efficiency."},
  {t:"Business Websites", d:"Professional websites designed to build credibility, generate enquiries, and support business growth."},
  {t:"Web Applications", d:"Secure browser-based systems built for internal operations or customer-facing services."},
  {t:"Mobile Applications", d:"Android and cross-platform applications that connect businesses with customers and employees."},
  {t:"Business Automation", d:"Automate repetitive tasks and improve operational efficiency across your team."},
  {t:"API Development", d:"Connect systems and enable secure data sharing between the tools you already use."},
  {t:"Cloud Solutions", d:"Deploy secure, scalable applications using Microsoft Azure and cloud technologies."},
  {t:"Database Design", d:"Reliable and scalable SQL Server and MongoDB database solutions."},
  {t:"Software Maintenance", d:"Continuous improvements, monitoring, and technical support after launch."},
];

const solutions = [
  {t:"Small Businesses", d:"Websites and tools that build credibility and generate enquiries without a large upfront investment."},
  {t:"Growing Companies &amp; Startups", d:"Systems that can be extended as your team, customers and requirements grow."},
  {t:"Schools", d:"Administrative and academic management tools built around how schools actually operate."},
  {t:"Healthcare Providers", d:"Secure systems for managing records, scheduling and internal operations."},
  {t:"Retail Businesses", d:"E-commerce and inventory tools that support day-to-day trading operations."},
  {t:"Professional Services", d:"Client and case management systems tailored to service-based workflows."},
  {t:"Construction Companies", d:"Project and site tracking tools built for on-the-ground realities."},
  {t:"Manufacturing", d:"Systems for tracking production, stock and internal processes."},
  {t:"NGOs", d:"Practical, budget-conscious tools for programme and beneficiary management."},
  {t:"Government Organisations", d:"Systems built with attention to compliance, governance and public accountability."},
];

const technologies = ["C#",".NET","ASP.NET Core","React","JavaScript","TypeScript","SQL Server","MongoDB","Git","GitHub","Azure","REST APIs","Docker","HTML","CSS","Tailwind CSS"];

const blogTopics = [
  {tag:"Engineering", t:"Software Development", d:"Notes on architecture, code quality, and the engineering decisions behind our projects."},
  {tag:"Operations", t:"Business Automation", d:"Practical ways businesses reduce manual work through automation."},
  {tag:"Strategy", t:"Digital Transformation", d:"What digital transformation actually requires beyond new software."},
  {tag:"Infrastructure", t:"Cloud Computing", d:"How cloud infrastructure changes what's possible for growing businesses."},
  {tag:"Security", t:"Cybersecurity", d:"Security practices that matter for small and growing software systems."},
  {tag:"Industry", t:"Technology Trends", d:"Trends worth paying attention to, and ones worth ignoring."},
];

const faqs = [
  {q:"How much does custom software cost?", a:"Cost depends entirely on scope, complexity and integration requirements. After an initial discovery conversation, we provide a clear, itemised quote so you know what you're paying for before development starts — there's no fixed price we can quote without understanding the project first."},
  {q:"How long does development take?", a:"Timelines vary by project. A straightforward business website may take a few weeks; a custom system with multiple integrations can take several months. We provide a realistic timeline estimate as part of the planning stage, and communicate clearly if scope changes affect it."},
  {q:"Can you improve an existing system?", a:"Yes. We regularly review, extend and refactor existing systems rather than rebuilding from scratch, where that's the more sensible option for your budget and timeline."},
  {q:"Do you provide maintenance?", a:"Yes. Software Maintenance is one of our core services, covering monitoring, updates, bug fixes and ongoing technical support after launch."},
  {q:"Can you host our application?", a:"Yes, we can deploy and manage hosting using Microsoft Azure and related cloud infrastructure, or work with a hosting provider of your choice."},
  {q:"Will we own the source code?", a:"Yes. Ownership terms are agreed and documented before a project begins, and standard practice is that clients own the source code for work delivered under contract."},
];

/* ---------- render services ---------- */
const svGrid = document.getElementById('services-grid');
services.forEach(s=>{
  const el = document.createElement('div');
  el.className = 'glass service-card reveal';
  el.innerHTML = `<h3>${s.t}</h3><p>${s.d}</p>`;
  svGrid.appendChild(el);
});

/* ---------- render solutions ---------- */
const solGrid = document.getElementById('solutions-grid');
solutions.forEach(s=>{
  const el = document.createElement('div');
  el.className = 'glass sol-chip reveal';
  el.innerHTML = `<h4>${s.t}</h4><p>${s.d}</p>`;
  solGrid.appendChild(el);
});

/* ---------- render technologies ---------- */
const techGrid = document.getElementById('tech-grid');
technologies.forEach(t=>{
  const el = document.createElement('div');
  el.className='glass tech-chip reveal';
  el.textContent = t;
  techGrid.appendChild(el);
});

/* ---------- render blog ---------- */
const blogGrid = document.getElementById('blog-grid');
blogTopics.forEach(b=>{
  const el = document.createElement('div');
  el.className='glass blog-card reveal';
  el.innerHTML = `<span class="blog-tag">${b.tag}</span><h4>${b.t}</h4><p>${b.d}</p>`;
  blogGrid.appendChild(el);
});

/* ---------- render faq ---------- */
const faqList = document.getElementById('faq-list');
faqs.forEach(f=>{
  const el = document.createElement('div');
  el.className='faq-item';
  el.innerHTML = `<div class="faq-q">${f.q}<span class="plus"></span></div><div class="faq-a"><p>${f.a}</p></div>`;
  el.addEventListener('click', ()=>{
    const isOpen = el.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(o=>{ o.classList.remove('open'); o.querySelector('.faq-a').style.maxHeight=null; });
    if(!isOpen){ el.classList.add('open'); const a=el.querySelector('.faq-a'); a.style.maxHeight = a.scrollHeight+30+'px'; }
  });
  faqList.appendChild(el);
});

/* ---------- render portfolio ---------- */
const folioData = [
  {
    category:"Academic Projects",
    projects:[
      {
        name:"Hospital Ward Management System", status:"complete",
        overview:"A system for managing ward admissions, bed allocation and patient movement within a hospital environment.",
        problem:"Ward staff tracked bed availability and patient movement manually, making it difficult to get an accurate real-time picture of capacity.",
        solution:"A centralised system for recording admissions, transfers and discharges, with a live view of ward and bed status.",
        stack:["ASP.NET Core","React","SQL Server"],
        features:["Admission and discharge recording","Bed and ward status view","Role-based access for staff"],
        lessons:"Reinforced the importance of designing data models around how clinical staff actually record information under time pressure, not around an idealised workflow."
      },
      {
        name:"Event Management System", status:"complete",
        overview:"A platform for managing event scheduling, ticketing and attendee registration.",
        problem:"Manual scheduling and registration processes were prone to double-bookings and lost records.",
        solution:"A structured system for creating events, managing registrations, and tracking attendance.",
        stack:["React","C#","SQL Server"],
        features:["Event creation and scheduling","Attendee registration","Basic reporting on attendance"],
        lessons:"Highlighted how much of the value in an events system comes from clear validation rules — most real-world issues came from edge cases in scheduling logic."
      }
    ]
  },
  {
    category:"Personal Projects",
    projects:[
      {
        name:"Authentication API", status:"complete",
        overview:"A standalone authentication service handling user registration, login and token-based access control.",
        problem:"Many small projects rebuild authentication from scratch, introducing inconsistent security practices.",
        solution:"A reusable JWT-based authentication API with email confirmation handling and centralised user-state extraction.",
        stack:["ASP.NET Core","C#","JWT"],
        features:["JWT-based authentication","Email confirmation flow","Centralised token/user extraction logic"],
        lessons:"Working through non-standard backend response patterns (such as tokens issued before email confirmation) reinforced the value of handling auth state explicitly on the client rather than assuming a single response shape."
      },
      {
        name:"Business Website", status:"complete",
        overview:"A marketing and informational website built to represent a small business online.",
        problem:"The business had no online presence to build credibility or generate enquiries.",
        solution:"A responsive, fast-loading website covering services, contact details and company information.",
        stack:["React","TypeScript","Tailwind CSS"],
        features:["Responsive layout","Contact form","SEO-friendly structure"],
        lessons:"Confirmed that for small business sites, load speed and clarity of the contact path matter more than visual complexity."
      },
      {
        name:"Dashboard Application", status:"complete",
        overview:"An internal dashboard for visualising and interacting with structured data.",
        problem:"Raw data existed but there was no accessible way to view or interpret it.",
        solution:"A dashboard presenting key data through charts and filterable tables.",
        stack:["React","TypeScript","REST APIs"],
        features:["Data visualisation","Filtering and search","Component-based reusable UI"],
        lessons:"Reinforced the importance of designing reusable UI components early, rather than duplicating chart and table logic across views."
      }
    ]
  },
  {
    category:"Research &amp; Innovation",
    projects:[
      {
        name:"Indoor Navigation System (NavExpo)", status:"progress",
        overview:"A mobile indoor navigation app that helps users find their way inside large buildings, such as malls or markets, using Bluetooth Low Energy (BLE) beacons.",
        problem:"GPS doesn't work reliably indoors, making it difficult for visitors to navigate large indoor spaces or find specific stalls and stores.",
        solution:"A React Native app that estimates indoor position using BLE beacon signals, with building selection, floor maps, stall search and turn-by-turn navigation.",
        stack:["React Native","Expo","TypeScript","BLE"],
        features:["Building and floor selection","Stall search","BLE-based position estimation","Mock-to-real API switch via a single configuration flag for easier testing"],
        lessons:"Currently in development — core screens (login, building list, floor map, stall search, stall detail, navigation) are built, with the profile screen and app navigator still in progress. Early work has underlined how much indoor positioning accuracy depends on beacon placement and signal filtering, not just the app logic."
      }
    ]
  },
  {
    category:"Future Projects",
    projects:[
      {
        name:"Inventory Management System", status:"concept",
        overview:"A planned system for tracking stock levels, movement and reorder points for small to medium retail or warehousing businesses.",
        problem:"Manual stock tracking often leads to inaccurate counts and missed reorder points.",
        solution:"A concept for a system providing real-time stock visibility and automated reorder alerts.",
        stack:["ASP.NET Core","React","SQL Server"],
        features:["Planned: real-time stock tracking","Planned: reorder alerts","Planned: reporting dashboard"],
        lessons:"Concept stage — not yet started."
      },
      {
        name:"Restaurant Management Platform", status:"concept",
        overview:"A planned platform for managing orders, tables and kitchen workflow in a restaurant setting.",
        problem:"Manual order-taking can lead to errors and slower table turnover.",
        solution:"A concept for a digital ordering and kitchen-display system.",
        stack:["React","Node.js","MongoDB"],
        features:["Planned: digital order entry","Planned: kitchen display integration","Planned: table status tracking"],
        lessons:"Concept stage — not yet started."
      },
      {
        name:"CRM Platform", status:"concept",
        overview:"A planned customer relationship management tool for tracking leads, communication and sales pipeline.",
        problem:"Small businesses often manage customer relationships across scattered spreadsheets and email threads.",
        solution:"A concept for a lightweight CRM covering contacts, pipeline stages and follow-up reminders.",
        stack:["React","ASP.NET Core","SQL Server"],
        features:["Planned: contact and pipeline management","Planned: follow-up reminders","Planned: basic reporting"],
        lessons:"Concept stage — not yet started."
      }
    ]
  }
];

const statusLabel = {complete:"Completed", progress:"Currently in Development", concept:"Concept"};
const statusClass = {complete:"status-complete", progress:"status-progress", concept:"status-concept"};

const folioContainer = document.getElementById('folio-container');
folioData.forEach(cat=>{
  const catEl = document.createElement('div');
  catEl.className = 'folio-category reveal';
  const isFuture = cat.category === "Future Projects";
  catEl.innerHTML = `<div class="cat-head"><h3>${cat.category}</h3>${isFuture?'<span class="cat-badge future">Roadmap</span>':''}</div>`;
  const grid = document.createElement('div');
  grid.className = 'folio-grid';
  cat.projects.forEach(p=>{
    const card = document.createElement('div');
    card.className = 'glass folio-card';
    card.innerHTML = `
      <span class="folio-status ${statusClass[p.status]}">${statusLabel[p.status]}</span>
      <h4>${p.name}</h4>
      <div class="folio-row"><b>Overview:</b> ${p.overview}</div>
      <div class="folio-row"><b>Problem:</b> ${p.problem}</div>
      <div class="folio-row"><b>Solution:</b> ${p.solution}</div>
      <div class="folio-stack">${p.stack.map(s=>`<span class="stack-pill">${s}</span>`).join('')}</div>
      <button class="folio-toggle">Show features &amp; lessons learned</button>
      <div class="folio-more">
        <div class="folio-row" style="margin-top:14px;"><b>Features:</b> ${p.features.join(', ')}</div>
        <div class="folio-row"><b>Lessons Learned:</b> ${p.lessons}</div>
      </div>
    `;
    const toggle = card.querySelector('.folio-toggle');
    const more = card.querySelector('.folio-more');
    toggle.addEventListener('click', ()=>{
      const open = more.classList.toggle('open');
      toggle.textContent = open ? 'Hide features & lessons learned' : 'Show features & lessons learned';
    });
    grid.appendChild(card);
  });
  catEl.appendChild(grid);
  folioContainer.appendChild(catEl);
});

/* ---------- scroll progress + reveal ---------- */
const bar = document.getElementById('scrollbar');
window.addEventListener('scroll', ()=>{
  const h = document.documentElement;
  const pct = (h.scrollTop)/(h.scrollHeight - h.clientHeight) * 100;
  bar.style.width = pct + '%';
});
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
},{threshold:0.1});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

/* ---------- mobile menu ---------- */
const burger = document.getElementById('burger');
const navLinks = document.getElementById('nav-links');
burger.addEventListener('click', ()=>{
  const open = navLinks.classList.toggle('mobile-open');
  burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  navLinks.style.cssText = open
    ? 'display:flex; position:fixed; top:64px; left:0; right:0; flex-direction:column; align-items:stretch; background:rgba(11,31,58,0.98); padding:16px 6vw calc(16px + env(safe-area-inset-bottom)); gap:2px; border-bottom:1px solid rgba(255,255,255,.1); max-height:calc(100vh - 64px); overflow-y:auto;'
    : '';
});
window.addEventListener('resize', ()=>{
  if(window.innerWidth > 820){ navLinks.style.cssText=''; navLinks.classList.remove('mobile-open'); burger.setAttribute('aria-expanded','false'); }
});

/* ---------- network canvas (hero background) ---------- */
(function(){
  const canvas = document.getElementById('network-canvas');
  const ctx = canvas.getContext('2d');
  let w,h,nodes=[];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function nodeCount(){
    return w < 640 ? 20 : w < 1080 ? 32 : 46;
  }
  function resize(){
    const hero = document.getElementById('hero');
    w = canvas.width = hero.clientWidth;
    h = canvas.height = hero.clientHeight;
    initNodes();
  }
  function initNodes(){
    const count = nodeCount();
    nodes = Array.from({length:count}, ()=>({
      x: Math.random()*w, y: Math.random()*h,
      vx: (Math.random()-0.5)*0.32, vy:(Math.random()-0.5)*0.32,
      r: Math.random()*1.6+1
    }));
  }
  function draw(){
    ctx.clearRect(0,0,w,h);
    nodes.forEach(n=>{
      n.x += n.vx; n.y += n.vy;
      if(n.x<0||n.x>w) n.vx*=-1;
      if(n.y<0||n.y>h) n.vy*=-1;
    });
    for(let i=0;i<nodes.length;i++){
      for(let j=i+1;j<nodes.length;j++){
        const a=nodes[i], b=nodes[j];
        const dx=a.x-b.x, dy=a.y-b.y;
        const dist=Math.sqrt(dx*dx+dy*dy);
        if(dist<150){
          ctx.strokeStyle = `rgba(53,168,255,${(1-dist/150)*0.32})`;
          ctx.lineWidth=1;
          ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
        }
      }
    }
    nodes.forEach(n=>{
      ctx.beginPath();
      ctx.arc(n.x,n.y,n.r,0,Math.PI*2);
      ctx.fillStyle='rgba(115,190,255,0.9)';
      ctx.shadowColor='rgba(53,168,255,0.8)';
      ctx.shadowBlur=6;
      ctx.fill();
    });
    if(!reducedMotion) requestAnimationFrame(draw);
  }
  let resizeTimer;
  window.addEventListener('resize', ()=>{ clearTimeout(resizeTimer); resizeTimer=setTimeout(resize,150); });
  resize();
  draw();
})();
