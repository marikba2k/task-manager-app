import { render, screen, fireEvent } from "@testing-library/react";
import TaskForm from "../components/TaskForm";

describe("TaskForm Component", () => {
  const mockOnAdd = vi.fn();

  test("allows user to input task text and select priority", () => {
    render(<TaskForm onAdd={mockOnAdd} />);

    const input = screen.getByPlaceholderText("Enter a task...");
    const select = screen.getByRole("combobox");

    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.change(select, { target: { value: "High" } });

    expect(input.value).toBe("New Task");
    expect(select.value).toBe("High");
  });

  test("calls onAdd when 'Add Task' button is clicked", () => {
    render(<TaskForm onAdd={mockOnAdd} />);

    fireEvent.change(screen.getByPlaceholderText("Enter a task..."), {
      target: { value: "New Task" },
    });
    fireEvent.click(screen.getByText("Add Task"));

    expect(mockOnAdd).toHaveBeenCalledWith("New Task", "Medium");
  });
});
