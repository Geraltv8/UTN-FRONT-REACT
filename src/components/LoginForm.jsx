import { useState } from "react";
import { login } from "../services/authService";
import { obtenerMensajeError } from "../utils/obtenerMensajeError";

const LoginForm = ({ onLoginExitoso }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setCargando(true);
    try {
      await login(email.trim(), password);
      onLoginExitoso();
    } catch (err) {
      setError(obtenerMensajeError(err, "Credenciales inválidas"));
    } finally {
      setCargando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
      <h2 className="h4 mb-4">Iniciar sesión</h2>
      <input
        type="email"
        className="form-control mb-2"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        className="form-control mb-3"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <div className="alert alert-danger py-2">{error}</div>}
      <button type="submit" className="btn btn-primary w-100" disabled={cargando}>
        {cargando ? "Ingresando..." : "Entrar"}
      </button>
    </form>
  );
};

export default LoginForm;
