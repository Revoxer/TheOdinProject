import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import PlantCard from "../components/PlantCard";

const mockAddToCart = vi.fn();
const mockItems = [];

vi.mock("../hooks/useCart", () => ({
  useCart: () => ({
    addToCart: mockAddToCart,
    items: mockItems,
  }),
}));

const mockPlant = {
  id: 1,
  name: "Monstera Deliciosa",
  latin: "Monstera deliciosa",
  price: 49.99,
  category: "tropical",
  description: "A statement plant with iconic split leaves.",
  image: "https://example.com/monstera.jpg",
};

describe("PlantCard", () => {
  beforeEach(() => {
    mockAddToCart.mockClear();
  });

  it("renders plant name, latin name and category", () => {
    render(<PlantCard plant={mockPlant} />);

    expect(screen.getByText("Monstera Deliciosa")).toBeInTheDocument();
    expect(screen.getByText("Monstera deliciosa")).toBeInTheDocument();
    expect(screen.getByText("tropical")).toBeInTheDocument();
  });

  it("renders plant price correctly", () => {
    render(<PlantCard plant={mockPlant} />);
    expect(screen.getByText("$49.99")).toBeInTheDocument();
  });

  it("renders plant image with correct alt text", () => {
    render(<PlantCard plant={mockPlant} />);
    const img = screen.getByAltText("Monstera Deliciosa");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", mockPlant.image);
  });

  it("renders quantity input with default value of 1", () => {
    render(<PlantCard plant={mockPlant} />);
    const input = screen.getByLabelText("Quantity");
    expect(input).toHaveValue(1);
  });

  it("increments quantity when + button is clicked", () => {
    render(<PlantCard plant={mockPlant} />);
    const input = screen.getByLabelText("Quantity");
    const incrementBtn = screen.getByLabelText("Increase quantity");

    fireEvent.click(incrementBtn);
    expect(input).toHaveValue(2);

    fireEvent.click(incrementBtn);
    expect(input).toHaveValue(3);
  });

  it("decrements quantity when - button is clicked", () => {
    render(<PlantCard plant={mockPlant} />);
    const input = screen.getByLabelText("Quantity");
    const incrementBtn = screen.getByLabelText("Increase quantity");
    const decrementBtn = screen.getByLabelText("Decrease quantity");

    fireEvent.click(incrementBtn);
    fireEvent.click(incrementBtn);
    expect(input).toHaveValue(3);

    fireEvent.click(decrementBtn);
    expect(input).toHaveValue(2);
  });

  it("does not decrement quantity below 1", () => {
    render(<PlantCard plant={mockPlant} />);
    const input = screen.getByLabelText("Quantity");
    const decrementBtn = screen.getByLabelText("Decrease quantity");

    fireEvent.click(decrementBtn);
    fireEvent.click(decrementBtn);
    expect(input).toHaveValue(1);
  });

  it("allows manual quantity input", () => {
    render(<PlantCard plant={mockPlant} />);
    const input = screen.getByLabelText("Quantity");

    fireEvent.change(input, { target: { value: "5" } });
    expect(input).toHaveValue(5);
  });

  it("ignores invalid manual input", () => {
    render(<PlantCard plant={mockPlant} />);
    const input = screen.getByLabelText("Quantity");

    fireEvent.change(input, { target: { value: "abc" } });
    expect(input).toHaveValue(1);
  });

  it("calls addToCart correct number of times when qty is 3", () => {
    render(<PlantCard plant={mockPlant} />);
    const incrementBtn = screen.getByLabelText("Increase quantity");
    const addBtn = screen.getByRole("button", { name: /add to cart/i });

    fireEvent.click(incrementBtn);
    fireEvent.click(incrementBtn);
    fireEvent.click(addBtn);

    expect(mockAddToCart).toHaveBeenCalledTimes(3);
    expect(mockAddToCart).toHaveBeenCalledWith(mockPlant);
  });

  it("resets quantity to 1 after adding to cart", () => {
    render(<PlantCard plant={mockPlant} />);
    const input = screen.getByLabelText("Quantity");
    const incrementBtn = screen.getByLabelText("Increase quantity");
    const addBtn = screen.getByRole("button", { name: /add to cart/i });

    fireEvent.click(incrementBtn);
    fireEvent.click(incrementBtn);
    expect(input).toHaveValue(3);

    fireEvent.click(addBtn);
    expect(input).toHaveValue(1);
  });

  it("shows Add to Cart button when item is not in cart", () => {
    render(<PlantCard plant={mockPlant} />);
    expect(screen.getByText("Add to Cart")).toBeInTheDocument();
  });
});
