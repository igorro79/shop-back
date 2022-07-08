const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/apiHelpers");

const {
  getLastOrderController,
  addOrderController,
  getAllOrdersController,
} = require("../../controllers/cartsController");

router.get("/", asyncWrapper(getLastOrderController));
router.get("/all", asyncWrapper(getAllOrdersController));
router.post("/", asyncWrapper(addOrderController));

module.exports = router;
