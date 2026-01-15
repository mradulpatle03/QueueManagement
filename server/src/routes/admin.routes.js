const express = require("express");

const protect = require("../middlewares/auth.middleware")
const authorize = require("../middlewares/role.middleware")
const ROLES = require("../config/roles")

const {createService,getServices} = require("../controllers/service.controller")

const {createCounter,getCounters,updateCounterStatus} = require("../controllers/counter.controller");
const { createStaff } = require("../controllers/user.controller");

const router = express.Router();

// Services
router.post("/services", protect, authorize(ROLES.ADMIN), createService);
// router.get("/services", protect, authorize(ROLES.ADMIN), getServices);
router.get("/services", protect, getServices);

// Counters
router.post("/counters", protect, authorize(ROLES.ADMIN), createCounter);
router.get("/counters", protect, authorize(ROLES.ADMIN), getCounters);

router.patch(
  "/counters/:counterId/status",
  protect,
  authorize(ROLES.ADMIN),
  updateCounterStatus
);

router.post(
  "/staff",
  protect,
  authorize(ROLES.ADMIN),
  createStaff
);


module.exports = router;