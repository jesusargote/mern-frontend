import { useEffect } from "react";
import { useParams } from "react-router-dom";
import FormularioProyecto from "../components/FormularioProyecto";
import ModalEliminarProyecto from "../components/ModalEliminarProyecto";  // <-- asegúrate de importar
import useProyectos from "../hooks/useProyectos";

const EditarProyecto = () => {
    const params = useParams();
    const { obtenerProyecto, proyecto, cargando, handleModalEliminarProyecto } = useProyectos();

    useEffect(() => {
        obtenerProyecto(params.id);
    }, []);

    const { nombre } = proyecto;

    if (cargando) return 'Cargando...';

    return (
        <>
            <div className='flex justify-between flex-wrap items-center gap-4'>
                <h1 className="text-xl md:text-3xl font-semibold text-gray-800">
                    Editar Proyecto | <span className="text-[#2E8C00] font-bold">{nombre}</span>
                </h1>

                <div className='flex items-center gap-2 text-red-600 hover:text-red-800 cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" 
                        fill="none" viewBox="0 0 24 24" 
                        strokeWidth={1.5} stroke="currentColor" 
                        className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" 
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <button
                        className="uppercase font-bold"
                        onClick={handleModalEliminarProyecto}
                    >
                        Eliminar Proyecto
                    </button>
                </div>
            </div>

            <div className="mt-10 flex justify-center">
                <FormularioProyecto />
            </div>

            {/* Aquí renderizas el modal */}
            <ModalEliminarProyecto />
        </>
    );
};

export default EditarProyecto;
