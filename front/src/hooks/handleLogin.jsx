import { useContext } from "react"
import { CartContext } from "../context/CartContext"


const handleLogin = async (email, password, setError) => {
    const { setUser, setLogged} = useContext(CartContext)

    try{
        const res = await fetch('https://mi-tienda-curso.onrender.com/users/login',{
            method : 'POST',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify(email, password)
        })

        if (!res.ok) { throw new Error('Los datos ingresados no corresponden a un usuario registrado.') }

        const user = await res.json()
        localStorage.setItem('user', JSON.stringify(user.id))
        setUser(user)
        setLogged(true)
    } catch (err) {
        setError('Error: ' + err.message)
    }
}

export default handleLogin