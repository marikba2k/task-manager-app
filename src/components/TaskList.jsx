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
    <ul>
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
