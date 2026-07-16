
import { useCart } from "../context/CartContext";
import "./Menu.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";



function Menu() {
  const [foodItems, setFoodItems] = useState([]);

useEffect(() => {
  axios
    .get("http://localhost:5001/menu")
    .then((response) => {
      setFoodItems(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
}, []);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const { addToCart } = useCart();

  return (
    <div className="menu-container">

      <h1>🍽️ Restaurant Menu</h1>
      <input
  type="text"
  placeholder="Search food..."
  className="search-box"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
<div className="category-buttons">

<button onClick={() => setCategory("All")}>
All
</button>

<button onClick={() => setCategory("Fast Food")}>
Fast Food
</button>

<button onClick={() => setCategory("Drinks")}>
Drinks
</button>


</div>

      <div className="food-list">

        {foodItems
.filter((item) =>
  item.name.toLowerCase().includes(search.toLowerCase())
)
.filter((item) =>
  category === "All" 
  ? true 
  : item.category === category
)
.map((item) => (
  
          <div className="food-card" key={item.id}>

            <div className="food-image">
  <img src={item.image} alt={item.name} />
</div>
           <h2>
  {item.name} <span style={{color:"#fbc02d"}}>⭐4.8</span>
</h2>

<p className="category">
  {item.category}
</p>

<p style={{color:"#ff5722", fontSize:"22px"}}>
  ₹{item.price}
</p>
            onClick={() => {

  addToCart({
    ...item,
    quantity: 1
  });

  toast.success(`${item.name} added to cart 🛒`);

}}

          </div>
        ))}

      </div>

    </div>
  );
}

export default Menu;