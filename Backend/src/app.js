const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { GlobalErrorHandler } = require("./utilities/GlobalErrorHandler");

const app = express();
const apiVersion = process.env.BASE_URL;
const allowedOrigins = (
  process.env.CORS_ORIGIN ||
  process.env.FRONTEND_URL ||
  "http://localhost:5173"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

// Routes
app.use(apiVersion, require("./routes/index"));

// Global Error Handler
app.use(GlobalErrorHandler);

module.exports = app;
