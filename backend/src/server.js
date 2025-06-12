import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Required to use __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();
const app = express();

// Enable CORS (optional, depending on how you're testing)
app.use(
  cors({
    origin: "*", // Or set specific origin
  })
);

app.use(express.json()); // Middleware to parse JSON bodies
app.use(rateLimiter); // Apply rate limiting middleware
app.use("/api/notes", notesRoutes);

// Serve frontend static files
const frontendDistPath = join(__dirname, "../../frontend/dist");
app.use(express.static(frontendDistPath));

app.get("*", (req, res) => {
  res.sendFile(join(frontendDistPath, "index.html"));
});

// Start server after DB connection
connectDB().then(() => {
  app.listen(5000, () => {
    console.log("Server is running on port 5000");
  });
});
