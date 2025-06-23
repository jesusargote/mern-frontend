import FormularioProyecto from "../components/FormularioProyecto";

const NuevoProyecto = () => {
  return (
    <>
      <h1 className="text-center text-xl md:text-3xl font-semibold mb-8 text-gray-800">
        Crear un nuevo proyecto |{" "}
        <span className="text-[#2E8C00] font-bold">Fondo Emprender</span>
      </h1>

      <div className="flex justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full md:w-2/3 lg:w-1/2">
          <FormularioProyecto />
        </div>
      </div>
    </>
  );
};

export default NuevoProyecto;
