require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 QR Dine Backend is Running...");
});

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
    category: "Italian",
    price: 180,
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9"
  },
  {
    id: 4,
    name: "Cold Drink",
    category: "Beverage",
    price: 60,
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e"
  }
];

app.get("/menu", (req, res) => {
  res.json(foodItems);
});

app.post("/orders", async (req, res) => {
  try {
    const { tableNumber, items, total } = req.body;

    const result = await pool.query(
      `INSERT INTO orders (table_number, items, total)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [tableNumber, JSON.stringify(items), total]
    );

    res.status(201).json({
      message: "Order placed successfully",
      order: result.rows[0]
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to place order"
    });
  }
});

app.get("/orders", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM orders ORDER BY id DESC"
    );

    res.json(result.rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch orders"
    });
  }
});
app.put("/orders/:id", async (req, res) => {
    console.log("PUT API HIT");
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await pool.query(
      `UPDATE orders
       SET status = $1
       WHERE id = $2
       RETURNING *`,
      [status, id]
    );

    res.json(result.rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to update status"
    });
  }
});

pool.query("SELECT NOW()", (err) => {
  if (err) {
    console.log("Database Connection Error:", err);
  } else {
    console.log("Database Connected Successfully ✅");
  }
});

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
