import { useState } from "react";

const TaskForm = ({ onAdd }) => {
  const [taskText, setTaskText] = useState("");
  const [priority, setPriority] = useState("Medium");

  const handleSubmit = () => {
    if (taskText.trim() !== "") {
      onAdd(taskText, priority);
      setTaskText("");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Enter a task..."
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <button onClick={handleSubmit}>Add Task</button>
    </div>
  );
};

export default TaskForm;
