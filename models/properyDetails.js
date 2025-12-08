const mongoose = require("mongoose");

const propertyDetailSchema = new mongoose.Schema(
  {
    propertyName: {
      type: String,
      required: true,
    },
    grossArea: {
      type: String,
      required: true,
    },
    nra: {
      type: String,
      required: true,
    },
    officeNra: {
      type: String,
    },
    floorCount: {
      type: Number,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("PropertyDetails", propertyDetailSchema);