const fs = require('fs');
const path = require('path');

const root = process.cwd();
const distDir = path.join(root, 'dist');
const appPath = path.join(root, 'src', 'App.tsx');
const sitemapPath = path.join(distDir, 'sitemap.xml');
const indexPath = path.join(distDir, 'index.html');
const siteUrl = 'https://cuantocuestard.com';

const app = fs.readFileSync(appPath, 'utf8');
const toolsDirectoryPath = path.join(root, 'src', 'data', 'toolsDirectory.ts');
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
  return `${siteUrl}${route === '/' ? '/' : `${route.replace(/\/+$/, '')}/`}`;
}

function escapeAttribute(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function extractToolMetadata() {
  const metadata = new Map();
  if (!fs.existsSync(toolsDirectoryPath)) return metadata;

  const source = fs.readFileSync(toolsDirectoryPath, 'utf8');
  const itemBlocks = source.match(/\{\s*title:\s*'[\s\S]*?keywords:\s*\[[\s\S]*?\]\s*\}/g) || [];

  for (const block of itemBlocks) {
    const title = block.match(/title:\s*'([^']+)'/)?.[1];
    const description = block.match(/description:\s*'([^']+)'/)?.[1];
    const route = block.match(/route:\s*'([^']+)'/)?.[1];
    if (title && description && route) {
      metadata.set(route, {
        title: `${title} | CuantoCuestaRD`,
        description,
        schemaType: 'SoftwareApplication'
      });
    }
  }

  return metadata;
}

const toolMetadata = extractToolMetadata();

const staticMetadata = new Map([
  ['/', {
    title: 'CuantoCuestaRD | Calcula y compara costos en Republica Dominicana',
    description: 'Calcula y compara costos reales de supermercado, canasta basica, tramites, vehiculos, courier y gastos mensuales en Republica Dominicana.',
    schemaType: 'WebSite'
  }],
  ['/herramientas', {
    title: 'Directorio de herramientas de costos RD | CuantoCuestaRD',
    description: 'Explora calculadoras de supermercado, costo de vida, courier, vehiculos, tramites y servicios del hogar en Republica Dominicana.',
    schemaType: 'CollectionPage'
  }],
  ['/sobre-nosotros', {
    title: 'Sobre CuantoCuestaRD | Herramientas de costos para RD',
    description: 'Conoce el proposito editorial de CuantoCuestaRD, como ayudamos a planificar gastos en Republica Dominicana y los limites de nuestras estimaciones.',
    schemaType: 'AboutPage'
  }],
  ['/metodologia', {
    title: 'Metodologia | Como calcula CuantoCuestaRD',
    description: 'Consulta como CuantoCuestaRD organiza fuentes, supuestos, formulas y fechas de actualizacion para estimar costos en Republica Dominicana.',
    schemaType: 'WebPage'
  }],
  ['/fuentes', {
    title: 'Fuentes de datos | CuantoCuestaRD',
    description: 'Revisa las fuentes, supuestos y referencias usadas para estimar costos cotidianos, tramites y presupuestos en Republica Dominicana.',
    schemaType: 'WebPage'
  }],
  ['/contacto', {
    title: 'Contacto | CuantoCuestaRD',
    description: 'Contacta a CuantoCuestaRD para soporte, sugerencias, correcciones de datos o alianzas editoriales.',
    schemaType: 'ContactPage'
  }],
  ['/privacidad', {
    title: 'Politica de privacidad | CuantoCuestaRD',
    description: 'Lee como CuantoCuestaRD trata la informacion usada en calculadoras, cookies, analitica y publicidad.',
    schemaType: 'WebPage'
  }],
  ['/terminos', {
    title: 'Terminos de uso | CuantoCuestaRD',
    description: 'Consulta los terminos de uso de CuantoCuestaRD, el caracter informativo de las calculadoras y los limites de responsabilidad.',
    schemaType: 'WebPage'
  }]
]);

function metadataFor(route) {
  return toolMetadata.get(route) || staticMetadata.get(route) || staticMetadata.get('/');
}

function withSeo(html, route) {
  const meta = metadataFor(route);
  const url = canonical(route);
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'CuantoCuestaRD',
      url: siteUrl
    },
    {
      '@context': 'https://schema.org',
      '@type': meta.schemaType,
      name: meta.title,
      description: meta.description,
      url,
      inLanguage: 'es-DO'
    }
  ];

  let output = html
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeAttribute(meta.title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/?>/i, `<meta name="description" content="${escapeAttribute(meta.description)}" />`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${url}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/?>/i, `<meta property="og:title" content="${escapeAttribute(meta.title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/?>/i, `<meta property="og:description" content="${escapeAttribute(meta.description)}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/?>/i, `<meta property="og:url" content="${url}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*"\s*\/?>/i, `<meta name="twitter:title" content="${escapeAttribute(meta.title)}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*"\s*\/?>/i, `<meta name="twitter:description" content="${escapeAttribute(meta.description)}" />`);

  output = output.replace(/<script id="seo-jsonld-schema" type="application\/ld\+json">[\s\S]*?<\/script>/gi, '');
  output = output.replace('</head>', `  <script id="seo-jsonld-schema" type="application/ld+json">${JSON.stringify(schema)}</script>\n  </head>`);

  const isTool = meta.schemaType === 'SoftwareApplication';
  const routeContext = isTool
    ? `<h2>Cómo utilizar esta calculadora</h2><ol><li>Introduce cantidades actuales y revisa la unidad indicada.</li><li>Comprueba el desglose y los supuestos utilizados.</li><li>Compara el resultado con una cotización, tarifa o documento vigente.</li><li>Reserva un margen para cambios de precio e imprevistos.</li></ol><h2>Qué significa el resultado</h2><p>La cifra sirve para crear un presupuesto inicial y comparar escenarios. No constituye un precio garantizado. El monto real puede variar por ciudad, proveedor, fecha, impuestos, tipo de cambio, peso, consumo o características del servicio.</p>`
    : `<h2>Cómo aprovechar esta información</h2><p>Utiliza esta página como punto de partida para organizar un gasto en República Dominicana. Revisa la fecha, identifica la categoría adecuada y abre las herramientas relacionadas para comparar más de un escenario antes de comprar o contratar.</p><h2>Qué debes confirmar</h2><p>Verifica el precio final directamente con el proveedor, organismo o comercio. Una tarifa publicada puede excluir impuestos, recargos, envío, instalación, financiamiento o condiciones particulares.</p>`;
  const trustContext = `<h2>Metodología y fuentes</h2><p>CuantoCuestaRD combina referencias públicas, supuestos documentados y fórmulas reproducibles. Las estimaciones se separan por categoría para que puedas identificar qué variable produce una diferencia. Cuando existe una fuente oficial o comercial relevante, se recomienda consultarla antes de tomar una decisión.</p><h2>Preguntas frecuentes</h2><h3>¿El resultado es un precio oficial?</h3><p>No. Es una estimación educativa y debe confirmarse con una fuente vigente.</p><h3>¿La herramienta guarda mis datos?</h3><p>Las simulaciones públicas no crean deliberadamente un expediente personal con los importes introducidos.</p><h3>¿Cómo informo un dato desactualizado?</h3><p>Utiliza la página de contacto e incluye la URL, el precio observado, la fecha y una fuente verificable.</p><h2>Contenido relacionado</h2><p>Consulta el <a href="/herramientas/">directorio de herramientas</a>, la <a href="/metodologia/">metodología</a> y las <a href="/fuentes/">fuentes de datos</a> para comprender mejor cada cálculo.</p>`;
  const crawlerFallback = `<main id="seo-fallback">
    <nav aria-label="Navegación principal"><a href="/">Inicio</a> · <a href="/herramientas/">Herramientas</a> · <a href="/metodologia/">Metodología</a> · <a href="/fuentes/">Fuentes</a></nav>
    <article>
      <h1>${escapeAttribute(meta.title.replace(/\s*\|\s*CuantoCuestaRD$/, ''))}</h1>
      <p>${escapeAttribute(meta.description)}</p>
      ${routeContext}${trustContext}
      <p>Estimación educativa basada en supuestos públicos y referencias dominicanas. Los resultados pueden variar según precios, tarifas y circunstancias particulares.</p>
    </article>
  </main>`;
  return output.replace('<div id="root"></div>', `<div id="root">${crawlerFallback}</div>`);
}

fs.writeFileSync(indexPath, withSeo(baseIndex, '/'));

for (const route of routes) {
  if (route === '/' || route === '*') continue;
  const routeDir = path.join(distDir, route.replace(/^\//, ''));
  fs.mkdirSync(routeDir, { recursive: true });
  fs.writeFileSync(path.join(routeDir, 'index.html'), withSeo(baseIndex, route));
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
