import useProyectos from "../hooks/useProyectos";

const ModalEliminarColaborador = () => {
  const {
    modalEliminarColaborador,
    handleModalEliminarColaborador,
    eliminarColaborador,
    colaboradorSeleccionado
  } = useProyectos();

  if (!modalEliminarColaborador) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow p-8 w-96">
        <h2 className="text-xl font-bold text-center mb-4">¿Eliminar colaborador?</h2>
        <p className="text-center text-gray-600 mb-6">
          Esta acción no se puede deshacer. El colaborador{" "}
          <span className="font-bold">{colaboradorSeleccionado?.nombre}</span>{" "}
          será eliminado del proyecto.
        </p>
        <div className="flex justify-between">
          <button
            onClick={eliminarColaborador}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white font-bold"
          >
            Eliminar
          </button>
          <button
            onClick={() => handleModalEliminarColaborador({})}
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded text-black font-bold"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalEliminarColaborador;
