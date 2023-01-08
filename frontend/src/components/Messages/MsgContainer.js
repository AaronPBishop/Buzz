import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import Message from "./Message";

import { populateCurrMessages } from "../../store/messagesReducer";

const MsgContainer = () => {
    const dispatch = useDispatch();

    const messages = useSelector(state => state.messages.currentMessages);

    useEffect(() => {
        dispatch(populateCurrMessages(messages));
    }, [messages.length]);

    if (!messages) <div className="flex-center">Loading...</div>;

    return (
        <div>
            {
                messages.length > 0 &&
                messages.map((msgEl, i) => <Message message={msgEl} key={i} />)
            }
        </div>
    );
};

export default MsgContainer;
