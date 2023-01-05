const initialState = {};


// ACTION CREATORS

export const populateDmMessageChannelData = (responseJSON) => {
    return {
        type: 'DMMESSAGE_CHANNEL_DATA',
        payload: responseJSON
    };
};


export const clearDmMessageChannelData = () => {
    return {
        type: 'CLEAR_DMMESSAGE_CHANNEL_DATA'
    };
};


// THUNKS

export const createDmMessageChannelThunk = (organizationId, ownerId) => async (dispatch) => {
    const request = await fetch(`/api/dmMessage_channels`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            organization_id: organizationId,
            ownerId: ownerId
        })
    });

    const responseJSON = await request.json();

    dispatch(populateDmMessageChannelData(responseJSON));
};


export const addUserToDmMessageChannelThunk = (dmMessageChannelId, userToAddId) => async (dispatch) => {
    const request = await fetch(`/api/dmMessage_channels/new_user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            dmMessage_channelId: dmMessageChannelId,
            userId: userToAddId
        })
    });

    const responseJSON = await request.json();

    dispatch(populateDmMessageChannelData(responseJSON));
};


export const fetchDmMessageChannelDataThunk = (dmMessage_channelId) => async (dispatch) => {
    const request = await fetch(`/api/dmMessage_channels/${dmMessage_channelId}`, {
        method: 'GET'
    });

    const responseJSON = await request.json();

    dispatch(populateDmMessageChannelData(responseJSON));
};


export const removeDmMessageChannelUserThunk = (dmMessageChannelId, userToRemoveId) => async (dispatch) => {
    const request = await fetch(`/api/dmMessage_channels/${dmMessageChannelId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userId: userToRemoveId
        })
    });

    const responseJSON = await request.json();

    dispatch(populateDmMessageChannelData(responseJSON));
};


export const deleteDmMessageChannelThunk = (dmMessageChannelId) => async () => {
    await fetch(`/api/dmMessage_channels/${dmMessageChannelId}`, {
        method: 'DELETE',
    });
};


// REDUCER

const dmMessageChannelReducer = (state = initialState, action) => {
    const currentState = { ...state };

    switch (action.type) {
        case 'DMMESSAGE_CHANNEL_DATA': {
            for (let key in action.payload) currentState[key] = action.payload[key]

            return currentState;
        };

        case 'CLEAR_DMMESSAGE_CHANNEL_DATA': return initialState;

        default: return currentState;
    };
};

export default dmMessageChannelReducer;