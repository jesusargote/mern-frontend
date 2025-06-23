import { formatearFecha } from "../helpers/formatearFecha";
import useProyectos from "../hooks/useProyectos";

const Tarea = ({ tarea }) => {
  const { handleModalEditarTarea, handleModalEliminarTarea } = useProyectos();
  const { descripcion, nombre, prioridad, fechaEntrega, estado } = tarea;

  return (
    <div className="border-b p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white rounded-md shadow-sm">
      <div className="flex-1">
        <p className="mb-1 text-lg text-gray-800 font-semibold">{nombre}</p>
        <p className="mb-1 text-sm text-gray-500">{descripcion}</p>
        <p className="mb-1 text-sm text-gray-600">
          Fecha entrega: {formatearFecha(fechaEntrega)}
        </p>
        <p className="mb-1 text-sm text-gray-600">Prioridad: {prioridad}</p>
      </div>

      <div className="flex flex-wrap gap-2 justify-end">
        <button
          className="bg-[#2E8C00] hover:bg-[#256f00] px-4 py-2 text-white uppercase text-xs font-medium rounded-md transition-colors"
          onClick={() => handleModalEditarTarea(tarea)}
        >
          Editar
        </button>

        {estado ? (
          <button className="bg-[#39A900] hover:bg-[#2E8C00] px-4 py-2 text-white uppercase text-xs font-medium rounded-md transition-colors">
            Completa
          </button>
        ) : (
          <button className="bg-gray-500 hover:bg-gray-600 px-4 py-2 text-white uppercase text-xs font-medium rounded-md transition-colors">
            Incompleta
          </button>
        )}

        <button
          className="bg-red-600 hover:bg-red-700 px-4 py-2 text-white uppercase text-xs font-medium rounded-md transition-colors"
          onClick={() => handleModalEliminarTarea(tarea)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default Tarea;
