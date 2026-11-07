import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <section className="dashboard">
      <span className="eyebrow">PANEL DE ADMINISTRACIÓN</span>
      <h1>Bienvenido al panel</h1>
      <p className="page-lead">Administrá los proveedores, consultá sus datos y actualizá sus calificaciones desde un solo lugar.</p>
      <div className="dashboard-feature">
        <span className="feature-icon" aria-hidden="true">✦</span>
        <div>
          <h2>Módulo Proveedores</h2>
          <p>Listado desde la API, alta de proveedores y calificaciones de 1 a 5 estrellas.</p>
        </div>
        <Link className="primary-button" to="/proveedores">Ir a proveedores <span aria-hidden="true">→</span></Link>
      </div>
      <p className="architecture-note">Arquitectura: <strong>pages</strong> → <strong>services</strong> → <strong>Axios</strong> → <strong>API REST</strong>.</p>
    </section>
  );
}
