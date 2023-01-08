import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import Message from "./Message";

import { populateCurrMessages } from "../../store/messagesReducer";

const MsgContainer = () => {
    const dispatch = useDispatch();

    const messageState = useSelector(state => state.messages);
    const messages = useSelector(state => state.messages.currentMessages);

    const [totalMessages, setTotalMessages] = useState(0);

    useEffect(() => {
        setTotalMessages(messages.length);
    }, [messageState]);

    useEffect(() => {
        dispatch(populateCurrMessages(messages));
    }, [totalMessages]);

    if (!messages) <div className="flex-center">Loading...</div>;

    return (
        <div>
            {
                messages.map((msgEl, i) => <Message message={msgEl} key={i} />)
            }
        </div>
    );
};

export default MsgContainer;
