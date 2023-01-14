import { useEffect, useState } from "react";

import DemoLogin from "../auth/DemoLogin.js";

import LogInForm from "../auth/LoginForm.js";
import SignUpForm from "../auth/SignUpForm.js";

import "./styles.css";

const SplashPage = () => {
    const [clickedLogIn, setClickedLogIn] = useState(false);
    const [clickedSignUp, setClickedSignUp] = useState(false);

    useEffect(() => {
        const htmlElement = document.querySelector("html");
        htmlElement.style.backgroundColor = 'rgb(240, 210, 10)';
    }, []);

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                backgroundColor: "black",
                border: "1px black solid",
                borderRadius: "20px",
                boxShadow: "0px 0px 8px black",
                width: "50vw",
                height: "84vh",
                margin: "auto",
                marginTop: '4vh'
            }}>
            {!clickedLogIn && !clickedSignUp ? (
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <p
                        style={{
                            fontSize: "40px",
                            fontWeight: "bold",
                            position: "absolute",
                            color: "rgb(240, 210, 10)",
                        }}>
                        Buzz
                    </p>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignContent: "center",
                                marginTop: "34vh",
                            }}>
                            <button
                                className="login-buttons"
                                onClick={() => {
                                    setClickedLogIn(clicked => !clicked);
                                }}>
                                Login
                            </button>

                            <button
                                className="login-buttons"
                                onClick={() => {
                                    setClickedSignUp(clicked => !clicked);
                                }}>
                                Sign Up
                            </button>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                alignSelf: "center",
                                paddingTop: "6vh",
                            }}>
                            <DemoLogin />
                        </div>
                    </div>
                </div>
            ) : clickedLogIn ? (
                <LogInForm />
            ) : (
                clickedSignUp && <SignUpForm />
            )}
        </div>
    );
};

export default SplashPage;
