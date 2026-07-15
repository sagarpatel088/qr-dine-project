import { useState } from "react";
import { useCart } from "../context/CartContext";
import "./Menu.css";

const foodItems = [
  {
    id: 1,
    name: "Burger",
    category: "Fast Food",
    price: 120,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
  },

  {
    id: 2,
    name: "Pizza",
    category: "Fast Food",
    price: 250,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591"
  },

  {
    id: 3,
    name: "Pasta",
    category: "Fast Food",
    price: 180,
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601"
  },

  {
    id: 4,
    name: "Cold Drink",
    category: "Drinks",
    price: 60,
    image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e"
  }
];

function Menu() {
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
            <h2>{item.name}</h2>

<p className="category">
  {item.category}
</p>

<p>₹{item.price}</p>
            <button 
              onClick={() => addToCart({
                ...item,
                quantity: 1
              })}
            >
              Add To Cart
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Menu;