const mongoose = require("mongoose");

const propertyDetailsSchema = new mongoose.Schema(
  {
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
      unique: true, 
    },
    class: {
      type: String,
    },
    yearBuilt: {
      type: Number,
    },
    listingBrokers: {
      type: String,
    },
    grossArea: {
      type: String,
    },
    nra: {
      type: String,
    },
    officeNra: {
      type: String,
    },
    floorCount: {
      type: Number,
    },
    lastRenovated: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const PropertyDetails = mongoose.model("PropertyDetails", propertyDetailsSchema);

module.exports = PropertyDetails;