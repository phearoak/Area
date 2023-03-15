import React from "react";
import "./Card.css";

const Card = (props) => {
  const handleCardClick = () => {
    if (props.type === "actions") {
      props.onCardChange(props.serviceId, props.id);
    } else if (props.type === "reactions") {
      props.onCardChange(props.serviceId, props.id);
    } else {
      props.onCardChange(props.name);
    }
  };

  return (
    <>
      <div className="ag-courses_item" data-testid="buttonCardJest" onClick={handleCardClick}>
        <a href="" className="ag-courses-item_link">
          <div
            className="ag-courses-item_bg"
            style={{ backgroundColor: props.color }}
          ></div>

          <div className="ag-courses-item_title" data-testid="cardTitleJest">
            {props.name.replace(/_/g, " ").charAt(0).toUpperCase() +
              props.name.replace(/_/g, " ").slice(1)}
          </div>
          <div className="ag-courses-item_description" data-testid="cardDescriptionJest">
            {props.description.charAt(0).toUpperCase() +
              props.description.slice(1)}
          </div>

          <div className="ag-courses-item_service-box" data-testid="cardServiceJest">
            {props.serviceName.toUpperCase()}
          </div>
        </a>
      </div>
    </>
  );
};

export default Card;
