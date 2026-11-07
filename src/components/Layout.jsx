import { Link, NavLink, Outlet } from 'react-router-dom';

export default function Layout({ onLogout }) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="container-xl topbar-inner">
          <Link className="brand" to="/dashboard" aria-label="Ir al inicio">
            <span className="brand-symbol" aria-hidden="true">P</span>
            <span className="brand-copy"><strong>PROVEE</strong><small>Programación IV · UTN</small></span>
          </Link>
          <nav className="main-nav" aria-label="Navegación principal">
            <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Inicio</NavLink>
            <NavLink to="/productos" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Productos</NavLink>
            <NavLink to="/proveedores" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Proveedores</NavLink>
          </nav>
          <button className="btn-logout" onClick={onLogout} type="button">Cerrar sesión</button>
        </div>
      </header>
      <main className="container-xl main-content"><Outlet /></main>
      <footer className="footer container-xl">
        <span>TP Módulo 5 · Arquitectura Frontend</span>
        <span>React · Axios · React Router</span>
      </footer>
    </div>
  );
}
