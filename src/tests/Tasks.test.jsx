import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Tasks from "../pages/Tasks";
import { useTasks } from "../context/TaskContext";
import "@testing-library/jest-dom";

// ✅ Ensure mocking is at the top level, before imports are used
vi.mock("../context/TaskContext", () => ({
  useTasks: vi.fn(),
}));

describe("Tasks Component", () => {
  let mockAddTask,
    mockRemoveTask,
    mockUpdateTask,
    mockToggleTaskCompleted,
    mockClearAllTasks;

  beforeEach(() => {
    // ✅ Define named mock functions for better readability
    mockAddTask = vi.fn();
    mockRemoveTask = vi.fn();
    mockUpdateTask = vi.fn();
    mockToggleTaskCompleted = vi.fn();
    mockClearAllTasks = vi.fn();

    // ✅ Provide a new mock return value before each test to ensure test isolation
    useTasks.mockReturnValue({
      tasks: [
        { _id: "1", text: "Learn Vitest", completed: false, priority: "High" },
      ],
      addTask: mockAddTask,
      removeTask: mockRemoveTask,
      updateTask: mockUpdateTask,
      toggleTaskCompleted: mockToggleTaskCompleted,
      clearAllTasks: mockClearAllTasks,
    });
  });

  it("renders the task list", () => {
    render(<Tasks />);
    expect(screen.getByText(/Learn Vitest/i)).toBeInTheDocument();
  });

  it("adds a new task when clicking Add Task", () => {
    render(<Tasks />);

    const input = screen.getByPlaceholderText("Enter a task...");
    const addButton = screen.getByText("Add Task");

    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(addButton);

    expect(mockAddTask).toHaveBeenCalledWith("New Task", "Medium");
  });

  it("toggles task completion when checkbox is clicked", () => {
    const mockUpdateTask = vi.fn(); // ✅ Mock updateTask instead

    useTasks.mockReturnValue({
      tasks: [
        { _id: "1", text: "Test Task", completed: false, priority: "Low" },
      ],
      addTask: vi.fn(),
      removeTask: vi.fn(),
      updateTask: mockUpdateTask, // ✅ Mock this function instead
      toggleTaskCompleted: vi.fn(), // No need to check this
      clearAllTasks: vi.fn(),
    });

    render(<Tasks />);

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    // ✅ Check updateTask() instead of toggleTaskCompleted()
    expect(mockUpdateTask).toHaveBeenCalledWith("1", {
      text: "Test Task",
      priority: "Low",
      completed: true, // ✅ Should toggle to true
    });
  });
});
