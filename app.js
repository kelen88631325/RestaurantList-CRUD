// app.js
// require packages used in the project
const express = require("express");
const app = express();
const port = 3000;
const exphbs = require("express-handlebars");
// const restaurantList = require("./restaurant.json"); 改成讀取資料庫的
const restaurantListMongoose = require("./models/todo");
const mongoose = require("mongoose");
// 引用 body-parser
const bodyParser = require("body-parser");
// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }));

// setting template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// 設定靜態檔案
// setting static files
app.use(express.static("public"));

//搜尋功能，搜尋名稱或者餐廳類型
app.get("/search", (req, res) => {
  // console.log("req keyword", req.query.keyword);
  // const keyword = req.query.keyword;
  // const restaurant = restaurantList.results.filter((restaurant) => {
  //   return (
  //     restaurant.name.toLowerCase().includes(keyword.trim().toLowerCase()) ||
  //     restaurant.category.toLowerCase().includes(keyword.trim().toLowerCase())
  //   );
  // });

  // res.render("index", { restaurant: restaurant, keyword: keyword });
  //////////////////////////////////////////////////////////////////
  console.log("req keyword", req.query.keyword);
  const keyword = req.query.keyword;
  restaurantListMongoose
    .find()
    .lean()
    .then((restaurant) => {
      const restaurantKey = restaurant.filter((restaurant) => {
        return (
          restaurant.name
            .toLowerCase()
            .includes(keyword.trim().toLowerCase()) ||
          restaurant.category
            .toLowerCase()
            .includes(keyword.trim().toLowerCase())
        );
      });
      res.render("index", { restaurant: restaurantKey, keyword: keyword });
    });
});

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});

//以下資料庫連接
mongoose.connect("mongodb://localhost/todoList", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", () => {
  console.log("mongodb error");
});

db.once("open", () => {
  console.log("mongodb 連接成功");
});

// const restaurantList = require("./models/todo");

console.log(restaurantListMongoose);

//讀取Mongoose資料庫，移除不必要格式，並渲染資料
app.get("/", (req, res) => {
  restaurantListMongoose
    .find()
    .lean()
    .then((restaurant) => res.render("index", { restaurant: restaurant }))
    .catch((error) => console.error(error));
});

// 顯示子頁面，設定子頁面網址
app.get("/restaurants/:id", (req, res) => {
  const id = req.params.id;
  return restaurantListMongoose
    .findById(id)
    .lean()
    .then((restaurant) => res.render("show", { restaurant }));
});

//新增餐廳資料
app.get("/new", (req, res) => {
  return res.render("new");
});

//新增餐廳資料，存至伺服器
app.post("/restaurants", (req, res) => {
  const name = req.body.name;
  const category = req.body.category;
  const image = req.body.image;
  const location = req.body.location;
  const phone = req.body.phone;
  const google_map = req.body.google_map;
  const rating = req.body.rating;
  const description = req.body.description;

  return restaurantListMongoose
    .create({
      name,
      category,
      image,
      location,
      phone,
      google_map,
      rating,
      description,
    })
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

//設定"編輯餐廳資料"的路由
app.get("/restaurants/:id/edit", (req, res) => {
  const id = req.params.id;
  return restaurantListMongoose
    .findById(id)
    .lean()
    .then((restaurant) => res.render("edit", { restaurant }))
    .catch((error) => console.log(error));
});

//將編輯好的資料推進資料庫
app.post("/restaurants/:id/edit", (req, res) => {
  const id = req.params.id;
  const {
    name,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description,
  } = req.body;

  return restaurantListMongoose
    .findById(id)
    .then((restaurant) => {
      restaurant.name = name;
      restaurant.category = category;
      restaurant.image = image;
      restaurant.location = location;
      restaurant.phone = phone;
      restaurant.google_map = google_map;
      restaurant.rating = rating;
      restaurant.description = description;

      return restaurant.save();
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch((error) => console.log(error));
});

// 刪除餐廳
app.post("/restaurants/:id/delete", (req, res) => {
  const id = req.params.id;
  return restaurantListMongoose
    .findById(id)
    .then((restaurantListMongoose) => restaurantListMongoose.remove())
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});
