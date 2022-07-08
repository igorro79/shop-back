const {
  getLastCart,
  getAllCarts,
  addCart,
} = require("../services/carts-service");

const getLastOrderController = async (req, res) => {
  const cart = await getLastCart();
  res.json(cart);
};

const getAllOrdersController = async (req, res) => {
  const cart = await getAllCarts();
  res.json(cart);
};

const addOrderController = async (req, res) => {
  const cart = await addCart(req.body);
  res.status(201).json(cart);
};

module.exports = {
  getLastOrderController,
  getAllOrdersController,
  addOrderController,
};
