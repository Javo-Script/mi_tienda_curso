import { useState } from 'react'

import NavBar from '../components/NavBar'
import ComingSoon from '../components/ComingSoon'
import Footer from '../components/Footer'
import Cart from '../components/Cart'

const Shopped = () => {
  const [isCartOpen, setCartOpen] = useState(false);

  return (
    <>
      <NavBar setOpen={setCartOpen} />
        <ComingSoon from={'shoppingHistory'} />
      <Footer />
      {isCartOpen && <Cart open={isCartOpen} setOpen={setCartOpen} />}
    </>
  )
}

export default Shopped