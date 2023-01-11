const initialState = {};


// ACTION CREATORS

export const populateChannelData = (data) => {
    return {
        type: 'POPULATE_CHANNEL_DATA',
        payload: data
    };
};


export const clearChannelData = () => {
    return {
        type: 'CLEAR_CHANNEL_DATA'
    };
};


// THUNKS

export const getChannelThunk = (id) => async (dispatch) => {
    const request = await fetch(`/api/channels/${id}`, {
        method: 'GET'
    });

    const response = await request.json();

    dispatch(populateChannelData(response));
};


export const createChannelThunk = (channelName, associatedOrgId, ownerId) => async (dispatch) => {
    const request = await fetch('/api/channels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: channelName,
            organization_id: associatedOrgId,
            ownerId
        })
    });

    const response = await request.json();

    dispatch(populateChannelData(response));
};


export const editChannelThunk = (channelToEditId, channelNameToEdit, userToDeleteId) => async (dispatch) => {
    const request = await fetch(`/api/channels/${channelToEditId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userId: userToDeleteId,
            name: channelNameToEdit
        })
    });

    const response = await request.json();

    dispatch(populateChannelData(response));
};


export const deleteChannelThunk = (channelToDeleteId) => async (dispatch) => {
    await fetch(`/api/channels/${channelToDeleteId}`, {
        method: 'DELETE'
    });

    dispatch(clearChannelData());
};


// REDUCER

const channelReducer = (state = initialState, action) => {
    const currentState = { ...state };

    switch (action.type) {
        case 'POPULATE_CHANNEL_DATA': {
            for (let key in action.payload) currentState[key] = action.payload[key];

            return currentState;
        };

        case 'CLEAR_CHANNEL_DATA': return initialState;

        default: return currentState;
    };
};

export default channelReducer;
