import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Routes & DB
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";
import friendRoutes from "./routes/friend.route.js";
import { connectDB } from "./lib/db.js";

// Setup __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to DB
connectDB();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/friends", friendRoutes);

// ✅ Serve Frontend in Production
if (process.env.NODE_ENV === "production") {
  const staticPath = path.resolve(__dirname, "../../frontend/dist"); // ✅ relative to backend/src/
  app.use(express.static(staticPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("🚀 API is running");
  });
}

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});



