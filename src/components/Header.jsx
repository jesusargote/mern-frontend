import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import logoSena from "../assets/logo-sena.svg";

const Header = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);

  const handleConfirmarCerrarSesion = () => {
    localStorage.removeItem("token");
    setAuth({});
    navigate("/");
  };

  return (
    <header className="bg-white border-b shadow-sm relative z-40">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Logo + Nombre */}
        <div className="flex items-center gap-3">
          <img src={logoSena} alt="Logo SENA" className="w-10 h-10" />
          <h2 className="text-2xl font-bold text-[#2E8C00]">
            Fondo <span className="text-[#39A900]">Emprender</span>
          </h2>
        </div>

        {/* Barra de búsqueda */}
        <div className="flex-1 flex justify-center">
          <input
            type="text"
            placeholder="Buscar Proyectos"
            className="w-full md:w-96 border border-gray-300 rounded-md px-4 py-2 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2E8C00]"
          />
        </div>

        {/* Botones de navegación */}
        <div className="flex items-center gap-4">
          <Link
            to="/proyectos"
            className="text-[#2E8C00] hover:text-[#39A900] font-bold uppercase text-sm tracking-wide"
          >
            Proyectos
          </Link>
          <button
            onClick={() => setModalVisible(true)}
            className="bg-[#2E8C00] hover:bg-[#39A900] text-white font-bold uppercase px-4 py-2 rounded-lg shadow-md flex items-center gap-1 text-sm"
          >
            <span>⏎</span> Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Modal corporativo */}
      {modalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-80 text-center">
            <h2 className="text-xl font-bold text-[#2E8C00] mb-4">Cerrar Sesión</h2>
            <p className="text-gray-700 mb-6">¿Estás seguro que deseas cerrar sesión?</p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-[#2E8C00] hover:bg-[#39A900] text-white px-4 py-2 rounded transition"
                onClick={handleConfirmarCerrarSesion}
              >
                Sí, Cerrar
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded transition"
                onClick={() => setModalVisible(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
