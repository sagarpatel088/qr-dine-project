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

app.get("/menu", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM menu ORDER BY id"
    );

    res.json(result.rows);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to fetch menu"
    });
  }
});

app.post("/menu", async (req, res) => {
  try {
    const { name, category, price, image } = req.body;

    const result = await pool.query(
      `INSERT INTO menu (name, category, price, image)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name, category, price, image]
    );

    res.status(201).json(result.rows[0]);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to add food"
    });
  }
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
// GET ALL TABLES
app.get("/tables", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM tables ORDER BY table_number"
    );

    res.json(result.rows);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to fetch tables"
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
// UPDATE TABLE STATUS
app.put("/tables/:tableNumber", async (req, res) => {

  try {

    const { tableNumber } = req.params;
    const { status } = req.body;

    const result = await pool.query(
      `UPDATE tables
       SET status = $1
       WHERE table_number = $2
       RETURNING *`,
      [status, tableNumber]
    );

    res.json(result.rows[0]);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to update table"
    });

  }

});
app.delete("/menu/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      "DELETE FROM menu WHERE id = $1",
      [id]
    );

    res.json({
      message: "Food deleted successfully"
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to delete food"
    });
  }
});
app.put("/menu/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      category,
      price,
      image
    } = req.body;

    const result = await pool.query(
      `UPDATE menu
       SET name=$1,
           category=$2,
           price=$3,
           image=$4
       WHERE id=$5
       RETURNING *`,
      [name, category, price, image, id]
    );

    res.json(result.rows[0]);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to update food"
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
