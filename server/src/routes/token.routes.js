const express = require("express");
const { createToken, callNextToken } = require("../controllers/token.controller");
const protect = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/role.middleware");
const ROLES  = require("../config/roles");

const router = express.Router();

// Customer
router.post(
  "/",
  protect,
  authorize(ROLES.CUSTOMER),
  createToken
);

// Staff
router.post(
  "/next",
  protect,
  authorize(ROLES.STAFF),
  callNextToken
);

module.exports = router;