import { React, useEffect } from "react";
import "./ServicesField.css";

const Field = (props) => {
    useEffect(() => {
        if (props.item.type === "select" && props.item.options) {
            props.setSelectedValue((prev) => ({
                ...prev,
                [props.item.name]: props.item.options[0],
            }));
        }
    }, []);

    return (
        <div>
            {props.item.type === "select" && props.item.options && (
                <div>
                    <h3>
                        {props.item.label.charAt(0).toUpperCase() +
                            props.item.label.slice(1)}
                    </h3>
                    <div>
                        <select
                            key={props.item.id}
                            onChange={(e) => {
                                props.setSelectedValue((prev) => ({
                                    ...prev,
                                    [props.item.name]: e.target.value,
                                }));
                            }}
                        >
                            {props.item.options.map((item) => (
                                <option key={item} label={item} value={item} />
                            ))}
                        </select>
                    </div>
                </div>
            )}
            {props.item.type === "input" && (
                <div>
                    <h3>
                        {props.item.label
                            .replace(/_/g, " ")
                            .charAt(0)
                            .toUpperCase() +
                            props.item.label.replace(/_/g, " ").slice(1)}
                    </h3>
                    <div>
                        <input
                            className="input-field"
                            key={props.item.id}
                            placeholder={props.item.label}
                            onChange={(e) => {
                                props.setText((prev) => ({
                                    ...prev,
                                    [props.item.name]: e.target.value,
                                }));
                            }}
                        />
                    </div>
                </div>
            )}
            {props.item.type === "text-area" && (
                <div>
                    <h3>
                        {props.item.label
                            .replace(/_/g, " ")
                            .charAt(0)
                            .toUpperCase() +
                            props.item.label.replace(/_/g, " ").slice(1)}
                    </h3>
                    <div>
                        <input
                            className="input-field"
                            key={props.item.id}
                            placeholder={props.item.label}
                            onChange={(e) => {
                                props.setText((prev) => ({
                                    ...prev,
                                    [props.item.name]: e.target.value,
                                }));
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Field;
