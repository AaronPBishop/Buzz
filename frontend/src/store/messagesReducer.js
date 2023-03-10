const initialState = {
    currImgUrl: '',
    viewingChannel: false,
    viewingDm: false,
    currChannelId: null,
    usersToAdd: [],
    imagesToAdd: [],
    currentMessages: []
};


// ACTION CREATORS

export const setViewingChannel = currChannelId => {
    return {
        type: "SET_VIEWING_CHANNEL",
        payload: currChannelId,
    };
};

export const setViewingDm = currChannelId => {
    return {
        type: "SET_VIEWING_DM",
        payload: currChannelId
    };
};

export const populateCurrMessages = messagesArr => {
    return {
        type: "POPULATE_CURRENT_MESSAGES",
        payload: messagesArr,
    };
};

export const addMessage = msg => {
    return {
        type: "ADD_MESSAGE",
        payload: msg
    };
};

export const editMessage = msg => {
    return {
        type: "EDIT_MESSAGE",
        payload: msg,
    };
};

export const deleteMessage = (msgId) => {
    return {
        type: "DELETE_MESSAGE",
        payload: msgId
    };
};

export const addUserEmail = (email) => {
    return {
        type: "ADD_USER_EMAIL",
        payload: email,
    };
};

export const addMessageImg = imgUrl => {
    return {
        type: "ADD_MESSAGE_IMG",
        payload: imgUrl,
    };
};

export const deleteMessageImg = (imgUrl) => {
    return {
        type: "DELETE_MESSAGE_IMG",
        payload: imgUrl
    };
};

export const clearUserEmails = () => {
    return {
        type: "CLEAR_USER_EMAILS",
    };
};

export const clearMessageImgs = () => {
    return {
        type: "CLEAR_MESSAGE_IMGS",
    };
};

export const clearChannelMessageData = () => {
    return {
        type: "CLEAR_CHANNEL_MESSAGE_DATA",
    };
};

export const setCurrImgUrl = (imgUrl) => {
    return {
        type: "SET_CURR_IMG_URL",
        payload: imgUrl
    };
};

export const clearCurrImgUrl = () => {
    return {
        type: "CLEAR_CURR_IMG_URL"
    };
};


// THUNKS

//*  Channel Thunks

export const createChannelMessageThunk = (userId, channelId, message, images) => async dispatch => {
    const request = await fetch("/api/channelMessage/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            message: message,
            last_update: Date(),
            currChannelId: channelId,
            userId: userId,
            images: images
        }),
    });

    const response = await request.json();

    dispatch(addMessage(response));
};


export const editChannelMessageThunk = (channelMessageId, channelMessageToEdit) => async dispatch => {
    const request = await fetch(`/api/channelMessage/${channelMessageId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            message: channelMessageToEdit,
            last_update: Date()
        }),
    });

    const response = await request.json();

    dispatch(editMessage(response));
};


export const deleteChannelMessageDataThunk = channelMessageId => async (dispatch) => {
    await fetch(`/api/channelMessage/${channelMessageId}`, {
        method: "DELETE",
    });

    dispatch(deleteMessage(channelMessageId));
};


//*  DM Thunks

export const createDmMessageChannelThunk = (ownerId, organizationId, userEmails) => async dispatch => {
    const request = await fetch(`/api/dm_message_channels/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            ownerId: ownerId,
            organization_id: organizationId,
            users: userEmails
        }),
    });

    const responseJSON = await request.json();

    dispatch(clearChannelMessageData());

    dispatch(setViewingDm(responseJSON.id));
};


export const createDmMessageThunk = (userId, dm_message_channelId, message, images) => async dispatch => {
    const request = await fetch("/api/dm_message/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            message: message,
            last_update: Date(),
            currChannelId: dm_message_channelId,
            userId: userId,
            images: images
        }),
    });

    const response = await request.json();

    dispatch(addMessage(response));
};


export const editDmMessageThunk = (dm_messageId, dm_messageToEdit) => async dispatch => {
    const request = await fetch(`/api/dm_message/${dm_messageId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            message: dm_messageToEdit,
            last_update: Date()
        }),
    });

    const response = await request.json();

    dispatch(editMessage(response));
};


export const deleteDmMessageDataThunk = dm_messageId => async (dispatch) => {
    await fetch(`/api/dm_message/${dm_messageId}`, {
        method: "DELETE",
    });

    dispatch(deleteMessage(dm_messageId));
};


//! REDUCER

const messagesReducer = (state = initialState, action) => {
    const currentState = { ...state };

    switch (action.type) {
        case "SET_VIEWING_CHANNEL": {
            currentState.viewingChannel = true;
            currentState.viewingDm = false;
            currentState.currChannelId = action.payload;

            return currentState;
        };

        case "SET_VIEWING_DM": {
            currentState.viewingChannel = false;
            currentState.viewingDm = true;
            currentState.currChannelId = action.payload;

            return currentState;
        };

        case "POPULATE_CURRENT_MESSAGES": {
            currentState.currentMessages = action.payload;

            return currentState;
        };

        case "ADD_MESSAGE": {
            currentState.currentMessages.push(action.payload);

            return currentState;
        };

        case 'DELETE_MESSAGE': {
            const messagesCopy = [ ...currentState.currentMessages ];

            for (let i = 0; i < messagesCopy.length; i++) {
                if (messagesCopy[i].id === action.payload){
                    messagesCopy.splice(i, 1);

                    currentState.currentMessages = messagesCopy;

                    return currentState;
                };
            };

            return currentState;
        };

        case "EDIT_MESSAGE": {
            currentState.currentMessages.forEach((msg, i) => {
                if (msg.id === action.payload.id)
                    currentState.currentMessages[i] = action.payload;
            });

            return currentState;
        };

        case "ADD_USER_EMAIL": {
            currentState.usersToAdd.push(action.payload);

            return currentState;
        };

        case "ADD_MESSAGE_IMG": {
            currentState.imagesToAdd.push(action.payload);

            return currentState;
        };

        case 'DELETE_MESSAGE_IMG': {
            for (let i = 0; i < currentState.imagesToAdd.length; i++) {
                if (currentState.imagesToAdd[i] === action.payload) currentState.imagesToAdd.splice(i, 1);

                return currentState;
            };

            return currentState;
        };

        case 'CLEAR_USER_EMAILS': {
            currentState.usersToAdd = [];

            return currentState;
        };

        case "CLEAR_MESSAGE_IMGS": {
            currentState.imagesToAdd = [];

            return currentState;
        };

        case 'SET_CURR_IMG_URL': {
            currentState.currImgUrl = action.payload;

            return currentState;
        };

        case 'CLEAR_CURR_IMG_URL': {
            currentState.currImgUrl = '';

            return currentState;
        };

        case "CLEAR_CHANNEL_MESSAGE_DATA": {
            currentState.currentMessages = [];

            return currentState;
        };

        default:
            return currentState;
    };
};

export default messagesReducer;
