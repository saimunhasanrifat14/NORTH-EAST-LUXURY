const express = require("express");
const router = express.Router();
const {
  loginAdmin,
  refreshAccessToken,
  logoutAdmin,
  getCurrentAdmin,
} = require("../../controllers/auth.controller");
const { verifyAdminJWT } = require("../../middlewares/auth.middleware");

router.post("/login", loginAdmin);
router.post("/refresh-token", refreshAccessToken);
router.post("/logout", verifyAdminJWT, logoutAdmin);
router.get("/me", verifyAdminJWT, getCurrentAdmin);

module.exports = router;
