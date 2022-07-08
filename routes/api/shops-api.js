const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/apiHelpers");

const {
  getShopsController,
  addShopController,
} = require("../../controllers/shopsController");

router.get("/", asyncWrapper(getShopsController));
router.post("/", asyncWrapper(addShopController));

module.exports = router;
