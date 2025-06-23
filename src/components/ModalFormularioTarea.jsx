import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import useProyectos from '../hooks/useProyectos';
import Alerta from './Alerta';
import { useParams } from 'react-router-dom';

const PRIORIDAD = ['Baja', 'Media', 'Alta'];

const ModalFormularioTarea = () => {
  const [id, setId] = useState('');
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaEntrega, setFechaEntrega] = useState('');
  const [prioridad, setPrioridad] = useState('');

  const params = useParams();

  const {
    modalFormularioTarea,
    handleModalTarea,
    mostrarAlerta,
    alerta,
    submitTarea,
    tarea,
  } = useProyectos();

  useEffect(() => {
    if (tarea?._id) {
      setId(tarea._id);
      setNombre(tarea.nombre);
      setDescripcion(tarea.descripcion);
      setFechaEntrega(tarea.fechaEntrega?.split('T')[0]);
      setPrioridad(tarea.prioridad);
      return;
    }
    setId('');
    setNombre('');
    setDescripcion('');
    setFechaEntrega('');
    setPrioridad('');
  }, [tarea]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([nombre, descripcion, fechaEntrega, prioridad].includes('')) {
      mostrarAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true,
      });
      return;
    }

    await submitTarea({
      id,
      nombre,
      descripcion,
      fechaEntrega,
      prioridad,
      proyecto: params.id,
    });

    setId('');
    setNombre('');
    setDescripcion('');
    setFechaEntrega('');
    setPrioridad('');
  };

  const { msg } = alerta;

  return (
    <Transition.Root show={modalFormularioTarea} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={handleModalTarea}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          {/* Fondo oscurecido */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-60 transition-opacity" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          {/* Contenido modal centrado */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-middle bg-white rounded-xl px-6 pt-6 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full sm:p-6">
              {/* Botón cerrar */}
              <div className="absolute top-2 right-2">
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-800"
                  onClick={handleModalTarea}
                >
                  ✕
                </button>
              </div>

              {/* Título */}
              <Dialog.Title
                as="h3"
                className="text-xl font-bold text-center text-[#2E8C00]"
              >
                {id ? 'Editar Tarea' : 'Crear Nueva Tarea'}
              </Dialog.Title>

              {/* Alerta */}
              {msg && <Alerta alerta={alerta} />}

              {/* Formulario */}
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label
                    className="block text-gray-700 font-semibold text-sm"
                    htmlFor="nombre"
                  >
                    Nombre
                  </label>
                  <input
                    id="nombre"
                    type="text"
                    className="w-full border rounded-md p-2 mt-1"
                    placeholder="Nombre de la tarea"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    className="block text-gray-700 font-semibold text-sm"
                    htmlFor="descripcion"
                  >
                    Descripción
                  </label>
                  <input
                    id="descripcion"
                    type="text"
                    className="w-full border rounded-md p-2 mt-1"
                    placeholder="Breve descripción"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    className="block text-gray-700 font-semibold text-sm"
                    htmlFor="fecha-entrega"
                  >
                    Fecha de Entrega
                  </label>
                  <input
                    type="date"
                    id="fecha-entrega"
                    className="w-full border rounded-md p-2 mt-1"
                    value={fechaEntrega}
                    onChange={(e) => setFechaEntrega(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    className="block text-gray-700 font-semibold text-sm"
                    htmlFor="prioridad"
                  >
                    Prioridad
                  </label>
                  <select
                    id="prioridad"
                    className="w-full border rounded-md p-2 mt-1"
                    value={prioridad}
                    onChange={(e) => setPrioridad(e.target.value)}
                  >
                    <option value="">-- Seleccionar --</option>
                    {PRIORIDAD.map((opcion) => (
                      <option key={opcion}>{opcion}</option>
                    ))}
                  </select>
                </div>

                <input
                  type="submit"
                  className="w-full bg-[#39A900] hover:bg-[#2E8C00] text-white font-bold py-2 rounded-md transition-colors cursor-pointer"
                  value={id ? 'Guardar Cambios' : 'Crear Tarea'}
                />
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalFormularioTarea;
