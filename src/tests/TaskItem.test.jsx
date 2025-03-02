import { render, screen, fireEvent } from "@testing-library/react";
import TaskItem from "../components/TaskItem";
import "@testing-library/jest-dom";

describe("TaskItem Component", () => {
  const mockTask = {
    _id: "1",
    text: "Test Task",
    priority: "Medium",
    completed: false,
  };

  const mockOnEdit = vi.fn();
  const mockOnDelete = vi.fn();
  const mockOnToggle = vi.fn();
  const mockOnSave = vi.fn();
  const mockOnCancel = vi.fn();

  test("renders task item correctly", () => {
    render(
      <TaskItem
        task={mockTask}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggle={mockOnToggle}
        isEditing={false}
      />
    );

    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(screen.getByText("Medium")).toBeInTheDocument();
  });

  test("calls onEdit when edit button is clicked", () => {
    render(
      <TaskItem
        task={mockTask}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggle={mockOnToggle}
        isEditing={false}
      />
    );

    fireEvent.click(screen.getByText("Edit"));
    expect(mockOnEdit).toHaveBeenCalled();
  });

  test("calls onDelete when remove button is clicked", () => {
    render(
      <TaskItem
        task={mockTask}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggle={mockOnToggle}
        isEditing={false}
      />
    );

    fireEvent.click(screen.getByText("Remove"));
    expect(mockOnDelete).toHaveBeenCalled();
  });

  test("calls onToggle when checkbox is clicked", () => {
    render(
      <TaskItem
        task={mockTask}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggle={mockOnToggle}
        isEditing={false}
      />
    );

    fireEvent.click(screen.getByRole("checkbox"));
    expect(mockOnToggle).toHaveBeenCalled();
  });

  test("toggles to edit mode and saves changes", () => {
    render(
      <TaskItem
        task={mockTask}
        isEditing={true}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    );

    const input = screen.getByDisplayValue("Test Task");
    fireEvent.change(input, { target: { value: "Updated Task" } });

    fireEvent.click(screen.getByText("Save"));
    expect(mockOnSave).toHaveBeenCalledWith(
      "1",
      expect.objectContaining({ text: "Updated Task" })
    );
  });
});
