const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const product = new Schema({
  name: { type: String },
  price: { type: String },
  quantity: { type: String },
});

const carts = new Schema(
  {
    name: String,
    email: String,
    phone: String,
    address: String,
    sum: Number,
    shop: String,
    // TODO for history
    order: [product],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const Carts = mongoose.model("carts", carts);

module.exports = { Carts };
