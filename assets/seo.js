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
  addMeta({ property: 'og:site_name', content: 'DevTools Hub' });
  addMeta({ name: 'twitter:card', content: 'summary' });
  addMeta({ name: 'twitter:title', content: title });
  addMeta({ name: 'twitter:description', content: description });

  const toolHeading = document.querySelector('.tool-hero h1');
  const schema = {
    '@context': 'https://schema.org',
    '@type': toolHeading ? 'WebApplication' : 'WebSite',
    name: toolHeading ? toolHeading.textContent.trim() : 'DevTools Hub',
    url: canonicalUrl,
    description,
    inLanguage: 'en',
    isAccessibleForFree: true
  };

  if (toolHeading) {
    schema.applicationCategory = 'DeveloperApplication';
    schema.operatingSystem = 'Any';
    schema.offers = { '@type': 'Offer', price: '0', priceCurrency: 'USD' };
  } else {
    schema.url = window.location.origin + '/';
    schema.potentialAction = {
      '@type': 'SearchAction',
      target: `${window.location.origin}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    };
  }

  const existingSchema = document.head.querySelector('script[data-devtools-schema]');
  if (!existingSchema) {
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.dataset.devtoolsSchema = 'true';
    schemaScript.textContent = JSON.stringify(schema);
    document.head.appendChild(schemaScript);
  }

  window.devToolsHub = window.devToolsHub || {};
  window.devToolsHub.track = (eventName, params = {}) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: eventName, ...params });
  };
})();
