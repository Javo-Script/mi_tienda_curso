import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Cart from "../components/Cart";
import ProductDetails from "../components/ProductDetails";

const Product = () => {
  const { toastMessage, toastType } = useContext(CartContext);
  const [isCartOpen, setCartOpen] = useState(false);

  return (
    <>
      <NavBar setOpen={setCartOpen} />
      <ProductDetails from={"Product"} />
      <Footer />
      {isCartOpen && <Cart open={isCartOpen} setOpen={setCartOpen} />}
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

export default Product;
