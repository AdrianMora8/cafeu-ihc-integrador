import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { coincideConBusqueda, normalizarTexto } from '../src/domain/busqueda.js';
import { crearAplicacion } from './ayudas.js';

describe('[RF-02] Búsqueda tolerante a tildes y mayúsculas', () => {
  const { casos } = crearAplicacion();
  const ids = (consulta, categoria) => casos.listarMenu.ejecutar({ consulta, categoria }).map((p) => p.id);

  it('encuentra "Café americano" escribiendo cafe, CAFÉ, Café o con espacios', () => {
    for (const consulta of ['cafe', 'CAFE', 'café', 'CAFÉ', '  Café  ']) {
      assert.deepEqual(ids(consulta), ['americano'], `consulta: "${consulta}"`);
    }
  });

  it('encuentra productos cuyo nombre lleva tilde aunque se escriba sin ella, y al revés', () => {
    assert.deepEqual(ids('empanáda'), ['empanada']);
    assert.deepEqual(ids('SANDUCHE'), ['sanduche']);
    assert.deepEqual(ids('natural'), ['jugo']);
  });

  it('encuentra el producto aunque se omitan palabras o se cambie el orden (hallazgo H-04)', () => {
    assert.deepEqual(ids('sanduche queso'), ['sanduche']);
    assert.deepEqual(ids('queso sanduche'), ['sanduche']);
    assert.deepEqual(ids('americano cafe'), ['americano']);
  });

  it('exige que aparezcan todas las palabras de la consulta', () => {
    assert.deepEqual(ids('cafe queso'), []);
    assert.deepEqual(ids('   '), ids(''));
  });

  it('busca también en el resumen del producto', () => {
    assert.deepEqual(ids('recien preparado'), ['americano']);
  });

  it('devuelve lista vacía cuando nada coincide y todo el menú con consulta vacía', () => {
    assert.deepEqual(ids('pizza'), []);
    assert.equal(ids('').length, 4);
  });

  it('combina la búsqueda con el filtro de categoría', () => {
    assert.deepEqual(ids('', 'bebidas'), ['americano', 'jugo']);
    assert.deepEqual(ids('cafe', 'comida'), []);
  });

  it('normalizarTexto quita tildes y diéresis sin tocar la eñe de forma incorrecta', () => {
    assert.equal(normalizarTexto('  ÁÉÍÓÚ Üñ '), 'aeiou un');
    assert.equal(normalizarTexto(null), '');
  });

  it('coincideConBusqueda acepta consultas vacías', () => {
    assert.equal(coincideConBusqueda({ nombre: 'Té', resumen: '' }, ''), true);
  });
});
