import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState([]);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isLogged, setLogged] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false)
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);


  useEffect(() => {
    fetch("https://mi-tienda-curso.onrender.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }, []);

  useEffect(() => {
    const localUser = localStorage.getItem('user')
    if (localUser) {
      setUser(JSON.parse(localUser))
      setLogged(true)
    }
  }, [])

  useEffect(() => {
    handleSumTotal();
    sumTotalItems();
  }, [cart]);

  const handleSumTotal = () => {
    const subTotal = cart.reduce(
      (acc, item) => acc + item.precio * item.quantity,
      0
    );
    setTotalPrice(subTotal);
  };

  const sumTotalItems = () => {
    const items = cart.reduce((acc, item) => acc + item.quantity, 0);
    setTotalItems(items);
  };

  const handleAddToCart = (product) => {
    const isAdded = cart.find((item) => item.id === product.id);
    if (isAdded) {
      handleIncreaseItemQuantity(product);
    } else {
      setToastMessage("¡Producto agregado al carrito!");
      setToastType("success");
      setTimeout(() => {
        setToastMessage("");
        setToastType("");
      }, 1500);
      setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (product) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== product.id));
  };

  const handleIncreaseItemQuantity = (product) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === product.id) {
          if (item.quantity >= item.stock) {
            setToastMessage("¡No hay más stock disponible!");
            setToastType("error");
            setTimeout(() => {
              setToastMessage("");
              setToastType("");
            }, 1500);
            return item;
          }
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      })
    );
  };

  const handleReduceItemQuantity = (product) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity - 1 };
        } else {
          return item;
        }
      });
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart, setCart,
        totalPrice, setTotalPrice,
        totalItems, setTotalItems,
        toastMessage, setToastMessage,
        toastType, setToastType,
        products, setProducts,
        user, setUser,
        showUserMenu, setShowUserMenu,
        isLogged, setLogged,
        isCartOpen, setCartOpen,
        isModalOpen, setModalOpen,
        selectedProduct, setSelectedProduct,
        handleAddToCart,
        handleRemoveFromCart,
        handleReduceItemQuantity,
        handleIncreaseItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
