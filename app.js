// app.js
// require packages used in the project
const express = require("express");
const app = express();
const port = 3000;
const exphbs = require("express-handlebars");
const restaurantList = require("./restaurant.json");

// setting template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// 設定靜態檔案
// setting static files
app.use(express.static("public"));

// 顯示主頁面
//routes setting
app.get("/", (req, res) => {
  res.render("index", { restaurant: restaurantList.results });
});

// 顯示子頁面，設定子頁面網址
app.get("/restaurants/:restaurant_id", (req, res) => {
  console.log("restaurant_id", req.params.restaurant_id);
  const restaurant = restaurantList.results.filter(function (restaurant) {
    return restaurant.id == req.params.restaurant_id;
  });
  console.log("restaurant", restaurant);
  res.render("show", { restaurant: restaurant[0] });
});

//搜尋功能，搜尋名稱或者餐廳類型
app.get("/search", (req, res) => {
  console.log("req keyword", req.query.keyword);
  const keyword = req.query.keyword;
  const restaurant = restaurantList.results.filter((restaurant) => {
    return (
      restaurant.name.toLowerCase().includes(keyword.trim().toLowerCase()) ||
      restaurant.category.toLowerCase().includes(keyword.trim().toLowerCase())
    );
  });

  res.render("index", { restaurant: restaurant, keyword: keyword });
});

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});

//2021.07.11分支測試
