import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/sessionReducer";

const SignUpForm = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);

    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [bio, setBio] = useState("");
    const [profile_img, setProfile_img] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const [errors, setErrors] = useState([]);
    const [passError, setPassError] = useState('');

    const onSignUp = async e => {
        e.preventDefault();

        if (password === repeatPassword) {
            const data = await dispatch(
                signUp(
                    username,
                    firstName,
                    lastName,
                    email,
                    password,
                    bio,
                    profile_img,
                )
            );

            if (data) setErrors(data);
        };

        if (password !== repeatPassword) setPassError("Both passwords must match.");
    };

    if (user) return <Redirect to="/home" />;

    return (
        <form onSubmit={onSignUp} className="formWrapper flex-center">
            <div style={{textAlign: 'center', fontWeight: 'bold', color: 'yellow'}}>
                Sign Up
            </div>

            <div>
                {
                    errors.map((error, ind) => (
                    <div 
                    key={ind} 
                    style={{
                        color: "white",
                        fontSize: "12px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingBottom: "2px"
                    }}>
                        {error} 
                    </div>
                    ))
                }

                {
                    passError.length > 0 && 
                    <div 
                    style={{
                        color: "white",
                        fontSize: "12px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingBottom: "2px"
                    }}>
                        {passError}
                    </div>
                }

            </div>

            <div className="fieldWrapper">
                <input
                    type="text"
                    name="username"
                    onChange={e => setUsername(e.target.value)}
                    placeholder="Username"
                    value={username}
                    required
                    className="buzz-input flex-center"
                    style={{
                        height: '4vh',
                        minWidth: '16vw',
                        marginTop: '2vh'
                    }}></input>
            </div>

            <div className="fieldWrapper">
                <input
                    type="text"
                    name="firstName"
                    onChange={e => setFirstName(e.target.value)}
                    placeholder="First Name"
                    value={firstName}
                    required
                    className="buzz-input flex-center"
                    style={{
                        height: '4vh',
                        minWidth: '16vw'
                    }}></input>
            </div>

            <div className="fieldWrapper">
                <input
                    type="text"
                    name="lastName"
                    onChange={e => setLastName(e.target.value)}
                    placeholder="Last Name"
                    value={lastName}
                    required
                    className="buzz-input flex-center"
                    style={{
                        height: '4vh',
                        minWidth: '16vw'
                    }}></input>
            </div>

            <div className="fieldWrapper">
                <input
                    type="text"
                    name="email"
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    value={email}
                    className="buzz-input flex-center"
                    style={{
                        height: '4vh',
                        minWidth: '16vw'
                    }}></input>
            </div>

            <div className="fieldWrapper">
                <input
                    type="text"
                    name="Bio"
                    onChange={e => setBio(e.target.value)}
                    placeholder="Bio"
                    value={bio}
                    className="buzz-input flex-center"
                    style={{
                        height: '4vh',
                        minWidth: '16vw'
                    }}></input>
            </div>

            <div className="fieldWrapper">
                <input
                    type="text"
                    name="Profile Image"
                    onChange={e => setProfile_img(e.target.value)}
                    placeholder="Profile Image"
                    value={profile_img}
                    required
                    className="buzz-input flex-center"
                    style={{
                        height: '4vh',
                        minWidth: '16vw'
                    }}></input>
            </div>

            <div className="fieldWrapper">
                <input
                    type="password"
                    name="password"
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password"
                    value={password}
                    required
                    className="buzz-input flex-center"
                    style={{
                        height: '4vh',
                        minWidth: '16vw'
                    }}></input>
            </div>

            <div className="fieldWrapper">
                <input
                    type="password"
                    name="repeat_password"
                    onChange={e => setRepeatPassword(e.target.value)}
                    placeholder="Repeat Password"
                    value={repeatPassword}
                    required
                    className="buzz-input flex-center"
                    style={{
                        height: '4vh',
                        minWidth: '16vw',
                        marginBottom: '2vh'
                    }}></input>
            </div>

            <button 
            style={{
                lineHeight: '3.5vh',
                height: '5vh',
                minWidth: '18vw'
            }}
            type="submit" 
            className="buzz-btn flex-center" 
            onClick={()=> {
                setErrors([]);
                setPassError('');
            }}>
                Sign Up
            </button>
        </form>
    );
};

export default SignUpForm;
