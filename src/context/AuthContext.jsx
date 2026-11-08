import { useEffect, useState } from 'react';
import { AuthContext } from './auth-context.js';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  useEffect(() => {
    const handleExpiredSession = () => setToken(null);
    window.addEventListener('auth:expired', handleExpiredSession);
    return () => window.removeEventListener('auth:expired', handleExpiredSession);
  }, []);

  const iniciarSesion = (accessToken) => {
    localStorage.setItem('token', accessToken);
    setToken(accessToken);
  };

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, iniciarSesion, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  );
}
