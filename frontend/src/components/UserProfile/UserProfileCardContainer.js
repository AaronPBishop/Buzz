import { useState } from "react";
import { useSelector } from "react-redux";
import UserProfileCard from "./UserProfileCard";
import './UserProfileCard.css'

const UserProfileCardContainer = () => {

    const currentUser = useSelector(state => state.session.user);
    const [clicked, setClicked] = useState(false);


    const handleClickProfileImage = (e) => {
        e.preventDefault();
        setClicked(!clicked);
    };

    const showUserCard = (boolean) => setClicked(boolean);

    return (
        <div style={{
            marginTop: '0.8vh',
            marginLeft: '0.6vw',
            height: '70px',
            width: '70px',
        }}>
            {
                currentUser &&
                <img className='profile_img' src={`${currentUser.profile_img}`} onClick={(e) => handleClickProfileImage(e)} 
                style={{
                    minWidth: '2.8vw',
                    maxWidth: '2.8vw',
                    minHeight: '5.5vh',
                    maxHeight: '5.5vh',
                    borderRadius: '10px',
                    cursor: 'pointer'
                }}>
                </img>
            }

            {
                currentUser && clicked && 
                <UserProfileCard user={currentUser} showUserCard={showUserCard} />
            }
        </div>
    );
};

export default UserProfileCardContainer;