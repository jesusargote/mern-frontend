import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";
import Alerta from "../components/Alerta";

const NuevoPassword = () => {
  const [password, setPassword] = useState("");
  const [tokenValido, setTokenValido] = useState(false);
  const [alerta, setAlerta] = useState({});
  const [passwordModificado, setPasswordModificado] = useState(false);

  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/usuarios/olvide-password/${token}`);
        setTokenValido(true);
      } catch (error) {
        setAlerta({
          msg: error.response?.data?.msg || "Token inválido",
          error: true,
        });
      }
    };
    comprobarToken();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setAlerta({
        msg: "La contraseña debe tener al menos 6 caracteres",
        error: true,
      });
      return;
    }

    try {
      const { data } = await clienteAxios.post(`/usuarios/olvide-password/${token}`, { password });
      setAlerta({
        msg: data.msg,
        error: false,
      });
      setPasswordModificado(true);
    } catch (error) {
      setAlerta({
        msg: error.response?.data?.msg || "Error al cambiar la contraseña",
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h2 className="text-[#39a900] text-2xl md:text-3xl font-extrabold text-center mb-6">
          Restablece tu contraseña
        </h2>

        {msg && <Alerta alerta={alerta} />}

        {tokenValido && !passwordModificado && (
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block text-gray-700 font-semibold mb-2"
              >
                Nueva contraseña
              </label>
              <input
                id="password"
                type="password"
                placeholder="Tu nueva contraseña"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#39a900]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <input
              type="submit"
              value="Guardar nueva contraseña"
              className="bg-[#39a900] hover:bg-[#007832] transition-colors text-white font-bold uppercase w-full py-3 rounded-md cursor-pointer"
            />
          </form>
        )}

        {passwordModificado && (
          <div className="mt-6 text-center">
            <p className="text-gray-700 mb-4 font-medium">Tu contraseña fue actualizada correctamente</p>
            <Link
              className="text-[#39a900] hover:underline font-semibold"
              to="/"
            >
              Inicia sesión
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NuevoPassword;
