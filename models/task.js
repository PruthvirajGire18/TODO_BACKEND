const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
   user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // 👈 User model ka reference
    required: true,
  },
});

module.exports = mongoose.model("Task", TaskSchema);
