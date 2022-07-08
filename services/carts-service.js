const { Carts } = require("./schemas/carts-schema");
const { NotFound } = require("../helpers/errors");

const getLastCart = async () => {
  return await Carts.find();
};

const getAllCarts = async () => {
  return await Carts.find();
};

const addCart = async ({ name, email, phone, address, order, date }) => {
  const contact = new Carts({ name, email, phone, address, order, date });
  const saved = await contact.save();
  return saved;
};

module.exports = {
  getLastCart,
  getAllCarts,
  addCart,
};
