const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const taskRoutes = require("./routes/task");
const authRoutes = require("./routes/auth");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173", "https://taskify18.netlify.app"],
    credentials: true,
  })
);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/api/task", taskRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Backend running");
});

// 🔥 VERY IMPORTANT
module.exports = app;
