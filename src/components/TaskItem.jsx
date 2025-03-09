import styles from "../styles/TaskItem.module.css";
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
    <li
      className={`${styles.taskItem} ${task.completed ? styles.completed : ""}`}
    >
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
          <span className={styles.taskText}>{task.text}</span>
          <span
            className={`${styles.priority} ${
              task.priority === "High"
                ? styles.priorityHigh
                : task.priority === "Medium"
                ? styles.priorityMedium
                : styles.priorityLow
            }`}
          >
            {task.priority}
          </span>
          <button
            onClick={() => onEdit(task._id)}
            className={styles.editButton}
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className={styles.deleteButton}
          >
            Remove
          </button>
        </>
      )}
    </li>
  );
};

export default TaskItem;
