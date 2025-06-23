import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";
import senaLogo from "../assets/logo-sena.svg"; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});

  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    if ([email, password].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      });
      return;
    }

    try {
      const { data } = await clienteAxios.post('/usuarios/login', { email, password });
      setAlerta({});
      localStorage.setItem('token', data.token);
      setAuth(data);
      navigate('/proyectos');
    } catch (error) {
      setAlerta({
        msg: error.response?.data?.msg || 'Error al iniciar sesión',
        error: true
      });
    }
  };

  const { msg } = alerta;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white px-4">
       <div className="mb-6">
        <img src={senaLogo} alt="Logo del SENA" className="w-32 md:w-40" />
      </div>

      {/* Título */}
      <h1 className="text-[#39a900] font-black text-3xl md:text-5sl text-center mb-5">
      Fondo Emprender
      </h1>

      {/* Alerta */}
      {msg && <Alerta alerta={alerta} />}

      {/* Formulario */}
      <form
        className="w-full max-w-md bg-white shadow-md rounded-lg p-8"
        onSubmit={handleSubmit}
      >
        <div className="mb-5">
          <label className="uppercase text-gray-700 block text-sm font-bold mb-2" htmlFor="email">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006633]"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label className="uppercase text-gray-700 block text-sm font-bold mb-2" htmlFor="password">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            placeholder="Contraseña"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006633]"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Iniciar Sesión"
          className="bg-[#39a900] hover:bg-[#007832] transition-colors text-white font-bold uppercase w-full py-3 rounded-md cursor-pointer"
        />
      </form>
      

      {/* Navegación */}
      <nav className="mt-6 w-full max-w-md text-center text-sm text-gray-600">
        <Link className="block my-2 hover:underline" to="/registrar">
          ¿No tienes una cuenta? Regístrate
        </Link>
        <Link className="block my-2 hover:underline" to="/olvide-password">
          ¿Olvidaste tu contraseña?
        </Link>
      </nav>
    </div>
  );
};

export default Login;
