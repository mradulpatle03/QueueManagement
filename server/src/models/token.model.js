const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema(
  {
    tokenNumber: {
      type: Number,
      required: true,
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    counterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Counter",
    },
    status: {
      type: String,
      enum: ["WAITING", "SERVING", "COMPLETED", "SKIPPED"],
      default: "WAITING",
    },
    priority: {
      type: Number,
      default: 0,
    },
    servedAt: Date,
  },
  { timestamps: true }
);

module.exports  = mongoose.model('Token', tokenSchema);

