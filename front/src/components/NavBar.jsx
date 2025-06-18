import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"
import { CartContext } from "../context/CartContext";
import UserNavButtons from "./NavButtonsUser";
import AdminNavButtons from "./NavButtonsAdmin";

const NavBar = ({ setOpen }) => {
  const { user } = useContext(CartContext);
  const [searchInput, setSearchInput] = useState();
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim() !== "") {
      navigate(`/search/${searchInput}`);
    }
  };

  return (
    <>
      <nav className="w-full h-[5dvh] bg-white shadow-md py-3 px-4 flex justify-between items-center z-10 fixed t-0">
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          MiTienda
        </Link>
        <form
          onSubmit={handleSubmit}
          className="w-1/2 mx-auto px-4 flex gap-4 items-center"
        >
          <input
            type="text"
            placeholder="Buscar productos..."
            className="flex-1 px-4 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700"
          >
            Buscar
          </button>
        </form>
        {user.role ? <AdminNavButtons setOpen={setOpen} /> : <UserNavButtons setOpen={setOpen} /> }
      </nav>
    </>
  );
};

export default NavBar;