import { esc } from '../componentes/formato.js';
import { mensaje } from '../componentes/mensaje.js';
import { progreso } from '../componentes/progreso.js';
import { tarjetaProducto } from '../componentes/tarjetaProducto.js';

const FILTROS = ['todo', 'bebidas', 'comida'];

/** @param {{ busqueda: string, filtro: string }} ui  @param {object[]} productos */
export function vistaMenu(ui, productos) {
  const lista = productos.map(tarjetaProducto).join('');
  const vacio = productos.length
    ? ''
    : mensaje({
        rol: 'status',
        contenido: 'No encontramos productos con esa búsqueda. <button type="button" class="link" data-accion="limpiar">Mostrar todo el menú</button>',
      });
  const chips = FILTROS.map((f) =>
    `<button type="button" class="chip" data-filtro="${f}" aria-pressed="${ui.filtro === f}">${f.charAt(0).toUpperCase() + f.slice(1)}</button>`,
  ).join('');
  return progreso(0) + '<h1 tabindex="-1">Menú de hoy</h1>' +
    '<label class="sr-only" for="buscar">Buscar productos</label>' +
    `<input class="search" id="buscar" type="search" placeholder="Buscar productos…" autocomplete="off" value="${esc(ui.busqueda)}">` +
    `<fieldset class="chips"><legend class="sr-only">Filtrar por categoría</legend>${chips}</fieldset>` +
    `<p class="muted" id="menu-conteo" role="status">${productos.length}${productos.length === 1 ? ' producto' : ' productos'}</p>` +
    `<div id="menu-lista">${lista}${vacio}</div>`;
}
