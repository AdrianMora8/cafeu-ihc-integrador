#!/usr/bin/env node
/**
 * Servidor estático mínimo para ejecutar CaféU sin instalar dependencias.
 *
 * Uso:
 *   node herramientas/servidor.mjs                      → sirve `src/`
 *   node herramientas/servidor.mjs prototipos/version-v1 → sirve la copia congelada de v1
 *
 * Los módulos ES del navegador no funcionan abriendo el HTML con doble clic (file://),
 * por eso hace falta servirlos por HTTP.
 */
import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const raizProyecto = resolve(fileURLToPath(new URL('..', import.meta.url)));
const carpeta = resolve(raizProyecto, process.argv[2] ?? 'src');
const puerto = Number(process.env.PORT ?? 8080);

const TIPOS = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
};

if (!existsSync(carpeta) || !statSync(carpeta).isDirectory()) {
  console.error(`No existe la carpeta: ${carpeta}`);
  process.exit(1);
}

const servidor = createServer((peticion, respuesta) => {
  const { pathname } = new URL(peticion.url, 'http://localhost');
  if (pathname === '/') {
    respuesta.writeHead(302, { Location: '/presentation/index.html' });
    return respuesta.end();
  }
  const ruta = normalize(join(carpeta, decodeURIComponent(pathname)));
  const dentro = ruta === carpeta || ruta.startsWith(carpeta + sep);
  if (!dentro || !existsSync(ruta) || !statSync(ruta).isFile()) {
    respuesta.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    return respuesta.end('No encontrado');
  }
  respuesta.writeHead(200, { 'Content-Type': TIPOS[extname(ruta)] ?? 'application/octet-stream', 'Cache-Control': 'no-store' });
  createReadStream(ruta).pipe(respuesta);
});

servidor.listen(puerto, () => {
  console.log(`CaféU disponible en http://localhost:${puerto}/  (sirviendo ${carpeta})`);
});
