const PropertyDetails = require("../models/properyDetails");

const propertyDetails = async (req, res) => {
    try {
        const { propertyName, grossArea, nra, officeNra, floorCount } = req.body;
        const newProperty = new PropertyDetails({
            propertyName,
            grossArea,
            nra,
            officeNra,
            floorCount

        });
        await newProperty.save();
        console.log(newProperty, "test1");
        res.status(201).json({ message: `Property ${propertyName} has been registered!` });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const getPropertyDetails = async (req, res) => {
  try {
    const propertyDetails = await PropertyDetails.find();

    return res.status(200).json({
      success: true,
      message: "Property details fetched successfully!",
      payload: propertyDetails,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updatePropertyDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedProperty = await PropertyDetails.findByIdAndUpdate(
            id,
            { $set: updates },
            { new: true }
        );

        if (!updatedProperty) {
            return res.status(404).json({ message: "Property not found!" });
        }

        res.status(200).json({
            success: true,
            message: `Property ${updatedProperty.propertyName} updated successfully!`,
            payload: updatedProperty,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    propertyDetails,
    getPropertyDetails,
    updatePropertyDetail,
};