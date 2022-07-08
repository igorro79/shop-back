const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const product = new Schema({
  id: String,
  name: String,
  price: Number,
  image: String,
});

const shops = new Schema(
  {
    name: String,
    icon: String,
    products: [product],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const Shops = mongoose.model("shops", shops);

module.exports = { Shops };
