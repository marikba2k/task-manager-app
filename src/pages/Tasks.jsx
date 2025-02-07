import React from "react";
import { useState } from "react";
import { useTasks } from "../context/TaskContext"; // Import Task Context

const Tasks = () => {
  const { tasks, addTask, removeTask, updateTask, toggleTaskCompleted } =
    useTasks();
  const [newTask, setNewTask] = useState();

  const [editingIndex, setEditingIndex] = useState(null); // Tracks the index of the task being edited
  const [editText, setEditText] = useState(""); // Tracks the updated task text

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      addTask(newTask);
      setNewTask("");
    }
  };

  const enableEdit = (index, currentText) => {
    setEditingIndex(index);
    setEditText(currentText);
  };

  const saveEdit = (index) => {
    if (editText.trim() !== "") {
      const updatedTasks = tasks.map((task, i) =>
        i === index ? { ...task, text: editText } : task
      );
      updateTask(index, editText); // Update state
      setEditingIndex(null); // Exit edit mode
      setEditText(""); // Clear edit input
    }
  };

  return (
    <div>
      <h1>Task List</h1>
      <input
        type="text"
        value={newTask || ""}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter a task..."
      />
      <button onClick={handleAddTask}>Add Task</button>

      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {editingIndex === index ? (
              // Edit mode
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
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
                <button onClick={() => enableEdit(index, task.text)}>
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
