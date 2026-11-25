import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { crearAplicacion } from './ayudas.js';

const borrador = (app) => app.casos.obtenerPedido.ejecutar().borrador;

describe('[T1] Buscar un producto y agregarlo (RF-01, RF-02, RF-03)', () => {
  it('buscar "CAFE" y agregar el resultado deja 1 café americano por $1.50', () => {
    const app = crearAplicacion();
    const [resultado] = app.casos.listarMenu.ejecutar({ consulta: 'CAFE' });
    assert.equal(resultado.nombre, 'Café americano');
    assert.deepEqual(app.casos.agregarAlPedido.ejecutar({ productoId: resultado.id, cantidad: 1 }), { ok: true, nombre: 'Café americano' });
    assert.equal(borrador(app).unidades, 1);
    assert.equal(borrador(app).total, 1.5);
  });

  it('no permite agregar un producto agotado', () => {
    const app = crearAplicacion();
    const r = app.casos.agregarAlPedido.ejecutar({ productoId: 'jugo', cantidad: 1 });
    assert.deepEqual(r, { ok: false, motivo: 'PRODUCTO_AGOTADO' });
    assert.equal(borrador(app).vacio, true);
  });
});

describe('[T2] Modificar la cantidad y verificar el total (RF-03)', () => {
  it('subir la cantidad recalcula líneas y total; no baja de 1 ni pasa de 9', () => {
    const app = crearAplicacion();
    app.casos.agregarAlPedido.ejecutar({ productoId: 'americano', cantidad: 1 });
    app.casos.agregarAlPedido.ejecutar({ productoId: 'sanduche', cantidad: 1 });
    assert.equal(borrador(app).total, 4.25);

    app.casos.cambiarCantidad.ejecutar({ productoId: 'americano', operacion: 'mas' });
    assert.equal(borrador(app).lineas.find((l) => l.productoId === 'americano').subtotal, 3);
    assert.equal(borrador(app).total, 5.75);

    for (let i = 0; i < 12; i += 1) app.casos.cambiarCantidad.ejecutar({ productoId: 'sanduche', operacion: 'menos' });
    assert.equal(borrador(app).lineas.find((l) => l.productoId === 'sanduche').cantidad, 1);
    for (let i = 0; i < 12; i += 1) app.casos.cambiarCantidad.ejecutar({ productoId: 'sanduche', operacion: 'mas' });
    assert.equal(borrador(app).lineas.find((l) => l.productoId === 'sanduche').cantidad, 9);
  });
});

describe('[T3] Eliminar, recuperar y confirmar el pedido (RF-04, RF-05)', () => {
  it('quitar y deshacer devuelven la línea; confirmar genera número, vacía el carrito y guarda el pedido', async () => {
    const app = crearAplicacion();
    app.casos.agregarAlPedido.ejecutar({ productoId: 'americano', cantidad: 2 });
    app.casos.agregarAlPedido.ejecutar({ productoId: 'sanduche', cantidad: 1 });

    assert.deepEqual(app.casos.quitarDelPedido.ejecutar({ productoId: 'sanduche' }), { ok: true, nombre: 'Sanduche de queso' });
    assert.equal(borrador(app).total, 3);
    assert.equal(app.casos.obtenerPedido.ejecutar().puedeDeshacer, true);

    assert.deepEqual(app.casos.deshacerQuitar.ejecutar(), { ok: true, nombre: 'Sanduche de queso' });
    assert.equal(borrador(app).total, 5.75);
    assert.equal(app.casos.obtenerPedido.ejecutar().puedeDeshacer, false);

    const r = await app.casos.confirmarPedido.ejecutar({ nombre: '  Ana  ', hora: '11:00' });
    assert.equal(r.ok, true);
    assert.equal(r.pedido.numero, 'CU-104');
    assert.equal(r.pedido.nombre, 'Ana');
    assert.equal(r.pedido.total, 5.75);

    const estado = app.casos.obtenerPedido.ejecutar();
    assert.equal(estado.borrador.vacio, true);
    assert.equal(estado.confirmado.numero, 'CU-104');
    assert.equal(estado.confirmado.lineas.length, 2);
  });

  it('rechaza nombre corto u hora vacía y deja el pedido intacto', async () => {
    const app = crearAplicacion();
    app.casos.agregarAlPedido.ejecutar({ productoId: 'americano', cantidad: 1 });
    const r = await app.casos.confirmarPedido.ejecutar({ nombre: 'A', hora: '' });
    assert.equal(r.ok, false);
    assert.equal(r.motivo, 'DATOS_INVALIDOS');
    assert.deepEqual(Object.keys(r.errores).sort(), ['hora', 'nombre']);
    assert.equal(borrador(app).unidades, 1);
    assert.equal(app.casos.obtenerPedido.ejecutar().confirmado, null);
  });

  it('un pedido vacío no se confirma', async () => {
    const r = await crearAplicacion().casos.confirmarPedido.ejecutar({ nombre: 'Ana', hora: '10:00' });
    assert.deepEqual(r, { ok: false, motivo: 'PEDIDO_VACIO' });
  });
});

describe('[RF-05] Conflicto por producto agotado al confirmar', () => {
  it('no confirma, marca el producto como agotado y permite quitarlo o cambiarlo', async () => {
    const app = crearAplicacion();
    app.casos.agregarAlPedido.ejecutar({ productoId: 'empanada', cantidad: 2 });
    const r = await app.casos.confirmarPedido.ejecutar({ nombre: 'Ana', hora: '10:30' });
    assert.equal(r.ok, false);
    assert.equal(r.motivo, 'PRODUCTO_AGOTADO');
    assert.equal(r.productoId, 'empanada');
    assert.equal(borrador(app).unidades, 2, 'el pedido no se pierde');
    assert.equal(app.repositorioProductos.obtener('empanada').estado, 'agotado');

    const cambio = app.casos.resolverConflictoStock.ejecutar({ accion: 'cambiar', productoId: 'empanada', alternativaId: 'sanduche' });
    assert.deepEqual(cambio, { ok: true, accion: 'cambiar', nombre: 'Sanduche de queso' });
    assert.equal(borrador(app).lineas[0].productoId, 'sanduche');
    assert.equal(borrador(app).lineas[0].cantidad, 2);

    const reintento = await app.casos.confirmarPedido.ejecutar({ nombre: 'Ana', hora: '10:30' });
    assert.equal(reintento.ok, true);
  });

  it('cancelar el envío mientras se procesa no confirma nada', async () => {
    const app = crearAplicacion({ latenciaMs: 200 });
    app.casos.agregarAlPedido.ejecutar({ productoId: 'americano', cantidad: 1 });
    const control = new AbortController();
    const promesa = app.casos.confirmarPedido.ejecutar({ nombre: 'Ana', hora: '10:00' }, { signal: control.signal });
    control.abort();
    assert.deepEqual(await promesa, { ok: false, motivo: 'ENVIO_CANCELADO' });
    assert.equal(app.casos.obtenerPedido.ejecutar().confirmado, null);
    assert.equal(borrador(app).unidades, 1);
  });
});

describe('[RF-06] Cambiar hora, cancelar y restaurar', () => {
  async function appConPedidoConfirmado() {
    const app = crearAplicacion();
    app.casos.agregarAlPedido.ejecutar({ productoId: 'americano', cantidad: 1 });
    await app.casos.confirmarPedido.ejecutar({ nombre: 'Ana', hora: '10:00' });
    return app;
  }

  it('cambia la hora, pero rechaza la misma hora o ninguna', async () => {
    const app = await appConPedidoConfirmado();
    assert.equal(app.casos.cambiarHoraRetiro.ejecutar({ hora: '10:00' }).motivo, 'HORA_INVALIDA');
    assert.equal(app.casos.cambiarHoraRetiro.ejecutar({ hora: '' }).motivo, 'HORA_INVALIDA');
    assert.deepEqual(app.casos.cambiarHoraRetiro.ejecutar({ hora: '12:00' }), { ok: true, hora: '12:00' });
    assert.equal(app.casos.obtenerPedido.ejecutar().confirmado.hora, '12:00');
  });

  it('cancelar guarda el pedido para restaurarlo con el mismo número', async () => {
    const app = await appConPedidoConfirmado();
    assert.deepEqual(app.casos.cancelarPedido.ejecutar(), { ok: true, numero: 'CU-104' });
    let estado = app.casos.obtenerPedido.ejecutar();
    assert.equal(estado.confirmado, null);
    assert.equal(estado.cancelado.numero, 'CU-104');

    assert.deepEqual(app.casos.restaurarPedido.ejecutar(), { ok: true, numero: 'CU-104' });
    estado = app.casos.obtenerPedido.ejecutar();
    assert.equal(estado.cancelado, null);
    assert.equal(estado.confirmado.estado, 'confirmado');
  });

  it('sin pedido confirmado no hay nada que cambiar ni cancelar', () => {
    const app = crearAplicacion();
    assert.equal(app.casos.cambiarHoraRetiro.ejecutar({ hora: '11:00' }).motivo, 'SIN_PEDIDO_ACTIVO');
    assert.equal(app.casos.cancelarPedido.ejecutar().motivo, 'SIN_PEDIDO_ACTIVO');
    assert.equal(app.casos.restaurarPedido.ejecutar().motivo, 'SIN_PEDIDO_CANCELADO');
  });
});
