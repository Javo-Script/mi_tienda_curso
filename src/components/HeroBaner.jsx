import { Link } from "react-router-dom"

const HeroBaner = () => {
  const headerBgImage =
    "https://images.unsplash.com/photo-1526406915894-7bcd65f60845?q=80&w=4324&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

  return (
    <header
      className="h-[40dvh] w-full absolute mt-[5dvh] bg-cover bg-center flex items-center justify-center text-center text-white"
      style={{ backgroundImage: `url(${headerBgImage})` }}
    >
      <div className="max-w-[60dvw] bg-black bg-opacity-50 p-8 rounded-lg">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          ¡Los mejores productos de tecnología en un solo lugar!
        </h2>
        <p className="text-lg md:text-xl mb-6">
          Equipá tu setup al mejor precio
        </p>
        <Link
          to="/products"
          className="bg-yellow-400 text-black px-6 py-3 rounded font-semibold hover:bg-yellow-500 transition"
        >
          Ver productos
        </Link>
      </div>
    </header>
  )
}

export default HeroBaner
