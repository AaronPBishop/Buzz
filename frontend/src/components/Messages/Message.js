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

    //* DmMessages
    useEffect(() => {
        dispatch(editDmMessageThunk());
    }, []);

    useEffect(() => {
        dispatch(deleteDmMessageDataThunk());
    }, []);

    //! ChannelMessages
    useEffect(() => {
        dispatch(editChannelMessageThunk());
    }, []);

    useEffect(() => {
        dispatch(deleteChannelMessageDataThunk());
    }, []);

    return (
        <div
            style={{
                fontFamily: "Roboto",
                borderRadius: "6px",
                backgroundColor: "black",
                margin: "3px",
                color: "white",
                display: "flex",
            }}>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    margin: "7px",
                    maxHeight: "5vh",
                    maxWidth: "3vw",
                    minHeight: "5vh",
                    minWidth: "3vw",
                }}>
                <img
                    src={sessionUser.profile_img}
                    style={{
                        display: "flex",
                        // objectFit: "fill",
                        borderRadius: "0.4rem",
                        width: "3vw",
                        height: "5vh",
                    }}
                />
            </div>
            <div style={{}}>
                <div style={{ display: "flex", paddingLeft: "8px" }}>
                    {message && message.last_update !== null ? (
                        <p
                            style={{
                                color: "rgb(242, 95, 95)",
                                fontSize: "14px",
                            }}>
                            {message.last_update}
                        </p>
                    ) : (
                        message.created_date && (
                            <p
                                style={{
                                    color: "rgb(242, 95, 95)",
                                    fontSize: "14px",
                                }}>
                                {message.created_date}
                            </p>
                        )
                    )}
                </div>
                <div
                    style={{
                        display: "flex",
                        paddingLeft: "8px",
                    }}>
                    <p
                        style={{
                            fontWeight: "bold",
                            fontSize: "16px",
                            color: "yellow",
                        }}>
                        {message.user_name}:
                    </p>
                    <p>&nbsp;</p>
                    <p>{message.message}</p>
                </div>
                <div>
                    <button
                        style={{
                            backgroundColor: "rgb(242, 95, 95)",
                            fontWeight: "bold",
                        }}
                        onClick={() => {}}>
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Message;
