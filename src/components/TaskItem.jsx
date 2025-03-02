import { useState } from "react";

const TaskItem = ({
  task,
  isEditing,
  onEdit,
  onDelete,
  onToggle,
  onSave,
  onCancel,
}) => {
  const [editText, setEditText] = useState(task.text);
  const [editPriority, setEditPriority] = useState(task.priority);

  const handleSave = () => {
    onSave(task._id, {
      text: editText,
      priority: editPriority,
      completed: task.completed,
    });
  };

  return (
    <li>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <select
            value={editPriority}
            onChange={(e) => setEditPriority(e.target.value)}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <button onClick={handleSave}>Save</button>
          <button onClick={onCancel}>Cancel</button>
        </>
      ) : (
        <>
          <input type="checkbox" checked={task.completed} onChange={onToggle} />
          <span
            style={{ textDecoration: task.completed ? "line-through" : "none" }}
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
          <button onClick={() => onEdit(task._id)}>Edit</button>
          <button onClick={() => onDelete(task._id)}>Remove</button>
        </>
      )}
    </li>
  );
};

export default TaskItem;
