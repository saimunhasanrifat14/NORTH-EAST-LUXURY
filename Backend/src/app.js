const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { GlobalErrorHandler } = require("./utilities/GlobalErrorHandler");

const app = express();
const apiVersion = process.env.BASE_URL;
const configuredOrigins = [
  process.env.CORS_ORIGIN,
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "http://127.0.0.1:5173",
]
  .filter(Boolean)
  .join(",")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const allowedOrigins = [...new Set(configuredOrigins)];

const isAllowedOrigin = (origin) => {
  if (!origin) {
    return true;
  }

  if (allowedOrigins.includes(origin)) {
    return true;
  }

  try {
    const { hostname, protocol } = new URL(origin);
    return protocol === "https:" && hostname.endsWith(".vercel.app");
  } catch {
    return false;
  }
};

const corsOptions = {
  origin(origin, callback) {
    if (isAllowedOrigin(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
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
