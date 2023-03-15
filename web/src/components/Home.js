import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import "./Home.css";
import global from "../global.js";
import Card from "./Card";

const Home = ({ children }) => {
  const [applets, setApplets] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${global.baseURL}/workflow`, {
          withCredentials: true,
        });
        setApplets(response.data);
      } catch (err) {
        console.log(err.response.data);
      }
    })();
  }, []);

  return (
    <div>
      <div className="ag-format-container">
        <div className="ag-courses_box">
          {applets.length > 0 &&
            applets.map((applet) => (
              <Card
                data-testid="cardJest"
                key={applet.id}
                name={applet.action_args}
                description={applet.workflow_reactions[0].args}
                color="black"
                serviceName=""
                serviceId={applet.id}
                type="applets"
              />
            ))}
        </div>
      </div>
      {applets.length === 0 && (
        <div className="container">
          <h2 data-testid="noAppJest">You have no applets yet</h2>
        </div>
      )}
    </div>
  );
};

export default Home;
