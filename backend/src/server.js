import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";
import friendRoutes from "./routes/friend.route.js";
import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// Connect to DB
connectDB();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // frontend dev server
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/friends", friendRoutes);

// ✅ Serve frontend in production
if (process.env.NODE_ENV === "production") {
  const staticPath = path.join(__dirname, "../frontend/dist");
  app.use(express.static(staticPath));

  console.log("NODE_ENV:", process.env.NODE_ENV);
  console.log("Serving static from:", staticPath);

  // Catch-all to serve React app
  app.get("*", (req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });
} else {
  // Dev mode root route test
  app.get("/", (req, res) => {
    res.send("🚀 API is running");
  });
}

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});

