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
app.set("trust proxy", 1);
/* ✅ Security headers */
app.use(helmet());

/* ✅ CORS (FIXED) */
// const allowedOrigins = [
//   "http://localhost:3000",
//   "http://192.168.43.28:3000",
//   "https://health-ngo-frontend.vercel.app",
// ];

const allowedOrigins = [
  "http://localhost:3000",
  "http://192.168.43.28:3000",
  "https://health-ngo-frontend.vercel.app",
  "https://health-ngo-frontend-h7jzf88e4-vaishnavi-paturkars-projects.vercel.app",
  process.env.FRONTEND_ORIGIN,
].filter(Boolean) as string[];

// app.use(
//   cors({
//     origin: [
//       "http://localhost:3000",
//       "http://192.168.43.28:3000",
//       "https://health-ngo-frontend.vercel.app",
//       "https://health-ngo-frontend-fw27lh4ex-vaishnavi-paturkars-projects.vercel.app" // ✅ THIS is the one in your error logs
//     ],
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true
//   })
// );

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

/* ✅ Body parser */
app.use(express.json({ limit: "10mb" }));

/* ✅ Rate limiter */
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 120,
    validate: { xForwardedForHeader: false }, // ✅ Stops the 500 error
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