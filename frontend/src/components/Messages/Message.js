import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DotsVerticalIcon } from "@heroicons/react/outline";
import "./Messages.css";
import {
    editChannelMessageThunk,
    deleteChannelMessageDataThunk,
    editDmMessageThunk,
    deleteDmMessageDataThunk,
    setCurrImgUrl,
    deleteMessage
} from "../../store/messagesReducer";
import { fetchOrgDataThunk } from "../../store/organizationReducer";

const Message = ({ message, sessionUser }) => {
    const dispatch = useDispatch();

    const messageState = useSelector(state => state.messages);
    const currOrg = useSelector(state => state.organization);

    const [clicked, setClicked] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [editMsg, setEditMsg] = useState(message.message);
    const [validOwner, setValidOwner] = useState(false);

    useEffect(() => {
        if (sessionUser.id === message.user_id) setValidOwner(true);
    }, [sessionUser.id, message.user_id]);

    const handleKeyDown = async e => {
        if (e.key === "Enter") {
            if (messageState.viewingChannel === true) {
                await dispatch(editChannelMessageThunk(message.id, editMsg));
                setClicked(!clicked);
                await dispatch(fetchOrgDataThunk(currOrg.id));
            };

            if (messageState.viewingDm === true) {
                await dispatch(editDmMessageThunk(message.id, editMsg));
                setClicked(!clicked);
                await dispatch(fetchOrgDataThunk(currOrg.id));
            };
        };
    };

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => setShowMenu(false);

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
            border: '2px solid yellow',
            borderRadius: "12px",
            backgroundColor: "black",
            margin: "1vh",
            marginBottom: '2vh',
            color: "white",
        }}>
            <div style={{display: 'flex', flexDirection: 'column',  }}>
                <div style={{ display: "flex", marginLeft: "12px" , }}>
                    <img
                    style={{
                        height: "8vh",
                        width: '4vw',
                        marginTop: '1vh',
                        borderRadius: "10px",
                        marginLeft: '0.5vw',
                        marginRight: '1vw',
                        display: "flex",
                        alignSelf: "center",
                    }}
                    src={message.user_profile_img}/>

                    <div style={{ paddingLeft: "10px"
                    }}>
                        <h4 style={{ color: "yellow", fontSize: "18px" }}>
                            {message.first_name} {message.last_name}

                            {
                                message && message.last_update !== null ?
                                <span
                                style={{
                                    color: "gray",
                                    fontWeight: "300",
                                    marginLeft: "1vw",
                                    fontSize: "10px",
                                    paddingBottom: "10px",
                                }}>
                                    {message.last_update}
                                </span>
                                :
                                message &&
                                message.created_date &&
                                    <span
                                    style={{
                                        color: "gray",
                                        fontWeight: "300",
                                        marginLeft: "1vw",
                                        fontSize: "10px",
                                        paddingBottom: "10px",
                                    }}>
                                        {message.created_date}
                                    </span>
                            }
                        </h4>
                        <p
                        style={{
                            display: !clicked ? "block" : "none",
                            justifySelf: "center",
                            alignSelf: "center",
                            wordBreak: "break-all"
                        }}>
                            {message.message}
                        </p>

                        <input
                        type="text"
                        onKeyDown={handleKeyDown}
                        id='search-input'
                        style={{
                            display: clicked ? "block" : "none",
                            marginTop: '1.2vh',
                            marginBottom: '1vh',
                            fontFamily: 'Roboto',
                            fontSize: '14px',
                            letterSpacing: '1px',
                            color: 'white',
                            backgroundColor: 'rgb(20, 20, 20)',
                            width: '56vw',
                            height: '12vh',
                            border: '2px solid rgb(30, 30, 30)',
                            borderRadius: '8px'
                        }}
                        value={editMsg}
                        onChange={e => setEditMsg(e.target.value)}>
                        </input>
                </div>
            </div>

                <div
                style={{
                    display: message.images && message.images.length > 0 ? 'flex' : 'none',
                    padding: '1vh',
                    maxWidth: '65vw',
                    overflowX: 'auto',
                    justifyContent: 'flex-start',
                    marginLeft: '5vw'
                }}>
                    {
                        message.images && message.images.length > 0 &&
                        message.images.map((img, i) =>
                            <img
                            src={img.url}
                            onClick={() => dispatch(setCurrImgUrl(img.url))}
                            style={{
                                marginTop: '0.1vh',
                                marginLeft: '1vw',
                                minHeight: '14vh',
                                maxHeight: '14vh',
                                minWidth: '8vw',
                                maxWidth: '8vw',
                                borderRadius: '6px',
                                cursor: 'pointer'
                            }}
                            key={i}>
                            </img>
                        )
                    }
                </div>
            </div>

            <div
            className="dropdown"
            style={{
                display: "flex",
                justifySelf: "end",
                marginRight: "12px",
                alignSelf: 'center',
                marginBottom: showMenu ? '2vh' : '0.4vh'
            }}>

                <DotsVerticalIcon
                className={!showMenu && validOwner ? "dropbtn" : "dropbtn_closed"}
                onClick={openMenu}
                />

                {
                    showMenu && validOwner &&
                    <div className="div-dropdown">
                        <div
                        style={{
                            height: "30px",
                            width: "80px",
                            display: "block",
                            display: "flex",
                            fontSize: "12px",
                            marginLeft: "10px",
                            marginBottom: '1vh'
                        }}>
                            <button
                            className="buzz-btn"
                            onClick={async e => {
                                    e.stopPropagation()

                                    if (clicked === true && messageState.viewingChannel === true) {
                                        await dispatch(editChannelMessageThunk(message.id, editMsg));
                                        await dispatch(fetchOrgDataThunk(currOrg.id));
                                    };

                                    if (clicked === true &&messageState.viewingDm === true) {
                                        await dispatch(editDmMessageThunk(message.id, editMsg));
                                        await dispatch(fetchOrgDataThunk(currOrg.id));
                                    };

                                    setClicked(!clicked);
                                }}
                                style={{
                                    width: "100%",
                                    fontSize: "12px",
                                    marginTop: "8px",
                                    height: '4vh',
                                    borderLeft: '3px solid transparent',
                                    borderRight: '3px solid transparent',
                                    borderTop: '3px solid transparent',
                                    borderBottom: '3px solid rgb(165, 165, 0)'
                                }}>
                                    <b>{!clicked ? 'Edit' : 'Save'}</b>
                            </button>
                        </div>

                        <div
                        style={{
                            height: "30px",
                            width: "80px",
                            display: "block",
                            display: "flex",
                            marginLeft: "10px"
                        }}>
                            <button
                            className="buzz-btn"
                            onClick={async e => {
                                e.stopPropagation()
                                e.preventDefault();

                                if (messageState.viewingChannel === true) {
                                    await dispatch(deleteChannelMessageDataThunk(message.id));
                                    await dispatch(deleteMessage(message.id));
                                    await dispatch(fetchOrgDataThunk(currOrg.id));
                                };

                                if (messageState.viewingDm === true) {
                                    await dispatch(deleteDmMessageDataThunk(message.id));
                                    await dispatch(deleteMessage(message.id));
                                    await dispatch(fetchOrgDataThunk(currOrg.id));
                                };
                            }}
                            style={{
                                width: "100%",
                                fontSize: "12px",
                                marginTop: "8px",
                                fontWeight: "bold",
                                height: '4vh',
                                borderLeft: '3px solid transparent',
                                borderRight: '3px solid transparent',
                                borderTop: '3px solid transparent',
                                borderBottom: '3px solid rgb(165, 165, 0)'
                            }}>
                                Delete
                            </button>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default Message;
