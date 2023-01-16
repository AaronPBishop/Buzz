import { useState } from "react";
import { useDispatch } from "react-redux";

import { editUserThunk, logout } from "../../store/sessionReducer";
import { CloseCircle } from "@styled-icons/evaicons-solid/CloseCircle";

import "./UserProfileCard.css";

const UserProfileCard = ({ user, showUserCard }) => {
    const dispatch = useDispatch();

    const [showEditForm, setShowEditForm] = useState(false);
    const [showCardDropDown, setShowCardDropDown] = useState(true);
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [firstName, setFirstName] = useState(user.first_name);
    const [lastName, setLastName] = useState(user.last_name);
    const [bio, setBio] = useState(user.bio);
    const [profileImage, setProfileImage] = useState(user.profile_img);

    return (
        <div>
            {
                showCardDropDown && 
                <div
                style={{
                    zIndex: "100",
                    fontWeight: 'bold',
                    position: "absolute",
                    top: '9vh',
                    left: '2vw',
                    background: "black",
                    border: "2px solid yellow",
                    borderRadius: "8px",
                    display: "flex",
                    flexDirection: "column",
                    color: "yellow",
                    justifyContent: "center",
                    width: "16vw",
                    height: '24vh',
                    flexWrap: "wrap",
                    padding: "10px",
                    textAlign: "center",
                    boxShadow: '0px 0px 6px yellow'
                }}>
                    <div style={{marginBottom: '1vh'}}>{user.username}</div>
                    <div style={{marginBottom: '1vh'}}>{user.email}</div>
                    <div style={{marginBottom: '1vh'}}>{user.first_name} {user.last_name}</div>

                    <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}>
                        <button
                            onClick={() => {
                                setShowEditForm(true);
                                setShowCardDropDown(false);
                            }}
                            className="actionButtons buzz-btn">
                            Edit Profile
                        </button>
                        
                        <button
                            onClick={() => dispatch(logout())}
                            className="actionButtons buzz-btn">
                            Logout
                        </button>
                    </div>
                </div>
            }

            {
                showEditForm && 
                <div
                className="flex-center"
                style={{
                    zIndex: "100",
                    position: "fixed",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "black",
                    opacity: "0.8",
                    bottom: "0.1vh",
                    right: '0.1vw'
                }}>
                    <div
                    className="flex-center"
                    style={{
                        width: "34vw", 
                        height: '64vh', 
                        backgroundColor: 'rgb(240, 210, 10)', 
                        borderBottom: '4px solid rgb(165, 165, 0)', 
                        borderRadius: '12px', 
                        marginBottom: '24vh',
                        boxShadow: '0px 0px 6px yellow'
                    }}>
                        <CloseCircle
                        style={{
                            position: 'absolute',
                            marginRight: '32vw',
                            height: "4vh",
                            cursor: "pointer"
                        }}
                        onClick={() => {
                            setShowEditForm(false);
                            setShowCardDropDown(true);
                            showUserCard(false);
                        }}>
                        </CloseCircle>

                        <div style={{width: '28vw', height: '60vh', backgroundColor: 'black', color: 'white', borderRadius: '12px', marginTop: '2vh'}}>
                            <div className="flex-center">
                                <p style={{fontSize: '20px', fontWeight: 'bold', marginBottom: '5vh'}}>{user.username}'s Profile</p>
                            </div>
                            
                            <div style={{ display: "flex", justifyContent: 'space-evenly', marginBottom: '1.5vh' }}>
                                <label className="textLabelWrapper">Email</label>
                                <input
                                style={{width: '14vw', height: '4vh'}}
                                type="text"
                                value={email}
                                required
                                onChange={e => setEmail(e.target.value)}
                                className="buzz-input"/>
                            </div>

                            <div style={{ display: "flex", justifyContent: 'space-evenly', marginBottom: '1.5vh' }}>
                                <label className="textLabelWrapper">First Name</label>
                                <input
                                style={{width: '14vw', height: '4vh'}}
                                    type="text"
                                    required
                                    value={firstName}
                                    onChange={e => setFirstName(e.target.value)}
                                    className="buzz-input"/>
                            </div>

                            <div style={{ display: "flex", justifyContent: 'space-evenly', marginBottom: '1.5vh' }}>
                                <label className="textLabelWrapper">Last Name</label>
                                <input
                                style={{width: '14vw', height: '4vh'}}
                                type="text"
                                value={lastName}
                                required
                                onChange={e => setLastName(e.target.value)}
                                className="buzz-input"/>
                            </div>

                            <div style={{ display: "flex", justifyContent: 'space-evenly', marginBottom: '1.5vh' }}>
                                <label className="textLabelWrapper">Bio</label> 
                                <input
                                style={{width: '14vw', height: '4vh'}}
                                type="text"
                                value={bio}
                                onChange={e => setBio(e.target.value)}
                                className="buzz-input"/>
                            </div>

                            <div style={{ display: "flex", justifyContent: 'space-evenly', marginBottom: '1.5vh' }}> 
                                <label className="textLabelWrapper">Profile Image</label>
                                <input
                                style={{width: '14vw', height: '4vh'}}
                                type="text"
                                value={profileImage}
                                required
                                onChange={e => setProfileImage(e.target.value)}
                                className="buzz-input"/>
                            </div>

                            <div style={{ display: "flex", justifyContent: 'space-evenly' }}>
                                <label className="textLabelWrapper">Username</label>
                                <input
                                style={{width: '14vw', height: '4vh'}}
                                type="text"
                                value={username}
                                required
                                onChange={e => setUsername(e.target.value)}
                                className="buzz-input"/>
                            </div>

                            <div 
                            className="buzz-btn flex-center"
                            onClick={async () => {
                                await dispatch(editUserThunk({
                                        userId: user.id,
                                        username,
                                        first_name: firstName,
                                        last_name: lastName,
                                        email,
                                        bio,
                                        profile_img: profileImage,
                                    })
                                );

                                setShowEditForm(false);
                                setShowCardDropDown(true);
                                showUserCard(false);
                            }}
                            style={{lineHeight: '4vh', width: '12vw', height: '4vh', marginTop: '3vh'}}>
                                Confirm Edit
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default UserProfileCard;