import { Link, useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { useState } from "react"
import useProyectos from "../hooks/useProyectos"

const Sidebar = () => {
  const { auth } = useAuth()
  const { proyectos, setProyectos, proyectosOriginales } = useProyectos()
  const [busqueda, setBusqueda] = useState("")
  const navigate = useNavigate()

  const handleBuscar = (e) => {
    const texto = e.target.value
    setBusqueda(texto)

    if (texto.trim() === "") {
      // Restaurar todos los proyectos si se borra la búsqueda
      setProyectos(proyectosOriginales)
    } else {
      const filtrados = proyectosOriginales.filter(proyecto =>
        proyecto.nombre.toLowerCase().includes(texto.toLowerCase())
      )
      setProyectos(filtrados)
    }
  }

  const handleNuevoProyecto = () => {
    navigate("/crear-proyecto")
  }

  return (
    <aside className="md:w-80 lg:w-96 px-5 py-10 bg-white shadow-md rounded-md">
      <p className="text-lg md:text-xl font-semibold text-gray-800 mb-6">
        Hola, <span className="font-bold text-[#2E8C00]">{auth.nombre}</span>
      </p>

      {/* Input de búsqueda */}
      <div className="mb-6">
        <input
          type="text"
          value={busqueda}
          onChange={handleBuscar}
          placeholder="Buscar proyecto..."
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E8C00]"
        />
      </div>

      <Link
        to="/proyectos/crear-proyecto"
        className="bg-[#39A900] hover:bg-[#2E8C00] w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg"
      >
      Nuevo Proyecto
      </Link>
    </aside>
  )
}

export default Sidebar
