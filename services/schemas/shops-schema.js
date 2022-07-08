const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const product = new Schema({
//   name: String,
//   price: Number,
//   image: String,
// });

const shops = new Schema(
  {
    name: String,
    icon: String,
    products: Schema.Types.Mixed,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const Shops = mongoose.model("shops", shops);

module.exports = { Shops };
