const initialState = { currentMessages: [] };


export const populateCurrMessages = (messagesArr) => {
    return {
        type: 'POPULATE_CURRENT_MESSAGES',
        payload: messagesArr
    };
};


const messagesReducer = (state = initialState, action) => {
    const currentState = { ...state };

    switch (action.type) {
        case 'POPULATE_CURRENT_MESSAGES': {
            currentState.currentMessages = action.payload.sort((a, b) => a.id - b.id);

            return currentState;
        };

        default: return currentState;
    };
};

export default messagesReducer;