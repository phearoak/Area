import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import DownloadApk from "../components/DownloadApk";

import { MemoryRouter } from "react-router-dom";

describe("MyComponent", () => {
  test("renders correctly and check actions", () => {
    render(
      <MemoryRouter>
        <DownloadApk />
      </MemoryRouter>
    );
    const apkButton = screen.getByTestId("textJest");
    expect(apkButton).toBeInTheDocument();
  });
});
