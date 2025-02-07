import React from "react";
import { useState } from "react";
import { useTasks } from "../context/TaskContext"; // Import Task Context

const Tasks = () => {
  const { tasks, addTask, removeTask, toggleTaskCompleted } = useTasks();
  const [newTask, setNewTask] = useState();

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      addTask(newTask);
      setNewTask("");
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
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompleted(index)} // Toggle task status
            />
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.text}
            </span>
            <button onClick={() => removeTask(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
