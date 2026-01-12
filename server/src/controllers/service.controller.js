const Service  = require("../models/service.model.js");


const createService = async (req , res , next)=>{
    try {
    const { name, priorityRules } = req.body;

    const service = await Service.create({
      name,
      priorityRules,
    });

    res.status(201).json({
      success: true,
      data: service,
    });
  } catch (err) {
    next(err);
  }
}

const getServices = async ( req , res , next)=>{
    try {
    const services = await Service.find();
    res.json({ success: true, data: services });
  } catch (err) {
    next(err);
  }
}

module.exports = {
    createService,
    getServices
}