import { useState } from "react";

const Alerta = ({ alerta }) => {
  const { msg, error } = alerta;
  const [visible, setVisible] = useState(true);

  if (!visible || !msg) return null;

  return (
    <div
      className={`${
        error ? "bg-red-100 text-red-700 border-red-400" : "bg-green-100 text-green-700 border-green-400"
      } border-l-4 p-4 rounded relative shadow transition-all`}
    >
      <p className="font-medium">{msg}</p>
      <button
        onClick={() => setVisible(false)}
        className="absolute top-1 right-2 text-xl font-bold leading-none hover:text-black"
      >
        &times;
      </button>
    </div>
  );
};

export default Alerta;
