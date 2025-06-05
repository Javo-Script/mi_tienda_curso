import { useContext } from "react"
import { CartContext } from "../context/CartContext"
import { useNavigate, useLocation } from "react-router-dom"


export const useLogin = () => {
  const { setUser, setLogged, setToastMessage, setToastType } = useContext(CartContext);
  const navigate = useNavigate()
  const location = useLocation();
  const before = location.state?.from || "/";

  const login = async ( email, password ) => {
    
        try {
            const res = await fetch('https://mi-tienda-curso.onrender.com/users/login', {
                method : 'POST',
                headers : {'Content-Type' : 'application/json'},
                body : JSON.stringify({ email, password })
            })

            if (!res.ok) { 
                throw new Error('Los datos ingresados no corresponden a un usuario registrado.') 
            }

            const user = await res.json()
            const userData = {user}
            localStorage.setItem('user', JSON.stringify(user))
            setUser(user)
            setLogged(true)
            navigate(before)
        } catch (err) {
            setToastType("error");
            setToastMessage(err.message);
            setTimeout(() => setToastMessage(""), 3000);
        }

    }
    return login;
}

export default useLogin