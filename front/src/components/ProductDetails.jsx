import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useParams } from "react-router-dom";
import { FormatPrice } from "../hooks/FormatPrice";
import ProductModal from "./ProductModal";

const ProductDetails = () => {
  const {
    user,
    products,
    handleAddToCart,
    toastMessage,
    toastType,
    isModalOpen,
    setModalOpen,
    setSelectedProduct,
  } = useContext(CartContext);

  const id = Number(useParams().id);
  const product = products.find((item) => item.id === id);

  if (products.length === 0) {
    return <p className="text-center p-6">Cargando producto...</p>;
  }

  if (!product) {
    return (
      <p className="text-center p-6 text-red-500">Producto no encontrado</p>
    );
  }

  return (
    <>
      <div className="bg-white py-[5dvh]">
        <div className="pt-6">
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <img
              src={product.imagenes[0]}
              className="hidden size-full rounded-lg object-cover lg:block"
            />
            <div className="hidden lg:flex lg:flex-wrap lg:content-between lg:max-h-[40vh]">
              <img
                src={product.imagenes[1]}
                className="aspect-3/2 w-full max-h-[46%] rounded-lg object-cover"
              />
              <img
                src={product.imagenes[2]}
                className="aspect-3/2 w-full max-h-[46%] rounded-lg object-cover"
              />
            </div>
            <img
              src={product.imagenes[3]}
              className="aspect-4/5 size-full object-cover sm:rounded-lg lg:aspect-auto"
            />
          </div>
          <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-6 lg:pb-4">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product.titulo}
              </h1>
            </div>
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <p className="text-3xl tracking-tight text-gray-900">
                {FormatPrice(product.precio)}
              </p>

              <button
                className="mt-20 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
                onClick={() => {
                if (user.role) {
                  setSelectedProduct(product);
                  setModalOpen(true);
                } else {
                  handleAddToCart(product);
                }}}
              >
                {user.role ? "Editar producto" : "Añadir al carrito"}
              </button>
            </div>
            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-4">
              <div>
                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {product.descripcion}
                  </p>
                </div>
              </div>
              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Highlights
                </h3>
                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {Object.entries(product.ficha_tecnica).map(
                      ([key, value]) => (
                        <li key={key} className="text-gray-400">
                          <span className="text-gray-600 capitalize">
                            {key.replace("_", " ")}:{" "}
                          </span>
                          {value}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {toastMessage && (
        <div
          className={`fixed top-4 right-4 ${
            toastType === "error" ? "bg-red-500" : "bg-green-500"
          } text-white px-4 py-2 rounded shadow-lg z-50 animate-fade-in-out`}
        >
          {toastMessage}
        </div>
      )}

      {isModalOpen && <ProductModal />}
    </>
  );
};

export default ProductDetails;
