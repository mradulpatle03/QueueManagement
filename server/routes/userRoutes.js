const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/userController");
const verifyToken = require("../middlewares/authMiddleware");

router.post("/signup", signup);
router.post("/login", login);

// Protected test route
router.get("/protected", verifyToken, (req, res) => {
  res.json({ message: `Welcome ${req.user.role}!`, user: req.user });
});

module.exports = router;
