import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";

import authRoutes from "./routes/auth";
import blogRoutes from "./routes/blogs";
import eventRoutes from "./routes/events";
import volunteerRoutes from "./routes/volunteer";
import resourcesRoutes from "./routes/resources_temp";
import adminAuthRoutes from "./routes/adminAuth";
import aboutRoutes from "./routes/about";


const app = express();

/* ✅ Trust Render proxy */
app.set("trust proxy", 1);

/* ✅ Security headers */
app.use(helmet());

/* ✅ CORS — supports Local, Vercel & Netlify */
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow server-to-server, Postman, curl
      if (!origin) return callback(null, true);

      const allowed =
        origin === "http://localhost:3000" ||
        origin === "http://192.168.43.28:3000" ||

        // Vercel production
        origin === "https://health-ngo-frontend.vercel.app" ||

        // Vercel preview deployments
        /^https:\/\/health-ngo-frontend-.*\.vercel\.app$/.test(origin) ||

        // Netlify deployments (ALL)
        /^https:\/\/.*\.netlify\.app$/.test(origin);

      if (allowed) {
        return callback(null, true);
      }

      console.log("❌ CORS blocked origin:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

/* ✅ Body parser */
app.use(express.json({ limit: "10mb" }));

/* ✅ Rate limiter (Render-safe) */
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 120,
    validate: { xForwardedForHeader: false },
  })
);

/* ✅ Routes */
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/volunteers", volunteerRoutes);
app.use("/api/resources", resourcesRoutes);
app.use("/api/admin", adminAuthRoutes);
app.use("/api/about", aboutRoutes);
/* ✅ Health check */
app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

/* ✅ Mongo + Server */
const MONGO_URI = process.env.MONGO_URI as string;
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