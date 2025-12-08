const mongoose = require("mongoose");

const spaceSchema = new mongoose.Schema(
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
    suiteNumber: {
      type: Number,
      required: true,
    },
    tenant: {
      type: String,
    },
    spaceSize: {
      type: String,
    },
    directSublease: {
      type: String,
      enum: ["direct", "sublease"],
    },
    dateOnMarket: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to prevent duplicate suite numbers per property
spaceSchema.index({ propertyId: 1, suiteNumber: 1 }, { unique: true });

const Space = mongoose.model("Space", spaceSchema);

module.exports = Space;