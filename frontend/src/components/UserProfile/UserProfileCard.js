import { useState } from "react";
import { useDispatch } from "react-redux";

import { editUserThunk, logout } from "../../store/sessionReducer";
import { Close } from '@styled-icons/evil/Close';
import { useHistory } from "react-router-dom"

import "./UserProfileCard.css";


const UserProfileCard = ({ user, showUserCard }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [showEditForm, setShowEditForm] = useState(false);
    const [showCardDropDown, setShowCardDropDown] = useState(true);
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [firstName, setFirstName] = useState(user.first_name);
    const [lastName, setLastName] = useState(user.last_name);
    const [bio, setBio] = useState(user.bio);
    const [profileImage, setProfileImage] = useState(user.profile_img);

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
        history.push("/");
    };

    const handleEditUser = (e) => {
        e.preventDefault();
        setShowEditForm(true);
        setShowCardDropDown(false);
    };

    const handleFormSubmission = (e) => {
        e.preventDefault();
        dispatch(editUserThunk({ userId: user.id, username, first_name: firstName, last_name: lastName, email, bio, profile_img: profileImage }));
        setShowEditForm(false);
        setShowCardDropDown(true);
        showUserCard(false);
    };

    const handleCloseFunction = (e) => {
        e.preventDefault();
        setShowEditForm(false)
        setShowCardDropDown(true)
        showUserCard(false)
    };

    return (
        <div>
            {
                showCardDropDown &&
                <div style={{
                    zIndex: '100',
                    position: 'absolute',
                    background: 'black',
                    border: '1px solid yellow',
                    borderRadius: '5px',
                    display: 'flex',
                    flexDirection: 'column',
                    color: 'yellow',
                    justifyContent: 'center',
                    width: '200px',
                    flexWrap: 'wrap',
                    padding: '10px',
                    textAlign: 'center',
                    marginTop: '10px'
                }}>
                    <div>{user.username}</div>
                    <div>{user.email}</div>
                    <div>{user.first_name} {user.last_name}</div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        <button onClick={(e) => handleEditUser(e)} className="actionButtons buzz-btn">Edit User</button>
                        <button onClick={(e) => handleLogout(e)} className="actionButtons buzz-btn">Logout</button>
                    </div>
                </div>
            }
            {
                showEditForm && (
                <div style={{
                    zIndex: '100',
                    position: 'absolute'
                }}>
                    <form onSubmit={(e) => handleFormSubmission(e)} className='EditUserForm'>
                        <Close style={{
                            height: '40px',
                            width: '40px',
                            marginLeft: 'auto',
                            marginRight: '15%',
                            cursor: 'pointer'
                        }} onClick={(e) => handleCloseFunction(e)}></Close>
                        <div className='EditUserMessage'>Edit User</div>
                        <label className='textLabelWrapper'>
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='InputBox'
                            />
                        </label>
                        <label className='textLabelWrapper'>
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className='InputBox'
                            />
                        </label>
                        <label className='textLabelWrapper'>
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className='InputBox'
                            />
                        </label>
                        <label className='textLabelWrapper'>
                            <input
                                type="text"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                className='InputBox'
                            />
                        </label>
                        <label className='textLabelWrapper'>
                            <input
                                type="text"
                                value={profileImage}
                                onChange={(e) => setProfileImage(e.target.value)}
                                className='InputBox'
                            />
                        </label>
                        <label className='textLabelWrapper'>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className='InputBox'
                            />
                        </label>
                        <button type="submit" className='EditButton'>Confirm Edit</button>
                    </form>

                </div>
                )
            }
        </div>
    );
};

export default UserProfileCard;