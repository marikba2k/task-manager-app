const express = require("express");
const Task = require("../models/Task");

const router = express.Router();

// Get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

// Add a new task
router.post("/", async (req, res) => {
  try {
    const { text, priority } = req.body;
    const newTask = new Task({ text, priority });
    await newTask.save();
    res.json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Failed to create task" });
  }
});

// Update a task
router.put("/:id", async (req, res) => {
  try {
    const { text, priority, completed } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { text, priority, completed },
      { new: true }
    );
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Failed to update task" });
  }
});

// Delete a task
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete task" });
  }
});

module.exports = router;
