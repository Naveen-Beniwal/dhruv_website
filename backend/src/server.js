import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import path from "path";

dotenv.config();
const app = express();

if (false) {
  app.use(
    cors({
      origin: "http://localhost:5173", // Allow requests from this origin
    })
  ); // Enable CORS for all routes
}

app.use(express.json()); // Middleware to parse JSON bodies
app.use(rateLimiter); // Apply rate limiting middleware

app.use("/api/notes", notesRoutes);

const mongoURI = process.env.MONGO_URI;
console.log("mongoURI : ");
console.log(mongoURI);

if (true) {
  app.use(express.static(path.join(path.resolve(), "../frontend/dist"))); // Serve static files from the frontend build directory
  app.get("*", (req, res) => {
    res.sendFile(path.join(path.resolve(), "../frontend/dist", "index.html"));
  });
}

connectDB().then(() => {
  app.listen(5000, () => {
    console.log("Server is running on port 5000");
  });
});
