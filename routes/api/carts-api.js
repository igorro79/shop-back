const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/apiHelpers");

const {
  addOrderController,
  getAllOrdersController,
} = require("../../controllers/cartsController");

router.get("/", asyncWrapper(getAllOrdersController));
router.post("/", asyncWrapper(addOrderController));

module.exports = router;
