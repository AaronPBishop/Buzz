import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DotsVerticalIcon } from "@heroicons/react/outline";
import "./Messages.css";
import {
    editChannelMessageThunk,
    deleteChannelMessageDataThunk,
    editDmMessageThunk,
    deleteDmMessageDataThunk,
} from "../../store/messagesReducer";
import { fetchOrgDataThunk } from "../../store/organizationReducer";

const Message = ({ message, sessionUser }) => {
    const [clicked, setClicked] = useState(false);
    const [clickDelete, setClickDelete] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [editMsg, setEditMsg] = useState(message.message);
    const [validOwner, setValidOwner] = useState(false);

    const dispatch = useDispatch();

    const messageState = useSelector(state => state.messages);
    const org = useSelector(state => state.organization.id);

    useEffect(() => {
        if (sessionUser.id === message.user_id) setValidOwner(true);
    }, [sessionUser.id]);

    //! rerender needed after deletion

    // useEffect(() => {
    //     if (clickDelete === true) {
    //         dispatch(fetchOrgDataThunk(org));
    //         setClickDelete(false);
    //     }
    // }, [clickDelete]);

    const handleKeyDown = e => {
        if (e.key === "Enter") {
            if (messageState.viewingChannel === true) {
                dispatch(editChannelMessageThunk(message.id, editMsg));
                setClicked(!clicked);
            }

            if (messageState.viewingDm === true) {
                dispatch(editDmMessageThunk(message.id, editMsg));
                setClicked(!clicked);
            }
        }
    };

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
                padding: "14px",
                fontFamily: "Roboto",
                borderRadius: "6px",
                backgroundColor: "black",
                margin: "3px",
                color: "white",
            }}>
            <div style={{ display: "flex", marginLeft: "12px" }}>
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
                    <p
                        style={{
                            display: !clicked ? "block" : "none",
                            justifySel: "center",
                            alignSelf: "center",
                        }}>
                        {message.message}
                    </p>
                    <input
                        type="text"
                        onKeyDown={handleKeyDown}
                        style={{
                            display: clicked ? "block" : "none",
                            backgroundColor: "yellow",
                            border: "none",
                            outline: "none",
                            color: "black",
                            height: "30px",
                            alignSelf: "center",
                        }}
                        value={editMsg}
                        onChange={e => {
                            setEditMsg(e.target.value);
                        }}></input>
                </div>
            </div>
            <div
                className="dropdown"
                style={{
                    display: "flex",
                    justifySelf: "end",
                    marginRight: "12px",
                }}>
                <DotsVerticalIcon
                    className={
                        !showMenu && validOwner ? "dropbtn" : "dropbtn_closed"
                    }
                    onClick={openMenu}
                />
                {showMenu && validOwner && (
                    <div className="div-dropdown">
                        <div
                            style={{
                                height: "25px",
                                width: "50px",
                                display: "block",
                                display: "flex",
                                fontSize: "12px",
                                marginRight: "20px",
                            }}>
                            <button
                                onClick={e => {
                                    e.preventDefault();
                                    if (
                                        clicked === true &&
                                        messageState.viewingChannel === true
                                    ) {
                                        dispatch(
                                            editChannelMessageThunk(
                                                message.id,
                                                editMsg
                                            )
                                        );
                                    }

                                    if (
                                        clicked === true &&
                                        messageState.viewingDm === true
                                    ) {
                                        dispatch(
                                            editDmMessageThunk(
                                                message.id,
                                                editMsg
                                            )
                                        );
                                    }
                                    setClicked(!clicked);
                                }}
                                style={{
                                    width: "100%",
                                    fontSize: "12px",
                                    marginTop: "8px",
                                }}>
                                {" "}
                                <b>Edit</b>
                            </button>
                        </div>
                        <div
                            style={{
                                height: "25px",
                                width: "50px",
                                display: "block",
                                display: "flex",

                                marginRight: "20px",
                            }}>
                            <button
                                onClick={e => {
                                    e.preventDefault();
                                    if (messageState.viewingChannel === true) {
                                        dispatch(
                                            deleteChannelMessageDataThunk(
                                                message.id
                                            )
                                        );
                                        setClickDelete(true);
                                    }

                                    if (messageState.viewingDm === true) {
                                        dispatch(
                                            deleteDmMessageDataThunk(message.id)
                                        );
                                        console.log(clickDelete);
                                        setClickDelete(true);
                                    }
                                }}
                                style={{
                                    width: "100%",
                                    fontSize: "12px",
                                    marginTop: "8px",
                                    fontWeight: "bold",
                                }}>
                                Delete
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Message;
