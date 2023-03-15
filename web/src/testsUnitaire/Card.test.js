import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Card from "../components/Card";

import { MemoryRouter } from "react-router-dom";

describe("MyComponent", () => {
  test("renders correctly and check actions", () => {
    const action = {
      id: 1,
      name: "test",
      description: "test",
      service: {
        id: 1,
        color: "#000000",
      },
      service_name: "test",
    };

    const handleCard = (newActionServiceId, newActionId) => {
        console.log("test");
    };

    render(
      <MemoryRouter>
        <Card
          key={action.id}
          name={action.name}
          color={action.service.color}
          serviceId={action.service.id}
          id={action.id}
          description={action.description}
          serviceName={action.service_name}
          onCardChange={handleCard}
          type="actions"
        />
      </MemoryRouter>
    );
    const titleCard = screen.getByTestId("cardTitleJest");
    expect(titleCard).toBeInTheDocument();

    const cardDescription = screen.getByTestId("cardDescriptionJest");
    expect(cardDescription).toBeInTheDocument();

    const cardService = screen.getByTestId("cardServiceJest");
    expect(cardService).toBeInTheDocument();

    const cardButton = screen.getByTestId("buttonCardJest");
    expect(cardButton).toBeInTheDocument();
    cardButton.click();
  });
});



describe("MyComponent", () => {
  test("renders correctly and check actions", () => {
    const action = {
      id: 1,
      name: "test",
      description: "test",
      service: {
        id: 1,
        color: "#000000",
      },
      service_name: "test",
    };

    const handleCard = (newActionServiceId, newActionId) => {
        console.log("test");
    };

    render(
      <MemoryRouter>
        <Card
          key={action.id}
          name={action.name}
          color={action.service.color}
          serviceId={action.service.id}
          id={action.id}
          description={action.description}
          serviceName={action.service_name}
          onCardChange={handleCard}
          type="reactions"
        />
      </MemoryRouter>
    );
    const titleCard = screen.getByTestId("cardTitleJest");
    expect(titleCard).toBeInTheDocument();

    const cardDescription = screen.getByTestId("cardDescriptionJest");
    expect(cardDescription).toBeInTheDocument();

    const cardService = screen.getByTestId("cardServiceJest");
    expect(cardService).toBeInTheDocument();

    const cardButton = screen.getByTestId("buttonCardJest");
    expect(cardButton).toBeInTheDocument();
    cardButton.click();
  });
});

describe("MyComponent", () => {
  test("renders correctly and check actions", () => {
    const action = {
      id: 1,
      name: "test_test",
      description: "test",
      service: {
        id: 1,
        color: "#000000",
      },
      service_name: "test",
    };

    const handleCard = (newActionServiceId, newActionId) => {
        console.log("test");
    };

    render(
      <MemoryRouter>
        <Card
          key={action.id}
          name={action.name}
          color={action.service.color}
          serviceId={action.service.id}
          id={action.id}
          description={action.description}
          serviceName={action.service_name}
          onCardChange={handleCard}
          type="other"
        />
      </MemoryRouter>
    );
    const titleCard = screen.getByTestId("cardTitleJest");
    expect(titleCard).toBeInTheDocument();

    const cardDescription = screen.getByTestId("cardDescriptionJest");
    expect(cardDescription).toBeInTheDocument();

    const cardService = screen.getByTestId("cardServiceJest");
    expect(cardService).toBeInTheDocument();

    const cardButton = screen.getByTestId("buttonCardJest");
    expect(cardButton).toBeInTheDocument();
    cardButton.click();

  });
});
