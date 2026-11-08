import { useState, useEffect } from 'react'; 
import { getProveedores, crearProveedor, calificarProveedor } from '../services/ProveedorService'; 
import ProveedorCard from '../components/ProveedorCard';  

const Proveedores = () => {   
  // 1. Estados locales.   
  const [proveedores, setProveedores] = useState([]);   
  const [formData, setFormData] = useState({ nombre: '', contacto: '' });   
  const [cargando, setCargando] = useState(true);    

  useEffect(() => {     
    cargarListado();    
  }, []);    

  // 2. Carga inicial de datos al montar el componente.   
  const cargarListado = async () => {     
    try {       
      const datos = await getProveedores();       
      setProveedores(datos);     
    } catch (error) {       
      console.error("Error al cargar proveedores", error);     
    } finally {       
      setCargando(false);     
    }   
  };    

  // 3. Manejador para registrar un nuevo proveedor.   
  const handleSubmit = async (e) => {     
    e.preventDefault();     
    try {       
      const nuevo = await crearProveedor(formData);       
      setProveedores([...proveedores, nuevo]);       
      setFormData({ nombre: '', contacto: '' });     
    } catch (error) {       
      alert("Error al guardar el proveedor");     
    }   
  };    

  // 4. Manejador para calificar un proveedor.   
  const handleCalificar = async (id) => {     
    const nuevaCalificacion = prompt("Ingrese una calificación (1 al 5):");     
    if (nuevaCalificacion) {       
      try {         
        const actualizado = await calificarProveedor(id, Number(nuevaCalificacion));         
        // CORREGIDO: "setProveedores" con P mayúscula
        setProveedores(proveedores.map(p =>           
          (p._id === id || p.id === id) ? actualizado : p         
        ));       
      } catch (error) {         
        alert("Error al calificar el proveedor");       
      }     
    }   
  };    

  return (     
    <div className="container mt-4">       
      <h1 className="mb-4">Gestión de Proveedores</h1>        
      <div className="row">         
        {/* Formulario de registro */}         
        <div className="col-md-4 mb-4">           
          <form onSubmit={handleSubmit} className="card p-3 shadow-sm">             
            <h5>Nuevo Proveedor</h5>               
            <input                 
              type="text"                 
              className="form-control mb-2"                 
              placeholder="Nombre del proveedor"                 
              value={formData.nombre}                 
              // CORREGIDO: "setFormData" bien escrito
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}                 
              required               
            />               
            <input                 
              type="text"                 
              className="form-control mb-3" // CORREGIDO: "form-control"             
              placeholder="Contacto / Email"                 
              value={formData.contacto}                 
              onChange={(e) => setFormData({ ...formData, contacto: e.target.value })}                 
              required               
            />               
            <button type="submit" className="btn btn-success w-100">                 
              Guardar Proveedor               
            </button>             
          </form>         
        </div>       
      </div>          

      {/* Listado de proveedores. */}             
      <div className="col-md-8">               
        {cargando ? (                 
          <p>Cargando proveedores....</p>               
        ) : (                 
          <div className="row">                   
            {proveedores.map(prov => (                     
              <div className="col-md-6" key={prov._id || prov.id}>                       
                <ProveedorCard                         
                  proveedor={prov}                         
                  onCalificar={handleCalificar}                       
                />                     
              </div>                   
            ))}                   
            {/* CORREGIDO: número 0 y etiqueta className dentro del tag */}
            {proveedores.length === 0 && (                     
              <p className="text-muted">No hay proveedores registrados.</p>                   
            )}                 
          </div>               
        )}             
      </div>     
    </div>   
  ); 
};

export default Proveedores;
