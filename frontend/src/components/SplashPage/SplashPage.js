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
        htmlElement.style.paddingTop = '9vh';
    }, []);

    return (
        <div
        style={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: 'rgb(240, 210, 10)',
            borderRadius: "18px",
            boxShadow: "0px 0px 6px 1px yellow",
            width: "42vw",
            minHeight: "60vh",
            maxHeight: 'auto',
            margin: "auto",
            paddingTop: '7vh',
            paddingBottom: '7vh'
        }}>
            <div 
            style={{
                backgroundColor: 'black',
                width: '32vw',
                borderRadius: '10px'
            }}>

            {!clickedLogIn && !clickedSignUp ? (
                <div style={{ display: "flex", flexDirection: 'column'}}>
                    <div
                    style={{
                        fontFamily: 'Monofett',
                        fontWeight: 'normal',
                        fontSize: '24px',
                        letterSpacing: '0.1vh',
                        lineHeight: '4.5vh',
                        marginTop: '4vh',
                        marginBottom: '4vh',
                        textAlign: 'center', 
                        width: '14vw', 
                        height: '5vh', 
                        fontSize: '36px',
                        cursor: 'default'
                    }} 
                    className="buzz_txt flex-center buzz-btn">
                        Buzz
                    </div>

                    <img className="splash_img" src={require("../Logo/bee.png").default}></img>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignContent: "center",
                                marginTop: "1vh",
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
                                justifyContent: "center",
                                margin: 'auto',
                                marginTop: '-2vh',
                                width: "20vw"
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
        </div>
    );
};

export default SplashPage;
