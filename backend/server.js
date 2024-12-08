const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const announcementRoutes = require("./routes/announcementRoutes");
const postRoutes = require("./routes/postRoutes");
const userSegmentRoutes = require("./routes/userSegmentRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");


dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
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
app.use("/api/users", userRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/user-segments", userSegmentRoutes);
app.use("/api/analytics", analyticsRoutes);

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
