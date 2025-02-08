import React from "react";
import { useState } from "react";
import { useTasks } from "../context/TaskContext"; // Import Task Context

const Tasks = () => {
  const {
    tasks,
    addTask,
    removeTask,
    updateTask,
    toggleTaskCompleted,
    clearAllTasks,
  } = useTasks();

  const [newTask, setNewTask] = useState();
  const [priority, setPriority] = useState("Medium"); // Default priority for new tasks

  const [editingIndex, setEditingIndex] = useState(null); // Tracks the index of the task being edited
  const [editText, setEditText] = useState(""); // Tracks the updated task text

  const [filter, setFilter] = useState("all"); // "all", "completed", or "incomplete"

  const [priorityFilter, setPriorityFilter] = useState("all"); // Add priority filter state
  const [editingPriority, setEditingPriority] = useState("Medium"); // Tracks the priority of the task being edited

  const getFilteredTasks = () => {
    let filtered = tasks;

    if (filter === "completed") {
      filtered = filtered.filter((task) => task.completed);
    } else if (filter === "incomplete") {
      filtered = filtered.filter((task) => !task.completed);
    }

    if (priorityFilter !== "all") {
      filtered = filtered.filter((task) => task.priority === priorityFilter);
    }
    return filtered; // Default: Show all tasks
  };

  const filteredTasks = getFilteredTasks();

  const getSortedTasks = () => {
    return [...tasks].sort((a, b) => {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  };

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      addTask(newTask, priority);
      setNewTask("");
    }
  };

  const enableEdit = (index, currentText, currentPriority) => {
    setEditingPriority(priority);
    setEditingIndex(index);
    setEditText(currentText);
  };

  const saveEdit = (index) => {
    if (editText.trim() !== "") {
      const updatedTasks = tasks.map((task, i) =>
        i === index
          ? { ...task, text: editText, priority: editingPriority }
          : task
      );
      updateTask(index, editText, editingPriority); // Update state
      setEditingIndex(null); // Exit edit mode
      setEditText(""); // Clear edit input
      setEditingPriority("Medium");
    }
  };

  return (
    <div>
      <h1>Task List</h1>
      <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("incomplete")}>Incomplete</button>
        <select onChange={(e) => setPriorityFilter(e.target.value)}>
          <option value="all">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button onClick={clearAllTasks}>Clear All</button>
      </div>

      <input
        type="text"
        value={newTask || ""}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter a task..."
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <button onClick={handleAddTask}>Add Task</button>

      <ul>
        {filteredTasks.map((task, index) => (
          <li key={index}>
            {editingIndex === index ? (
              // Edit mode
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <select
                  value={editingPriority}
                  onChange={(e) => setEditingPriority(e.target.value)}
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                <button onClick={() => saveEdit(index)}>Save</button>
                <button onClick={() => setEditingIndex(null)}>Cancel</button>
              </>
            ) : (
              // Display mode
              <>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompleted(index)}
                />
                <span
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                  }}
                >
                  {task.text}
                </span>
                <span
                  style={{
                    color:
                      task.priority === "High"
                        ? "red"
                        : task.priority === "Medium"
                        ? "orange"
                        : "green",
                  }}
                >
                  {task.priority}
                </span>
                <button
                  onClick={() => enableEdit(index, task.text, task.priority)}
                >
                  Edit
                </button>
                <button onClick={() => removeTask(index)}>Remove</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
