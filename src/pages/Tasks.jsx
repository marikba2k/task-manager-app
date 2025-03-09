import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import TaskList from "../components/TaskList";
import TaskForm from "../components//TaskForm";
import TaskFilters from "../components//TaskFilters";
import TaskActions from "../components//TaskActions";

const Tasks = () => {
  const {
    tasks,
    addTask,
    removeTask,
    updateTask,
    toggleTaskCompleted,
    clearAllTasks,
  } = useTasks();

  const [filter, setFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [editingTaskId, setEditingTaskId] = useState(null);

  const getFilteredTasks = () => {
    let filtered = tasks;
    if (filter === "completed")
      filtered = filtered.filter((task) => task.completed);
    else if (filter === "incomplete")
      filtered = filtered.filter((task) => !task.completed);

    if (priorityFilter !== "all")
      filtered = filtered.filter((task) => task.priority === priorityFilter);

    return filtered;
  };

  const filteredTasks = getFilteredTasks();

  const handleEdit = (task) => {
    setEditingTaskId(task);
  };

  const handleSaveEdit = (taskId, updatedTask) => {
    updateTask(taskId, updatedTask);
    setEditingTaskId(null); // Exit edit mode after saving
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
  };

  const handleCheckboxChange = (task) => {
    const updatedTask = {
      text: task.text,
      priority: task.priority,
      completed: !task.completed, // Toggle completed status
    };

    updateTask(task._id, updatedTask); // Call update function with new data
  };

  return (
    <div className="container">
      <h1>Task List</h1>
      <TaskFilters
        filter={filter}
        setFilter={setFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
      />
      <TaskForm onAdd={addTask} />
      <TaskActions onClear={clearAllTasks} />
      <TaskList
        tasks={filteredTasks}
        editingTaskId={editingTaskId}
        onEdit={handleEdit}
        onDelete={removeTask}
        onToggle={handleCheckboxChange}
        onSave={handleSaveEdit}
        onCancel={handleCancelEdit}
      />
    </div>
  );
};

export default Tasks;
