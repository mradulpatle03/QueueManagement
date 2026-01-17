const express = require("express");
const router = express.Router();
const {
  getCountersByService,
} = require("../controllers/counter.controller");
const protect  = require("../middlewares/auth.middleware");
const ROLES = require("../config/roles");
const authorize = require("../middlewares/role.middleware");

router.get(
  "/service/:serviceId",
  protect,
  authorize(ROLES.STAFF),
  getCountersByService
);

module.exports = router;
