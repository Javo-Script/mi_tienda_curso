import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { FormatPrice } from "../hooks/FormatPrice";
import ProductModal from "./ProductModal";

const ProductCard = ({ product }) => {
  const {
    handleAddToCart,
    user,
    isModalOpen,
    setModalOpen,
    setSelectedProduct
  } = useContext(CartContext);

  const pencil_icon = (
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
        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
      />
    </svg>
  );
  const bag_icon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
      />
    </svg>
  );

  return (
    <>
      <div
        className="bg-white rounded-lg shadow-md overflow-hidden"
        key={product.id}
      >
        <Link to={`/product/${product.id}`}>
          <img
            src={product.imagenes[0]}
            alt={product.alt}
            className="w-full h-[11rem] object-cover"
          />
        </Link>
        <div className="p-3 ">
          <div>
            <Link to={`/product/${product.id}`}>
              <h4 className="text-lg font-semibold text-gray-800">
                {product.titulo.length > 25
                  ? product.titulo.slice(0, 24) + "..."
                  : product.titulo}
              </h4>
            </Link>
            <p className="text-gray-600 mb-2">
              {product.descripcion.length > 50
                ? product.descripcion.slice(0, 50) + "..."
                : product.descripcion}
            </p>
          </div>
          <div className="w-full flex flex-wrap justify-between items-center">
            <button
              className="flex justify-center items-center w-[40%] py-1 border-2 border-indigo-600 text-indigo-600 text-center rounded hover:bg-indigo-700 hover:text-white"
              onClick={() => {
                if (user.role) {
                  setSelectedProduct(product);
                  setModalOpen(true);
                } else {
                  handleAddToCart(product);
                }
              }}
            >
              {user.role ? pencil_icon : bag_icon}
            </button>
            <p className="text-indigo-600 font-bold text-xl">
              {FormatPrice(product.precio)}
            </p>
          </div>
        </div>
      </div>
      {isModalOpen && <ProductModal />}
    </>
  );
};

export default ProductCard;
