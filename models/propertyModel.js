const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    propertyName: {
      type: String,
      required: true,
    },
    propertyAddress: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["occupied", "vacant"],
    },
    market: {
      type: String,
      required: true,
    },
    subMarket: {
      type: String,
    },
    totalSpaces: {
      type: Number,
    },
    occupiedSpaces: {
      type: Number,
    },  
    occupancy: {
      type: Number,
    },
    dataStack: {
      type: Number,
    },  
    assignedTo: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Property", propertySchema);
