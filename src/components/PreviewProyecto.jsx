import { Link } from "react-router-dom"

const PreviewProyecto = ({ proyecto }) => {
  const { nombre, _id, cliente } = proyecto

  return (
    <div className="border-b p-5 flex flex-col md:flex-row md:items-center md:justify-between">
      <div className="flex-1 mb-2 md:mb-0">
        <p className="text-lg font-semibold text-gray-800">{nombre}</p>
        <span className="text-sm text-gray-500 uppercase">Cliente: {cliente}</span>
      </div>

      <Link
        to={`${_id}`}
        className="text-[#2E8C00] hover:text-[#206600] uppercase text-sm font-bold transition-colors"
      >
        Ver Proyecto
      </Link>
    </div>
  )
}

export default PreviewProyecto
