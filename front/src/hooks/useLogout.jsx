import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const { setLogged, setShowUserMenu } = useContext(CartContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    setLogged(false);
    setShowUserMenu(false);
    setTimeout(() => {
      navigate("/");
    }, 10);
  }
  return logout
};

export default useLogout