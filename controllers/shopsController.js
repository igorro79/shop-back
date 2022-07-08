const { getShops, addShop } = require("../services/shops-service");

const getShopsController = async (req, res) => {
  const shops = await getShops();
  res.json(shops);
};

const addShopController = async (req, res) => {
  console.log(req.body);
  const shop = await addShop(req.body);
  res.status(201).json(shop);
};

module.exports = {
  getShopsController,
  addShopController,
};
