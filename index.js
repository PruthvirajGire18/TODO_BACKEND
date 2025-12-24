const express=require("express");
const app=express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth.js");
const taskRoute = require("./routes/task.js")
const connectDB = require("./config/db.js");
const cors=require("cors")


dotenv.config();
connectDB();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://taskify18.netlify.app", // ⚠️ frontend ka exact URL likh
    credentials: true, // ✅ cookies allow karne ke liye
  })
);
app.use("/api/auth", authRoutes);
app.use("/api/task",taskRoute); 

app.get("/",(req,res)=>{
    res.send("backend is running");
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));