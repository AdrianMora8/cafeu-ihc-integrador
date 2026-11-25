import { esc } from './formato.js';

function descripcion(clave, error) {
  return `aria-describedby="a-${clave}${error ? ` e-${clave}` : ''}"${error ? ' aria-invalid="true"' : ''}`;
}

function bloque({ clave, etiqueta, ayuda, error, control }) {
  return `<div class="campo"><label for="f-${clave}">${etiqueta}</label><span class="ayuda" id="a-${clave}">${ayuda}</span>` +
    control + (error ? `<span class="err" id="e-${clave}">${esc(error)}</span>` : '') + '</div>';
}

/** Campo de texto con etiqueta visible, ayuda y mensaje de error asociados. */
export function campoTexto({ clave, etiqueta, ayuda, valor = '', error = '', autocompletar = '' }) {
  const control = `<input id="f-${clave}" name="${clave}" type="text"${autocompletar ? ` autocomplete="${autocompletar}"` : ''} value="${esc(valor)}" ${descripcion(clave, error)}>`;
  return bloque({ clave, etiqueta, ayuda, error, control });
}

/** Lista desplegable con etiqueta visible, ayuda y mensaje de error asociados. */
export function campoSeleccion({ clave, etiqueta, ayuda, opciones, seleccion = '', error = '', textoVacio = 'Elige una hora' }) {
  const lista = `<option value="">${textoVacio}</option>` +
    opciones.map((o) => `<option value="${o}"${seleccion === o ? ' selected' : ''}>${o}</option>`).join('');
  const control = `<select id="f-${clave}" name="${clave}" ${descripcion(clave, error)}>${lista}</select>`;
  return bloque({ clave, etiqueta, ayuda, error, control });
}
