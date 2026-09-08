(() => {
  const GA_ID = 'G-D2DS1M4Z34';

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () {
    window.dataLayer.push(arguments);
  };

  if (!document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${GA_ID}"]`)) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);
  }

  window.gtag('js', new Date());
  window.gtag('config', GA_ID, {
    page_title: document.title,
    page_location: window.location.href
  });

  const track = (eventName, params = {}) => {
    window.dataLayer.push({ event: eventName, ...params });
    window.gtag('event', eventName, params);
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
