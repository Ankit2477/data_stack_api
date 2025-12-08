const express = require("express");
const router = express.Router();
const { propertyDetails, getPropertyDetails, getPropertyDetailById, getFloorsById,
    getSpacesById, updatePropertyDetail } = require("../controller/propertyDetailController");

router.post("/details", propertyDetails);
router.get("/getDetailById/:id", getPropertyDetailById);
router.get("/getDetails", getPropertyDetails);
router.get("/getFloorsById/:id", getFloorsById);
router.get("/getSpacesById/:id", getSpacesById);
router.put("/updatePropertyDetail/:id", updatePropertyDetail);

module.exports = router;