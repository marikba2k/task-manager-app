const TaskFilters = ({
  filter,
  setFilter,
  priorityFilter,
  setPriorityFilter,
}) => {
  return (
    <div>
      <button onClick={() => setFilter("all")}>All</button>
      <button onClick={() => setFilter("completed")}>Completed</button>
      <button onClick={() => setFilter("incomplete")}>Incomplete</button>
      <select onChange={(e) => setPriorityFilter(e.target.value)}>
        <option value="all">All Priorities</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
    </div>
  );
};

export default TaskFilters;
