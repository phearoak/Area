import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Apk from "../components/Apk";

import { MemoryRouter } from "react-router-dom";

describe("MyComponent", () => {
  test("renders correctly and check actions", () => {
    render(
      <MemoryRouter>
        <Apk />
      </MemoryRouter>
    );
    const apkButton = screen.getByTestId("apkJest");
    expect(apkButton).toBeInTheDocument();
    apkButton.click();
  });
});
