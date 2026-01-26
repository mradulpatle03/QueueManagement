const express = require("express");
const { createToken,completeToken,skipToken,getTokenStatus, toggleCounter} = require("../controllers/token.controller");
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

// router.patch(
//   "/:tokenId/complete",
//   protect,
//   authorize(ROLES.STAFF),
//   completeToken
// );

router.post(
  "/complete",
  protect,
  authorize(ROLES.STAFF),
  completeToken
);

router.get("/:tokenId/status",
  protect,
  authorize(ROLES.CUSTOMER),
  getTokenStatus
);

// router.patch(
//   "/:tokenId/skip",
//   protect,
//   authorize(ROLES.STAFF),
//   skipToken
// );

router.post(
  "/skip",
  protect,
  authorize(ROLES.STAFF),
  skipToken
);

router.post(
  "/toggle-counter",
  protect,
  authorize(ROLES.STAFF),
  toggleCounter
)


module.exports = router;