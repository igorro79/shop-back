const { Carts } = require("./schemas/carts-schema");
const { NotFound } = require("../helpers/errors");

const getAllCarts = async () => {
  return await Carts.find();
};

const addCart = async (data) => {
  const contact = new Carts(data);
  const saved = await contact.save();
  return saved;
};

module.exports = {
  getAllCarts,
  addCart,
};
