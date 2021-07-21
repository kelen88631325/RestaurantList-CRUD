const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
