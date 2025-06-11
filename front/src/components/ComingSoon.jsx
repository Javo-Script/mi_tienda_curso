import { useContext } from "react";
import { Link } from "react-router-dom"
import { CartContext } from "../context/CartContext";

const ComingSoon = ({from}) => {
  const {user} = useContext(CartContext)

  const headerBgImage =
    "https://images.unsplash.com/photo-1526406915894-7bcd65f60845?q=80&w=4324&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <header
      className="h-[90dvh] bg-cover bg-center flex items-center justify-center text-center text-white"
      style={{ backgroundImage: `url(${headerBgImage})` }}
    >
      <div className="max-w-[60dvw] bg-black bg-opacity-50 p-8 rounded-lg">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Hola {user.name}.
        </h2>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Esta sección estará disponible en breve
        </h2>
        <p className="text-lg md:text-xl mb-6">
          Mientras tanto te invitamos a ver nuestros productos
        </p>
        <Link
          to = "/products"
          className="bg-yellow-400 text-black px-6 py-3 rounded font-semibold hover:bg-yellow-500 transition"
        >
          Ver productos
        </Link>
      </div>
    </header>
  );
};

export default ComingSoon;
