import { useState } from 'react'

import NavBar from '../components/NavBar'
import HeroBaner from '../components/HeroBaner'
import Highlighted from '../components/Highlighted'
import Footer from '../components/Footer'
import Cart from '../components/Cart'

const Home = () => {
  const [isCartOpen, setCartOpen] = useState(false);

  return (
    <>
      <NavBar setOpen={setCartOpen} />
      <HeroBaner />
      <Highlighted />
      <Footer />
      {isCartOpen && <Cart open={isCartOpen} setOpen={setCartOpen} />}
    </>
  )
}

export default Home