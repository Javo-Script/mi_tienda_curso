import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import ProductCard from "./ProductCard";

const Highlighted = () => {

  const { products, toastMessage, toastType } = useContext(CartContext);
  const highlightedProducts = products.filter((item) => item.highlighted === true);

  return (
    <>
      <section
        className="h-[50dvh] w-full absolute mt-[45dvh] pb-[5dvh] flex flex-wrap content-center item-center px-6 py-6"
      >
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">
            Productos destacados
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {highlightedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      {toastMessage && (
        <div className={`fixed top-4 right-4 ${toastType === "error" ? "bg-red-500" : "bg-green-500"} text-white px-4 py-2 rounded shadow-lg z-50 animate-fade-in-out`}>
          {toastMessage}
        </div>
      )}
    </>
  );
};

export default Highlighted;
