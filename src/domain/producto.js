import { ErrorDominio } from './errores.js';

export const ESTADOS_PRODUCTO = Object.freeze({
  DISPONIBLE: 'ok',
  POCAS: 'pocas',
  AGOTADO: 'agotado',
});

export const CATEGORIAS = Object.freeze(['bebidas', 'comida']);

/** Producto del catálogo. Es inmutable: un cambio de estado produce otro producto. */
export class Producto {
  constructor({ id, nombre, categoria, resumen = '', detalle = '', precio, estado = ESTADOS_PRODUCTO.DISPONIBLE }) {
    if (!id || !nombre) throw new ErrorDominio('PRODUCTO_INVALIDO', 'El producto necesita id y nombre.');
    if (!CATEGORIAS.includes(categoria)) throw new ErrorDominio('CATEGORIA_INVALIDA', `Categoría desconocida: ${categoria}`);
    if (!(Number(precio) >= 0)) throw new ErrorDominio('PRECIO_INVALIDO', 'El precio debe ser un número mayor o igual a cero.');
    if (!Object.values(ESTADOS_PRODUCTO).includes(estado)) throw new ErrorDominio('ESTADO_INVALIDO', `Estado desconocido: ${estado}`);
    this.id = id;
    this.nombre = nombre;
    this.categoria = categoria;
    this.resumen = resumen;
    this.detalle = detalle;
    this.precio = Number(precio);
    this.estado = estado;
    Object.freeze(this);
  }

  estaAgotado() {
    return this.estado === ESTADOS_PRODUCTO.AGOTADO;
  }

  tienePocasUnidades() {
    return this.estado === ESTADOS_PRODUCTO.POCAS;
  }

  conEstado(estado) {
    return new Producto({ ...this, estado });
  }
}
