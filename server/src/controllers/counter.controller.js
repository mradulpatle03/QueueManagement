const Counter = require("../models/counter.model.js");

const createCounter = async (req, res, next) => {
  try {
    const { name, serviceId } = req.body;

    const counter = await Counter.create({ name, serviceId });

    res.status(201).json({
      success: true,
      data: counter,
    });
  } catch (err) {
    next(err);
  }
};

const getCounters = async (req, res, next) => {
  try {
    const counters = await Counter.find().populate("serviceId", "name");
    res.json({ success: true, data: counters });
  } catch (err) {
    next(err);
  }
};

module.exports = {
    createCounter,
    getCounters
}