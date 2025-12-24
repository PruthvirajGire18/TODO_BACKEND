const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // MONGO_URI from .env file
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MngoDB Connection Error:", error.message);
    process.exit(1); // Stop the server if DB fails
  }
};

module.exports = connectDB;
