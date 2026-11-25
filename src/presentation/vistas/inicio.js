import { boton } from '../componentes/boton.js';
import { progreso } from '../componentes/progreso.js';

export function vistaInicio() {
  return progreso(0) +
    '<div class="card" style="background:var(--cafe);border-color:var(--cafe);color:#fff;padding:20px">' +
    '<h1 style="color:#fff;margin-top:0">Pide antes de llegar</h1>' +
    '<p style="color:#ffe9cf">Consulta la carta de hoy, arma tu pedido y elige a qué hora lo retiras.</p>' +
    boton({ texto: 'Ver menú', clase: 'btn', datos: { ir: 'menu' }, estilo: 'background:#fff;color:var(--cafe);border-color:#fff' }) + '</div>' +
    '<h2 style="margin-top:18px">Horario de atención</h2>' +
    '<div class="card"><div class="row"><span>Lunes a viernes</span><span class="precio">7:00 – 19:00</span></div>' +
    '<div class="row"><span>Sábado</span><span class="precio">8:00 – 13:00</span></div></div>';
}
