const initialState = {
    viewingChannel: false,
    viewingDm: false,
    currChannelId: null,
    currentMessages: [],
};

export const setViewingChannel = currChannelId => {
    return {
        type: "SET_VIEWING_CHANNEL",
        payload: currChannelId,
    };
};

export const setViewingDm = currChannelId => {
    return {
        type: "SET_VIEWING_DM",
        payload: currChannelId,
    };
};


export const populateCurrMessages = messagesArr => {
    return {
        type: "POPULATE_CURRENT_MESSAGES",
        payload: messagesArr,
    };
};


export const addMessage = (msg) => {
    return {
        type: "ADD_MESSAGE",
        payload: msg
    };
};


export const clearChannelMessageData = () => {
    return {
        type: "CLEAR_CHANNEL_MESSAGE_DATA",
    };
};

//*  Channel Messages

export const createChannelMessageThunk =
    (userId, channelId, message) => async dispatch => {
        const request = fetch("/api/channelMessage", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                message: message,
                last_update: Date(),
                channel_id: channelId,
                user_id: userId,
            }),
        });
        const response = await request.json();

// THUNKS

export const editChannelMessageThunk =
    (channelMessageId, channelMessageToEdit) => async dispatch => {
        const request = fetch(`/api/channelMessage/${channelMessageId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                message: channelMessageToEdit,
                last_update: Date(),
            }),
        });
    };

export const deleteChannelMessageDataThunk = channelMessageId => async () => {
    await fetch(`/api/channelMessage/${channelMessageId}`, {
        method: "DELETE",
    });
};

//* dmMessages

export const createDmMessageThunk =
    (userId, dmMessage_channelId, message) => async dispatch => {
        const request = fetch("/api/dmMessage", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                message: message,
                last_update: Date(),
                dmMessage_channel_id: dmMessage_channelId,
                user_id: userId,
            }),
        });
        const response = await request.json();

        dispatch(populateCurrMessages(response));
    };

export const editDmMessageThunk =
    (dmMessageId, dmMessageToEdit) => async dispatch => {
        const request = fetch(`/api/dmMessage/${dmMessageId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                message: dmMessageToEdit,
                last_update: Date(),
            }),
        });

    const response = await request.json();

    dispatch(populateCurrMessages(response));
};

        dispatch(populateCurrMessages(response));
    };

export const deleteDmMessageDataThunk = dmMessageId => async () => {
    await fetch(`/api/dmMessage/${dmMessageId}`, {
        method: "DELETE",
    });
};

//! REDUCER

const messagesReducer = (state = initialState, action) => {
    const currentState = { ...state };

    switch (action.type) {
        case "POPULATE_CURRENT_MESSAGES": {
            currentState.currentMessages = action.payload.sort(
                (a, b) => a.id - b.id
            );

            return currentState;
        };

        case 'ADD_MESSAGE': {
            currentState.currentMessages.push(action.payload);

            return currentState;
        };

        case "CLEAR_CHANNEL_MESSAGE_DATA":
            return initialState;

        default:
            return currentState;
    };
};

export default messagesReducer;
