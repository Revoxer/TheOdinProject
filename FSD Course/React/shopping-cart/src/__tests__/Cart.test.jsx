import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router";
import Cart from "../pages/Cart";

const mockUpdateQty = vi.fn();
const mockRemove = vi.fn();

const mockItemsEmpty = [];
const mockItemsFilled = [
  {
    id: 1,
    name: "Monstera Deliciosa",
    latin: "Monstera deliciosa",
    category: "tropical",
    price: 49.99,
    quantity: 2,
    image: "https://example.com/monstera.jpg",
  },
  {
    id: 2,
    name: "Peace Lily",
    latin: "Spathiphyllum wallisii",
    category: "flowering",
    price: 29.99,
    quantity: 1,
    image: "https://example.com/lily.jpg",
  },
];

let mockItems = mockItemsEmpty;

vi.mock("../hooks/useCart", () => ({
  useCart: () => ({
    items: mockItems,
    updateQty: mockUpdateQty,
    remove: mockRemove,
  }),
}));

describe("Cart — empty state", () => {
  beforeEach(() => {
    mockItems = mockItemsEmpty;
    mockUpdateQty.mockClear();
    mockRemove.mockClear();
  });

  it("shows empty cart message when cart is empty", () => {
    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>,
    );
    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
    expect(
      screen.getByText(/haven't added any plants yet/i),
    ).toBeInTheDocument();
  });

  it("shows Browse Plants link when cart is empty", () => {
    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>,
    );
    expect(
      screen.getByRole("link", { name: /browse plants/i }),
    ).toBeInTheDocument();
  });
});

describe("Cart — with items", () => {
  beforeEach(() => {
    mockItems = mockItemsFilled;
    mockUpdateQty.mockClear();
    mockRemove.mockClear();
  });

  it("renders cart title", () => {
    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>,
    );
    expect(screen.getByText("Your Cart")).toBeInTheDocument();
  });

  it("renders all items in cart", () => {
    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>,
    );
    expect(screen.getByText("Monstera Deliciosa")).toBeInTheDocument();
    expect(screen.getByText("Peace Lily")).toBeInTheDocument();
  });

  it("renders item quantities correctly", () => {
    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>,
    );
    const quantities = screen.getAllByText(/^[0-9]+$/);
    const values = quantities.map((el) => el.textContent);
    expect(values).toContain("2");
    expect(values).toContain("1");
  });

  it("renders correct subtotal", () => {
    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>,
    );

    const subtotalRow = screen.getByText("Subtotal").closest(".summary-row");
    expect(subtotalRow).toHaveTextContent("$129.97");
  });

  it("shows free shipping when subtotal > 80", () => {
    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>,
    );
    expect(screen.getByText("Free")).toBeInTheDocument();
  });

  it("calls updateQty with +1 when increment button clicked", () => {
    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>,
    );
    const incrementBtns = screen.getAllByText("+");
    fireEvent.click(incrementBtns[0]);
    expect(mockUpdateQty).toHaveBeenCalledWith(1, 1);
  });

  it("calls updateQty with -1 when decrement button clicked", () => {
    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>,
    );
    const decrementBtns = screen.getAllByText("−");
    fireEvent.click(decrementBtns[0]);
    expect(mockUpdateQty).toHaveBeenCalledWith(1, -1);
  });

  it("calls remove when ✕ button clicked", () => {
    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>,
    );
    const removeBtns = screen.getAllByLabelText("Remove item");
    fireEvent.click(removeBtns[0]);
    expect(mockRemove).toHaveBeenCalledWith(1);
  });

  it("renders item count in header", () => {
    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>,
    );
    expect(screen.getByText("2 items")).toBeInTheDocument();
  });

  it("renders checkout button", () => {
    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>,
    );
    expect(
      screen.getByRole("button", { name: /proceed to checkout/i }),
    ).toBeInTheDocument();
  });

  it("renders continue shopping link", () => {
    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>,
    );
    expect(
      screen.getByRole("link", { name: /continue shopping/i }),
    ).toBeInTheDocument();
  });
});
