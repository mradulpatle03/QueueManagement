const User = require('../models/user.model');
const ROLES = require('../config/roles');

const createStaff = async (req, res, next) => {
  try {
    const { name, email, password, serviceId } = req.body;

    const staff = await User.create({
      name,
      email,
      password,
      role: ROLES.STAFF,
      serviceId,
    });

    res.status(201).json({
      success: true,
      data: staff,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createStaff,
};