import styles from "../styles/TaskList.module.css";

import TaskItem from "./TaskItem";

const TaskList = ({
  tasks,
  editingTaskId,
  onEdit,
  onDelete,
  onToggle,
  onSave,
  onCancel,
}) => {
  return (
    <ul className={styles.taskList}>
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          isEditing={editingTaskId === task._id}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggle={() => onToggle(task)}
          onSave={onSave}
          onCancel={onCancel}
        />
      ))}
    </ul>
  );
};

export default TaskList;
