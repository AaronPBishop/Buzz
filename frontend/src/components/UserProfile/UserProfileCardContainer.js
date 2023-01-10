import { useState } from "react";
import { useSelector } from "react-redux";
import UserProfileCard from "./UserProfileCard";

const UserProfileCardContainer = () => {

    const currentUser = useSelector(state => state.session.user);
    const [clicked, setClicked] = useState(false);


    const handleClickButton = (e) => {
        e.preventDefault();
        setClicked(!clicked);
    }

    return (
        <div>
            <button onClick={(e) => handleClickButton(e)}>click here</button>
            {clicked && (
                <div style={{
                    color: 'white'
                }}><UserProfileCard user={currentUser} />
                </div>
            )}
        </div>
    )
}

export default UserProfileCardContainer;
