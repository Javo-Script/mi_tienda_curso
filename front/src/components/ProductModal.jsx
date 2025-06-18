import { useEffect, useContext, useRef } from "react";
import { CartContext } from "../context/CartContext";
import useHandleProduct from "../hooks/useHandleProduct";

const ProductModal = () => {
  const { setToastMessage, setToastType, setModalOpen, selectedProduct } = useContext(CartContext);
  const {
    product, setProduct,
    newFieldKey, setNewFieldKey,
    newFieldValue, setNewFieldValue,
    editingImageIndex, setEditingImageIndex,
    nuevaURL, setNuevaURL,
    addNewField, fichaRef,
    showGradient,
    lastInputRef,
    handleInputChange,
    handleImageChange,
    handleFichaChange,
    removeFeatureField,
    handleSave, handleUpdate
  } = useHandleProduct(selectedProduct || {});
  const modalRef = useRef();

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
  const plus_icon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
  const cross_icon = (
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
        d="M6 18 18 6M6 6l12 12"
      />
    </svg>
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-20 flex items-center justify-center"
      onMouseDown={(e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
          setModalOpen(false);
        }
      }}
    >
      <div
        ref={modalRef}
        className="w-[90%] max-w-3xl bg-white rounded shadow-lg p-6 overflow-y-auto max-h-[90dvh]"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4 text-indigo-600">
          {product.id ? (
            <>
              Modificar producto{" "}
              <span className="font-normal text-gray-400">
                (id: {product.id})
              </span>
            </>
          ) : (
            "Nuevo producto"
          )}
        </h2>

        <div className="mb-3 grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Título</label>
            <input
              value={product.titulo || ""}
              onChange={(e) => handleInputChange("titulo", e.target.value)}
              className="w-full border px-2 py-1 rounded text-[13px]"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Categoría</label>
            <input
              value={product.categoria || ""}
              onChange={(e) => handleInputChange("categoria", e.target.value)}
              className="w-full border px-2 py-1 rounded text-[13px]"
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="block font-semibold mb-1">Descripción</label>
          <textarea
            value={product.descripcion || ""}
            onChange={(e) => handleInputChange("descripcion", e.target.value)}
            className="w-full border px-2 py-1 rounded text-[13px]"
          />
        </div>

        <div className="mb-3 grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Precio</label>
            <input
              type="number"
              value={product.precio || ""}
              onChange={(e) =>
                handleInputChange("precio", parseFloat(e.target.value))
              }
              className="w-full border px-2 py-1 rounded text-[13px]"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Stock</label>
            <input
              type="number"
              value={product.stock || ""}
              onChange={(e) =>
                handleInputChange("stock", parseInt(e.target.value))
              }
              className="w-full border px-2 py-1 rounded text-[13px]"
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="block font-semibold mb-1">Imágenes</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="relative w-full max-h-[120px] aspect-square border rounded flex items-center justify-center bg-gray-100"
              >
                {product.imagenes?.[i] ? (
                  <>
                    <img
                      src={product.imagenes[i]}
                      alt={`Imagen ${i + 1}`}
                      className="absolute inset-0 w-full h-full object-cover rounded"
                    />
                    <button
                      className="absolute top-1 right-1 bg-white rounded-full p-2 shadow"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingImageIndex(i);
                      }}
                    >
                      {pencil_icon}
                    </button>
                  </>
                ) : (
                  <button
                    className="flex flex-col items-center text-gray-400 hover:text-indigo-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingImageIndex(i);
                    }}
                  >
                    {plus_icon}
                  </button>
                )}
              </div>
            ))}
          </div>
          {editingImageIndex !== null && (
            <div className="mt-4">
              <label className="block font-medium mb-1">
                URL para imagen #{editingImageIndex + 1}
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={nuevaURL || ""}
                  onChange={(e) => setNuevaURL(e.target.value)}
                />
                <button
                  className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                  onClick={() => {
                    handleImageChange(editingImageIndex, nuevaURL);
                    setEditingImageIndex(null);
                  }}
                >
                  {nuevaURL ? "Subir" : cross_icon}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mb-6">
          <label className="block font-semibold mb-2">Ficha Técnica</label>
          <div
            ref={fichaRef}
            className="relative max-h-[175px] overflow-y-auto pr-1"
          >
            <div className="space-y-2">
              {Object.entries(product.ficha_tecnica || {}).map(
                ([key, value], index, arr) => (
                  <div
                    key={key}
                    ref={index === arr.length - 1 ? lastInputRef : null}
                    className="flex items-center gap-2"
                  >
                    <input
                      className="w-[30%] border px-2 py-1 rounded text-[13px]"
                      value={key}
                      readOnly
                    />
                    <input
                      className="w-[60%] flex-1 border px-2 py-1 rounded text-[13px]"
                      value={value}
                      onChange={(e) => handleFichaChange(key, e.target.value)}
                    />
                    <button
                      type="button"
                      className="w-[10%] text-red-500 hover:text-red-700 text-[13px]"
                      onClick={() => removeFeatureField(key)}
                    >
                      Eliminar
                    </button>
                  </div>
                )
              )}
            </div>

            {showGradient && (
              <>
                <div className="sticky bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                <div className="sticky bottom-1 left-0 w-full text-center text-xs text-indigo-400 pointer-events-none">
                  Desplazá para ver más
                </div>
              </>
            )}
          </div>
          <div className="mt-4 flex items-center gap-2">
            <input
              type="text"
              placeholder="Nombre del campo"
              className="w-[30%] border px-2 py-1 rounded text-[13px]"
              value={newFieldKey}
              onChange={(e) => setNewFieldKey(e.target.value)}
            />
            <input
              type="text"
              placeholder="Valor"
              className="w-[60%] flex-1 border px-2 py-1 rounded text-[13px]"
              value={newFieldValue}
              onChange={(e) => setNewFieldValue(e.target.value)}
            />
            <button
              type="button"
              onClick={() => {
                setProduct({
                  ...product,
                  ficha_tecnica: {
                    ...product.ficha_tecnica,
                    [newFieldKey]: newFieldValue,
                  },
                });
                setNewFieldKey("");
                setNewFieldValue("");
              }}
              className="w-[10%] bg-indigo-600 text-white px-2 py-1 rounded hover:bg-indigo-700 text-[13px]"
            >
              Añadir
            </button>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => setModalOpen(false)}
            className="w-[50%] bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={async () => {
              const wasSuccess = product.id
                ? await handleUpdate(product)
                : await handleSave(product);

              if (wasSuccess) {
                setToastType("success");
                setToastMessage(`Producto ${product.id ? "actualizado" : "creado"} correctamente.`);
                setModalOpen(false);
              } else {
                setToastType("error");
                setToastMessage("Ocurrió un error al guardar el producto.");
              }

              setTimeout(() => setToastMessage(""), 3000);
            }}
            className="w-[50%] bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;