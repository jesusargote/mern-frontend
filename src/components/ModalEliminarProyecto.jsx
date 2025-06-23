import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import useProyectos from '../hooks/useProyectos';

const ModalEliminarProyecto = () => {
  const {
    modalEliminarProyecto,
    handleModalEliminarProyecto,
    eliminarProyecto,
    proyecto
  } = useProyectos();

  return (
    <Transition.Root show={modalEliminarProyecto} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={handleModalEliminarProyecto}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-40 transition-opacity" />
          </Transition.Child>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-6 pt-6 pb-5 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">

              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>

              <div className="mt-4 text-center sm:mt-6">
                <Dialog.Title as="h3" className="text-xl font-semibold text-gray-800">
                  ¿Deseas eliminar este proyecto?
                </Dialog.Title>
                <p className="mt-2 text-sm text-gray-600">
                  Esta acción no se puede deshacer. Se eliminarán todas las tareas y colaboradores asociados al proyecto <span className="font-bold">{proyecto.nombre}</span>.
                </p>
              </div>

              <div className="mt-6 sm:flex sm:justify-end gap-3">
            <button
                type="button"
                className="w-full sm:w-auto px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-md transition-colors"
                onClick={() => eliminarProyecto(proyecto._id)}
              >
                Eliminar
            </button>

                <button
                  type="button"
                  className="w-full sm:w-auto px-4 py-2 border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 font-medium text-sm rounded-md transition-colors"
                  onClick={handleModalEliminarProyecto}
                >
                  Cancelar
                </button>
              </div>

            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalEliminarProyecto;
