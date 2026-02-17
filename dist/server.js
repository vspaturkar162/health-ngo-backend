// "use strict";
// var __importDefault = (this && this.__importDefault) || function (mod) {
//     return (mod && mod.__esModule) ? mod : { "default": mod };
// };
// Object.defineProperty(exports, "__esModule", { value: true });
// const express_1 = __importDefault(require("express"));
// const mongoose_1 = __importDefault(require("mongoose"));
// const dotenv_1 = __importDefault(require("dotenv"));
// const helmet_1 = __importDefault(require("helmet"));
// const cors_1 = __importDefault(require("cors"));
// const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
// /* ✅ Load env FIRST */
// dotenv_1.default.config();
// /* ✅ Import routes */
// const auth_1 = __importDefault(require("./routes/auth"));
// const blogs_1 = __importDefault(require("./routes/blogs"));
// const events_1 = __importDefault(require("./routes/events"));
// const volunteer_1 = __importDefault(require("./routes/volunteer"));
// const resources_temp_1 = __importDefault(require("./routes/resources_temp"));
// const adminAuth_1 = __importDefault(require("./routes/adminAuth"));
// const app = (0, express_1.default)();
// /* ✅ Security headers */
// app.use((0, helmet_1.default)());
// /* ✅ CORS (FIXED) */
// const allowedOrigins = [
//     "http://localhost:3000",
//     "http://192.168.43.28:3000",
//     "https://health-ngo-frontend.vercel.app",
// ];
// // app.use(
// //   cors({
// //     origin: function (origin, callback) {
// //       if (!origin) return callback(null, true);
// //       if (allowedOrigins.includes(origin)) return callback(null, true);
// //       return callback(new Error("Not allowed by CORS"));
// //     },
// //     credentials: true,
// //     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
// //     allowedHeaders: ["Content-Type", "Authorization"],
// //   })
// // );
// app.use((0, cors_1.default)({
//     origin: [
//         "http://localhost:3000",
//         "http://192.168.43.28:3000",
//         "https://health-ngo-frontend.vercel.app",
//         "https://health-ngo-frontend-fw27lh4ex-vaishnavi-paturkars-projects.vercel.app" // ✅ THIS is the one in your error logs
//     ],
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true
// }));
// /* ✅ Body parser */
// app.use(express_1.default.json({ limit: "10mb" }));
// /* ✅ Rate limiter */
// app.use((0, express_rate_limit_1.default)({
//     windowMs: 60 * 1000,
//     max: 120,
// }));
// /* ✅ API routes */
// app.use("/api/auth", auth_1.default);
// app.use("/api/blogs", blogs_1.default);
// app.use("/api/events", events_1.default);
// app.use("/api/volunteers", volunteer_1.default);
// app.use("/api/resources", resources_temp_1.default);
// app.use("/api/admin", adminAuth_1.default);
// /* ✅ Health check */
// app.get("/api/health", (_req, res) => {
//     res.json({ ok: true });
// });
// /* ✅ Database + Server start */
// const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/Health_NGO";
// const PORT = process.env.PORT || 4000;
// mongoose_1.default
//     .connect(MONGO_URI)
//     .then(() => {
//     console.log("✅ MongoDB connected");
//     app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
// })
//     .catch((err) => {
//     console.error("❌ MongoDB connection error:", err);
//     process.exit(1);
// });
// //# sourceMappingURL=server.js.map

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));

dotenv_1.default.config();

const auth_1 = __importDefault(require("./routes/auth"));
const blogs_1 = __importDefault(require("./routes/blogs"));
const events_1 = __importDefault(require("./routes/events"));
const volunteer_1 = __importDefault(require("./routes/volunteer"));
const resources_temp_1 = __importDefault(require("./routes/resources_temp"));
const adminAuth_1 = __importDefault(require("./routes/adminAuth"));

const app = (0, express_1.default)();

/* ✅ FIX 1: Trust Render proxy */
app.set("trust proxy", 1);

app.use((0, helmet_1.default)());

/* ✅ FIX 2: CORS - allow ALL vercel preview URLs */
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        const allowed =
            origin === "http://localhost:3000" ||
            origin === "http://192.168.43.28:3000" ||
            origin === "https://health-ngo-frontend.vercel.app" ||
            /^https:\/\/health-ngo-frontend-.*\.vercel\.app$/.test(origin) ||
            /^https:\/\/health-ngo-frontend.*\.vercel\.app$/.test(origin);
        if (allowed) {
            callback(null, true);
        } else {
            console.log("❌ CORS blocked origin:", origin);
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));

app.use(express_1.default.json({ limit: "10mb" }));

/* ✅ FIX 3: Rate limiter - fixed for Render */
app.use((0, express_rate_limit_1.default)({
    windowMs: 60 * 1000,
    max: 120,
    validate: { xForwardedForHeader: false },
}));

app.use("/api/auth", auth_1.default);
app.use("/api/blogs", blogs_1.default);
app.use("/api/events", events_1.default);
app.use("/api/volunteers", volunteer_1.default);
app.use("/api/resources", resources_temp_1.default);
app.use("/api/admin", adminAuth_1.default);

app.get("/api/health", (_req, res) => {
    res.json({ ok: true });
});

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/Health_NGO";
const PORT = process.env.PORT || 4000;

mongoose_1.default
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