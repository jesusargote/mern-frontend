import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";
import Alerta from "../components/Alerta";

const ConfirmarCuenta = () => {
  const [alerta, setAlerta] = useState({});
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/usuarios/confirmar/${id}`;
        const { data } = await clienteAxios.get(url);
        setAlerta({
          msg: data.msg,
          error: false,
        });
        setCuentaConfirmada(true);
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };
    confirmarCuenta();
  }, [id]);

  const { msg } = alerta;

  return (
    <>
      <h1 className="text-4xl font-black text-center text-[#2E8C00]">
        Confirma tu Cuenta y Comienza a Crear tus Proyectos
      </h1>

      <div className="mt-10">
        {msg && <Alerta alerta={alerta} />}

        {cuentaConfirmada && (
          <Link
            to="/"
            className="block text-center my-5 text-gray-600 uppercase text-sm hover:text-[#2E8C00] font-bold"
          >
            Inicia Sesión
          </Link>
        )}
      </div>
    </>
  );
};

export default ConfirmarCuenta;
