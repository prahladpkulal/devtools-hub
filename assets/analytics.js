(() => {
  const track = (eventName, params = {}) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: eventName, ...params });
  };

  window.devToolsHub = window.devToolsHub || {};
  window.devToolsHub.track = track;

  document.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (button) {
      track('tool_action', {
        tool_action: button.textContent.trim().toLowerCase(),
        page_path: window.location.pathname
      });
    }

    const link = event.target.closest('a.tool-card');
    if (link) {
      track('tool_open', {
        tool_name: link.querySelector('h3')?.textContent.trim() || link.href,
        tool_path: new URL(link.href, window.location.origin).pathname
      });
    }
  });
})();
