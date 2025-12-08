const Property = require("../models/propertyModel");

const properties = async (req, res) => {
    try {
        const { propertyName, propertyAddress, subMarket, status, market, totalSpaces, occupiedSpaces, occupancy, dataStack, assignedTo } = req.body;
        const newProperty = new Property({
            propertyName,
            propertyAddress,
            status,
            market,
            subMarket,
            totalSpaces,
            occupiedSpaces,
            occupancy,
            dataStack,
            assignedTo
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

const getProperties = async (req, res) => {
  try {
    const properties = await Property.find();

    return res.status(200).json({
      success: true,
      message: "Properties fetched successfully!",
      payload: properties,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getPropertyById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "ID is required" });
        }

        const property = await Property.findById(id);
        console.log(property, "property by id");
        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }

        return res.status(200).json({
            message: "Property fetched successfully!",
            data: property,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }

    return res.status(200).json({
      message: "Property updated successfully!",
      data: updatedProperty,
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


module.exports = {
    properties,
    getProperties,
    getPropertyById,
    updateProperty
};