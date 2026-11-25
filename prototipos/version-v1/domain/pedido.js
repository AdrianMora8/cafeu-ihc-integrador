import { DetallePedido } from './detallePedido.js';
import { ErrorDominio } from './errores.js';
import { limitarCantidad, redondear } from './reglas.js';

export const ESTADOS_PEDIDO = Object.freeze({
  BORRADOR: 'borrador',
  CONFIRMADO: 'confirmado',
  CANCELADO: 'cancelado',
});

/**
 * Pedido de la cafetería. Mientras está en BORRADOR funciona como carrito;
 * al confirmarse recibe número, nombre y hora de retiro.
 */
export class Pedido {
  constructor({ numero = null, estado = ESTADOS_PEDIDO.BORRADOR, detalles = [], nombre = '', hora = '' } = {}) {
    this.numero = numero;
    this.estado = estado;
    this.nombre = nombre;
    this.hora = hora;
    this.detalles = detalles.map((d) => (d instanceof DetallePedido ? d : new DetallePedido(d)));
  }

  get estaVacio() {
    return this.detalles.length === 0;
  }

  get unidades() {
    return this.detalles.reduce((suma, d) => suma + d.cantidad, 0);
  }

  get total() {
    return redondear(this.detalles.reduce((suma, d) => suma + d.subtotal, 0));
  }

  buscarDetalle(productoId) {
    return this.detalles.find((d) => d.productoId === productoId) ?? null;
  }

  /** Agrega un producto. Si ya existe suma la cantidad sin pasar del máximo. */
  agregar(producto, cantidad = 1) {
    this.#exigirEstado(ESTADOS_PEDIDO.BORRADOR);
    if (producto.estaAgotado()) {
      throw new ErrorDominio('PRODUCTO_AGOTADO', `${producto.nombre} está agotado.`);
    }
    const existente = this.buscarDetalle(producto.id);
    const nueva = DetallePedido.desdeProducto(producto, limitarCantidad((existente?.cantidad ?? 0) + cantidad));
    this.#reemplazar(producto.id, nueva);
  }

  /** Cambia la cantidad de una línea manteniéndola entre el mínimo y el máximo. */
  cambiarCantidad(productoId, cantidad) {
    this.#exigirEstado(ESTADOS_PEDIDO.BORRADOR);
    const detalle = this.#exigirDetalle(productoId);
    this.#reemplazar(productoId, detalle.conCantidad(limitarCantidad(cantidad)));
  }

  incrementar(productoId) {
    this.cambiarCantidad(productoId, this.#exigirDetalle(productoId).cantidad + 1);
  }

  decrementar(productoId) {
    this.cambiarCantidad(productoId, this.#exigirDetalle(productoId).cantidad - 1);
  }

  /** Quita una línea y la devuelve para poder deshacer la acción. */
  quitar(productoId) {
    this.#exigirEstado(ESTADOS_PEDIDO.BORRADOR);
    const detalle = this.#exigirDetalle(productoId);
    this.detalles = this.detalles.filter((d) => d.productoId !== productoId);
    return detalle;
  }

  /** Vuelve a poner una línea quitada, sumándola si el producto ya está en el pedido. */
  restaurarDetalle(detalle) {
    this.#exigirEstado(ESTADOS_PEDIDO.BORRADOR);
    const existente = this.buscarDetalle(detalle.productoId);
    this.#reemplazar(detalle.productoId, detalle.conCantidad(limitarCantidad((existente?.cantidad ?? 0) + detalle.cantidad)));
  }

  confirmar({ numero, nombre, hora }) {
    this.#exigirEstado(ESTADOS_PEDIDO.BORRADOR);
    if (this.estaVacio) throw new ErrorDominio('PEDIDO_VACIO', 'No se puede confirmar un pedido vacío.');
    this.numero = numero;
    this.nombre = nombre;
    this.hora = hora;
    this.estado = ESTADOS_PEDIDO.CONFIRMADO;
  }

  cambiarHora(nuevaHora) {
    this.#exigirEstado(ESTADOS_PEDIDO.CONFIRMADO);
    this.hora = nuevaHora;
  }

  cancelar() {
    this.#exigirEstado(ESTADOS_PEDIDO.CONFIRMADO);
    this.estado = ESTADOS_PEDIDO.CANCELADO;
  }

  reactivar() {
    this.#exigirEstado(ESTADOS_PEDIDO.CANCELADO);
    this.estado = ESTADOS_PEDIDO.CONFIRMADO;
  }

  toJSON() {
    return {
      numero: this.numero,
      estado: this.estado,
      nombre: this.nombre,
      hora: this.hora,
      detalles: this.detalles.map((d) => ({ ...d })),
    };
  }

  static desdeJSON(datos) {
    return new Pedido(datos ?? {});
  }

  #exigirEstado(esperado) {
    if (this.estado !== esperado) {
      throw new ErrorDominio('ESTADO_NO_PERMITIDO', `La operación requiere un pedido ${esperado}, pero está ${this.estado}.`);
    }
  }

  #exigirDetalle(productoId) {
    const detalle = this.buscarDetalle(productoId);
    if (!detalle) throw new ErrorDominio('DETALLE_INEXISTENTE', 'El producto no está en el pedido.');
    return detalle;
  }

  #reemplazar(productoId, nuevo) {
    const indice = this.detalles.findIndex((d) => d.productoId === productoId);
    if (indice >= 0) this.detalles[indice] = nuevo;
    else this.detalles.push(nuevo);
  }
}
