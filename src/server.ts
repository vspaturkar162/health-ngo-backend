import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";

/* ✅ Load env FIRST */
dotenv.config();

/* ✅ Import routes */
import authRoutes from "./routes/auth";
import blogRoutes from "./routes/blogs";
import eventRoutes from "./routes/events";
import volunteerRoutes from "./routes/volunteer";
import resourcesRoutes from "./routes/resources_temp";
import adminAuthRoutes from "./routes/adminAuth";

const app = express();

/* ✅ Security headers */
app.use(helmet());

/* ✅ CORS (FIXED) */
const allowedOrigins = [
  "http://localhost:3000",
  "http://192.168.43.28:3000",
  "https://health-ngo-frontend.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* ✅ Body parser */
app.use(express.json({ limit: "10mb" }));

/* ✅ Rate limiter */
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 120,
  })
);

/* ✅ API routes */
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/volunteers", volunteerRoutes);
app.use("/api/resources", resourcesRoutes);
app.use("/api/admin", adminAuthRoutes);

/* ✅ Health check */
app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

/* ✅ Database + Server start */
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/Health_NGO";
const PORT = process.env.PORT || 4000;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });