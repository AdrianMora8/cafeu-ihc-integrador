import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'src');

function archivosJs(carpeta) {
  return readdirSync(join(raiz, carpeta), { recursive: true, withFileTypes: true })
    .filter((e) => e.isFile() && e.name.endsWith('.js'))
    .map((e) => join(e.parentPath ?? e.path, e.name));
}

/** Devuelve la capa de cada import relativo ('domain', 'application', ...) o 'externo'. */
function capasImportadas(archivo) {
  const codigo = readFileSync(archivo, 'utf8');
  const importaciones = [...codigo.matchAll(/(?:from|import)\s+['"]([^'"]+)['"]/g)].map((m) => m[1]);
  return importaciones.map((ruta) => {
    if (!ruta.startsWith('.')) return 'externo';
    return relative(raiz, resolve(dirname(archivo), ruta)).split('/')[0];
  });
}

describe('[RNF-04] Regla de dependencias entre capas', () => {
  const reglas = {
    domain: ['domain'],
    application: ['application', 'domain'],
    infrastructure: ['infrastructure', 'application', 'domain'],
    presentation: ['presentation', 'application'],
  };

  for (const [capa, permitidas] of Object.entries(reglas)) {
    it(`${capa} solo depende de: ${permitidas.join(', ')}`, () => {
      const archivos = archivosJs(capa);
      assert.ok(archivos.length > 0, `la capa ${capa} no tiene archivos`);
      for (const archivo of archivos) {
        // La raíz de composición es el único archivo de presentación que conoce la infraestructura.
        const extra = capa === 'presentation' && archivo.endsWith('main.js') ? ['infrastructure'] : [];
        for (const destino of capasImportadas(archivo)) {
          assert.ok(
            destino !== 'externo' && [...permitidas, ...extra].includes(destino),
            `${relative(raiz, archivo)} importa "${destino}", que ${capa} no puede usar`,
          );
        }
      }
    });
  }

  it('el dominio no usa APIs del navegador', () => {
    for (const archivo of archivosJs('domain')) {
      const codigo = readFileSync(archivo, 'utf8');
      assert.doesNotMatch(codigo, /\b(window|document|localStorage|fetch)\b/, relative(raiz, archivo));
    }
  });
});
