import { useEffect, useState } from 'react';
import { obtenerProductos } from '../services/productoService.js';
import { mensajeError } from '../services/api.js';

const formatoPesos = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 2,
});

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let activa = true;
    obtenerProductos()
      .then((datos) => { if (activa) setProductos(Array.isArray(datos) ? datos : []); })
      .catch((err) => { if (activa) setError(mensajeError(err)); })
      .finally(() => { if (activa) setCargando(false); });
    return () => { activa = false; };
  }, []);

  return (
    <section className="products-page">
      <span className="eyebrow">CATÁLOGO / PRODUCTOS</span>
      <h1>Catálogo de productos</h1>
      <p className="page-lead mb-4">Se mantiene el listado original de la aplicación de ejemplo del docente, ahora consumido desde la capa de servicios.</p>
      {error && <div className="alert-message notice" role="alert">{error}</div>}
      {cargando ? <p className="empty-state" role="status">Cargando productos...</p>
        : productos.length === 0 ? <p className="empty-state">No hay productos para mostrar.</p>
          : <div className="row g-3">{productos.map((producto) => (
              <div className="col-12 col-sm-6 col-lg-4" key={producto._id}>
                <article className="supplier-card h-100">
                  <span className="eyebrow">{producto.categoria || 'SIN CATEGORÍA'}</span>
                  <h2 className="mt-2" style={{ fontSize: 17, fontWeight: 800 }}>{producto.nombre}</h2>
                  <strong className="d-block mt-3" style={{ color: '#2554d7', fontSize: 22 }}>
                    {Number.isFinite(Number(producto.precio)) ? formatoPesos.format(producto.precio) : 'Sin precio'}
                  </strong>
                </article>
              </div>
            ))}</div>}
    </section>
  );
}
