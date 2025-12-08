const express = require("express");
const router = express.Router();
const { propertyDetails, getPropertyDetails  } = require("../controller/propertyDetailController");

router.post("/details", propertyDetails);
router.get("/getDetails", getPropertyDetails);

module.exports = router;