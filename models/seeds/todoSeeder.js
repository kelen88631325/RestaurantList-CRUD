const mongoose = require("mongoose");
const Todo = require("../todo");

mongoose.connect("mongodb://localhost/todoList", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", () => {
  console.log("mongodb error");
});

//讀取餐廳資料
const restaurantList = require("../../restaurant.json");
const Restaurant = require("../todo");

db.once("open", () => {
  console.log("mongodb connected!");
  for (let i = 0; i < 8; i++) {
    Restaurant.create({
      name: restaurantList.results[i].name,
      image: restaurantList.results[i].image,
      category: restaurantList.results[i].category,
      rating: restaurantList.results[i].rating,
      location: restaurantList.results[i].location,
      google_map: restaurantList.results[i].google_map,
      phone: restaurantList.results[i].phone,
      description: restaurantList.results[i].description,
    });
  }
  console.log("讀取餐廳資料成功");
});
