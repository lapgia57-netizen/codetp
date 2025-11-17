// script.js - Tải dữ liệu decades.json và render giao diện
const DATA_PATH = 'data/decades.json';

const state = {
  decades: [],     // toàn bộ dữ liệu
  activeDecade: 'all',
  query: ''
};

function el(id){ return document.getElementById(id) }

async function loadData() {
  try {
    const res = await fetch(DATA_PATH);
    if (!res.ok) throw new Error('Không thể tải dữ liệu: ' + res.status);
    const json = await res.json();
    state.decades = json.decades || [];
    renderDecadeButtons();
    renderGallery();
  } catch (err) {
    const g = el('gallery');
    g.innerHTML = `<p class="muted">Lỗi khi tải dữ liệu: ${err.message}</p>`;
    console.error(err);
  }
}

function renderDecadeButtons(){
  const container = el('decade-buttons');
  container.innerHTML = '';
  const allBtn = createDecadeButton('all', 'Tất cả');
  container.appendChild(allBtn);
  state.decades.forEach(d => {
    const btn = createDecadeButton(d.id, d.label);
    container.appendChild(btn);
  });
}

function createDecadeButton(id, label){
  const btn = document.createElement('button');
  btn.className = 'decade-btn' + (state.activeDecade === id ? ' active' : '');
  btn.textContent = label;
  btn.dataset.decade = id;
  btn.addEventListener('click', () => {
    state.activeDecade = id;
    document.querySelectorAll('.decade-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderGallery();
  });
  return btn;
}

function renderGallery(){
  const gallery = el('gallery');
  gallery.innerHTML = '';
  const items = filteredItems();
  if (!items.length){
    gallery.innerHTML = `<p class="muted">Không tìm thấy trang phục phù hợp.</p>`;
    return;
  }
  items.forEach(item => {
    const card = createCard(item);
    gallery.appendChild(card);
  });
}

function filteredItems(){
  let items = [];
  if (state.activeDecade === 'all'){
    state.decades.forEach(d => items.push(...d.items));
  } else {
    const d = state.decades.find(x => x.id === state.activeDecade);
    if (d) items = [...d.items];
  }
  if (state.query && state.query.trim()){
    const q = state.query.toLowerCase();
    items = items.filter(it =>
      (it.title && it.title.toLowerCase().includes(q)) ||
      (it.description && it.description.toLowerCase().includes(q)) ||
      (it.tags && it.tags.join(' ').toLowerCase().includes(q)) ||
      String(it.year).includes(q)
    );
  }
  // sort theo year tăng dần
  items.sort((a,b) => (a.year || 0) - (b.year || 0));
  return items;
}

function createCard(item){
  const div = document.createElement('article');
  div.className = 'card';
  div.tabIndex = 0;
  div.setAttribute('role','button');
  div.innerHTML = `
    <img src="${item.image}" alt="${escapeHtml(item.title)}" loading="lazy" />
    <div class="card-body">
      <h3 class="card-title">${escapeHtml(item.title)}</h3>
      <div class="card-year">${item.year} · ${escapeHtml(item.decadeLabel || '')}</div>
      <p class="card-desc">${escapeHtml(item.description || '')}</p>
      <div class="tags">${(item.tags || []).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('')}</div>
    </div>
  `;
  div.addEventListener('click', () => openModal(item));
  div.addEventListener('keypress', (e) => { if(e.key === 'Enter') openModal(item) });
  return div;
}

function openModal(item){
  const modal = el('detail-modal');
  modal.setAttribute('aria-hidden','false');
  el('modal-image').src = item.image;
  el('modal-image').alt = item.title;
  el('modal-title').textContent = item.title;
  el('modal-year').textContent = 
`${item.year} · ${item.decadeLabel || ''}`;
  el('modal-desc').textContent = item.description || '';
  el('modal-tags').innerHTML = (item.tags || []).map(t => `<span class="tag">${t}</span>`).join(' ');
  // focus close button for accessibility
  el('modal-close').focus();
}

function closeModal(){
  const modal = el('detail-modal');
  modal.setAttribute('aria-hidden','true');
  el('modal-image').src = '';
}

function escapeHtml(str){
  if (!str) return '';
  return String(str)
    .replaceAll('&','&amp;')
    .replaceAll('<','&lt;')
    .replaceAll('>','&gt;')
    .replaceAll('"','&quot;')
    .replaceAll("'",'&#039;');
}

function setupSearch(){
  const input = el('search-input');
  input.addEventListener('input', (e) => {
    state.query = e.target.value;
    renderGallery();
  });
}

function setupModalHandlers(){
  el('modal-close').addEventListener('click', closeModal);
  // Close when click outside content
  document.getElementById('detail-modal').addEventListener('click', (e) => {
    if (e.target.id === 'detail-modal') closeModal();
  });
  // close on Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

// init
document.addEventListener('DOMContentLoaded', () => {
  setupSearch();
  setupModalHandlers();
  loadData();
});
