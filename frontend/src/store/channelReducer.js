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
    const request = fetch(`/api/channels/${id}`, {
        method: 'GET'
    });

    const response = await request.json();

    dispatch(populateChannelData(response));
};


export const createChannelThunk = (channelName, associatedOrgId, ownerId) => async (dispatch) => {
    const request = fetch('/api/channels', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
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
    const request = fetch(`/api/channels/${channelToEditId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            userId: userToDeleteId,
            name: channelNameToEdit
        })
    });

    const response = await request.json();

    dispatch(populateChannelData(response));
};


export const deleteChannelThunk = (channelToDeleteId) => async (dispatch) => {
    fetch(`/api/channels/${channelToDeleteId}`, {
        method: 'DELETE'
    });

    dispatch(clearChannelData());
};


export const addUserToChannelThunk = (channelId, userToAddId) => async (dispatch) => {
    const request = fetch('/api/channels/new_user', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            channelId,
            userId: userToAddId
        })
    });

    const response = await request.json();

    dispatch(populateChannelData(response));
};


// REDUCER

const channelReducer = (state = initialState, action) => {
    const currentState = { ...state };

    switch (action) {
        case 'POPULATE_CHANNEL_DATA': {
            for (let key in action.payload) currentState[key] = action.payload[key];

            return currentState;
        };

        case 'CLEAR_CHANNEL_DATA': return initialState;

        default: return currentState;
    };
};

export default channelReducer;