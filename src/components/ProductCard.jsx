import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { FormatPrice } from "../hooks/FormatPrice";

const ProductCard = ({ product}) => {
  const { handleAddToCart } = useContext(CartContext);
  const { imagenes, alt, titulo, descripcion, precio } = product;

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden"
      key={product.id}
    >
      <Link to={`/product/${product.id}`}>
        <img
          src={imagenes[0]}
          alt={alt}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="h-[50%] p-4 flex flex-wrap">
        <div>
          <h4 className="text-lg font-semibold text-gray-800">
            {titulo.length > 25
              ? titulo.slice(0, 24) + "..."
              : titulo}
          </h4>
          <p className="text-gray-600 mb-2">
            {descripcion.length > 50
              ? descripcion.slice(0, 50) + "..."
              : descripcion}
          </p>
          <span className="text-indigo-600 font-bold text-lg">
            {FormatPrice(precio)}
          </span>
        </div>
        <div className="w-full flex justify-between">
          <button className="block w-[75%] mt-4 border-2 border-indigo-600 text-indigo-600 py-2 rounded hover:bg-indigo-700 hover:text-white">
            Ver más
          </button>
          <button
            className="block w-[20%] mt-4 border-2 border-indigo-600 bg-indigo-600 text-white rounded hover:bg-indigo-700 flex justify-center items-center"
            onClick={() => handleAddToCart(product)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
