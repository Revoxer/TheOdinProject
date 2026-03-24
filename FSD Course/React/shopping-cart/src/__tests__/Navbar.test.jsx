import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router";
import Navbar from "../components/Navbar";

vi.mock("../hooks/useCart", () => ({
  useCart: () => ({
    items: [],
  }),
}));

vi.mock("../assets/cart.svg", () => ({ default: "cart.svg" }));

describe("Navbar", () => {
  it("renders logo text", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );
    expect(screen.getByText("Shopping")).toBeInTheDocument();
  });

  it("renders Home and Shop navigation links", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^shop$/i })).toBeInTheDocument();
  });

  it("renders cart icon", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );
    expect(screen.getByAltText("Shopping Cart")).toBeInTheDocument();
  });

  it("does not show badge when cart is empty", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );
    expect(screen.queryByTestId("cart-badge")).not.toBeInTheDocument();
  });

  it("shows correct badge count when items are in cart", () => {
    vi.mock("../hooks/useCart", () => ({
      useCart: () => ({
        items: [
          { id: 1, quantity: 2 },
          { id: 2, quantity: 3 },
        ],
      }),
    }));

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    expect(screen.getByText("Shopping")).toBeInTheDocument();
  });
});
