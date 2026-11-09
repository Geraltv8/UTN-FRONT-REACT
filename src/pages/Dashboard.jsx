import { Link } from 'react-router-dom';

const Dashboard = () => (
  <div className="container mt-4 text-start">
    <h1 className="mb-4">Dashboard</h1>
    <div className="card shadow-sm" style={{ maxWidth: 360 }}>
      <div className="card-body">
        <h5 className="card-title">Proveedores</h5>
        <p className="card-text text-muted">Alta, listado y calificación de proveedores.</p>
        <Link to="/proveedores" className="btn btn-primary">Ir a Proveedores</Link>
      </div>
    </div>
  </div>
);

export default Dashboard;
