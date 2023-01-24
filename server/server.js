require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const port = process.env.PORT || 3007;
const db = require("./connect");
app.use(morgan("tiny"));
app.use(express.json());
//get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
  try {
    const data = await db.query("select * from restaurants");
    res.status(200).json({
      status: "success",
      data: data.rows,
    });
  } catch (err) {
    console.error(err);
  }
});
//get only one restaurant
app.get("/api/v1/restaurants/:restaurantId", async (req, res) => {
  const { restaurantId } = req.params;
  try {
    const data = await db.query("select * from restaurants where id=$1", [
      restaurantId,
    ]);
    res.status(200).json({
      status: "success",
      data: data.rows,
    });
  } catch (err) {
    console.error(err);
  }
});
//create a restaurant
app.post("/api/v1/restaurants", async (req, res) => {
  const { name, location, price_range } = req.body;
  try {
    await db.query(
      "INSERT INTO restaurants(name,location,price_range) VALUES($1,$2,$3)",
      [name, location, price_range]
    );
    res.json({
      data: "created successfully",
    });
  } catch (err) {
    console.error(err);
  }
});
//update a restaurant
app.put("/api/v1/restaurants/:restaurantId", async (req, res) => {
  const { location, name, price_range } = req.body;
  const { restaurantId } = req.params;
  try {
    await db.query(
      "update restaurants set location=$2, name=$3, price_range=$4 where id=$1",
      [restaurantId, location, name, price_range]
    );
    res.json({
      data: "updated successfully",
    });
  } catch (err) {
    console.error(err);
  }
});
//remove a restaurant
app.delete("/api/v1/restaurants/:restaurantId", async (req, res) => {
  const { restaurantId } = req.params;
  try {
    await db.query("delete from restaurants where id=$1", [restaurantId]);
    res.json({
      data: "deleted item successfully",
    });
  } catch (err) {
    console.error(err);
  }
});
app.listen(port, () => {
  console.log(`server is up and running on port ${port}`);
});
