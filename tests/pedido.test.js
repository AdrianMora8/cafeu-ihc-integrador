import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { ErrorDominio } from '../src/domain/errores.js';
import { Pedido } from '../src/domain/pedido.js';
import { Producto } from '../src/domain/producto.js';

const cafe = new Producto({ id: 'cafe', nombre: 'Café', categoria: 'bebidas', precio: 1.5 });
const barato = new Producto({ id: 'barato', nombre: 'Caramelo', categoria: 'comida', precio: 0.1 });
const agotado = new Producto({ id: 'jugo', nombre: 'Jugo', categoria: 'bebidas', precio: 1.25, estado: 'agotado' });

describe('[RF-03] Cantidades y total del pedido', () => {
  it('suma cantidades del mismo producto y calcula el total', () => {
    const pedido = new Pedido();
    pedido.agregar(cafe, 2);
    pedido.agregar(cafe, 1);
    assert.equal(pedido.unidades, 3);
    assert.equal(pedido.total, 4.5);
  });

  it('no deja pasar de 9 unidades ni bajar de 1', () => {
    const pedido = new Pedido();
    pedido.agregar(cafe, 8);
    pedido.incrementar('cafe');
    pedido.incrementar('cafe');
    assert.equal(pedido.buscarDetalle('cafe').cantidad, 9);
    for (let i = 0; i < 12; i += 1) pedido.decrementar('cafe');
    assert.equal(pedido.buscarDetalle('cafe').cantidad, 1);
  });

  it('el total no acumula errores de coma flotante (3 × $0.10 = $0.30)', () => {
    const pedido = new Pedido();
    pedido.agregar(barato, 3);
    assert.equal(pedido.total, 0.3);
  });

  it('rechaza agregar un producto agotado con el código PRODUCTO_AGOTADO', () => {
    const pedido = new Pedido();
    assert.throws(() => pedido.agregar(agotado, 1), (e) => e instanceof ErrorDominio && e.codigo === 'PRODUCTO_AGOTADO');
    assert.equal(pedido.estaVacio, true);
  });
});

describe('[RF-04] Quitar y restaurar líneas', () => {
  it('quitar devuelve la línea y restaurarDetalle la vuelve a poner con su cantidad', () => {
    const pedido = new Pedido();
    pedido.agregar(cafe, 3);
    const quitado = pedido.quitar('cafe');
    assert.equal(pedido.estaVacio, true);
    pedido.restaurarDetalle(quitado);
    assert.equal(pedido.buscarDetalle('cafe').cantidad, 3);
  });

  it('quitar un producto que no está en el pedido lanza DETALLE_INEXISTENTE', () => {
    assert.throws(() => new Pedido().quitar('x'), (e) => e.codigo === 'DETALLE_INEXISTENTE');
  });
});

describe('[RF-05][RF-06] Estados del pedido', () => {
  it('un pedido vacío no se puede confirmar', () => {
    assert.throws(() => new Pedido().confirmar({ numero: 'CU-1', nombre: 'Ana', hora: '10:00' }), (e) => e.codigo === 'PEDIDO_VACIO');
  });

  it('solo un pedido confirmado se puede cancelar y solo uno cancelado se puede reactivar', () => {
    const pedido = new Pedido();
    pedido.agregar(cafe, 1);
    assert.throws(() => pedido.cancelar(), (e) => e.codigo === 'ESTADO_NO_PERMITIDO');
    pedido.confirmar({ numero: 'CU-1', nombre: 'Ana', hora: '10:00' });
    pedido.cancelar();
    assert.equal(pedido.estado, 'cancelado');
    pedido.reactivar();
    assert.equal(pedido.estado, 'confirmado');
  });

  it('se serializa a JSON y se reconstruye sin perder datos', () => {
    const pedido = new Pedido();
    pedido.agregar(cafe, 2);
    pedido.confirmar({ numero: 'CU-7', nombre: 'Ana', hora: '11:30' });
    const copia = Pedido.desdeJSON(JSON.parse(JSON.stringify(pedido)));
    assert.equal(copia.numero, 'CU-7');
    assert.equal(copia.total, 3);
    assert.equal(copia.detalles[0].nombre, 'Café');
  });
});
