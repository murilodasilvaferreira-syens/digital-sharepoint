// ==== Dados dos treinamentos ====
const trainings = [
  { name:'Power Apps', icon:'⚡', desc:'Crie aplicativos low-code para automatizar processos do dia a dia.', level:'Iniciante', progress:60 },
  { name:'Seeq', icon:'📈', desc:'Análise avançada de dados de séries temporais industriais.', level:'Intermediário', progress:35 },
  { name:'PI Vision', icon:'🖥️', desc:'Visualização de dados de processo em tempo real com dashboards.', level:'Intermediário', progress:45 },
  { name:'Power Automate', icon:'🔁', desc:'Automatize fluxos de trabalho e integre sistemas sem código.', level:'Iniciante', progress:70 },
  { name:'Power BI', icon:'📊', desc:'Construa relatórios e dashboards interativos de dados.', level:'Avançado', progress:20 },
  { name:'PI System', icon:'🏭', desc:'Fundamentos de coleta e historização de dados de processo.', level:'Avançado', progress:15 },
];

const agenda = [
  { day:'12', mon:'Ago', title:'Introdução ao Power Apps', info:'09h–11h · Online · Sala Teams', tag:'Vagas abertas' },
  { day:'19', mon:'Ago', title:'Seeq na prática', info:'14h–16h · Online', tag:'Poucas vagas' },
  { day:'26', mon:'Ago', title:'Dashboards com PI Vision', info:'10h–12h · Presencial', tag:'Vagas abertas' },
];

const grid = document.getElementById('cardsGrid');
const emptyState = document.getElementById('emptyState');
const searchInput = document.getElementById('searchInput');
const filters = document.getElementById('filters');
let activeLevel = 'all';
let query = '';

function render(){
  const list = trainings.filter(t => {
    const matchLevel = activeLevel === 'all' || t.level === activeLevel;
    const matchQuery = t.name.toLowerCase().includes(query) || t.desc.toLowerCase().includes(query);
    return matchLevel && matchQuery;
  });
  grid.innerHTML = list.map((t,i) => `
    <article class="card" style="animation-delay:${i*60}ms">
      <div class="card-ic">${t.icon}</div>
      <h3>${t.name}</h3>
      <p class="card-desc">${t.desc}</p>
      <span class="badge ${t.level}">${t.level}</span>
      <div class="progress">
        <div class="progress-track"><div class="progress-fill" data-w="${t.progress}"></div></div>
        <span class="progress-label">${t.progress}% da trilha concluída</span>
      </div>
      <a class="card-link" href="#">Acessar trilha →</a>
    </article>`).join('');
  emptyState.hidden = list.length !== 0;
  requestAnimationFrame(() => {
    document.querySelectorAll('.progress-fill').forEach(el => el.style.width = el.dataset.w + '%');
  });
}

// Filtros
filters.addEventListener('click', e => {
  const btn = e.target.closest('.chip');
  if(!btn) return;
  filters.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  activeLevel = btn.dataset.level;
  render();
});

// Busca
searchInput.addEventListener('input', e => { query = e.target.value.toLowerCase().trim(); render(); });

// Agenda
document.getElementById('agendaList').innerHTML = agenda.map(a => `
  <div class="agenda-item">
    <div class="agenda-date"><div class="agenda-day">${a.day}</div><div class="agenda-mon">${a.mon}</div></div>
    <div class="agenda-info"><h4>${a.title}</h4><small>${a.info}</small></div>
    <span class="agenda-tag">${a.tag}</span>
  </div>`).join('');

// Tema
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.theme-icon');
const saved = localStorage.getItem('theme');
if(saved){ document.documentElement.setAttribute('data-theme', saved); themeIcon.textContent = saved==='dark'?'☀️':'🌙'; }
themeToggle.addEventListener('click', () => {
  const dark = document.documentElement.getAttribute('data-theme') === 'dark';
  const next = dark ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  themeIcon.textContent = next==='dark'?'☀️':'🌙';
  localStorage.setItem('theme', next);
});

// Contadores animados
function animateCounters(){
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = +el.dataset.count; let n = 0;
    const step = Math.max(1, Math.ceil(target/60));
    const tick = () => { n += step; if(n >= target){ el.textContent = target; } else { el.textContent = n; requestAnimationFrame(tick); } };
    tick();
  });
}

render();
animateCounters();
