const fs = require('fs');
const path = require('path');

const root = process.cwd();
const distDir = path.join(root, 'dist');
const appPath = path.join(root, 'src', 'App.tsx');
const sitemapPath = path.join(distDir, 'sitemap.xml');
const indexPath = path.join(distDir, 'index.html');
const siteUrl = 'https://cuantocuestard.com';

const app = fs.readFileSync(appPath, 'utf8');
const routes = [...app.matchAll(/<Route path="([^"]+)"/g)]
  .map((match) => match[1])
  .filter((route) => route !== '*');
const today = new Date().toISOString().slice(0, 10);
const baseIndex = fs.readFileSync(indexPath, 'utf8');

function priority(route) {
  if (route === '/') return '1.0';
  if (['/herramientas', '/sobre-nosotros', '/metodologia', '/fuentes'].includes(route)) return '0.9';
  if (['/contacto', '/privacidad', '/terminos'].includes(route)) return '0.6';
  return '0.8';
}

function canonical(route) {
  return `${siteUrl}${route === '/' ? '/' : route}`;
}

function withCanonical(html, route) {
  return html
    .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${canonical(route)}" />`)
    .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${canonical(route)}" />`);
}

for (const route of routes) {
  if (route === '/' || route === '*') continue;
  const routeDir = path.join(distDir, route.replace(/^\//, ''));
  fs.mkdirSync(routeDir, { recursive: true });
  fs.writeFileSync(path.join(routeDir, 'index.html'), withCanonical(baseIndex, route));
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((route) => `  <url>
    <loc>${canonical(route)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority(route)}</priority>
  </url>`).join('\n')}
</urlset>
`;

fs.writeFileSync(sitemapPath, sitemap);
