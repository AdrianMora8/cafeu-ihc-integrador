import { Pedido } from '../domain/pedido.js';
import { validarDatosRetiro } from '../domain/reglas.js';
import { pedidoADto } from './dto.js';

/**
 * Caso de uso: confirmar el pedido en curso.
 *
 * Valida los datos, consulta el inventario y, si todo está bien, convierte el borrador
 * en un pedido confirmado con número. Si un producto se agotó durante el envío no
 * confirma nada y devuelve el producto en conflicto.
 */
export class ConfirmarPedido {
  constructor({ repositorioPedidos, repositorioProductos, servicioInventario }) {
    this.pedidos = repositorioPedidos;
    this.productos = repositorioProductos;
    this.inventario = servicioInventario;
  }

  /**
   * @param {{ nombre: string, hora: string }} datos
   * @param {{ signal?: AbortSignal }} [opciones] Permite cancelar el envío mientras se procesa.
   */
  async ejecutar({ nombre, hora }, { signal } = {}) {
    const borrador = this.pedidos.obtenerBorrador();
    if (borrador.estaVacio) return { ok: false, motivo: 'PEDIDO_VACIO' };

    const errores = validarDatosRetiro({ nombre, hora });
    if (Object.keys(errores).length) return { ok: false, motivo: 'DATOS_INVALIDOS', errores };

    let reserva;
    try {
      reserva = await this.inventario.reservar(borrador.detalles, { signal });
    } catch (error) {
      if (error?.name === 'AbortError') return { ok: false, motivo: 'ENVIO_CANCELADO' };
      throw error;
    }

    if (!reserva.ok) {
      this.productos.marcarAgotado(reserva.productoId);
      const producto = this.productos.obtener(reserva.productoId);
      return { ok: false, motivo: 'PRODUCTO_AGOTADO', productoId: reserva.productoId, productoNombre: producto?.nombre ?? '' };
    }

    borrador.confirmar({ numero: this.pedidos.reservarNumero(), nombre: nombre.trim(), hora });
    this.pedidos.guardarConfirmado(borrador);
    this.pedidos.guardarBorrador(new Pedido());
    this.pedidos.guardarUltimoQuitado(null);
    return { ok: true, pedido: pedidoADto(borrador, (id) => this.productos.obtener(id)) };
  }
}
