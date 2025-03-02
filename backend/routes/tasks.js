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
  console.log("Request Params:", req.params);
  console.log("Request Body:", req.body);
  try {
    const { id } = req.params;
    const { text, priority, completed } = req.body;
    if (!text || !priority || typeof completed === "undefined") {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { text, priority, completed },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
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

// Delete all tasks
router.delete("/", async (req, res) => {
  console.log("DELETE /api/tasks route hit");
  try {
    await Task.deleteMany(); // Deletes all tasks
    res.json({ message: "All tasks deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete all tasks" });
  }
});

module.exports = router;
