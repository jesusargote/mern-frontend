import { useState } from 'react'
import useProyectos from '../hooks/useProyectos'
import Alerta from './Alerta'

const FormularioColaborador = () => {
  const [email, setEmail] = useState('')
  const { mostrarAlerta, alerta, submitColaborador } = useProyectos()

  const handleSubmit = e => {
    e.preventDefault()
    if (email === '') {
      mostrarAlerta({
        msg: 'El email es obligatorio',
        error: true
      })
      return
    }
    submitColaborador(email)
  }

  const { msg } = alerta

  return (
    <div className="flex justify-center mt-10">
      <form 
        className="bg-white w-full max-w-md p-8 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        {msg && <Alerta alerta={alerta} />}

        <div className="mb-5">
          <label 
            className="block text-gray-700 uppercase font-bold text-sm mb-2"
            htmlFor="email"
          >
            Correo del Colaborador
          </label>
          <input 
            type="email"
            id="email"
            placeholder="correo@ejemplo.com"
            className="border border-gray-300 w-full p-3 placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E8C00]"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <input 
          type="submit" 
          value="Buscar Colaborador"
          className="bg-[#2E8C00] hover:bg-[#246c00] transition-colors w-full p-3 text-white uppercase font-bold text-sm rounded-md cursor-pointer"
        />
      </form>
    </div>
  )
}

export default FormularioColaborador
