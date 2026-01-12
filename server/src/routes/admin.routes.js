const express = require("express");

const protect = require("../middlewares/auth.middleware")
const authorize = require("../middlewares/role.middleware")
const ROLES = require("../config/roles")

const {createService,getServices} = require("../controllers/service.controller")

const {createCounter,getCounters} = require("../controllers/counter.controller")

const router = express.Router();

// Services
router.post("/services", protect, authorize(ROLES.ADMIN), createService);
router.get("/services", protect, authorize(ROLES.ADMIN), getServices);

// Counters
router.post("/counters", protect, authorize(ROLES.ADMIN), createCounter);
router.get("/counters", protect, authorize(ROLES.ADMIN), getCounters);


module.exports = router;