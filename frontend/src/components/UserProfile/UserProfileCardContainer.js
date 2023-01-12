import { useState } from "react";
import { useSelector } from "react-redux";
import UserProfileCard from "./UserProfileCard";

const UserProfileCardContainer = () => {

    const currentUser = useSelector(state => state.session.user);
    const [clicked, setClicked] = useState(false);


    const handleClickProfileImage = (e) => {
        e.preventDefault();
        setClicked(!clicked);
    }

    const showUserCard = (boolean) => {
        setClicked(boolean);
    }

    return (
        <div style={{
            marginLeft: '50px'
        }}>
            {currentUser &&
                <img src={`${currentUser.profile_img}`} onClick={(e) => handleClickProfileImage(e)} style={{
                    height: '50px',
                    width: '50px',
                    borderRadius: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    borderTop: '2px solid rgb(30, 30, 30)',
                    borderBottom: '2px solid rgb(30, 30, 30)'
                }}></img>
            }
            {currentUser && clicked && (
                <UserProfileCard user={currentUser} showUserCard={showUserCard} />
            )}
        </div>
    )
}

export default UserProfileCardContainer;
