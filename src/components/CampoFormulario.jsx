// Input con estilos de Bootstrap. Reutilizable en cualquier formulario.
const CampoFormulario = ({ name, value, onChange, placeholder, type = 'text', ...resto }) => {
    return (
        <input
            type={type}
            name={name}
            className="form-control mb-2"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            {...resto}
        />
    );
};

export default CampoFormulario;
