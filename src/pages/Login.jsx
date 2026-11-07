import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUsuario, registrarUsuario } from '../services/authService';

const Login = () => {
    const [modoRegistro, setModoRegistro] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rol: 'ADMIN'
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (modoRegistro) {
                await registrarUsuario(formData);
                alert('Usuario registrado correctamente. Ahora puedes iniciar sesion.');
                setModoRegistro(false);
            } else {
                const respuesta = await loginUsuario({
                    email: formData.email,
                    password: formData.password
                });
                localStorage.setItem('token', respuesta.token);
                navigate('/proveedores');
            }
        } catch (error) {
            const mensaje = error.response?.data?.mensaje || error.response?.data?.error || 'Error de autenticacion';
            alert(mensaje);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-5 text-start">
                    <div className="card p-4 shadow-sm">
                        <h3 className="mb-3 text-center">
                            {modoRegistro ? 'Registrar Usuario' : 'Iniciar Sesion'}
                        </h3>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="usuario@correo.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Contrasena</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Contrasena"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                />
                            </div>

                            {modoRegistro && (
                                <div className="mb-3">
                                    <label className="form-label">Rol</label>
                                    <select
                                        className="form-select"
                                        value={formData.rol}
                                        onChange={(e) => setFormData({ ...formData, rol: e.target.value })}
                                    >
                                        <option value="ADMIN">ADMIN</option>
                                        <option value="VENDEDOR">VENDEDOR</option>
                                    </select>
                                </div>
                            )}

                            <button type="submit" className="btn btn-primary w-100 mb-2">
                                {modoRegistro ? 'Registrarse' : 'Ingresar'}
                            </button>
                        </form>

                        <button
                            type="button"
                            className="btn btn-link btn-sm text-decoration-none"
                            onClick={() => setModoRegistro(!modoRegistro)}
                        >
                            {modoRegistro
                                ? 'Ya tienes cuenta? Inicia sesion'
                                : 'No tienes cuenta? Registrate aqui'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

