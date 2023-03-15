import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import global from "../global.js";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [emailLogin, setEmailLogin] = useState("");
    const [passwordLogin, setPasswordLogin] = useState("");

    const [errTagReg, setErrTagReg] = useState("");
    const [errTagLog, setErrTagLog] = useState("");
    const navigate = useNavigate();

    useEffect(() => {}, [errTagReg]);
    useEffect(() => {}, [errTagLog]);

    const handleSignup = async () => {
        try {
            const response = await axios.post(
                `${global.baseURL}/auth/signup`,
                {
                    email: email,
                    password: password,
                },
                {
                    withCredentials: true,
                }
            );
            console.log(response.data);
            navigate("/home");
        } catch (err) {
            if (err.response.status === 400) {
                console.log("Sorry, ", username);
                setErrTagReg(err.response.data["message"]);
            }
        }
    };

    const handleSignin = async () => {
        try {
            const response = await axios.post(
                `${global.baseURL}/auth/signin`,
                {
                    email: emailLogin,
                    password: passwordLogin,
                },
                {
                    withCredentials: true,
                }
            );
            const data = response.data;
            console.log(data);
            navigate("/home");
        } catch (err) {
            if (err.response.status === 400) {
                setErrTagLog(err.response.data["message"]);
            } else {
                console.log(err.response);
            }
        }
    };

    const checkServiceConnection = async (serviceId) => {
        console.log("isconnected serviceId:", serviceId);
        try {
            const response = await axios.get(
                `${global.baseURL}/service/${serviceId}`,
                {
                    withCredentials: true,
                }
            );
            console.log("isconnected response:", response.data);
            navigate("/home");
        } catch (err) {
            console.log("isconnected error:", err);
        }
    };

    const handleServiceClick = (serviceName, serviceId) => {
        console.log(
            "serviceName:",
            `${global.baseURL}/auth/signin/${serviceName}/authorize`
        );
        (async () => {
            try {
                const response = await axios.get(
                    `${global.baseURL}/auth/signin/${serviceName}/authorize`,
                    {
                        withCredentials: true,
                    }
                );
                console.log("oauth url response:", response.data);
                window.open(response.data, "_blank");
                setTimeout(() => {
                    checkServiceConnection(serviceId);
                }, 1500);
            } catch (err) {
                console.log("oauth url error:", err);
            }
        })();
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSignin();
        }
    };

    return (
        <div className="loginPage">
            <div className="main">
                <input type="checkbox" id="chk" aria-hidden="true" />
                <div className="signup">
                    <label htmlFor="chk" aria-hidden="true">
                        Sign up
                    </label>
                    <input
                        type="text"
                        name="txt"
                        placeholder="Username"
                        data-testid="usrJest"
                        required=""
                        onChange={(e) => {
                            setUsername(e.currentTarget.value);
                        }}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        data-testid="emailJest"
                        required=""
                        onChange={(e) => {
                            setEmail(e.currentTarget.value);
                        }}
                    />
                    <input
                        type="password"
                        name="pswd"
                        placeholder="Password"
                        required=""
                        data-testid="pswdJest"
                        onChange={(e) => {
                            setPassword(e.currentTarget.value);
                        }}
                    />
                    <p className="errReg">{errTagReg}</p>
                    <button
                        data-testid="signupJest"
                        onClick={() => {
                            handleSignup();
                        }}
                    >
                        Sign up
                    </button>
                    <button
                        className="github"
                        data-testid="githubtJest"
                        onClick={() => {
                            handleServiceClick("github", 4);
                        }}
                    >
                        Github
                    </button>
                    <button
                        className="google"
                        data-testid="googleJest"
                        onClick={() => {
                            handleServiceClick("google", 1);
                        }}
                    >
                        Google
                    </button>
                </div>
                <div className="login">
                    <label
                        id="loginSel"
                        htmlFor="chk"
                        aria-hidden="true"
                        data-testid="LoginJest"
                    >
                        Login
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="emailSel"
                        placeholder="Email"
                        required=""
                        onChange={(e) => {
                            setEmailLogin(e.currentTarget.value);
                        }}
                    />
                    <input
                        type="password"
                        name="pswd"
                        id="pswdSel"
                        placeholder="Password"
                        required=""
                        onChange={(e) => {
                            setPasswordLogin(e.currentTarget.value);
                        }}
                        onKeyDown={(event) => handleKeyPress(event)}
                    />
                    <p className="errLog">{errTagLog}</p>
                    <button
                        id="buttonSel"
                        data-testid="buttonJest"
                        onClick={() => {
                            handleSignin();
                        }}
                    >
                        Login
                    </button>
                    <button
                        className="github"
                        onClick={() => {
                            handleServiceClick("github", 4);
                        }}
                    >
                        Github
                    </button>
                    <button
                        className="google"
                        onClick={() => {
                            handleServiceClick("google", 1);
                        }}
                    >
                        Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
