import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Card from "./Card";
import global from "../global.js";
import "./Card.css";

const Actions = () => {
  const navigate = useNavigate();

  const [actions, setActions] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const actions = await axios.get(`${global.baseURL}/action/`, {
          withCredentials: true,
        });
        setActions(actions.data);
        console.log(actions.data);
      } catch (err) {
        console.log(err.response.data);
      }
    })();
  }, []);

  const handleCard = (newActionServiceId, newActionId) => {
    navigate("/reactions", {
      state: { actionServiceId: newActionServiceId, actionID: newActionId },
    });
  };

  return (
    <div>
      <h1 className="titleArea">Actions</h1>
      <div className="ag-format-container">
        <div className="ag-courses_box" data-testid="cardActionJest">
          {actions.map((action) => (
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Actions;
