import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "../components/Login";

import { MemoryRouter } from "react-router-dom";

describe("MyComponent", () => {
  test("renders correctly and print login", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    const loginComponent = screen.getByTestId("buttonJest");
    expect(loginComponent).toBeInTheDocument();
    loginComponent.click();

    const usrInput = screen.getByTestId("usrJest");
    expect(usrInput).toBeInTheDocument();

    const emailInput = screen.getByTestId("emailJest");
    expect(emailInput).toBeInTheDocument();

    const pswdInput = screen.getByTestId("pswdJest");
    expect(pswdInput).toBeInTheDocument();

    const loginText = screen.getByTestId("LoginJest");
    expect(loginText).toBeInTheDocument();

  });
});
