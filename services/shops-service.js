const { Shops } = require("./schemas/shops-schema");
const { NotFound } = require("../helpers/errors");

const getShops = async () => {
  try {
    return await Shops.find();
  } catch (error) {
    throw NotFound(error);
  }
};

const addShop = async ({ name, products, icon }) => {
  console.log(products);
  try {
    const shop = new Shops({ name, products, icon });
    const saved = await shop.save();
    return saved;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getShops,
  addShop,
};
