import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "./context/CartContext";
import Home from "./pages/Home";
import Shopped from "./pages/Shopped";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import ProductListing from "./pages/ProductListing";
import Product from "./pages/Product";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CheckLogged from "./hooks/CheckLogged";

function App() {
  const { isLogged } = useContext(CartContext);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductListing />} />
      <Route path="/product/:id" element={<Product />} />
      <Route
        path="/mis-compras"
        element={
          <CheckLogged isLogged={isLogged}>
            <Shopped />
          </CheckLogged>
        }
      />
      <Route
        path="/favorites"
        element={
          <CheckLogged isLogged={isLogged}>
            <Favorites />
          </CheckLogged>
        }
      />
      <Route
        path="/profile"
        element={
          <CheckLogged isLogged={isLogged}>
            <Profile />
          </CheckLogged>
        }
      />
      <Route path="/search/:string" element={<Search />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
