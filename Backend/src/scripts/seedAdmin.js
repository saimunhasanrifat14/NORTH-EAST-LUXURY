require("dotenv").config();
const mongoose = require("mongoose");
const Admin = require("../models/Admin.model");
const { connectDB } = require("../database/db");

const seedAdmin = async () => {
  const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

  if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
    throw new Error(
      "ADMIN_NAME, ADMIN_EMAIL, and ADMIN_PASSWORD must be present in .env"
    );
  }

  await connectDB();

  let admin = await Admin.findOne({ email: ADMIN_EMAIL.toLowerCase() }).select(
    "+password +refreshToken"
  );

  if (!admin) {
    admin = new Admin({
      name: ADMIN_NAME,
      email: ADMIN_EMAIL.toLowerCase(),
      password: ADMIN_PASSWORD,
    });
  } else {
    admin.name = ADMIN_NAME;
    admin.email = ADMIN_EMAIL.toLowerCase();
    admin.password = ADMIN_PASSWORD;
    admin.refreshToken = null;
  }

  await admin.save();

  console.log(`Admin user ready: ${admin.email}`);
};

seedAdmin()
  .then(async () => {
    await mongoose.connection.close();
    process.exit(0);
  })
  .catch(async (error) => {
    console.error("Failed to seed admin:", error.message);
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
    process.exit(1);
  });
