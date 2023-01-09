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
        payload: messagesArr
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


// THUNKS

//*  Channel Messages

export const addUserToChannelThunk = (channelId, userToAddId) => async (dispatch) => {
    fetch('/api/channels/new_user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            channelId,
            userId: userToAddId
        })
    });
};

export const createChannelMessageThunk = (userId, channelId, message) => async dispatch => {
    const request = await fetch("/api/channelMessage/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            message: message,
            last_update: Date(),
            channelId: channelId,
            userId: userId,
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
        })
    });

    const response = await request.json();

    dispatch(addMessage(response));
};


export const deleteChannelMessageDataThunk = channelMessageId => async () => {
    await fetch(`/api/channelMessage/${channelMessageId}`, {
        method: "DELETE",
    });
};

//*  DM Messages

export const createDmMessageChannelThunk = (ownerId, organizationId, userEmails) => async (dispatch) => {
    const request = await fetch(`/api/dmMessage_channels/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            ownerId: ownerId,
            organization_id: organizationId,
            users: userEmails
        })
    });

    const responseJSON = await request.json();

    dispatch(setViewingDm(responseJSON.id));
};


export const createDmMessageThunk = (userId, dmMessage_channelId, message) => async dispatch => {
    const request = await fetch("/api/dmMessage/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            message: message,
            last_update: Date(),
            dmMessage_channelId: dmMessage_channelId,
            userId: userId
        })
    });

    const response = await request.json();

    dispatch(addMessage(response));
};

export const editDmMessageThunk = (dmMessageId, dmMessageToEdit) => async dispatch => {
    const request = await fetch(`/api/dmMessage/${dmMessageId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            message: dmMessageToEdit,
            last_update: Date(),
        }),
    });

    const response = await request.json();

    dispatch(addMessage(response));
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
