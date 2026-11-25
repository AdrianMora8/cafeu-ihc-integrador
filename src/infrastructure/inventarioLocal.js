import { ServicioInventario } from '../application/puertos.js';

/** Espera `ms` milisegundos y se rechaza con un AbortError si la señal se cancela antes. */
export function esperar(ms, signal) {
  return new Promise((resolver, rechazar) => {
    const abortar = () => rechazar(Object.assign(new Error('Envío cancelado'), { name: 'AbortError' }));
    if (signal?.aborted) return abortar();
    const temporizador = setTimeout(() => {
      signal?.removeEventListener('abort', alAbortar);
      resolver();
    }, ms);
    const alAbortar = () => {
      clearTimeout(temporizador);
      abortar();
    };
    signal?.addEventListener('abort', alAbortar, { once: true });
  });
}

/**
 * Servicio de inventario de la cafetería (sin servidor): tarda un momento en responder
 * y, en la primera confirmación, el producto con "pocas unidades" resulta agotado.
 * Reproduce el conflicto de existencias que ya mostraba el prototipo v3.
 */
export class InventarioLocal extends ServicioInventario {
  constructor({ repositorioProductos, latenciaMs = 1300, pausa = esperar }) {
    super();
    this.productos = repositorioProductos;
    this.latenciaMs = latenciaMs;
    this.pausa = pausa;
  }

  async reservar(detalles, { signal } = {}) {
    await this.pausa(this.latenciaMs, signal);
    for (const detalle of detalles) {
      const producto = this.productos.obtener(detalle.productoId);
      if (!producto || producto.estaAgotado() || producto.tienePocasUnidades()) {
        return { ok: false, productoId: detalle.productoId };
      }
    }
    return { ok: true };
  }
}
