const express = require("express");

const protect = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/role.middleware");
const ROLES  = require("../config/roles");
const { getStaffQueueView, getCustomerQueueStatus } = require("../controllers/queue.controller");
const { callNextToken } = require("../controllers/token.controller");
const router = express.Router();

// Staff
router.get(
  "/staff/me",
  protect,
  authorize(ROLES.STAFF),
  getStaffQueueView
);

router.post(
  "/next",
  protect,
  authorize(ROLES.STAFF),
  callNextToken
);

// Customer
router.get(
  "/customer/:tokenId",
  protect,
  authorize(ROLES.CUSTOMER),
  getCustomerQueueStatus
);

module.exports = router;