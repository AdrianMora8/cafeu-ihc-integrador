import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { Almacenamiento } from '../src/infrastructure/almacenamiento.js';
import { crearAplicacion } from './ayudas.js';

/** Storage mínimo con la misma interfaz que localStorage. */
function storageFalso() {
  const datos = new Map();
  return {
    getItem: (k) => (datos.has(k) ? datos.get(k) : null),
    setItem: (k, v) => { datos.set(k, String(v)); },
    removeItem: (k) => { datos.delete(k); },
  };
}

describe('[RNF-03] Persistencia local', () => {
  it('el pedido en curso sobrevive a una recarga (nueva instancia con el mismo almacenamiento)', () => {
    const almacenamiento = new Almacenamiento(storageFalso());
    assert.equal(almacenamiento.persistente, true);
    crearAplicacion({ almacenamiento }).casos.agregarAlPedido.ejecutar({ productoId: 'americano', cantidad: 3 });

    const recargada = crearAplicacion({ almacenamiento });
    const { borrador } = recargada.casos.obtenerPedido.ejecutar();
    assert.equal(borrador.unidades, 3);
    assert.equal(borrador.total, 4.5);
  });

  it('el pedido confirmado, el número siguiente y el producto agotado también se conservan', async () => {
    const almacenamiento = new Almacenamiento(storageFalso());
    const primera = crearAplicacion({ almacenamiento });
    primera.casos.agregarAlPedido.ejecutar({ productoId: 'empanada', cantidad: 1 });
    await primera.casos.confirmarPedido.ejecutar({ nombre: 'Ana', hora: '10:00' });
    primera.casos.resolverConflictoStock.ejecutar({ accion: 'quitar', productoId: 'empanada' });
    primera.casos.agregarAlPedido.ejecutar({ productoId: 'americano', cantidad: 1 });
    await primera.casos.confirmarPedido.ejecutar({ nombre: 'Ana', hora: '10:00' });

    const segunda = crearAplicacion({ almacenamiento });
    assert.equal(segunda.casos.obtenerPedido.ejecutar().confirmado.numero, 'CU-104');
    assert.equal(segunda.repositorioProductos.obtener('empanada').estado, 'agotado');
    segunda.casos.agregarAlPedido.ejecutar({ productoId: 'americano', cantidad: 1 });
    const r = await segunda.casos.confirmarPedido.ejecutar({ nombre: 'Luis', hora: '11:00' });
    assert.equal(r.pedido.numero, 'CU-105');
  });

  it('sin localStorage disponible la aplicación sigue funcionando en memoria', () => {
    const roto = { getItem() { throw new Error('bloqueado'); }, setItem() { throw new Error('bloqueado'); }, removeItem() {} };
    const almacenamiento = new Almacenamiento(roto);
    assert.equal(almacenamiento.persistente, false);
    const app = crearAplicacion({ almacenamiento });
    app.casos.agregarAlPedido.ejecutar({ productoId: 'americano', cantidad: 1 });
    assert.equal(app.casos.obtenerPedido.ejecutar().borrador.unidades, 1);
  });

  it('datos corruptos en el almacenamiento no rompen la lectura', () => {
    const storage = storageFalso();
    storage.setItem('cafeu.borrador', '{no es json');
    const app = crearAplicacion({ almacenamiento: new Almacenamiento(storage) });
    assert.equal(app.casos.obtenerPedido.ejecutar().borrador.vacio, true);
  });
});
