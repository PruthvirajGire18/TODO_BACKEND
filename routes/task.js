const express = require("express");
const Task = require("../models/task");
const router = express.Router();

// ✅ ADD TASK
router.post("/add-task", async (req, res) => {
  try {
    const { task, userId } = req.body;

    if (!task || !userId) {
      return res.status(400).json({ message: "Task & userId required" });
    }

    const newTask = new Task({
      task,
      user: userId, // ✅ CORRECT FIELD
    });

    await newTask.save();
    res.status(201).json({ message: "Task added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ GET TASKS (USER SPECIFIC)
router.get("/get-tasks/:userId", async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.params.userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ DELETE TASK
router.delete("/del-task/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ UPDATE TASK
router.put("/update-task/:id", async (req, res) => {
  try {
    const { completed } = req.body;
    await Task.findByIdAndUpdate(req.params.id, { completed });
    res.json({ message: "Task updated" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
