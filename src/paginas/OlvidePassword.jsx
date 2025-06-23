import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";

const OlvidePassword = () => {
  const [email, setEmail] = useState('');
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email.trim() === '' || email.length < 6) {
      setAlerta({
        msg: 'El correo electrónico es obligatorio',
        error: true,
      });
      return;
    }

    try {
      const { data } = await clienteAxios.post(`/usuarios/olvide-password`, { email });
      setAlerta({
        msg: data.msg,
        error: false,
      });
    } catch (error) {
      setAlerta({
        msg: error.response?.data?.msg || 'Error al enviar el correo',
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
      <h2 className="text-[#39a900] text-2xl md:text-3xl font-extrabold text-center mb-6">
        Recupera el acceso a tu cuenta
      </h2>

      {msg && <Alerta alerta={alerta} />}

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-gray-700 font-semibold mb-2"
          >
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            placeholder="Ingresa tu email registrado"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#39a900]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Enviar Instrucciones"
          className="bg-[#39a900] hover:bg-[#007832] transition-colors text-white font-bold uppercase w-full py-3 rounded-md cursor-pointer"
        />
      </form>

      <nav className="mt-6 text-sm text-center text-gray-600">
        <Link className="block my-2 hover:underline" to="/">
          ¿Ya tienes una cuenta? Inicia Sesión
        </Link>
        <Link className="block my-2 hover:underline" to="/registrar">
          ¿No tienes una cuenta? Regístrate
        </Link>
      </nav>
    </div>
  );
};

export default OlvidePassword;
