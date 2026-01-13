const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateToken = require("../services/authToken.service");
const User = require("../models/user.model");

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user exists
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    // Create user
    const newUser = await User.create({ name, email, password, role });

    const token = generateToken(newUser);

    res.status(201).json({
      success: true,
      token,
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    // Generate JWT
    const token = generateToken(user);

    res.json({
      success: true,
      token,
    });
  } catch (err) {
    next(err);
  }
};
