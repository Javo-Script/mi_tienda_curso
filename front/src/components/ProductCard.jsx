import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { FormatPrice } from "../hooks/FormatPrice";
import ProductModal from "./ProductModal";
import useHandleProduct from "../hooks/useHandleProduct";

const ProductCard = ({ product }) => {
  const {
    handleAddToCart,
    user,
    isModalOpen,
    setModalOpen,
    setSelectedProduct,
    setToastMessage, setToastType,
  } = useContext(CartContext);

  const { handleDelete } = useHandleProduct(product);

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
  const bin_icon = (
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
        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
      />
    </svg>
  );

  const iconsContainer = user.role ? "w-[45%]" : "w-[40%]"
  const iconsWidth = user.role ? "w-[47.5%]" : "w-[100%]"

  return (
    <>
      <div
        className="bg-white rounded-lg shadow-md overflow-hidden"
        key={product.id}
      >
        <Link to={`/product/${product.id}`}>
          <img
            src={product.imagenes ? product.imagenes[0] : ""}
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
            <div className={`flex justify-between items-between ${iconsContainer}`} >
              <button
                className={`flex justify-center items-center ${iconsWidth} py-1 border-2 border-indigo-600 text-indigo-600 text-center rounded hover:bg-indigo-700 hover:text-white`}
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
              {user.role && (
                <button
                  className={`flex justify-center items-center ${iconsWidth} py-1 border-2 border-red-600 text-red-600 text-center rounded hover:bg-red-700 hover:text-white`}
                  onClick={async () => {
                    const wasDeleted = handleDelete(product)

                    if (wasDeleted) {
                      setToastType("success");
                      setToastMessage("Producto eliminado correctamente.");
                      setModalOpen(false);
                    } else {
                      setToastType("error");
                      setToastMessage("Ocurrió un error al guardar el producto.");
                    }

                    setTimeout(() => setToastMessage(""), 3000);
                  }}
                >
                  {bin_icon}
                </button>
              )}
            </div>

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
