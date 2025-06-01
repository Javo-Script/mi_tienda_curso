import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

const ProductListing = () => {
  const { products, toastMessage, toastType } = useContext(CartContext);

  return (
    <>
      <NavBar />
      <section className="w-full h-[80dvh] flex flex-wrap absolute mt-[5dvh] pb-[5dvh] px-6 pt-6">
        <div className=" max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">
            Conocé nuestros productos
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-[7dvh]">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                from={"productListing"}
              />
            ))}
          </div>
        </div>
      </section>
      <Footer />
      {toastMessage && (
        <div
          className={`fixed top-4 right-4 ${
            toastType === "error" ? "bg-red-500" : "bg-green-500"
          } text-white px-4 py-2 rounded shadow-lg z-50 animate-fade-in-out`}
        >
          {toastMessage}
        </div>
      )}
    </>
  );
};

export default ProductListing;
