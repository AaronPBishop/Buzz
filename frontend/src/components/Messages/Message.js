import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
    editDmMessageThunk,
    deleteDmMessageDataThunk,
    editChannelMessageThunk,
    deleteChannelMessageDataThunk,
} from "../../store/messagesReducer";

const Message = ({ message, sessionUser }) => {
    const dispatch = useDispatch();

    const [clicked, setClicked] = useState(false);
    const [validOwner, setValidOwner] = useState(false);

    useEffect(() => {
        if (sessionUser.id === message.user_id) setValidOwner(true);
    }, [sessionUser.id]);

    //* DmMessages
    // useEffect(() => {
    //     dispatch(editDmMessageThunk());
    // }, []);

    // useEffect(() => {
    //     dispatch(deleteDmMessageDataThunk());
    // }, []);

    // //! ChannelMessages
    // useEffect(() => {
    //     dispatch(editChannelMessageThunk());
    // }, []);

    // useEffect(() => {
    //     dispatch(deleteChannelMessageDataThunk());
    // }, []);

    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "6px",
                fontFamily: "Roboto",
                borderRadius: "6px",
                backgroundColor: "black",
                margin: "3px",
                color: "white",
            }}>
            <div style={{ display: "flex" }}>
                <img
                    style={{
                        height: "60px",
                        borderRadius: "8px",
                        paddingRight: "10px",
                        paddingLeft: "8px",
                        display: "flex",
                        alignSelf: "center",
                    }}
                    src={sessionUser.profile_img}
                />
                <div style={{ paddingLeft: "10px" }}>
                    <h4 style={{ color: "yellow", fontSize: "18px" }}>
                        {message.first_name} {message.last_name}{" "}
                        {message && message.last_update !== null ? (
                            <span
                                style={{
                                    color: "gray",
                                    fontWeight: "300",
                                    marginLeft: "4px",
                                    fontSize: "10px",
                                    paddingBottom: "10px",
                                }}>
                                {message.last_update}{" "}
                            </span>
                        ) : (
                            message &&
                            message.created_date && (
                                <span
                                    style={{
                                        color: "gray",
                                        fontWeight: "300",
                                        marginLeft: "4px",
                                        fontSize: "10px",
                                        paddingBottom: "10px",
                                    }}>
                                    {message.created_date}
                                </span>
                            )
                        )}
                    </h4>
                    <p>{message.message}</p>
                </div>
            </div>
            <div style={{ display: "flex", justifySelf: "end" }}> Menu</div>
        </div>
    );
};

export default Message;
