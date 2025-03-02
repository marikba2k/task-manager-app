import { render, screen, fireEvent } from "@testing-library/react";
import TaskFilters from "../components/TaskFilters";

describe("TaskFilters Component", () => {
  const mockSetFilter = vi.fn();
  const mockSetPriorityFilter = vi.fn();

  test("calls setFilter when filter buttons are clicked", () => {
    render(
      <TaskFilters
        setFilter={mockSetFilter}
        setPriorityFilter={mockSetPriorityFilter}
      />
    );

    fireEvent.click(screen.getByText("Completed"));
    expect(mockSetFilter).toHaveBeenCalledWith("completed");
  });

  test("calls setPriorityFilter when priority dropdown changes", () => {
    render(
      <TaskFilters
        setFilter={mockSetFilter}
        setPriorityFilter={mockSetPriorityFilter}
      />
    );

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "High" },
    });
    expect(mockSetPriorityFilter).toHaveBeenCalledWith("High");
  });
});
