import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/sessionReducer";
import "./Form.css";

const LoginForm = () => {
    const [errors, setErrors] = useState([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const onLogin = async e => {
        e.preventDefault();
        const data = await dispatch(login(email, password));
        if (data) {
            setErrors(data);
        }
    };

    const updateEmail = e => {
        setEmail(e.target.value);
    };

    const updatePassword = e => {
        setPassword(e.target.value);
    };

    if (user) return <Redirect to="/home" />;

    return (
        <form onSubmit={onLogin} className="formWrapper">
            <div className="formTitle">Log In</div>

            <div className="fieldWrapper">
                <label htmlFor="email"></label>
                <input
                    name="email"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={updateEmail}
                    className="inputFields"
                />
            </div>
            <div className="fieldWrapper">
                <label htmlFor="password"></label>
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={updatePassword}
                    className="inputFields"
                />
            </div>
            <div style={{paddingBottom: '8px'}}>
                {errors.map((error, ind) => (
                    <div
                        style={{
                            color: "white",
                            fontSize: "12px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        key={ind}>
                        {error}
                    </div>
                ))}
            </div>
            <button type="submit" className="submitButton">
                Login
            </button>
        </form>
    );
};

export default LoginForm;
