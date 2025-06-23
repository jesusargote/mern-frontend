import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useProyectos from '../hooks/useProyectos';
import ModalFormularioTarea from '../components/ModalFormularioTarea';
import ModalEliminarTarea from '../components/ModalEliminarTareas';
import Tarea from '../components/Tarea';
import Alerta from '../components/Alerta';

const Proyecto = () => {
  const params = useParams();
  const {
    obtenerProyecto,
    proyecto,
    cargando,
    handleModalTarea,
    alerta,
    eliminarColaborador,
  } = useProyectos();

  const [modalEliminar, setModalEliminar] = useState({ abierto: false, colaboradorId: null });

  useEffect(() => {
    obtenerProyecto(params.id);
  }, [params.id]);

  const { nombre, tareas, colaboradores } = proyecto;
  const { msg } = alerta;

  const confirmarEliminarColaborador = () => {
    eliminarColaborador({ id: proyecto._id, colaboradorId: modalEliminar.colaboradorId });
    setModalEliminar({ abierto: false, colaboradorId: null });
  };

  if (cargando) return <p className="text-center mt-10">Cargando...</p>;

  return (
    <>
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h1 className="font-black text-3xl text-gray-800">{nombre}</h1>
        <Link
          to={`/proyectos/editar/${proyecto._id}`}
          className="uppercase font-bold flex items-center gap-2 text-gray-500 hover:text-black"
        >
          <svg
            className="h-5 w-5 text-green-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-5M18.5 2.5l3 3M13 7l6 6"
            />
          </svg>
          Editar Proyect0
        </Link>
      </div>

      <button
        onClick={handleModalTarea}
        type="button"
        className="bg-[#2E8C00] hover:bg-[#256f00] text-white font-semibold px-5 py-3 rounded-md mt-6 uppercase flex items-center gap-2 text-sm transition-all"
      >
        Nueva Tarea
      </button>

      {msg && (
        <div className="mt-4 w-full md:w-1/3">
          <Alerta alerta={alerta} />
        </div>
      )}

      <section className="mt-10">
        <h2 className="font-bold text-xl text-gray-800 mb-4">Tareas del Proyecto</h2>
        <div className="bg-white shadow mt-4 rounded-lg p-4">
          {tareas?.length ? (
            tareas.map((tarea) => <Tarea key={tarea._id} tarea={tarea} />)
          ) : (
            <p className="text-center py-10 text-gray-500">No hay tareas para este proyecto.</p>
          )}
        </div>
      </section>

      <section className="mt-10">
        <div className="flex items-center justify-between border-b pb-2 mb-4">
          <p className="font-bold text-2xl text-gray-800">Colaboradores</p>
          <Link
            to={`/proyectos/nuevo-colaborador/${proyecto._id}`}
            className="text-sm text-gray-500 hover:text-gray-700 uppercase font-bold"
          >
            Añadir
          </Link>
        </div>

        {colaboradores?.length ? (
          <div className="grid gap-4">
            {colaboradores.map((colaborador) => (
              <div
                key={colaborador._id}
                className="flex justify-between items-center bg-white p-4 rounded shadow"
              >
                <div>
                  <p className="text-gray-800 font-medium">{colaborador.nombre}</p>
                  <p className="text-gray-500 text-sm">{colaborador.email}</p>
                </div>
                <button
                  onClick={() => setModalEliminar({ abierto: true, colaboradorId: colaborador._id })}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs uppercase font-bold"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">Aún no hay colaboradores en este proyecto.</p>
        )}
      </section>

      {modalEliminar.abierto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-80 text-center">
            <h2 className="text-xl font-bold text-[#2E8C00] mb-4">Eliminar Colaborador</h2>
            <p className="text-gray-700 mb-6">
              ¿Estás seguro que deseas eliminar este colaborador del proyecto?
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
                onClick={confirmarEliminarColaborador}
              >
                Sí, Eliminar
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded transition"
                onClick={() => setModalEliminar({ abierto: false, colaboradorId: null })}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <ModalFormularioTarea />
      <ModalEliminarTarea />
    </>
  );
};

export default Proyecto;
