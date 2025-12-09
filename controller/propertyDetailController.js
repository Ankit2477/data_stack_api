const PropertyDetails = require("../models/properyDetails");
const Property = require("../models/propertyModel");
const Floor = require("../models/floor");
const Space = require("../models/spaces");

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

const getPropertyDetailById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const property = await PropertyDetails.findOne({ propertyId: id })
                                          .populate('propertyId');

    if (!property) {
      return res.status(404).json({ message: "Property details not found" });
    }

    return res.status(200).json({
      message: "Property details fetched successfully!",
      data: property,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
const getFloorsById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const property = await Floor.find({ propertyId: id })
                                          .populate('propertyId'); 

    if (!property || property.length === 0) {
      return res.status(404).json({ message: "Floors details not found" });
    }

    return res.status(200).json({
      message: "Floors details fetched successfully!",
      data: property,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
const getSpacesById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const property = await Space.find({ propertyId: id })
                                          .populate('propertyId'); 

    if (!property || property.length === 0) {
      return res.status(404).json({ message: "Spaces details not found" });
    }

    return res.status(200).json({
      message: "Spaces details fetched successfully!",
      data: property,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const updatePropertyDetail = async (req, res) => {
  try {
    const { id } = req.params;  
    const updates = req.body;

    const updatedPropertyDetails = await PropertyDetails.findOneAndUpdate(
      { propertyId: id },
      { $set: updates },
      { new: true }
    );

    if (updates.propertyName) {
      await Property.findByIdAndUpdate(
        id,
        { $set: { propertyName: updates.propertyName } }
      );
    }

    res.status(200).json({
      success: true,
      message: "Property details updated successfully!",
      payload: updatedPropertyDetails,
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateFloor = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const { floorId, floorNumber, ...updates } = req.body;

    if (floorNumber !== undefined) {
      const exists = await Floor.findOne({
        propertyId,
        floorNumber,
        _id: { $ne: floorId }
      });

      if (exists) {
        return res.status(400).json({
          success: false,
          message: `Floor number ${floorNumber} already exists for this property`,
        });
      }
    }

    const updatedFloor = await Floor.findOneAndUpdate(
      { _id: floorId, propertyId },
      { $set: { floorNumber, ...updates } },
      { new: true }
    );

    if (!updatedFloor) {
      return res.status(404).json({
        success: false,
        message: "Floor not found for this property",
      });
    }

    res.status(200).json({
      success: true,
      message: "Floor updated successfully",
      payload: updatedFloor,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const updateSpace = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const { spaceId, ...updates } = req.body; 

    const updatedSpace = await Space.findOneAndUpdate(
      { _id: spaceId, propertyId: propertyId },
      { $set: updates },
      { new: true }
    );

    if (!updatedSpace) {
      return res.status(404).json({
        success: false,
        message: "Space not found for this property",
      });
    }

    res.status(200).json({
      success: true,
      message: "Space updated successfully",
      payload: updatedSpace,
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
    getPropertyDetailById,
    updatePropertyDetail,
    getFloorsById,
    getSpacesById,
    updateFloor,
    updateSpace
};