import { validarDatosRetiro } from '../domain/reglas.js';

/** Caso de uso: validar nombre y hora de retiro antes de iniciar el envío. */
export class ValidarDatosRetiro {
  /** @returns {Record<string, string>} Mapa campo → mensaje; vacío si todo es correcto. */
  ejecutar({ nombre, hora }) {
    return validarDatosRetiro({ nombre, hora });
  }
}
