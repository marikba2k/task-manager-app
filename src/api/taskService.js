const API_URL = "http://localhost:5000/api/tasks";

export const fetchTasks = async () => {
  const response = await fetch(API_URL);
  return await response.json();
};

export const addTaskApi = async (task) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  return await response.json();
};

export const updateTaskApi = async (id, updatedTask, checked) => {
  console.log("updating", updatedTask);

  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedTask),
  });

  if (!response.ok) {
    throw new Error("Failed to update task");
  }
  return await response.json();
};

export const deleteTask = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};

export const clearAllTasksAPI = async () => {
  const response = await fetch(`${API_URL}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete all tasks");
  }
};
