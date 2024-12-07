const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");

dotenv.config();
const app = express();

// Middleware to parse incoming JSON data
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Alternatively, to allow only specific origins:
const corsOptions = {
  origin: 'http://localhost:3000', // Only allow the React frontend
};
app.use(cors(corsOptions));

// Connect to the database
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log("Database connection error:", err));

// Use auth routes
app.use("/api/auth", authRoutes);

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
