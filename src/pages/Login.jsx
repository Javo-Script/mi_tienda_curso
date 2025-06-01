import { Link } from "react-router-dom";

const Login = () => {
  return (
    <section className="w-full h-[100dvh] flex items-center justify-center bg-gray-100">
      <div className="w-1/2 bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
          Iniciar sesión
        </h2>

        <form>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              placeholder="ejemplo@email.com"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
          >
            Iniciar sesión
          </button>
        </form>

        <div className="mt-6 flex justify-between text-sm text-gray-600">
          <Link to="/register" className="hover:text-indigo-600 transition">
            ¿No tenés cuenta? <strong>Registrate</strong>
          </Link>
          <Link to="/" className="hover:text-indigo-600 transition">
            Volver al inicio
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Login;
