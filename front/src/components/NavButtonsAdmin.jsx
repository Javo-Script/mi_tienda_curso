import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import useLogout from "../hooks/useLogout";
import ProductModal from "./ProductModal";

const AdminNavButtons = () => {
  const {
    user,
    isLogged,
    showUserMenu,
    setShowUserMenu,
    isModalOpen,
    setModalOpen,
    setSelectedProduct,
  } = useContext(CartContext);
  const logout = useLogout();

  return (
    <>
      <div className="flex gap-4 items-center">
        <button
          className="px-2 py-[3px] text-gray-600 rounded border-2 border-gray-400 hover:bg-indigo-600 hover:border-indigo-600 hover:text-white"
          onClick={() => {
            setModalOpen(true);
            setSelectedProduct(null);
          }}
        >
          Nuevo producto
        </button>
        <button onClick={() => setShowUserMenu((prev) => !prev)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.75}
            stroke="#374151"
            className="size-6 hover:stroke-indigo-600 hover:fill-indigo-600 transition-colors duration-200"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
        </button>
      </div>

      {showUserMenu && isLogged && (
        <ul className="absolute right-0 top-[5dvh] w-[140px] text-center bg-white border rounded shadow-md z-50">
          <li>
            <Link
              to="/profile"
              className="block px-4 py-2 text-gray-700 hover:bg-indigo-100"
            >
              {user.role ? "Panel admin" : "Perfil"}
            </Link>
          </li>
          <li>
            <button
              onClick={logout}
              className="w-full text-center px-4 py-2 text-gray-700 hover:bg-indigo-100"
            >
              Cerrar sesión
            </button>
          </li>
        </ul>
      )}
      {showUserMenu && !isLogged && (
        <ul className="absolute right-0 top-[5dvh] w-[140px] text-center bg-white border rounded shadow-md z-50">
          <li>
            <Link
              to="/login"
              className="block px-4 py-2 text-gray-700 hover:bg-indigo-100"
            >
              Iniciar sesión
            </Link>
          </li>
        </ul>
      )}
      {isModalOpen && <ProductModal />}
    </>
  );
};

export default AdminNavButtons;
