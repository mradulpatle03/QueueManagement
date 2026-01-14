const express = require("express");

const protect = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/role.middleware");
const ROLES  = require("../config/roles");
const { getStaffQueueView, getCustomerQueueStatus } = require("../controllers/queue.controller");

const router = express.Router();

// Staff
router.get(
  "/staff/:serviceId",
  protect,
  authorize(ROLES.STAFF),
  getStaffQueueView
);

// Customer
router.get(
  "/customer/:tokenId",
  protect,
  authorize(ROLES.CUSTOMER),
  getCustomerQueueStatus
);

module.exports = router;