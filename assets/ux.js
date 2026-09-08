(() => {
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const open = mainNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
    mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      mainNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }));
  }

  const cards = Array.from(document.querySelectorAll('.tool-card'));
  const search = document.getElementById('toolSearch');
  const noResults = document.getElementById('noResults');
  const filters = Array.from(document.querySelectorAll('[data-filter]'));
  let activeFilter = 'all';

  function applyFilters() {
    const query = (search?.value || '').toLowerCase().trim();
    let visible = 0;
    cards.forEach(card => {
      const matchesQuery = !query || (card.dataset.name || '').toLowerCase().includes(query);
      const matchesFilter = activeFilter === 'all' || card.dataset.category === activeFilter;
      const show = matchesQuery && matchesFilter;
      card.hidden = !show;
      if (show) visible++;
    });
    if (noResults) noResults.hidden = visible !== 0;
  }

  search?.addEventListener('input', applyFilters);
  filters.forEach(button => button.addEventListener('click', () => {
    activeFilter = button.dataset.filter || 'all';
    filters.forEach(item => {
      const selected = item === button;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    applyFilters();
  }));
  applyFilters();
})();
