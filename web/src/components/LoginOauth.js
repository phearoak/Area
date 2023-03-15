import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import global from "../global.js";
import axios from "axios";
import { useLocation } from "react-router";
import Card from "./Card.js";
import "./Card.css";

const LoginOauth = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [firstConnected, setFirstConnection] = useState(false);
    const [secondConnected, setSecondConnection] = useState(false);
    const [fistServices, setFistServices] = useState([]);
    const [secondServices, setSecondServices] = useState([]);
    const [nameService1, setNameService1] = useState("");
    const [nameService2, setNameService2] = useState("");
    const [nbServices, setNbServices] = useState(0);
    const [oauthUrl, setOauthUrl] = useState("");
    const { actionServiceId, actionID, reactionServiceId, reactionID } =
        location.state;

    const handleCard = (serviceName) => {
        console.log(
            "serviceName:",
            `${global.baseURL}/connector/${serviceName}`
        );
        (async () => {
            try {
                const response = await axios.get(
                    `${global.baseURL}/connector/${serviceName}`,
                    {
                        withCredentials: true,
                    }
                );
                console.log("oauth url response:", response.data);
                window.open(response.data);
                if (serviceName === nameService1) {
                    setFirstConnection(true);
                }
                if (serviceName === nameService2) {
                    setSecondConnection(true);
                }
            } catch (err) {
                console.log("oauth url error:", err);
            }
        })();
    };

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(
                    `${global.baseURL}/service/${actionServiceId}`,
                    {
                        withCredentials: true,
                    }
                );
                setFistServices(response.data);
                setNameService1(response.data.name);
                if (actionServiceId === reactionServiceId) {
                    setNameService2(response.data.name);
                }
                if (response.data.isConnected === true) {
                    setFirstConnection(true);
                } else {
                    setFirstConnection(false);
                }
            } catch (err) {
                console.log("is connected error:", err.response.data);
            }
        })();
    }, [actionServiceId, reactionServiceId]);

    useEffect(() => {
        if (actionServiceId !== reactionServiceId) {
            setNbServices(2);
            (async () => {
                try {
                    const response = await axios.get(
                        `${global.baseURL}/service/${reactionServiceId}`,
                        {
                            withCredentials: true,
                        }
                    );
                    setSecondServices(response.data);
                    setNameService2(response.data.name);
                    if (response.data.isConnected === true) {
                        setSecondConnection(true);
                    } else {
                        setSecondConnection(false);
                    }
                } catch (err) {
                    console.log("is connected error:", err.response.data);
                }
            })();
        } else {
            setNbServices(1);
        }
    }, [actionServiceId, reactionServiceId]);

    useEffect(() => {
        if (nbServices === 1 && firstConnected)
            navigate("/ServicesField", {
                state: {
                    actionServiceId: actionServiceId,
                    reactionServiceId: reactionServiceId,
                    actionName: nameService1,
                    reactionName: nameService2,
                    reactionId: reactionID,
                    actionId: actionID,
                },
            });
        else {
            if (firstConnected && secondConnected)
                navigate("/ServicesField", {
                    state: {
                        actionServiceId: actionServiceId,
                        reactionServiceId: reactionServiceId,
                        actionName: nameService1,
                        reactionName: nameService2,
                        reactionId: reactionID,
                        actionId: actionID,
                    },
                });
        }
    }, [
        firstConnected,
        secondConnected,
        navigate,
        actionServiceId,
        reactionServiceId,
        nbServices,
        nameService1,
        nameService2,
        reactionID,
        actionID,
    ]);

    return (
        <div>
            {nbServices === 1 && (
                <div>
                    {fistServices ? (
                        <div className="ag-format-container">
                            <div className="ag-courses_box">
                                <h1>Connect to :</h1>
                                <Card
                                    key={fistServices.created_at}
                                    name={nameService1}
                                    description=""
                                    color={fistServices.color}
                                    serviceName=""
                                    serviceId={fistServices.id}
                                    onCardChange={handleCard}
                                />
                            </div>
                        </div>
                    ) : (
                        <h1>Connected</h1>
                    )}
                </div>
            )}
            {nbServices === 2 && (
                <div>
                    <div className="ag-format-container">
                        {firstConnected === false ? (
                            <div className="ag-courses_box">
                                <h1>Connect to :</h1>
                                <Card
                                    key={fistServices.id}
                                    name={nameService1}
                                    description=""
                                    color={fistServices.color}
                                    serviceName=""
                                    serviceId={fistServices.id}
                                    onCardChange={handleCard}
                                />
                            </div>
                        ) : (
                            <div className="ag-courses_box">
                                <h1>
                                    Connected to{" "}
                                    {nameService1.charAt(0).toUpperCase() +
                                        nameService1.slice(1)}
                                </h1>
                            </div>
                        )}
                    </div>
                    {secondConnected === false ? (
                        <div className="ag-format-container">
                            <div className="ag-courses_box">
                                <h1>Connect to :</h1>
                                <Card
                                    key={secondServices.id}
                                    name={nameService2}
                                    description=""
                                    color={secondServices.color}
                                    serviceName=""
                                    serviceId={secondServices.id}
                                    onCardChange={handleCard}
                                />
                            </div>
                        </div>
                    ) : (
                        <h1>Connected to {nameService2}</h1>
                    )}
                </div>
            )}
        </div>
    );
};

export default LoginOauth;
