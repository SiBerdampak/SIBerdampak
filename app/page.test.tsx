// app/page.test.tsx
import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home Page", () => {
  it("renders main heading", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { name: /only by helping each other/i }),
    ).toBeInTheDocument();
  });

  //   Testing
  it("renders donation card", () => {
    render(<Home />);
    // Gunakan getByRole + regex untuk teks panjang
    expect(
      screen.getByRole("heading", {
        name: /help children get out of poverty/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Go Donation" }),
    ).toBeInTheDocument();
  });
});
