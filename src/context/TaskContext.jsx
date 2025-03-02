import React, { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import {
  fetchTasks,
  addTaskApi,
  updateTaskApi,
  deleteTask,
  clearAllTasksAPI,
} from "../api/taskService";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  //   () => {
  //   // Load tasks from Local Storage on initial render
  //   const savedTasks = localStorage.getItem("tasks");
  //   return savedTasks ? JSON.parse(savedTasks) : [];
  // });

  // Save tasks to Local Storage whenever they change
  useEffect(() => {
    const loadTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };

    loadTasks();
  }, []);

  const addTask = async (taskText, priority) => {
    const newTask = { text: taskText, priority, completed: false };
    const savedTask = await addTaskApi(newTask);
    setTasks((prevTasks) => [...prevTasks, savedTask]);
  };

  const removeTask = async (taskId) => {
    await deleteTask(taskId);
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
  };

  const updateTask = async (taskId, updatedTask) => {
    const updated = await updateTaskApi(taskId, updatedTask);
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task._id === taskId ? updated : task))
    );
  };

  const clearAllTasks = async () => {
    try {
      await clearAllTasksAPI(); // Call the backend to delete all tasks
      setTasks([]); // Clear tasks from the frontend state
    } catch (error) {
      console.error("Error clearing all tasks:", error);
    }
  };

  const toggleTaskCompleted = (taskId) => {
    setTasks(
      tasks.map((task, index) =>
        task._id === taskId
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
