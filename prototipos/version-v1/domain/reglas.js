/**
 * Reglas de negocio de CaféU que no pertenecen a una sola entidad.
 * Este módulo no depende de ninguna otra capa.
 */

export const CANTIDAD_MINIMA = 1;
export const CANTIDAD_MAXIMA = 9;
export const LONGITUD_MINIMA_NOMBRE = 2;
export const HORAS_RETIRO = Object.freeze(['10:00', '10:30', '11:00', '11:30', '12:00']);

/** Redondea a dos decimales para evitar errores de coma flotante en los totales. */
export function redondear(valor) {
  return Math.round((valor + Number.EPSILON) * 100) / 100;
}

/** Mantiene una cantidad dentro del rango permitido por pedido y producto. */
export function limitarCantidad(cantidad) {
  return Math.min(CANTIDAD_MAXIMA, Math.max(CANTIDAD_MINIMA, Math.trunc(Number(cantidad) || CANTIDAD_MINIMA)));
}

/** Valida los datos de retiro. Devuelve un objeto vacío si todo es correcto. */
export function validarDatosRetiro({ nombre, hora } = {}) {
  const errores = {};
  if (String(nombre ?? '').trim().length < LONGITUD_MINIMA_NOMBRE) {
    errores.nombre = 'Escribe tu nombre (mínimo 2 letras) para identificar tu pedido.';
  }
  if (!HORAS_RETIRO.includes(hora)) {
    errores.hora = 'Elige una hora de retiro de la lista.';
  }
  return errores;
}

/** Valida el cambio de hora de un pedido ya confirmado. */
export function validarNuevaHora(nueva, horaActual) {
  const errores = {};
  if (!HORAS_RETIRO.includes(nueva)) {
    errores.hora = 'Elige la nueva hora de retiro de la lista.';
  } else if (nueva === horaActual) {
    errores.hora = `Ya retiras a las ${nueva}. Elige una hora distinta.`;
  }
  return errores;
}
