const express = require("express");
const { createToken, callNextToken,completeToken,skipToken} = require("../controllers/token.controller");
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

router.patch(
  "/:tokenId/complete",
  protect,
  authorize(ROLES.STAFF),
  completeToken
);

router.patch(
  "/:tokenId/skip",
  protect,
  authorize(ROLES.STAFF),
  skipToken
);


module.exports = router;