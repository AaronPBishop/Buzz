import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Message from "./Message";
import { populateCurrMessages } from "../../store/messagesReducer";

const MsgContainer = () => {
    const dispatch = useDispatch();

    const messages = useSelector(state => state.messages.currentMessages);

    const [totalMessages, setTotalMessages] = useState(0);

    useEffect(() => {
        if (messages.length > totalMessages.length) {
            dispatch(populateCurrMessages(messages));

            setTotalMessages(messages.length);
        };
    }, [messages]);

    if (!messages) <div className="flex-center">Loading...</div>;

    return (
        <div>
            {
                messages && messages.length > 0 &&
                messages.map((msgEl, i) => <Message message={msgEl} key={i} />)
            }
        </div>
    );
};

export default MsgContainer;
