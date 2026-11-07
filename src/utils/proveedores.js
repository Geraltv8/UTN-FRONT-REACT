export function validarProveedor(datos) {
  const errores = [];
  if (!datos.razonSocial.trim()) errores.push('Ingresá la razón social.');
  if (!/^\d{11}$/.test(datos.cuit.trim())) {
    errores.push('El CUIT debe contener exactamente 11 números, sin guiones.');
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.contacto.email.trim())) {
    errores.push('Ingresá un correo electrónico válido.');
  }
  return errores;
}

export function crearPayloadProveedor(datos) {
  return {
    razonSocial: datos.razonSocial.trim(),
    cuit: datos.cuit.trim(),
    contacto: {
      email: datos.contacto.email.trim(),
      telefono: datos.contacto.telefono.trim(),
    },
    direccion: {
      calle: datos.direccion.calle.trim(),
      ciudad: datos.direccion.ciudad.trim(),
      pais: datos.direccion.pais.trim() || 'Argentina',
    },
    calificacion: 3,
  };
}

export function filtrarProveedores(proveedores, busqueda) {
  const texto = busqueda.trim().toLocaleLowerCase('es');
  if (!texto) return proveedores;
  return proveedores.filter((p) =>
    [p.razonSocial, p.cuit, p.direccion?.ciudad]
      .some((dato) => String(dato || '').toLocaleLowerCase('es').includes(texto)),
  );
}

export function esCalificacionValida(valor) {
  return Number.isInteger(valor) && valor >= 1 && valor <= 5;
}
