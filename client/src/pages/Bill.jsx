import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Bill() {
  const { id } = useParams();

  const API = import.meta.env.VITE_API_URL;

  const [order, setOrder] = useState(null);

  useEffect(() => {
    axios
      .get(`${API}/orders/${id}`)
      .then((res) => {
        setOrder(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!order) {
    return <h2>Loading...</h2>;
  }

  return (
    <div style={{ padding: "30px", maxWidth: "500px", margin: "auto" }}>

      <h1>🍽️ QR Dine Restaurant</h1>

      <hr />

      <h2>Order #{order.id}</h2>

      <p><b>Table :</b> {order.table_number}</p>

      <p>
        <b>Date :</b>{" "}
        {new Date(order.created_at).toLocaleString("en-IN")}
      </p>

      <hr />

      <h3>Items</h3>

      {order.items.map((item, index) => (
        <p key={index}>
          {item.name} × {item.quantity}
        </p>
      ))}

      <hr />

      <h2>Total ₹{order.total}</h2>

    </div>
  );
}

export default Bill;