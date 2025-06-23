import useProyectos from "../hooks/useProyectos"
import PreviewProyecto from "../components/PreviewProyecto"

const Proyectos = () => {

  const {proyectos} = useProyectos()
  
  return (
    <>
      <h1 className="w-full flex justify-center text-xl md:text-3xl font-semibold mb-8 text-gray-800">
        Proyectos Activos |{""}
        <span className="text-[#2E8C00] font-bold"> Fondo Emprender</span>
      </h1>

      <div className='bg-white shadow mt-10 rounded-lg'>
        {proyectos.length ? 
          proyectos.map(proyecto => (
            <PreviewProyecto
              key={proyecto._id} 
              proyecto={proyecto}
            />
          ))
        : <p className='text-center text-gray-600 uppercase p-5'>No hay proyectos</p>}
      </div>

    </>
  )
}

export default Proyectos
