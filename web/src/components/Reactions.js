import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import global from "../global.js";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";

const Reaction = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { actionServiceId, actionID } = location.state;

  const [Reaction, setReaction] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const Reaction = await axios.get(`${global.baseURL}/reaction/`, {
          withCredentials: true,
        });
        setReaction(Reaction.data);
        console.log(Reaction.data);
      } catch (err) {
        console.log(err.response.data);
      }
    })();
  }, []);

  const handleCard = (newReactionServiceId, newRectionId) => {
    navigate("/LoginOauth", {
      state: {
        actionServiceId: actionServiceId,
        actionID: actionID,
        reactionServiceId: newReactionServiceId,
        reactionID: newRectionId
      },
    });
  };

  return (
    <div>
      <h1 className="titleArea">Reactions</h1>
      <div className="ag-format-container">
        <div className="ag-courses_box" data-testid="cardReactionJest">
          {Reaction.map((reaction) => (
            <Card
              key={reaction.id}
              name={reaction.name}
              color={reaction.service.color}
              serviceId={reaction.service.id}
              id={reaction.id}
              description={reaction.description}
              serviceName={reaction.service_name}
              onCardChange={handleCard}
              type="reactions"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reaction;
