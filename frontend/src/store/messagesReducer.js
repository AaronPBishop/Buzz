const initialState = { 
    viewingChannel: false, 
    viewingDm: false, 
    currChannelId: null,
    currentMessages: [] 
};


export const setViewingChannel = (currChannelId) => {
    return {
        type: 'SET_VIEWING_CHANNEL',
        payload: currChannelId
    };
};


export const setViewingDm = (currChannelId) => {
    return {
        type: 'SET_VIEWING_DM',
        payload: currChannelId
    };
};

export const populateCurrMessages = messagesArr => {
    return {
        type: "POPULATE_CURRENT_MESSAGES",
        payload: messagesArr,
    };
};

export const clearChannelMessageData = () => {
    return {
        type: "CLEAR_CHANNEL_MESSAGE_DATA",
    };
};

export const createChannelMessageThunk =
    (ownerId, channelId, message) => async dispatch => {
        const request = fetch("/api/channelMessage", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                message: message,
                last_update: Date(),
                channel_id: channelId,
                user_id: ownerId,
            }),
        });
        const response = await request.json();

        dispatch(populateCurrMessages(response));
    };

export const editChannelMessageThunk =
    (channelMessageIdToEdit, channelMessageToEdit) => async dispatch => {
        const request = fetch(`/api/channelMessage/${channelMessageIdToEdit}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                message: channelMessageToEdit,
                last_update: Date(),
            }),
        });

        const response = await request.json();

        dispatch(populateChannelData(response));
    };

const messagesReducer = (state = initialState, action) => {
    const currentState = { ...state };

    switch (action.type) {
<<<<<<< HEAD
        case 'SET_VIEWING_CHANNEL': {
            currentState.viewingChannel = true;
            currentState.viewingDm = false;

            currentState.currChannelId = action.payload;

            return currentState;
        };
        
        case 'SET_VIEWING_DM': {
            currentState.viewingChannel = false;
            currentState.viewingDm = true;

            currentState.currChannelId = action.payload;

            return currentState;
        };

        case 'POPULATE_CURRENT_MESSAGES': {
            currentState.currentMessages = action.payload.sort((a, b) => a.id - b.id);
=======
        case "POPULATE_CURRENT_MESSAGES": {
            currentState.currentMessages = action.payload.sort(
                (a, b) => a.id - b.id
            );
>>>>>>> channelMessages_comp

            return currentState;
        }
        case "CLEAR_CHANNEL_MESSAGE_DATA":
            return initialState;

        default:
            return currentState;
    }
};

export default messagesReducer;
