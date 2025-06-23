import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";

const Registrar = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();

    if ([nombre, email, password, repetirPassword].includes('')) {
      setAlerta({ msg: 'Todos los campos son obligatorios', error: true });
      return;
    }

    if (password !== repetirPassword) {
      setAlerta({ msg: 'Las contraseñas no coinciden', error: true });
      return;
    }

    if (password.length < 6) {
      setAlerta({ msg: 'La contraseña debe tener al menos 6 caracteres', error: true });
      return;
    }

    setAlerta({});

    try {
      const { data } = await clienteAxios.post(`/usuarios`, { nombre, email, password });
      setAlerta({ msg: data.msg, error: false });

      setNombre('');
      setEmail('');
      setPassword('');
      setRepetirPassword('');
    } catch (error) {
      setAlerta({
        msg: error.response?.data?.msg || 'Hubo un error en el registro',
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h1 className="text-[#39a900] text-2xl md:text-3xl font-extrabold text-center mb-6">
          Crea tu cuenta en Fondo Emprender
        </h1>

        {msg && <Alerta alerta={alerta} />}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="nombre">
              Nombre completo
            </label>
            <input
              id="nombre"
              type="text"
              placeholder="Tu nombre"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#39a900]"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              placeholder="Correo de registro"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#39a900]"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              placeholder="Crea una contraseña"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#39a900]"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="password2">
              Repetir contraseña
            </label>
            <input
              id="password2"
              type="password"
              placeholder="Confirma tu contraseña"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#39a900]"
              value={repetirPassword}
              onChange={e => setRepetirPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Crear cuenta"
            className="bg-[#39a900] hover:bg-[#007832] transition-colors text-white font-bold uppercase w-full py-3 rounded-md cursor-pointer"
          />
        </form>

        <nav className="mt-6 text-center text-sm text-gray-600">
          <Link className="block my-2 hover:underline" to="/">
            ¿Ya tienes una cuenta? Inicia sesión
          </Link>
          <Link className="block my-2 hover:underline" to="/olvide-password">
            ¿Olvidaste tu contraseña?
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Registrar;
