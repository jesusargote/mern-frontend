import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";
import Alerta from "../components/Alerta";

const NuevoColaborador = () => {
  const [email, setEmail] = useState("");

  const {
    obtenerProyecto,
    proyecto,
    alerta,
    colaborador,
    setColaborador,  
    cargando,
    submitColaborador,
    agregarColaborador,
    mostrarAlerta,
  } = useProyectos();

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    obtenerProyecto(params.id);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      mostrarAlerta({ msg: "El correo es obligatorio", error: true });
      return;
    }
    submitColaborador({ email });
  };

  const handleAgregar = async () => {
    const yaExiste = proyecto.colaboradores?.some(
      (colab) => colab._id === colaborador._id
    );
    if (yaExiste) {
      mostrarAlerta({
        msg: "Este colaborador ya está en el proyecto",
        error: true,
      });
      return;
    }

    await agregarColaborador({
      email: colaborador.email,
      id: proyecto._id,
    });

    setEmail("");
    setColaborador({});
    setTimeout(() => {
      mostrarAlerta({});
    }, 3000);
  };

  if (!proyecto?._id) return <Alerta alerta={alerta} />;

  return (
    <>
      <div className="flex justify-between items-center flex-wrap gap-4 mb-8">
        <h1 className="font-black text-3xl text-gray-800">Añadir Colaborador</h1>
        
        <button
          onClick={() => navigate(`/proyectos/${proyecto._id}`)}
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Volver a Tareas
        </button>
      </div>

      <h1 className="text-4xl font-black text-[#2E8C00] text-center">
        Añadir Colaborador
      </h1>
      <p className="text-xl text-gray-600 text-center mt-2 mb-6 uppercase">
        Proyecto | <span className="font-bold">{proyecto.nombre}</span>
      </p>

      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg px-8 py-6 w-full max-w-lg"
        >
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-bold text-gray-700 uppercase"
            >
              Correo del colaborador
            </label>
            <input
              id="email"
              type="email"
              placeholder="correo@correo.com"
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <input
            type="submit"
            value="Buscar Colaborador"
            className="bg-[#39A900] hover:bg-[#2E8C00] transition-colors w-full p-2 text-white uppercase font-bold rounded cursor-pointer"
          />
        </form>
      </div>

      {cargando ? (
        <p className="text-center text-gray-500 mt-6">Buscando colaborador...</p>
      ) : (
        colaborador?._id && (
          <div className="flex justify-center mt-10">
            <div className="bg-white px-6 py-4 shadow-md rounded-lg w-full max-w-lg text-center">
              <h2 className="text-xl font-bold text-[#2E8C00] mb-2">
                Colaborador encontrado:
              </h2>
              <p className="text-gray-700 mb-2">{colaborador.nombre}</p>
              <p className="text-gray-500 mb-4">{colaborador.email}</p>

              <button
                onClick={handleAgregar}
                className="bg-[#2E8C00] hover:bg-[#39A900] px-4 py-2 rounded text-white font-bold uppercase"
              >
                Agregar al Proyecto
              </button>
            </div>
          </div>
        )
      )}

      {alerta?.msg && <Alerta alerta={alerta} />}
    </>
  );
};

export default NuevoColaborador;
