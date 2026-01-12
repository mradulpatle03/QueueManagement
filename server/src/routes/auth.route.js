const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/auth.controller.js");
const protect = require("../middlewares/auth.middleware.js");

router.post("/register", register);
router.post("/login", login);

// Protected test route
router.get("/protected", protect, (req, res) => {
  res.json({ message: `Welcome ${req.user.role}!`, user: req.user });
});

module.exports = router;
