const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const items = new Schema({
  name: String,
  price: Number,
  quantity: Number,
});

const order = new Schema({
  shop: String,
  sum: Number,
  items: [items],
});

const carts = new Schema(
  {
    name: String,
    email: String,
    phone: String,
    address: String,
    date: String,
    order: [
      {
        shop: String,
        sum: Number,
        items: [
          {
            name: String,
            price: Number,
            quantity: Number,
          },
        ],
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const Carts = mongoose.model("carts", carts);

module.exports = { Carts };
