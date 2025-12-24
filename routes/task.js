const express = require("express");
const Task = require("../models/task.js"); // ✅ Capitalize model name
const User=require("../models/user.js")
const router = express.Router();

// ADD a new task
router.post("/add-task", async (req, res) => {
  try {
    const { task,userId } = req.body; // ✅ get "task" text from frontend
    const newTask = new Task({ task,id:userId }); // ✅ use model "Task"
    await newTask.save();
    res.status(201).json({ message: "✅ Task added successfully" });
  } catch (error) {
    res.status(500).json({ message: "❌ Server error", error });
  }
});

// GET all tasks
router.get("/get-tasks/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const tasks = await Task.find({user:userId}); // ✅ use correct model name
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE a task by ID
router.delete("/del-task/:id", async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({ message: "❌ Task not found" });
    }

    res.json({ message: "✅ Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE a task's completed status
router.put("/update-task/:id", async (req, res) => {
  try {
    const { completed } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { completed },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "❌ Task not found" });
    }

    res.json({ message: "✅ Task updated successfully", task: updatedTask });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
