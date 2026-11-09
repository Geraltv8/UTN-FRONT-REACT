import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProveedorForm from "../components/ProveedorForm";
import ProveedorList from "../components/ProveedorList";
import { obtenerProveedores } from "../services/proveedorService";
import { logout } from "../services/authService";
import { obtenerMensajeError } from "../utils/obtenerMensajeError";

const Proveedores = () => {
  const [proveedores, setProveedores] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const cargarProveedores = async () => {
      try {
        const datos = await obtenerProveedores();
        setProveedores(datos);
      } catch (err) {
        if (err.response?.status === 401) {
          logout();
          navigate("/login", { replace: true });
          return;
        }
        setError(obtenerMensajeError(err, "Error al cargar los proveedores"));
      } finally {
        setCargando(false);
      }
    };

    cargarProveedores();
  }, [navigate]);

  const agregarProveedor = (nuevoProveedor) => {
    setProveedores((lista) => [...lista, nuevoProveedor]);
  };

  const reemplazarProveedor = (proveedorActualizado) => {
    setProveedores((lista) =>
      lista.map((p) => (p._id === proveedorActualizado._id ? proveedorActualizado : p))
    );
  };

  return (
    <>
      <Navbar />
      <div className="container text-start mt-4">
        <h1 className="h2 mb-4">Gestión de Proveedores</h1>
        <div className="row">
          <div className="col-md-4 mb-4">
            <ProveedorForm onCreado={agregarProveedor} />
          </div>
          <div className="col-md-8">
            {cargando && <p className="text-muted">Cargando proveedores...</p>}
            {error && <div className="alert alert-danger">{error}</div>}
            {!cargando && !error && (
              <ProveedorList proveedores={proveedores} onActualizado={reemplazarProveedor} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Proveedores;
