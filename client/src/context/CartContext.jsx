import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [tableNumber, setTableNumber] = useState(
  localStorage.getItem("tableNumber") || ""
);


 const addToCart = (item) => {

  const existingItem = cart.find(
    (cartItem) => cartItem.id === item.id
  );


  let updatedCart;


  if (existingItem) {

    updatedCart = cart.map((cartItem) =>
      cartItem.id === item.id
        ? {
            ...cartItem,
            quantity: cartItem.quantity + 1
          }
        : cartItem
    );

  } else {

    updatedCart = [
      ...cart,
      {
        ...item,
        quantity: 1
      }
    ];

  }


  setCart(updatedCart);


  localStorage.setItem(
    "cart",
    JSON.stringify(updatedCart)
  );

};


  const increaseQty = (id) => {

    const updatedCart = cart.map(item =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };


  const decreaseQty = (id) => {

    const updatedCart = cart.map(item =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };


  const removeItem = (id) => {

  const updatedCart = cart.filter(
    item => item.id !== id
  );

  setCart(updatedCart);

  localStorage.setItem(
    "cart",
    JSON.stringify(updatedCart)
  );
};

const clearCart = () => {

  setCart([]);

  localStorage.removeItem("cart");

};
 return (
  <CartContext.Provider
    value={{
      cart,
      addToCart,
      increaseQty,
      decreaseQty,
      removeItem,
      clearCart,
      tableNumber,
      setTableNumber
    }}
  >
    {children}
  </CartContext.Provider>
);
}


export function useCart() {
  return useContext(CartContext);
}