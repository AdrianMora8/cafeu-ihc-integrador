/**
 * Envoltorio mínimo sobre `localStorage` que guarda y lee JSON.
 *
 * Si el almacenamiento no está disponible (modo privado, pruebas en Node, cuota agotada)
 * usa un Map en memoria, de modo que la aplicación sigue funcionando sin persistencia.
 */
export class Almacenamiento {
  #storage;
  #memoria = new Map();

  /** @param {Storage | null | undefined} storage Normalmente `window.localStorage`. */
  constructor(storage) {
    this.#storage = Almacenamiento.#probar(storage) ? storage : null;
  }

  get persistente() {
    return this.#storage !== null;
  }

  leer(clave, porDefecto = null) {
    try {
      const crudo = this.#storage ? this.#storage.getItem(clave) : this.#memoria.get(clave);
      return crudo === undefined || crudo === null ? porDefecto : JSON.parse(crudo);
    } catch {
      return porDefecto;
    }
  }

  escribir(clave, valor) {
    const crudo = JSON.stringify(valor);
    try {
      if (this.#storage) this.#storage.setItem(clave, crudo);
      else this.#memoria.set(clave, crudo);
    } catch {
      this.#memoria.set(clave, crudo);
    }
  }

  borrar(clave) {
    try {
      if (this.#storage) this.#storage.removeItem(clave);
    } catch {
      /* se ignora: se borra también de la memoria */
    }
    this.#memoria.delete(clave);
  }

  static #probar(storage) {
    if (!storage) return false;
    try {
      storage.setItem('cafeu.__prueba', '1');
      storage.removeItem('cafeu.__prueba');
      return true;
    } catch {
      return false;
    }
  }
}
