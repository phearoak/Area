import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../components/Home";

import { MemoryRouter } from "react-router-dom";

describe("MyComponent", () => {
  test("renders correctly and print no applets", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    const noAppText = screen.getByTestId("noAppJest");
    expect(noAppText).toBeInTheDocument();
  });
});
