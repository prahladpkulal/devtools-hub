(() => {
  const KEY = 'devtools-hub-theme';
  const root = document.documentElement;
  const media = window.matchMedia('(prefers-color-scheme: dark)');

  function getPreference() {
    const saved = localStorage.getItem(KEY);
    return saved === 'light' || saved === 'dark' || saved === 'system' ? saved : 'system';
  }

  function applyTheme(preference) {
    const resolved = preference === 'system' ? (media.matches ? 'dark' : 'light') : preference;
    root.dataset.themePreference = preference;
    root.dataset.theme = resolved;
    root.style.colorScheme = resolved;
    document.querySelectorAll('[data-theme-choice]').forEach(button => {
      const active = button.dataset.themeChoice === preference;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
  }

  function setPreference(preference) {
    localStorage.setItem(KEY, preference);
    applyTheme(preference);
  }

  window.devToolsHubTheme = { getPreference, setPreference, applyTheme };
  applyTheme(getPreference());
  media.addEventListener?.('change', () => {
    if (getPreference() === 'system') applyTheme('system');
  });
  document.addEventListener('click', event => {
    const button = event.target.closest('[data-theme-choice]');
    if (button) setPreference(button.dataset.themeChoice);
  });
})();
