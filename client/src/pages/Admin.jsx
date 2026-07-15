import { useEffect, useState } from "react";
import axios from "axios";
import "./Admin.css";

function Admin() {

  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

 const fetchOrders = () => {
  axios
    .get("http://localhost:5001/orders")
    .then((response) => {
      setOrders(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const updateStatus = async (id, status) => {
  try {
    await axios.put(
      `http://localhost:5001/orders/${id}`,
      { status }
    );

    fetchOrders();

  } catch (error) {
    console.log(error);
  }
};
useEffect(() => {
  fetchOrders();

  const interval = setInterval(() => {
    fetchOrders();
  }, 5000);

  return () => clearInterval(interval);

}, []);

  return (
    
    <div className="admin-container">

      <h1>👨‍🍳 Admin Dashboard</h1>
      <input
  type="text"
  placeholder="Search by Table Number..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="search-box"
/>
      <div className="stats">

  <div className="stat-card">
    <h2>{orders.length}</h2>
    <p>Total Orders</p>
  </div>

  <div className="stat-card">
    <h2>
      {orders.filter(o => o.status === "Pending").length}
    </h2>
    <p>Pending</p>
  </div>

  <div className="stat-card">
    <h2>
      {orders.filter(o => o.status === "Preparing").length}
    </h2>
    <p>Preparing</p>
  </div>

  <div className="stat-card">
    <h2>
      ₹{orders.reduce((sum, o) => sum + Number(o.total), 0)}
    </h2>
    <p>Revenue</p>
  </div>

</div>

      {
        orders.length === 0 ? (
          <h2>No Orders Available</h2>
        ) : (

          orders
  .filter((order) =>
    order.table_number
      .toString()
      .includes(search)
  )
  .map((order) => (

            <div className="order-card" key={order.id}>

              <h2>
                Order #{order.id}
              </h2>

              <p>
🍽️ Table: {order.table_number}              </p>

              <p>
                💰 Total: ₹{order.total}
              </p>
              <p>
  🕒 {new Date(order.created_at).toLocaleString()}
</p>

              <p
  className={
    order.status === "Pending"
      ? "pending"
      : order.status === "Preparing"
      ? "preparing"
      : order.status === "Ready"
      ? "ready"
      : "served"
  }
>
  Status: {order.status}
</p>
<select
  value={order.status}
  onChange={(e) =>
    updateStatus(order.id, e.target.value)
  }
>
  <option value="Pending">Pending</option>
  <option value="Preparing">Preparing</option>
  <option value="Ready">Ready</option>
  <option value="Served">Served</option>
</select>

              <h3>Items:</h3>

              {
                order.items.map((item) => (

                  <p key={item.id}>
                    {item.name} × {item.quantity}
                  </p>

                ))
              }


            </div>

          ))

        )
      }

    </div>
  );
}

export default Admin;