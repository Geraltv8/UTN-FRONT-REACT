import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

const Login = () => {
    const navigate = useNavigate();

    return (
        <div className="container mt-5" style={{ maxWidth: 400 }}>
            <h1 className="mb-4">Iniciar sesión</h1>
            <LoginForm onExito={() => navigate('/dashboard')} />
        </div>
    );
};

export default Login;
