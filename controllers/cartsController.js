const { getAllCarts, addCart } = require("../services/carts-service");

const getAllOrdersController = async (req, res) => {
  const cart = await getAllCarts();
  res.json(cart);
};

const addOrderController = async (req, res) => {
  const cart = await addCart(req.body);
  res.status(201).json(cart);
};

module.exports = {
  getAllOrdersController,
  addOrderController,
};
