import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Action from "../components/Actions";

import { MemoryRouter } from "react-router-dom";

describe("MyComponent", () => {
  test("renders correctly and check actions", () => {
    render(
      <MemoryRouter>
        <Action />
      </MemoryRouter>
    );
    const actionCard = screen.getByTestId("cardActionJest");
    expect(actionCard).toBeInTheDocument();
  });
});
