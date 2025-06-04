import { useState } from 'react'

import NavBar from '../components/NavBar'
import ComingSoon from '../components/ComingSoon'
import Footer from '../components/Footer'
import Cart from '../components/Cart'

const Register = () => {
  const [isCartOpen, setCartOpen] = useState(false);

  return (
    <>
      <NavBar setOpen={setCartOpen} />
        <ComingSoon from={'register'} />
      <Footer />
      {isCartOpen && <Cart open={isCartOpen} setOpen={setCartOpen} />}
    </>
  )
}

export default Register