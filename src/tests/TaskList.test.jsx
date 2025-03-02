import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TaskList from "../components/TaskList";

describe("TaskList Component", () => {
  const mockTasks = [
    { _id: "1", text: "Task 1", priority: "High", completed: false },
    { _id: "2", text: "Task 2", priority: "Low", completed: true },
  ];

  test("renders task list with multiple tasks", () => {
    render(<TaskList tasks={mockTasks} />);

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
  });
});
