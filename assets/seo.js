(() => {
  const canonicalUrl = window.location.origin + window.location.pathname;
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  const baseTitle = document.title || 'DevTools Hub — Free Developer & Finance Tools';
  const baseDescription = document.querySelector('meta[name="description"]')?.content || 'Fast, private browser-based developer and finance tools.';
  const intents = {
    '/tools/json-formatter.html':['JSON Formatter & Validator Online | JSON Beautifier | DevTools Hub','Format, beautify, validate and minify JSON online for free. Use this JSON formatter, JSON beautifier and JSON validator for APIs, configuration and debugging.','json formatter, json formator, json beautifier, json pretty print, json validator, format json online'],
    '/tools/xml-formatter.html':['XML Formatter & Beautifier Online | XML Formator | DevTools Hub','Format, beautify and validate XML online for free. Use this XML formatter, XML formator and XML pretty printer for SOAP, API and configuration XML directly in your browser.','xml formatter, xml formator, xml beautifier, xml pretty printer, format xml online, xml validator'],
    '/tools/sql-formatter.html':['SQL Formatter & Beautifier Online | SQL Pretty Printer | DevTools Hub','Format and beautify SQL queries online for free. Use this SQL formatter and SQL pretty printer to make database queries easier to read and debug.','sql formatter, sql formator, sql beautifier, sql pretty printer, format sql online, sql query formatter'],
    '/tools/base64.html':['Base64 Encoder & Decoder Online | Base64 Converter | DevTools Hub','Encode and decode Base64 text online for free. Fast browser-based Base64 encoder, decoder and converter with no upload required.','base64 encoder, base64 decoder, base64 converter, encode base64, decode base64, base64 online'],
    '/tools/url-encoder.html':['URL Encoder & Decoder Online | URL Encode Decode Tool | DevTools Hub','Encode and decode URLs and URL components online for free. Use this URL encoder, URL decoder and URI encoding tool directly in your browser.','url encoder, url decoder, url encode, url decode, uri encoder, uri decoder'],
    '/tools/epoch.html':['Unix Timestamp Converter & Epoch Converter Online | DevTools Hub','Convert Unix epoch timestamps, Unix time and timestamps between seconds, milliseconds, local date and UTC online for free. Useful as an epoch converter or timestamp converter.','epoch converter, epoch convertor, unix timestamp converter, unix time converter, timestamp converter, timestamp to date'],
    '/tools/cron.html':['Cron Expression Generator Online | Cron Job Generator | DevTools Hub','Create and understand common cron expressions online for free. Generate cron schedules for Linux, Unix and scheduled jobs with this cron generator.','cron generator, cron expression generator, cron job generator, cron schedule generator, crontab generator'],
    '/tools/jwt-decoder.html':['JWT Decoder & Inspector Online | JWT Parser | DevTools Hub','Decode and inspect JWT tokens online for free. View JWT header and payload claims directly in your browser without uploading the token.','jwt decoder, jwt decode, jwt parser, jwt token decoder, json web token decoder, jwt inspector'],
    '/tools/uuid-generator.html':['UUID Generator Online | UUID v4 Generator | DevTools Hub','Generate random UUID version 4 identifiers online for free. Create one or many UUIDs instantly in your browser.','uuid generator, uuid v4 generator, guid generator, random uuid generator, uuid gen'],
    '/tools/regex-tester.html':['Regex Tester & Regular Expression Tester Online | DevTools Hub','Test regular expressions against text online for free. Find matches and capture groups with this browser-based regex tester.','regex tester, regex test, regular expression tester, regex checker, regexp tester'],
    '/tools/emi-calculator.html':['EMI Calculator - Home Loan & Personal Loan EMI Calculator | DevTools Hub','Calculate monthly loan EMI, total interest and total repayment online for free. Use this home loan, personal loan and car loan EMI calculator.','emi calculator, emi calculator online, home loan emi calculator, personal loan emi calculator, car loan emi calculator'],
    '/tools/sip-calculator.html':['SIP Calculator - Mutual Fund SIP Return Calculator | DevTools Hub','Calculate SIP maturity value, estimated returns and total investment online for free. Adjust monthly investment, expected return and tenure instantly.','sip calculator, sip calculator online, mutual fund sip calculator, sip return calculator, sip maturity calculator'],
    '/tools/gst-calculator.html':['GST Calculator - GST Inclusive & Exclusive Calculator | DevTools Hub','Calculate GST amount, CGST, SGST and total price online for free. Add GST to a base price or remove GST from a tax-inclusive amount.','gst calculator, gst calculator online, gst inclusive calculator, gst exclusive calculator, cgst sgst calculator'],
    '/tools/salary-hike.html':['Salary Hike Calculator - Salary Increment & Percentage Calculator | DevTools Hub','Calculate salary hike percentage, increment amount and new salary or CTC online for free. Compare old and new compensation instantly.','salary hike calculator, salary increment calculator, salary increase calculator, hike percentage calculator, ctc hike calculator'],
    '/tools/ctc-calculator.html':['CTC to In-Hand Salary Calculator | Salary Calculator Online | DevTools Hub','Estimate monthly in-hand salary from annual CTC online for free. Calculate approximate gross and monthly salary from compensation details.','ctc calculator, ctc to in hand salary calculator, in hand salary calculator, salary calculator, monthly salary calculator'],
    '/tools/percentage.html':['Percentage Calculator Online | Percent Change Calculator | DevTools Hub','Calculate percentages, percentage increase, decrease and change online for free. Simple percentage calculator for everyday calculations.','percentage calculator, percentage calculator online, percent calculator, percentage increase calculator, percentage decrease calculator']
  };
  const intent = intents[path];
  const title = intent?.[0] || baseTitle;
  const description = intent?.[1] || baseDescription;
  const addMeta = attrs => {
    const selector = attrs.property ? `meta[property="${attrs.property}"]` : `meta[name="${attrs.name}"]`;
    let el = document.head.querySelector(selector);
    if (!el) { el = document.createElement('meta'); document.head.appendChild(el); }
    Object.entries(attrs).forEach(([key,value]) => el.setAttribute(key,value));
  };
  if (intent) {
    document.title = title;
    addMeta({name:'description',content:description});
    addMeta({name:'keywords',content:intent[2]});
  }
  let canonical = document.head.querySelector('link[rel="canonical"]');
  if (!canonical) { canonical = document.createElement('link'); canonical.rel='canonical'; document.head.appendChild(canonical); }
  canonical.href = canonicalUrl;
  addMeta({property:'og:type',content:'website'});
  addMeta({property:'og:title',content:title});
  addMeta({property:'og:description',content:description});
  addMeta({property:'og:url',content:canonicalUrl});
  addMeta({property:'og:site_name',content:'DevTools Hub'});
  addMeta({name:'twitter:card',content:'summary'});
  addMeta({name:'twitter:title',content:title});
  addMeta({name:'twitter:description',content:description});
  const toolHeading = document.querySelector('.tool-hero h1');
  const schema = {'@context':'https://schema.org','@type':toolHeading?'WebApplication':'WebSite',name:toolHeading?toolHeading.textContent.trim():'DevTools Hub',url:canonicalUrl,description,inLanguage:'en',isAccessibleForFree:true};
  if (toolHeading) { schema.applicationCategory='DeveloperApplication'; schema.operatingSystem='Any'; schema.offers={'@type':'Offer',price:'0',priceCurrency:'USD'}; }
  else { schema.url=window.location.origin+'/'; schema.potentialAction={'@type':'SearchAction',target:`${window.location.origin}/?q={search_term_string}`,'query-input':'required name=search_term_string'}; }
  if (!document.head.querySelector('script[data-devtools-schema]')) { const script=document.createElement('script'); script.type='application/ld+json'; script.dataset.devtoolsSchema='true'; script.textContent=JSON.stringify(schema); document.head.appendChild(script); }
  window.devToolsHub=window.devToolsHub||{};
  window.devToolsHub.track=(eventName,params={})=>{window.dataLayer=window.dataLayer||[];window.dataLayer.push({event:eventName,...params});};
})();