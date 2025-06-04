import { useContext } from "react"
import { CartContext } from "../context/CartContext"
import { useNavigate } from "react-router-dom"


export const useLogin = () => {
  const { setUser, setLogged, setToastMessage, setToastType } = useContext(CartContext);
  const navigate = useNavigate()

  const login = async (email, password, setError) => {
    
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
            localStorage.setItem('user', JSON.stringify(user.id))
            setUser(user)
            setLogged(true)
            navigate("/")
        } catch (err) {
            setToastType("error");
            setToastMessage(err.message);
            setTimeout(() => setToastMessage(""), 3000);
        }

    }
    return login;
}

export default useLogin