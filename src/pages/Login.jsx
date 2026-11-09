import { Navigate, useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { estaAutenticado } from "../services/authService";

const Login = () => {
  const navigate = useNavigate();

  if (estaAutenticado()) {
    return <Navigate to="/proveedores" replace />;
  }

  return (
    <div className="container text-start mt-5" style={{ maxWidth: 420 }}>
      <LoginForm onLoginExitoso={() => navigate("/proveedores", { replace: true })} />
    </div>
  );
};

export default Login;
