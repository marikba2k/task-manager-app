import { render, screen, fireEvent } from "@testing-library/react";
import TaskActions from "../components/TaskActions";

describe("TaskActions Component", () => {
  const mockOnClear = vi.fn();

  test("calls onClear when 'Clear All' button is clicked", () => {
    render(<TaskActions onClear={mockOnClear} />);

    fireEvent.click(screen.getByText("Clear All"));
    expect(mockOnClear).toHaveBeenCalled();
  });
});
