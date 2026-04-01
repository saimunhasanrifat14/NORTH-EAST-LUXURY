const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin.model");
const { AsyncHandler } = require("../utilities/AsyncHandler");
const { CustomError } = require("../utilities/CustomError");

exports.verifyAdminJWT = AsyncHandler(async (req, res, next) => {
  const authorizationHeader = req.header("Authorization");
  const token =
    req.cookies?.accessToken ||
    (authorizationHeader?.startsWith("Bearer ")
      ? authorizationHeader.replace("Bearer ", "")
      : null);

  if (!token) {
    throw new CustomError(401, "Unauthorized request");
  }

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch {
    throw new CustomError(401, "Invalid or expired access token");
  }

  const admin = await Admin.findById(decodedToken._id);

  if (!admin) {
    throw new CustomError(401, "Admin not found");
  }

  req.admin = admin;
  next();
});
