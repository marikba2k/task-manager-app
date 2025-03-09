import styles from "../styles/TaskActions.module.css";

const TaskFilters = ({
  filter,
  setFilter,
  priorityFilter,
  setPriorityFilter,
}) => {
  return (
    <div className={styles.filters}>
      <button className={styles.filterButton} onClick={() => setFilter("all")}>
        All
      </button>
      <button
        className={styles.filterButton}
        onClick={() => setFilter("completed")}
      >
        Completed
      </button>
      <button
        className={styles.filterButton}
        onClick={() => setFilter("incomplete")}
      >
        Incomplete
      </button>
      <select
        className={styles.prioritySelect}
        onChange={(e) => setPriorityFilter(e.target.value)}
      >
        <option value="all">All Priorities</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
    </div>
  );
};

export default TaskFilters;
