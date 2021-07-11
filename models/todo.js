const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const todoSchema = new Schema({
//   name: {
//     type: String,
//     required: true,
//   },
// });

// module.exports = mongoose.model("Todo", todoSchema);

//生成資料

const restaurantSchema = new Schema({
  id: Number,
  name: {
    type: String,
    required: true,
  },
  name_en: String,
  image: String,
  category: String,
  rating: Number,
  location: String,
  google_map: String,
  phone: String,
  description: String,
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
