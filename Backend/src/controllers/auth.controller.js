const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin.model");
const { APIResponse } = require("../utilities/APIResponse");
const { AsyncHandler } = require("../utilities/AsyncHandler");
const { CustomError } = require("../utilities/CustomError");

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
};

const generateAccessAndRefreshTokens = async (adminId) => {
  const admin = await Admin.findById(adminId).select("+refreshToken");

  if (!admin) {
    throw new CustomError(404, "Admin not found");
  }

  const accessToken = admin.generateAccessToken();
  const refreshToken = admin.generateRefreshToken();

  admin.refreshToken = refreshToken;
  await admin.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

exports.loginAdmin = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError(400, "Email and password are required");
  }

  const admin = await Admin.findOne({ email: email.toLowerCase() }).select(
    "+password +refreshToken"
  );

  if (!admin) {
    throw new CustomError(401, "Invalid admin credentials");
  }

  const isPasswordValid = await admin.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new CustomError(401, "Invalid admin credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    admin._id
  );

  const loggedInAdmin = await Admin.findById(admin._id);

  res
    .status(200)
    .cookie("accessToken", accessToken, {
      ...cookieOptions,
      maxAge: 15 * 60 * 1000,
    })
    .cookie("refreshToken", refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .json(
      new APIResponse(200, "Admin logged in successfully", {
        admin: loggedInAdmin,
        accessToken,
        refreshToken,
      })
    );
});

exports.refreshAccessToken = AsyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies?.refreshToken || req.body?.refreshToken;

  if (!incomingRefreshToken) {
    throw new CustomError(401, "Refresh token is required");
  }

  let decodedToken;

  try {
    decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
  } catch {
    throw new CustomError(401, "Invalid or expired refresh token");
  }

  const admin = await Admin.findById(decodedToken._id).select("+refreshToken");

  if (!admin || admin.refreshToken !== incomingRefreshToken) {
    throw new CustomError(401, "Refresh token is invalid");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    admin._id
  );

  res
    .status(200)
    .cookie("accessToken", accessToken, {
      ...cookieOptions,
      maxAge: 15 * 60 * 1000,
    })
    .cookie("refreshToken", refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .json(
      new APIResponse(200, "Access token refreshed successfully", {
        accessToken,
        refreshToken,
      })
    );
});

exports.logoutAdmin = AsyncHandler(async (req, res) => {
  await Admin.findByIdAndUpdate(
    req.admin?._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new APIResponse(200, "Admin logged out successfully"));
});

exports.getCurrentAdmin = AsyncHandler(async (req, res) => {
  APIResponse.success(res, 200, "Current admin fetched successfully", req.admin);
});
