import { Navigate } from "react-router-dom"

const CheckLogged = ({ isLogged, children }) => {
  return isLogged ? children : <Navigate to="/login" state={{ from: location.pathname }}/>;
}

export default CheckLogged