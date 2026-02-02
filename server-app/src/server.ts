import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/dbConfig";
import shortUrl from "./routes/shortUrl";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: process.env.FRONTEND_URL || "*", 
  credentials: true,
}));

// Render provides the PORT variable; we use 5001 only for local fallback
const PORT = process.env.PORT || 5001;

app.get("/health", (req, res) => {
  res.status(200).send("Server is healthy");
});

app.use("/api/", shortUrl);

async function startServer() {
  try {
    await connectDB();
    // FIX: Add "0.0.0.0" to tell the server to listen on all network interfaces
    // Also, ensure PORT is treated as a number
    app.listen(Number(PORT), "0.0.0.0", () => {
      console.log(`Server started successfully on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();