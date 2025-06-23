import { useState } from "react";

const ModalCerrarSesion = ({ visible, onClose, onConfirm }) => {
    if (!visible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-80 text-center">
                <h2 className="text-xl font-bold text-green-700 mb-4">Cerrar Sesión</h2>
                <p className="text-gray-700 mb-6">¿Estás seguro que deseas cerrar sesión?</p>
                <div className="flex justify-center gap-4">
                    <button
                        className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition"
                        onClick={onConfirm}
                    >
                        Sí, Cerrar
                    </button>
                    <button
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalCerrarSesion;
