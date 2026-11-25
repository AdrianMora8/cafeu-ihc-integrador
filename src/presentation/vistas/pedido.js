import { HORAS_RETIRO } from '../../application/configuracion.js';
import { boton } from '../componentes/boton.js';
import { campoSeleccion, campoTexto } from '../componentes/campo.js';
import { dinero, esc } from '../componentes/formato.js';
import { etiquetaEstado } from '../componentes/etiquetaEstado.js';
import { iconoCategoria } from '../componentes/iconos.js';
import { mensaje } from '../componentes/mensaje.js';
import { progreso } from '../componentes/progreso.js';
import { selectorCantidad } from '../componentes/selectorCantidad.js';

function avisoPedido(ui) {
  if (!ui.aviso) return '';
  const deshacer = ui.deshacerQuitar ? ' <button type="button" class="link" data-accion="deshacer">Deshacer</button>' : '';
  return mensaje({ tipo: ui.avisoTipo, id: 'aviso', enfocable: true, contenido: esc(ui.aviso) + deshacer });
}

function resumenErrores(errores) {
  const claves = Object.keys(errores);
  if (!claves.length) return '';
  const titulo = claves.length === 1 ? 'este dato' : `estos ${claves.length} datos`;
  const items = claves.map((k) => `<li><a href="#" data-foco="${k}">${esc(errores[k])}</a></li>`).join('');
  return mensaje({ tipo: 'error', id: 'resumen-errores', rol: 'alert', enfocable: true, contenido: `<strong>Revisa ${titulo} para continuar:</strong><ul>${items}</ul>` });
}

function conflictoStock(producto, alternativa) {
  if (!producto) return '';
  const cambiar = alternativa
    ? boton({ texto: `Cambiar por ${esc(alternativa.nombre)}`, clase: 'btn sec', datos: { accion: 'c-cambiar', alt: alternativa.id } })
    : '';
  return mensaje({
    tipo: 'error',
    id: 'conflicto',
    rol: 'alert',
    enfocable: true,
    contenido: `<strong>${esc(producto.nombre)} se agotó mientras confirmabas.</strong> Tu pedido no se envió. Elige cómo continuar:` +
      boton({ texto: `Quitar ${esc(producto.nombre)} y continuar`, clase: 'btn', datos: { accion: 'c-quitar' } }) + cambiar,
  });
}

function lineaPedido(linea) {
  return `<div class="card"><div class="ficha"><span class="thumb">${iconoCategoria(linea.categoria)}</span><div>` +
    `<h2>${esc(linea.nombre)}</h2><p class="precio">${dinero(linea.precioUnitario)}</p>${etiquetaEstado(linea.estadoProducto)}</div></div>` +
    '<div class="row" style="margin-top:8px">' +
    selectorCantidad({
      valor: linea.cantidad,
      etiquetaGrupo: `Cantidad de ${linea.nombre}`,
      accionMenos: 'menos',
      accionMas: 'mas',
      id: linea.productoId,
      sujeto: linea.nombre,
    }) +
    boton({ texto: 'Quitar', clase: 'link', datos: { accion: 'quitar', id: linea.productoId }, ariaLabel: `Quitar ${linea.nombre} del pedido` }) +
    '</div></div>';
}

/** Tarjeta que recuerda el pedido ya confirmado cuando el carrito está vacío. */
function tarjetaPedidoConfirmado(confirmado) {
  if (!confirmado) return '';
  return '<div class="card"><h2>Tienes un pedido confirmado</h2>' +
    `<p>Pedido <strong>#${esc(confirmado.numero)}</strong> · retira a las <strong>${esc(confirmado.hora)}</strong></p>` +
    `<p class="muted">${confirmado.unidades} ${confirmado.unidades === 1 ? 'producto' : 'productos'} · ${dinero(confirmado.total)}</p>` +
    boton({ texto: `Ver pedido #${esc(confirmado.numero)}`, clase: 'btn sec', datos: { ir: 'confirmacion' } }) + '</div>';
}

/**
 * @param {object} ui Estado de la interfaz (errores, datos escritos, avisos).
 * @param {{ pedido: object, confirmado: object|null, productoConflicto: object|null, alternativaConflicto: object|null }} datos
 */
export function vistaPedido(ui, { pedido, confirmado = null, productoConflicto, alternativaConflicto }) {
  const aviso = avisoPedido(ui);
  if (pedido.vacio) {
    return progreso(1) + '<h1 tabindex="-1">Mi pedido</h1>' + aviso +
      mensaje({ contenido: 'Tu pedido está vacío. Elige productos en el menú para continuar.' }) +
      tarjetaPedidoConfirmado(confirmado) +
      boton({ texto: 'Ir al menú', clase: 'btn', datos: { ir: 'menu' } });
  }
  return progreso(1) + '<h1 tabindex="-1">Revisa tu pedido</h1>' + aviso +
    conflictoStock(productoConflicto, alternativaConflicto) + resumenErrores(ui.errores) +
    pedido.lineas.map(lineaPedido).join('') +
    `<div class="card row"><span>Total</span><strong class="precio" style="font-size:1.1rem">${dinero(pedido.total)}</strong></div>` +
    '<form id="form-pedido" novalidate>' +
    campoTexto({ clave: 'nombre', etiqueta: 'Nombre para el pedido', ayuda: 'Lo usaremos para entregártelo al retirar.', valor: ui.datos.nombre, error: ui.errores.nombre, autocompletar: 'name' }) +
    campoSeleccion({ clave: 'hora', etiqueta: 'Hora de retiro', ayuda: 'Elige un horario disponible de hoy.', opciones: HORAS_RETIRO, seleccion: ui.datos.hora, error: ui.errores.hora }) +
    '<button type="submit" class="btn">Confirmar pedido</button></form>' +
    boton({ texto: 'Seguir comprando', clase: 'btn sec', datos: { ir: 'menu' } });
}
