(() => {
  const canonicalUrl = window.location.origin + window.location.pathname;
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  const title = document.title || 'DevTools Hub — Free Developer & Finance Tools';
  const description = document.querySelector('meta[name="description"]')?.content || 'Fast, private browser-based developer and finance tools.';

  const addMeta = (attrs) => {
    const selector = attrs.property ? `meta[property="${attrs.property}"]` : `meta[name="${attrs.name}"]`;
    let el = document.head.querySelector(selector);
    if (!el) {
      el = document.createElement('meta');
      document.head.appendChild(el);
    }
    Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
  };

  let canonical = document.head.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = canonicalUrl;

  addMeta({ property: 'og:type', content: 'website' });
  addMeta({ property: 'og:title', content: title });
  addMeta({ property: 'og:description', content: description });
  addMeta({ property: 'og:url', content: canonicalUrl });
  addMeta({ name: 'twitter:card', content: 'summary' });
  addMeta({ name: 'twitter:title', content: title });
  addMeta({ name: 'twitter:description', content: description });

  const siteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'DevTools Hub',
    url: window.location.origin + '/',
    description: 'Free browser-based developer and finance tools.'
  };

  const toolHeading = document.querySelector('.tool-hero h1');
  if (toolHeading) {
    siteSchema['@type'] = 'WebApplication';
    siteSchema.applicationCategory = 'DeveloperApplication';
    siteSchema.operatingSystem = 'Any';
    siteSchema.name = toolHeading.textContent.trim();
    siteSchema.url = canonicalUrl;
    siteSchema.offers = { '@type': 'Offer', price: '0', priceCurrency: 'USD' };
  }

  const schema = document.createElement('script');
  schema.type = 'application/ld+json';
  schema.textContent = JSON.stringify(siteSchema);
  document.head.appendChild(schema);

  window.devToolsHub = window.devToolsHub || {};
  window.devToolsHub.track = (eventName, params = {}) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: eventName, ...params });
  };
})();
