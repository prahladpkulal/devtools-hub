# DevTools Hub

A deployable, static developer/finance tools website.

## Included
- JSON Formatter / Validator
- XML Formatter
- SQL Formatter
- Base64 Encoder / Decoder
- URL Encoder / Decoder
- Unix Epoch Converter
- Cron Generator
- Salary Hike Calculator
- CTC / Monthly Gross Calculator
- Percentage Calculator
- Privacy, Terms, About and Contact pages
- robots.txt and sitemap.xml
- Responsive design and tool search

## Local test
Python 3:
```bash
python3 -m http.server 8080
```
Open http://localhost:8080

## Deploy to Cloudflare Pages
1. Create a GitHub repository.
2. Push this folder.
3. In Cloudflare Workers & Pages, create a Pages project from the Git repository.
4. Production branch: `main`
5. Build command: `exit 0`
6. Build output directory: `.`
7. Deploy.
8. Replace YOUR-DOMAIN.com in robots.txt and sitemap.xml.
9. Add your real contact details.
10. Add your analytics and AdSense snippets only after the accounts/sites are configured.

## Monetization
AdSense placeholders are intentionally not hardcoded with fake publisher IDs. Add the official code from your AdSense account after site approval.
