// ==== Dados dos treinamentos ====
// available:true  -> card com botão "Acessar trilha"
// available:false -> card "Em breve"
const trainings = [
  { name:'Power Apps', icon:'⚡', desc:'Crie aplicativos low-code para automatizar processos do dia a dia.', level:'Intermediário', available:true, link:'https://syensqosa.sharepoint.com/sites/GBU%20PC-ITA-DIGITAL-OPS-LATAM/Material%20Treinamentos/Forms/AllItems.aspx?id=%2Fsites%2FGBU%20PC%2DITA%2DDIGITAL%2DOPS%2DLATAM%2FMaterial%20Treinamentos%2FV%C3%ADdeo%5FAulas%2FPowerApps&viewid=4fe91fed%2D9e40%2D4786%2D9642%2Dd7aed7b58204&npsAction=createList' },
  { name:'Seeq', icon:'📈', desc:'Análise avançada de dados de séries temporais industriais.', level:'Avançado', available:false },
  { name:'PI Vision', icon:'🖥️', desc:'Visualização de dados de processo em tempo real com dashboards.', level:'Intermediário', available:false },
  { name:'Power Automate', icon:'🔁', desc:'Automatize fluxos de trabalho e integre sistemas sem código.', level:'Iniciante', available:false },
  { name:'Power BI', icon:'📊', desc:'Construa relatórios e dashboards interativos de dados.', level:'Avançado', available:false },
  { name:'PI System', icon:'🏭', desc:'Fundamentos de coleta e historização de dados de processo.', level:'Avançado', available:false },
];

// ==== Casos de sucesso ====
const cases = [
  {
    icon:'⚡', tool:'Power Apps',
    title:'Digitalização de inspeções de campo',
    desc:'Substituição de checklists em papel por um app móvel que registra inspeções, fotos e assinaturas em tempo real, com dados sincronizados automaticamente para dashboards.',
  },
  {
    icon:'📈', tool:'Seeq',
    title:'Otimização de coluna de destilação via EDA',
    desc:'Análise exploratória de dados (EDA) sobre séries temporais das variáveis de processo que governam a destilação. Foram identificados padrões e correlações entre variáveis manipuladas e a qualidade de produto, revelando janelas operacionais ótimas e reduzindo a variabilidade do processo para maximizar pureza e eficiência energética.',
  },
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
    <article class="card ${t.available ? '' : 'soon'}" style="animation-delay:${i*60}ms">
      <div class="card-ic">${t.icon}</div>
      <h3>${t.name}</h3>
      <p class="card-desc">${t.desc}</p>
      <span class="badge ${t.level}">${t.level}</span>
      <div class="card-foot">
        ${t.available
          ? `<a class="card-link" href="${t.link}" target="_blank" rel="noopener">Acessar trilha →</a>`
          : `<span class="soon-tag">Em breve</span>`}
      </div>
    </article>`).join('');
  emptyState.hidden = list.length !== 0;
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

// Casos de sucesso
document.getElementById('casesList').innerHTML = cases.map(c => `
  <article class="case-card">
    <div class="case-head">
      <div class="case-ic">${c.icon}</div>
      <div>
        <span class="case-tool">${c.tool}</span>
        <h3>${c.title}</h3>
      </div>
    </div>
    <p class="case-desc">${c.desc}</p>
  </article>`).join('');

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
