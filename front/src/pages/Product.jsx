import { useState } from "react";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Cart from "../components/Cart";
import ProductDetails from "../components/ProductDetails";

const Product = () => {
  const [isCartOpen, setCartOpen] = useState(false);

  return (
    <>
      <NavBar setOpen={setCartOpen} />
      <ProductDetails from={"Product"} />
      <Footer />
      {isCartOpen && <Cart open={isCartOpen} setOpen={setCartOpen} />}
    </>
  );
};

export default Product;
