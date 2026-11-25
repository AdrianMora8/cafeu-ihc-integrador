import { RepositorioPedidos } from '../application/puertos.js';
import { DetallePedido } from '../domain/detallePedido.js';
import { Pedido } from '../domain/pedido.js';

const CLAVES = {
  borrador: 'cafeu.borrador',
  confirmado: 'cafeu.confirmado',
  cancelado: 'cafeu.cancelado',
  ultimoQuitado: 'cafeu.ultimoQuitado',
  contador: 'cafeu.contador',
};

const PRIMER_NUMERO = 104;
const PREFIJO_NUMERO = 'CU-';

/** Guarda los pedidos como JSON en el almacenamiento local del navegador. */
export class RepositorioPedidosLocal extends RepositorioPedidos {
  /** @param {import('./almacenamiento.js').Almacenamiento} almacenamiento */
  constructor(almacenamiento) {
    super();
    this.almacenamiento = almacenamiento;
  }

  obtenerBorrador() {
    return this.#leerPedido(CLAVES.borrador) ?? new Pedido();
  }

  guardarBorrador(pedido) {
    this.#guardarPedido(CLAVES.borrador, pedido);
  }

  obtenerConfirmado() {
    return this.#leerPedido(CLAVES.confirmado);
  }

  guardarConfirmado(pedido) {
    this.#guardarPedido(CLAVES.confirmado, pedido);
  }

  obtenerCancelado() {
    return this.#leerPedido(CLAVES.cancelado);
  }

  guardarCancelado(pedido) {
    this.#guardarPedido(CLAVES.cancelado, pedido);
  }

  obtenerUltimoQuitado() {
    const datos = this.almacenamiento.leer(CLAVES.ultimoQuitado);
    return datos ? new DetallePedido(datos) : null;
  }

  guardarUltimoQuitado(detalle) {
    if (detalle) this.almacenamiento.escribir(CLAVES.ultimoQuitado, { ...detalle });
    else this.almacenamiento.borrar(CLAVES.ultimoQuitado);
  }

  reservarNumero() {
    const actual = this.almacenamiento.leer(CLAVES.contador, PRIMER_NUMERO);
    this.almacenamiento.escribir(CLAVES.contador, actual + 1);
    return `${PREFIJO_NUMERO}${actual}`;
  }

  reiniciar() {
    Object.values(CLAVES).forEach((clave) => this.almacenamiento.borrar(clave));
  }

  #leerPedido(clave) {
    const datos = this.almacenamiento.leer(clave);
    if (!datos) return null;
    try {
      return Pedido.desdeJSON(datos);
    } catch {
      this.almacenamiento.borrar(clave);
      return null;
    }
  }

  #guardarPedido(clave, pedido) {
    if (pedido) this.almacenamiento.escribir(clave, pedido);
    else this.almacenamiento.borrar(clave);
  }
}
