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


export const populateCurrMessages = (messagesArr) => {
    return {
        type: 'POPULATE_CURRENT_MESSAGES',
        payload: messagesArr
    };
};


const messagesReducer = (state = initialState, action) => {
    const currentState = { ...state };

    switch (action.type) {
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

            return currentState;
        };

        default: return currentState;
    };
};

export default messagesReducer;