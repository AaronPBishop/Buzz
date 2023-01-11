import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/sessionReducer";

const DemoLogin = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    const handleButtonClick = async () => {
        await dispatch(login("demoUser@buzz.com", "password"));
    };

    if (user) return <Redirect to="/home" />;

    return (
        <div onClick={handleButtonClick}>
            <button className="submitButton">Demo Login</button>
        </div>
    );
};

export default DemoLogin;
