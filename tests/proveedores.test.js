import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validarProveedor,
  crearPayloadProveedor,
  filtrarProveedores,
  esCalificacionValida,
} from '../src/utils/proveedores.js';

const ejemplo = {
  razonSocial: ' Empresa S.A. ',
  cuit: '30712345678',
  contacto: { email: ' correo@ejemplo.com ', telefono: ' 123456 ' },
  direccion: { calle: ' Mitre 123 ', ciudad: ' Goya ', pais: '' },
};

test('valida campos obligatorios y CUIT de 11 dígitos', () => {
  assert.deepEqual(validarProveedor(ejemplo), []);
  assert.ok(validarProveedor({ ...ejemplo, cuit: '30-71234567-8' }).some((e) => e.includes('CUIT')));
  assert.ok(validarProveedor({ ...ejemplo, razonSocial: ' ' }).some((e) => e.includes('razón social')));
  assert.ok(validarProveedor({ ...ejemplo, contacto: { ...ejemplo.contacto, email: 'incorrecto' } }).some((e) => e.includes('correo')));
});

test('construye el payload conforme al schema real del backend', () => {
  assert.deepEqual(crearPayloadProveedor(ejemplo), {
    razonSocial: 'Empresa S.A.',
    cuit: '30712345678',
    contacto: { email: 'correo@ejemplo.com', telefono: '123456' },
    direccion: { calle: 'Mitre 123', ciudad: 'Goya', pais: 'Argentina' },
    calificacion: 3,
  });
});

test('filtra sin distinguir mayúsculas por razón social, CUIT o ciudad', () => {
  const datos = [
    { razonSocial: 'Litoral SA', cuit: '30111111111', direccion: { ciudad: 'Goya' } },
    { razonSocial: 'Patagonia SRL', cuit: '30222222222', direccion: { ciudad: 'Neuquén' } },
  ];
  assert.equal(filtrarProveedores(datos, 'LITORAL').length, 1);
  assert.equal(filtrarProveedores(datos, '30222').length, 1);
  assert.equal(filtrarProveedores(datos, 'neuquén').length, 1);
  assert.equal(filtrarProveedores(datos, ' ').length, 2);
});

test('admite únicamente calificaciones enteras de 1 a 5', () => {
  assert.equal(esCalificacionValida(1), true);
  assert.equal(esCalificacionValida(5), true);
  assert.equal(esCalificacionValida(0), false);
  assert.equal(esCalificacionValida(6), false);
  assert.equal(esCalificacionValida(2.5), false);
  assert.equal(esCalificacionValida('5'), false);
});
