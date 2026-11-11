import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const routes = {"/": ["Carlos Pérez | Ingeniería y transformación digital", "Carlos Pérez: ingeniería, infraestructura digital y visión estratégica para conectar tecnología, personas y transformación."], "/history/": ["Mi historia | Carlos Pérez", "Una trayectoria construida en campo, proyectos internacionales, liderazgo e infraestructura crítica."], "/projects/": ["Proyectos | Carlos Pérez", "Casos de ingeniería de telecomunicaciones y demostraciones educativas interactivas."], "/ideas/": ["Ideas | Carlos Pérez", "Perspectivas sobre infraestructura de Internet, seguridad del enrutamiento y colaboración internacional."], "/contact/": ["Contacto | Carlos Pérez", "Conversemos sobre tecnología, infraestructura y colaboración en ingeniería."], "/article/rpki-ghost/": ["RPKI y seguridad del enrutamiento | Carlos Pérez", "Un artículo sobre seguridad del enrutamiento y validación de rutas mediante RPKI."]};
const dist = 'dist';
const template = await readFile(join(dist, 'index.html'), 'utf8');
const { render } = await import(pathToFileURL(join(process.cwd(), '.seo-ssr/entry-server.js')).href);
const escape = value => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
for (const [route, [esTitle, esDescription]] of Object.entries(routes)) {
 for (const lang of ['es', 'en']) {
  const localizedRoute = lang === 'en' ? `/en${route}` : route;
  const translations = {
    '/': ['Carlos Pérez | Technology & Critical Infrastructure', 'Engineering experience, technology, and strategic vision for critical telecommunications infrastructure.'],
    '/history/': ['My Story | Carlos Pérez', 'A career shaped by field engineering, international projects, leadership, and critical infrastructure.'],
    '/projects/': ['Projects | Carlos Pérez', 'Telecommunications engineering projects and interactive educational demonstrations.'],
    '/ideas/': ['Ideas | Carlos Pérez', 'Perspectives on Internet infrastructure, routing security, and collaboration.'],
    '/contact/': ['Contact | Carlos Pérez', 'Let’s talk about technology, infrastructure, and engineering collaboration.'],
    '/article/rpki-ghost/': ['RPKI and Routing Security | Carlos Pérez', 'An article about routing security and RPKI route validation.']
  };
  const [title, description] = lang === 'en' ? translations[route] : [esTitle, esDescription];
  const url = `https://carlosperez.cr${localizedRoute}`;
  const content = render(localizedRoute);
  if (!content.includes('<main')) throw new Error(`No main content rendered for ${localizedRoute}`);
  let html = template.replace('<div id="root"></div>', `<div id="root">${content}</div>`);
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escape(title)}</title>`);
  html = html.replace('<html lang="es">', `<html lang="${lang}">`);
  html = html.replace('<meta property="og:locale" content="es_CR" />', `<meta property="og:locale" content="${lang === 'en' ? 'en_US' : 'es_CR'}" />`);
  html = html.replace('</head>', `<link rel="alternate" hreflang="es" href="https://carlosperez.cr${route}" />\n  <link rel="alternate" hreflang="en" href="https://carlosperez.cr/en${route}" />\n</head>`);
  html = html.replace(/(<meta name="description" content=")[^"]*(" \/>)/, `$1${escape(description)}$2`);
  html = html.replace(/(<link rel="canonical" href=")[^"]*(" \/>)/, `$1${url}$2`);
  for (const prop of ['og:title', 'twitter:title']) {
    html = html.replace(new RegExp(`(<meta (?:property|name)="${prop}" content=")[^"]*(" \/>)`), `$1${escape(title)}$2`);
  }
  for (const prop of ['og:description', 'twitter:description']) {
    html = html.replace(new RegExp(`(<meta (?:property|name)="${prop}" content=")[^"]*(" \/>)`), `$1${escape(description)}$2`);
  }
  html = html.replace(/(<meta property="og:url" content=")[^"]*(" \/>)/, `$1${url}$2`);
  const target = localizedRoute === '/' ? dist : join(dist, localizedRoute.slice(1));
  await mkdir(target, { recursive: true });
  await writeFile(join(target, 'index.html'), html);
  console.log(`Prerendered ${localizedRoute} (${content.length} chars)`);
 }
}
const urls = Object.keys(routes).flatMap(route => [route, `/en${route}`]).map(route => `  <url><loc>https://carlosperez.cr${route}</loc></url>`).join('\n');
await writeFile(join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
await rm('.seo-ssr', { recursive: true, force: true });
