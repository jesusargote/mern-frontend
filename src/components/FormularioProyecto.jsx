import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";
import Alerta from "./Alerta";

const FormularioProyecto = () => {
  const [id, setId] = useState(null);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaEntrega, setFechaEntrega] = useState('');
  const [cliente, setCliente] = useState('');

  const params = useParams();
  const { mostrarAlerta, alerta, submitProyecto, proyecto } = useProyectos();

  useEffect(() => {
    if (params.id) {
      setId(proyecto._id);
      setNombre(proyecto.nombre);
      setDescripcion(proyecto.descripcion);
      setFechaEntrega(proyecto.fechaEntrega?.split('T')[0]);
      setCliente(proyecto.cliente);
    }
  }, [params]);

  const handleSubmit = async e => {
    e.preventDefault();

    if ([nombre, descripcion, fechaEntrega, cliente].includes('')) {
      mostrarAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      });
      return;
    }

    await submitProyecto({ id, nombre, descripcion, fechaEntrega, cliente });

    setId(null);
    setNombre('');
    setDescripcion('');
    setFechaEntrega('');
    setCliente('');
  };

  const { msg } = alerta;

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg bg-white py-8 px-6 rounded-lg shadow-md"
    >
      {msg && <Alerta alerta={alerta} />}

      {/* Nombre del Proyecto */}
      <div className="mb-5">
        <label
          htmlFor="nombre"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Nombre del Proyecto
        </label>
        <input
          id="nombre"
          type="text"
          placeholder="Nombre del Proyecto"
          className="border w-full mt-2 p-3 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2E8C00]"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
        />
      </div>

      {/* Descripción */}
      <div className="mb-5">
        <label
          htmlFor="descripcion"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Descripción
        </label>
        <textarea
          id="descripcion"
          placeholder="Descripción del Proyecto"
          className="border w-full mt-2 p-3 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2E8C00]"
          value={descripcion}
          onChange={e => setDescripcion(e.target.value)}
        />
      </div>

      {/* Fecha de Entrega */}
      <div className="mb-5">
        <label
          htmlFor="fecha-entrega"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Fecha de Entrega
        </label>
        <input
          id="fecha-entrega"
          type="date"
          className="border w-full mt-2 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E8C00]"
          value={fechaEntrega}
          onChange={e => setFechaEntrega(e.target.value)}
        />
      </div>

      {/* Cliente */}
      <div className="mb-5">
        <label
          htmlFor="cliente"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Nombre del Cliente
        </label>
        <input
          id="cliente"
          type="text"
          placeholder="Nombre del Cliente"
          className="border w-full mt-2 p-3 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2E8C00]"
          value={cliente}
          onChange={e => setCliente(e.target.value)}
        />
      </div>

      {/* Botón */}
      <input
        type="submit"
        value={id ? "Actualizar Proyecto" : "Crear Proyecto"}
        className="bg-[#39A900] hover:bg-[#2E8C00] text-white w-full p-3 rounded-md uppercase font-bold cursor-pointer transition-colors"
      />
    </form>
  );
};

export default FormularioProyecto;
