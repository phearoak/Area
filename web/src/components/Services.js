import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import global from "../global.js";
import Card from "./Card.js";

const Services = () => {
  const [oauthUrl, setOauthUrl] = useState("");
  const [allServices, setAllServices] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const responseServices = await axios.get(`${global.baseURL}/service`);
        setAllServices(responseServices.data);
      } catch (err) {
        console.log(err.response.data);
      }
    })();
  }, [allServices]);

  const handleCardClick = (serviceName) => {
    console.log("serviceName:", `${global.baseURL}/connector/${serviceName}`);
    (async () => {
      try {
        const response = await axios.get(
          `${global.baseURL}/connector/${serviceName}`,
          {
            withCredentials: true,
          }
        );
        setOauthUrl(response.data);
        console.log("oauth url response:", response.data);
        void oauthUrl;
        window.open(response.data, "_blank");
      } catch (err) {
        console.log("oauth url error:", err);
      }
    })();
  };

  return (
    <div>
      <div className="ag-format-container">
        <div className="ag-courses_box">
          {allServices.map((service) => (
            <Card
              key={service.id}
              name={service.name}
              description=""
              color={service.color}
              serviceName=""
              serviceId={service.id}
              onCardChange={handleCardClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
