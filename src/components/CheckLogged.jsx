import { Navigate } from "react-router-dom"

const CheckLogged = ({ isLogged, children }) => {
  return isLogged ? children : <Navigate to="/login" />;
}

export default CheckLogged