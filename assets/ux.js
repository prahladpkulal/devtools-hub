(() => {
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  if (navToggle && mainNav) {
    mainNav.classList.remove('is-open');
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

  const aliases = {
    'json formatter': ['json format', 'json formator', 'json beautifier', 'json validator', 'format json'],
    'xml formatter': ['xml format', 'xml formator', 'xml beautifier', 'xml validator', 'format xml'],
    'sql formatter': ['sql format', 'sql beautifier', 'format sql'],
    'base64 encoder decoder': ['base64 encode', 'base64 decode', 'base 64', 'base64 converter'],
    'url encoder decoder': ['url encode', 'url decode', 'uri encode', 'uri decoder'],
    'epoch timestamp unix converter': ['epoch converter', 'epoch convertor', 'unix timestamp', 'unix time', 'timestamp converter', 'timestamp convertor'],
    'cron generator expression scheduler': ['cron generator', 'cron expression', 'cron expression generator', 'crontab'],
    'jwt json web token decoder inspector': ['jwt decoder', 'jwt decode', 'json web token decoder'],
    'uuid generator v4 identifier random': ['uuid generator', 'uuid gen', 'guid generator'],
    'regex tester regular expression match': ['regex tester', 'regex test', 'regular expression tester'],
    'emi loan home personal interest repayment calculator': ['emi calculator', 'loan emi', 'home loan emi', 'personal loan emi'],
    'sip systematic investment plan mutual fund investment returns calculator': ['sip calculator', 'systematic investment plan', 'sip return calculator'],
    'gst goods services tax cgst sgst inclusive exclusive calculator': ['gst calculator', 'gst inclusive', 'gst exclusive', 'cgst sgst'],
    'salary hike increment calculator ctc raise': ['salary hike', 'salary increment', 'salary increase', 'ctc hike'],
    'ctc in hand salary calculator monthly gross': ['ctc calculator', 'in hand salary', 'in hand calculator', 'salary calculator'],
    'percentage calculator percent change': ['percentage calculator', 'percent calculator', 'percentage change']
  };

  const normalize = value => (value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');

  function editDistance(a, b) {
    if (a === b) return 0;
    if (!a) return b.length;
    if (!b) return a.length;
    const previous = Array.from({ length: b.length + 1 }, (_, i) => i);
    for (let i = 1; i <= a.length; i++) {
      let diagonal = previous[0];
      previous[0] = i;
      let left = i;
      for (let j = 1; j <= b.length; j++) {
        const current = previous[j];
        previous[j] = Math.min(
          previous[j] + 1,
          left + 1,
          diagonal + (a[i - 1] === b[j - 1] ? 0 : 1)
        );
        diagonal = current;
        left = previous[j];
      }
    }
    return previous[b.length];
  }

  function toolTerms(card) {
    const name = normalize(card.dataset.name || '');
    const title = normalize(card.querySelector('h3')?.textContent || '');
    const terms = [name, title];
    Object.entries(aliases).forEach(([key, values]) => {
      if (name.includes(key)) terms.push(...values.map(normalize));
    });
    return [...new Set(terms.filter(Boolean))];
  }

  function scoreTool(card, query) {
    const q = normalize(query);
    if (!q) return 0;
    const terms = toolTerms(card);
    let best = 0;

    terms.forEach(term => {
      if (term === q) best = Math.max(best, 100);
      else if (term.startsWith(q)) best = Math.max(best, 90);
      else if (term.includes(q)) best = Math.max(best, 80);
      else {
        const queryWords = q.split(' ');
        const termWords = term.split(' ');
        let wordScore = 0;
        queryWords.forEach(word => {
          if (word.length < 3) return;
          const closest = Math.min(...termWords.map(termWord => editDistance(word, termWord)));
          const threshold = word.length >= 7 ? 2 : 1;
          if (closest <= threshold) wordScore += 30;
        });
        if (wordScore === queryWords.length * 30) best = Math.max(best, 60);
      }
    });

    return best;
  }

  function findBestTool(query) {
    return cards
      .filter(card => activeFilter === 'all' || card.dataset.category === activeFilter)
      .map(card => ({ card, score: scoreTool(card, query) }))
      .filter(result => result.score > 0)
      .sort((a, b) => b.score - a.score)[0]?.card || null;
  }

  function applyFilters() {
    const query = (search?.value || '').trim();
    let visible = 0;
    cards.forEach(card => {
      const matchesQuery = !query || scoreTool(card, query) > 0;
      const matchesFilter = activeFilter === 'all' || card.dataset.category === activeFilter;
      const show = matchesQuery && matchesFilter;
      card.hidden = !show;
      if (show) visible++;
    });
    if (noResults) noResults.hidden = visible !== 0;
    document.querySelectorAll('#developer-tools, #finance-tools').forEach(section => {
      section.hidden = !Array.from(section.querySelectorAll('.tool-card')).some(card => !card.hidden);
    });
    const count = document.getElementById('resultCount');
    if (count) count.textContent = visible + (visible === 1 ? ' tool' : ' tools') + (query || activeFilter !== 'all' ? ' found' : ' available');
  }

  search?.addEventListener('input', applyFilters);
  search?.addEventListener('keydown', event => {
    if (event.key === 'Enter' && search.value.trim()) {
      const bestTool = findBestTool(search.value);
      if (bestTool) {
        bestTool.click();
        return;
      }
    }

    if (event.key === 'Escape') {
      search.value = '';
      activeFilter = 'all';
      filters.forEach(item => {
        const selected = item.dataset.filter === 'all';
        item.classList.toggle('active', selected);
        item.setAttribute('aria-pressed', String(selected));
      });
      applyFilters();
      search.blur();
    }
  });

  filters.forEach(button => button.addEventListener('click', () => {
    activeFilter = button.dataset.filter || 'all';
    filters.forEach(item => {
      const selected = item === button;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    applyFilters();
  }));

  document.getElementById('resetSearch')?.addEventListener('click', () => {
    search.value = '';
    filters.find(button => button.dataset.filter === 'all')?.click();
    search.focus();
  });
  mainNav?.addEventListener('keydown', event => {
    if (event.key === 'Escape' && mainNav.classList.contains('is-open')) {
      mainNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.focus();
    }
  });
  applyFilters();
})();
