import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Error from "../components/404";

import { MemoryRouter } from "react-router-dom";

describe("MyComponent", () => {
  test("renders correctly and print no applets", () => {
    render(
      <MemoryRouter>
        <Error />
      </MemoryRouter>
    );
    const erroText = screen.getByTestId("errorJest");
    expect(erroText).toBeInTheDocument();
  });
});
