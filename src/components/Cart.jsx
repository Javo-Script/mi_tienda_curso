import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { CartContext } from "../context/CartContext";
import { useContext, useState } from "react";
import { FormatPrice } from "../hooks/FormatPrice";

const Cart = ({ open, setOpen }) => {
  const {
    handleIncreaseItemQuantity,
    handleReduceItemQuantity,
    handleRemoveFromCart,
    totalPrice,
    cart,
    toastMessage,
    toastType,
  } = useContext(CartContext);

  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className="relative z-10"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
        />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <DialogPanel
                transition
                className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
              >
                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                      <DialogTitle className="text-lg font-medium text-gray-900">
                        Carrito de compras
                      </DialogTitle>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                        >
                          <span className="absolute -inset-0.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon aria-hidden="true" className="size-6" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        <ul
                          role="list"
                          className="-my-6 divide-y divide-gray-200"
                        >
                          {cart.length > 0
                            ? cart.map((product) => (
                                <li key={product.id} className="flex py-6">
                                  <div className="size-20 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      alt={product.alt}
                                      src={product.imagenes[0]}
                                      className="size-full object-cover"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>{product.titulo.length > 55 ? product.titulo.slice(0, 55) + "..." : product.titulo}</h3>
                                        <p className="ml-4">{FormatPrice(product.precio)}</p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">
                                        {product.color}
                                      </p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div className="flex items-center">
                                        {product.quantity > 1 && (
                                          <button
                                            type="button"
                                            onClick={() =>
                                              handleReduceItemQuantity(product)
                                            }
                                            className="font-medium text-indigo-600 hover:text-indigo-500 mr-3"
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
                                                d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                              />
                                            </svg>
                                          </button>
                                        )}
                                        <p className="text-gray-500 inline-block">
                                          Qty {product.quantity}
                                        </p>
                                        <button
                                          type="button"
                                          onClick={() =>
                                            handleIncreaseItemQuantity(product)
                                          }
                                          className="font-medium text-indigo-600 hover:text-indigo-500 ml-3"
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

                                      <div className="flex">
                                        <button
                                          type="button"
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                          onClick={() =>
                                            handleRemoveFromCart(product)
                                          }
                                        >
                                          Eliminar
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))
                            : 
                            <li className="text-gray-500">El carrito está vacío</li> }
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>{FormatPrice(totalPrice)}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      Impuestos y tarifas podrìan sumarse al pagar
                    </p>
                    <div className="mt-6">
                      <a
                        href="#"
                        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700"
                      >
                        Ir a pagar
                      </a>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Seguir comprando
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
      {toastMessage && (
        <div
          className={`fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50 animate-fade-in-out ${
            toastType === "error" ? "bg-red-500" : "bg-green-500"
          }`}
        >
          {toastMessage}
        </div>
      )}
    </>
  );
};

export default Cart;
