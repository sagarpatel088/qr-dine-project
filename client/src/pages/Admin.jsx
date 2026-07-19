import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


function Admin() {

  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [tables, setTables] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [foodName, setFoodName] = useState("");
  const [foodCategory, setFoodCategory] = useState("");
  const [foodPrice, setFoodPrice] = useState("");
  const [foodImage, setFoodImage] = useState("");
  const [editingId, setEditingId] = useState(null);
const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL;


  // FETCH ORDERS
  const fetchOrders = async () => {

    try {

      const response = await axios.get(`${API}/orders`);
      setOrders(response.data);

    } catch(error){

      console.log(error);

    }

  };


  // FETCH MENU
  const fetchMenu = async () => {

    try {

      const response = await axios.get(`${API}/menu`);
      setMenuItems(response.data);

    } catch(error){

      console.log(error);

    }

  };

const fetchTables = async () => {
  try {
    const response = await axios.get(`${API}/tables`);
    setTables(response.data);
  } catch (error) {
    console.log(error);
  }
};

  // ADD FOOD
  const addFood = async () => {

    try {

      await axios.post(`${API}/menu`,{

        name: foodName,
        category: foodCategory,
        price:Number(foodPrice),
        image:foodImage

      });


      alert("✅ Food Added");


      setFoodName("");
      setFoodCategory("");
      setFoodPrice("");
      setFoodImage("");


      fetchMenu();
      


    } catch(error){

      console.log(error);
      alert("❌ Failed");

    }

  };



  // DELETE FOOD
  const deleteFood = async(id)=>{

    try{

      await axios.delete(`${API}/menu/${id}`);

      alert("🗑 Deleted");

      fetchMenu();


    }catch(error){

      console.log(error);

    }

  };

  const uploadImage = async (e) => {
  const file = e.target.files[0];

  if (!file) return;

  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "qrdine");

  try {
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/sdqlothp/image/upload",
      data
    );

    setFoodImage(res.data.secure_url);

    alert("✅ Image Uploaded");
  } catch (err) {
    console.log(err);
    alert("❌ Upload Failed");
  }
};
const updateFood = async () => {
  console.log("Editing ID:", editingId);

  try {
    await axios.put(`${API}/menu/${editingId}`, {
      name: foodName,
      category: foodCategory,
      price: Number(foodPrice),
      image: foodImage,
    });
    alert("✅ Food Updated");

    setFoodName("");
    setFoodCategory("");
    setFoodPrice("");
    setFoodImage("");

    setEditingId(null);
    setIsEditing(false);

    fetchMenu();

  } catch (error) {
    console.log(error);
    alert("❌ Update Failed");
  }
};

  // UPDATE STATUS
  const updateStatus = async(id,status)=>{

    try{

      await axios.put(
        `${API}/orders/${id}`,
        {
          status
        }
      );


      fetchOrders();


    }catch(error){

      console.log(error);

    }

  };



  useEffect(()=>{

    fetchOrders();
    fetchMenu();
    fetchTables();


    const interval = setInterval(() => {
  fetchOrders();
  fetchMenu();
  fetchTables();
}, 5000);


    return ()=>clearInterval(interval);


  },[]);


  const activeOrders = orders.filter(
  (order) => order.status !== "Served"
);

const orderHistory = orders.filter(
  (order) => order.status === "Served"
);
  const chartData={

    labels:[
      "Pending",
      "Preparing",
      "Ready",
      "Served"
    ],


    datasets:[
      {
        label:"Orders",

        data:[

          orders.filter(o=>o.status==="Pending").length,

          orders.filter(o=>o.status==="Preparing").length,

          orders.filter(o=>o.status==="Ready").length,

          orders.filter(o=>o.status==="Served").length

        ]

      }

    ]

  };



return (

<div className="admin-container">


<h1>👨‍🍳 Admin Dashboard</h1>



<button
className="logout-btn"
onClick={()=>{

localStorage.removeItem("admin");
navigate("/login");

}}
>

🚪 Logout

</button>




<div className="add-food">

<h2>🍔 Add New Food</h2>


<input
placeholder="Food Name"
value={foodName}
onChange={(e)=>setFoodName(e.target.value)}
/>


<input
placeholder="Category"
value={foodCategory}
onChange={(e)=>setFoodCategory(e.target.value)}
/>


<input
type="number"
placeholder="Price"
value={foodPrice}
onChange={(e)=>setFoodPrice(e.target.value)}
/>

<input
  type="file"
  accept="image/*"
  onChange={uploadImage}
/>

{foodImage && (
  <img
    src={foodImage}
    alt="Preview"
    width="120"
    style={{ marginTop: "10px", borderRadius: "8px" }}
  />
)}


<button
  onClick={() => {
    if (isEditing) {
      updateFood();
    } else {
      addFood();
    }
  }}
>
  {isEditing ? "💾 Save Changes" : "➕ Add Food"}
</button>
</div>





<input

className="search-box"

placeholder="Search Table Number"

value={search}

onChange={(e)=>setSearch(e.target.value)}

/>




<select

className="status-filter"

value={statusFilter}

onChange={(e)=>setStatusFilter(e.target.value)}

>

<option>All</option>
<option>Pending</option>
<option>Preparing</option>
<option>Ready</option>
<option>Served</option>


</select>





<div className="chart-container">

<h2>📊 Analytics</h2>

<Bar data={chartData}/>

</div>
<h2>🪑 Table Management</h2>

<div className="table-list">

  {tables.map((table) => (

    <div className="order-card" key={table.table_number}>

      <h3>Table {table.table_number}</h3>

      <p>
        Status :
        {table.status === "Available"
          ? " 🟢 Available"
          : " 🔴 Occupied"}
      </p>

    </div>

  ))}

</div>




<h2>🍔 Menu Management</h2>


{

menuItems.map(item=>(


<div className="order-card" key={item.id}>


<img
src={item.image}
width="100"
alt={item.name}
/>


<h3>{item.name}</h3>


<p>{item.category}</p>


<p>₹{item.price}</p>

<button
  style={{ background: "#2196f3", marginRight: "10px" }}
  onClick={() => {
    setEditingId(item.id);

    setFoodName(item.name);
    setFoodCategory(item.category);
    setFoodPrice(item.price);
    setFoodImage(item.image);

    setIsEditing(true);
  }}
>
  ✏️ Edit
</button>
<button
  style={{ background: "red" }}
  onClick={() => deleteFood(item.id)}
>
  🗑 Delete
</button>



</div>


))

}
<h2>📦 Active Orders</h2>

{
activeOrders
.filter(order =>
  order.table_number.toString().includes(search)
)
.filter(order =>
  statusFilter === "All"
    ? true
    : order.status === statusFilter
)
.map(order => (

<div className="order-card" key={order.id}>

<h2>Order #{order.id}</h2>

<p>🍽️ Table : {order.table_number}</p>

<p>💰 Total : ₹{order.total}</p>

<p>
🕒 {new Date(order.created_at).toLocaleString("en-IN")}
</p>

<p>Status : {order.status}</p>

<select
value={order.status}
onChange={(e) =>
updateStatus(order.id, e.target.value)
}
>
<option>Pending</option>
<option>Preparing</option>
<option>Ready</option>
<option>Served</option>
</select>

<h3>Items</h3>

{
order.items.map((item,index)=>(
<p key={index}>
{item.name} × {item.quantity}
</p>
))
}
<button
  style={{
    marginTop: "10px",
    background: "#4CAF50",
    color: "white"
  }}
  onClick={() => navigate(`/bill/${order.id}`)}
>
  🧾 View Bill
</button>
</div>

))
}

<hr style={{margin:"40px 0"}} />

<h2>📜 Order History</h2>

{
orderHistory.map(order => (

<div className="order-card" key={order.id}>

<h2>Order #{order.id}</h2>

<p>🍽️ Table : {order.table_number}</p>

<p>💰 Total : ₹{order.total}</p>

<p>
🕒 {new Date(order.created_at).toLocaleString("en-IN")}
</p>

<p style={{color:"green",fontWeight:"bold"}}>
✅ Served
</p>

<h3>Items</h3>

{
order.items.map((item,index)=>(
<p key={index}>
{item.name} × {item.quantity}
</p>
))
}
<button
  style={{
    marginTop: "10px",
    background: "#4CAF50",
    color: "white"
  }}
  onClick={() => navigate(`/bill/${order.id}`)}
>
  🧾 View Bill
</button>
</div>

))
}


</div>


);


}


export default Admin;