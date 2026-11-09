// Selector de puntaje de 1 a "max". No sabe nada de proveedores:
// sirve para calificar cualquier cosa (productos, servicios, etc.).
const Calificador = ({ valor, onCambiar, max = 5 }) => {
    const opciones = Array.from({ length: max }, (_, i) => i + 1);

    return (
        <div className="d-flex justify-content-end gap-1 flex-wrap">
            {opciones.map((n) => (
                <button
                    key={n}
                    type="button"
                    className={`btn btn-sm ${valor === n ? 'btn-warning' : 'btn-outline-warning'}`}
                    onClick={() => onCambiar(n)}
                >
                    {n} ★
                </button>
            ))}
        </div>
    );
};

export default Calificador;
