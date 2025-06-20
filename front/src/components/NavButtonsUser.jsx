import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import useLogout from "../hooks/useLogout";

const UserNavButtons = ({ setOpen }) => {
  const { user, totalItems, isLogged, showUserMenu, setShowUserMenu } = useContext(CartContext);
  const logout = useLogout()

  return (
    <>
      <div className="flex gap-4 items-center">
        <Link
          to="/mis-compras"
          className="text-gray-700 hover:text-indigo-600 transition-colors duration-200"
        >
          Mis compras
        </Link>
        <Link to={"/favorites"} className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.75}
            stroke="#374151"
            className="size-6 hover:stroke-indigo-600 transition-colors duration-200"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        </Link>
        <button className="relative" onClick={() => setOpen(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.75}
            stroke="#374151"
            className="size-6 hover:stroke-indigo-600 transition-colors duration-200"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          {totalItems > 0 ? (
            <span className="absolute top-[-6px] right-[-6px] bg-red-500 text-white text-[11px] leading-[.75] rounded-full p-[6px]">
              {totalItems}
            </span>
          ) : (
            ""
          )}
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
              onClick={ logout }
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
    </>
  );
};

export default UserNavButtons;
