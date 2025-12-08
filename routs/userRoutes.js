const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
// admin access
router.get("/admin", verifyToken, authorizeRoles("admin"), (req, res) => {
  try {
    res.json({ message: "admin route" });
  } catch (error) {
    res.json({ message: error.message });
  }
});

// manger access
router.get(
  "/manager",
  verifyToken,
  authorizeRoles("admin, manager"),
  (req, res) => {
    res.json({ message: "manager route" });
  }
);

// user access

router.get(
  "/user",
  verifyToken,
  authorizeRoles("admin, manager, user"),
  (req, res) => {
    res.json({ message: "user route" });
  }
);

module.exports = router;
