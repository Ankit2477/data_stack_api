const express = require("express");
const router = express.Router();
const { properties, getProperties, getPropertyById, updateProperty   } = require("../controller/propertyController");

router.post("/properties", properties);
router.get("/getProperties/", getProperties);
router.get("/propertyById/:id", getPropertyById);
router.put("/updateProperty/:id", updateProperty);

module.exports = router;