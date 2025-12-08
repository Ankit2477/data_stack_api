const mongoose = require("mongoose");

const floorSchema = new mongoose.Schema(
  {
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    floorNumber: {
      type: Number,
      required: true,
    },
    floorName: {
      type: String,
    },
    floorSize: {
      type: String,
    },
    slabHeight: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to prevent duplicate floor numbers per property
floorSchema.index({ propertyId: 1, floorNumber: 1 }, { unique: true });

const Floor = mongoose.model("Floor", floorSchema);
module.exports = Floor;