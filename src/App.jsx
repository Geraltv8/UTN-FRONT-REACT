import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Proveedores from './pages/Proveedores';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/proveedores" element={<Proveedores />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
