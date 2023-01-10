import { useState } from "react";
import { useSelector } from "react-redux";

const UserProfileCard = ({ user }) => {

    return (
        <div style={{
            zIndex: '100',
            position: 'relative',
            background: 'black',
            border: '2px solid red',
            borderRadius: '5px'
        }}>
            <div>Username: {user.bio}</div>
            <div>Email: {user.email}</div>
            <div>Name: {user.first_name} {user.last_name}</div>
        </div>
    )
}

export default UserProfileCard;
