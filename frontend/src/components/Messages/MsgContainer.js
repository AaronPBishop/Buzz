import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Message from "./Message";
import { populateCurrMessages } from "../../store/messagesReducer";

const MsgContainer = () => {
    const messages = useSelector(state => state.messages);

    useEffect(() => {
        dispatchEvent(populateCurrMessages(messages));
    }, [messages]);

    if (messages.length === 0) <div className="flex-center">Loading...</div>;

    return (
        <div>
            {messages &&
                messages.map((msgEl, i) => <Message message={msgEl} />)}
        </div>
    );
};

export default MsgContainer;
