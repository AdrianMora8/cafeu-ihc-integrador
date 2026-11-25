import { boton } from '../componentes/boton.js';
import { progreso } from '../componentes/progreso.js';

export function vistaProcesando() {
  return progreso(1) + '<div class="center"><div class="spinner" aria-hidden="true"></div>' +
    '<h1 tabindex="-1">Enviando tu pedido…</h1><p class="muted">Estamos avisando a la cafetería. No cierres esta pantalla.</p>' +
    '<div class="barra" aria-hidden="true"><span id="barra"></span></div></div>' +
    boton({ texto: 'Cancelar envío', clase: 'btn sec', datos: { accion: 'cancelar-envio' } });
}
