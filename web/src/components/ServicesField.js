import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import globals from "../global";
import axios from "axios";
import Field from "./Field.js";
import { useLocation } from "react-router";
import "./ServicesField.css";

const ServicesField = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {
        actionServiceId,
        reactionServiceId,
        actionName,
        reactionName,
        reactionId,
        actionId,
    } = location.state;

    const [actionFields, setActionFields] = useState([]);
    const [reactionFields, setReactionFields] = useState([]);

    const [selectedValueAction, setSelectedValueAction] = useState({});
    const [textAction, onChangeTextAction] = useState({});

    const [selectedValueReaction, setSelectedValueReaction] = useState({});
    const [textReaction, onChangeTextReaction] = useState({});

    useEffect(() => {
        (async () => {
            try {
                const actions = await axios.get(
                    `${globals.baseURL}/action/${actionId}/fields/`,
                    {
                        withCredentials: true,
                    }
                );
                setActionFields(actions.data);
            } catch (err) {
                console.log("action error:", err.response.data);
            }
        })();
    }, [actionId]);

    useEffect(() => {
        (async () => {
            try {
                const reactions = await axios.get(
                    `${globals.baseURL}/reaction/${reactionId}/fields/`,
                    {
                        withCredentials: true,
                    }
                );
                setReactionFields(reactions.data);
            } catch (err) {
                console.log(err.response.data);
            }
        })();
    }, [reactionId]);

    const sendFields = async () => {
        let sendActionValue = "Action => ";
        let sendReactionValue = "Reaction => ";

        void actionServiceId;
        void reactionServiceId;
        try {
            const response = await axios.post(
                `${globals.baseURL}/workflow`,
                {
                    action: actionId,
                    action_args: JSON.stringify({
                        ...selectedValueAction,
                        ...textAction,
                    }),
                    reaction: [
                        {
                            id: reactionId,
                            args: JSON.stringify({
                                ...selectedValueReaction,
                                ...textReaction,
                            }),
                        },
                    ],
                    status: true,
                },
                { withCredentials: true }
            );
            console.log(response.data);
            navigate("/home");
        } catch (err) {
            console.log("Got an error: ", err.response.data);
        }
    };

    return (
        <div className="field-container">
            <h1>Please provide the needed details for</h1>
            <h2 className="field-service-name">
                {actionName.charAt(0).toUpperCase() + actionName.slice(1)}
            </h2>
            <ul>
                {actionFields.map((item) => (
                    <Field
                        key={item.id}
                        item={item}
                        setSelectedValue={setSelectedValueAction}
                        setText={onChangeTextAction}
                    />
                ))}
            </ul>
            <h1>and for</h1>
            <h2 className="field-service-name">
                {reactionName.charAt(0).toUpperCase() + reactionName.slice(1)}
            </h2>
            <ul>
                {reactionFields.map((item) => (
                    <Field
                        key={item.id}
                        item={item}
                        setSelectedValue={setSelectedValueReaction}
                        setText={onChangeTextReaction}
                    />
                ))}
            </ul>
            <button onClick={sendFields} className="buttonValider">
                Valider
            </button>
        </div>
    );
};

export default ServicesField;
