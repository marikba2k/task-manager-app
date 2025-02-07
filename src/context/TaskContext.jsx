import React, { useEffect, useState } from "react";
import { createContext, useContext } from "react";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    // Load tasks from Local Storage on initial render
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // Save tasks to Local Storage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskText, priority) => {
    const newTask = { text: taskText, completed: false, priority };
    setTasks([...tasks, newTask]);
  };

  const removeTask = (taskIndex) => {
    setTasks(tasks.filter((_, index) => index !== taskIndex));
  };

  const updateTask = (taskIndex, newText, newPriority) => {
    setTasks(
      tasks.map((task, i) =>
        taskIndex === i
          ? { ...task, text: newText, priority: newPriority }
          : task
      )
    );
  };

  const clearAllTasks = () => {
    setTasks([]); // Reset tasks to an empty array
  };

  const toggleTaskCompleted = (taskIndex) => {
    setTasks(
      tasks.map((task, index) =>
        index === taskIndex
          ? { ...task, completed: !task.completed } // Toggle completed
          : task
      )
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        removeTask,
        updateTask,
        toggleTaskCompleted,
        clearAllTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  return useContext(TaskContext);
};

export default TaskContext;
