import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import axios from "axios";
import { toast } from "react-toastify";

function Cart() {
const API = import.meta.env.VITE_API_URL;
const navigate = useNavigate();
 const {
  cart,
  increaseQty,
  decreaseQty,
  removeItem,
  tableNumber,
  clearCart
} = useCart();

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );


  return (
    <div className="cart-container">

      <h1>🛒 Your Cart</h1>
      <h3>
  🍽️ Table Number: {tableNumber || "Not Selected"}
</h3>

      {cart.length === 0 ? (

        <p>Your cart is empty</p>

      ) : (

        <>

          <div className="cart-list">

          {cart.map((item) => (

            <div className="cart-card" key={item.id}>

              <img 
                src={item.image} 
                alt={item.name}
              />


              <div>

                <h2>{item.name}</h2>

                <p>
                  Price: ₹{item.price}
                </p>


                <div className="quantity">

                  <button
                    onClick={() => decreaseQty(item.id)}
                  >
                    -
                  </button>


                  <span>
                    {item.quantity}
                  </span>


                  <button
                    onClick={() => increaseQty(item.id)}
                  >
                    +
                  </button>

                </div>


                <button
                  className="remove"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>


              </div>


            </div>

          ))}

          </div>


          <h2 className="total">
            Total: ₹{total}
          </h2>


        <button
  className="checkout"
  onClick={async () => {

  try {
    console.log(tableNumber);
await axios.post(`${API}/orders`, {
    tableNumber: tableNumber,
    items: cart,
    total: total,
  });

  clearCart();
  navigate("/order-success");

} catch (error) {
  console.log(error);
}

}}
>
  Proceed To Checkout
</button>

        </>

      )}

    </div>
  );
}


export default Cart;