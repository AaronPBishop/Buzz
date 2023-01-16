const initialState = {};


// ACTION CREATORS

export const populateOrgData = (orgData) => {
    return {
        type: 'POPULATE_ORG_DATA',
        payload: orgData
    };
};


export const clearOrgData = () => {
    return {
        type: 'CLEAR_ORG_DATA'
    };
};

export const clearChannel = (id) => {
    return {
        type: 'CLEAR_CHANNEL',
        payload: id
    };
};

export const clearDmChannel = (id) => {
    return {
        type: 'CLEAR_DM_CHANNEL',
        payload: id
    };
};


// CHANNEL THUNKS

export const createChannelThunk = (channelName, associatedOrgId, ownerId, isPublic, userEmails) => async (dispatch) => {
    await fetch('/api/channels/new_channel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: channelName,
            organization_id: associatedOrgId,
            ownerId,
            isPublic,
            users: userEmails
        })
    });
};


export const addUserToChannelThunk = (channelId, userToAddId) => async (dispatch) => {
    await fetch("/api/channels/new_user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            channelId,
            userId: userToAddId
        }),
    });
};


export const removeUserFromChannelThunk = (channelId, userToRemoveId) => async (dispatch) => {
    await fetch(`/api/channels/${channelId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            userId: userToRemoveId
        }),
    });
};


export const editChannelThunk = (channelToEditId, channelNameToEdit) => async (dispatch) => {
    await fetch(`/api/channels/${channelToEditId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: channelNameToEdit
        })
    });
};


export const deleteChannelThunk = (channelToDeleteId) => async (dispatch) => {
    await fetch(`/api/channels/${channelToDeleteId}`, {
        method: 'DELETE'
    });
};


// DM CHANNEL THUNKS

export const removeDmMessageChannelUserThunk = (dm_messageChannelId, userToRemoveId) => async (dispatch) => {
    await fetch(`/api/dm_message_channels/${dm_messageChannelId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userId: userToRemoveId
        })
    });
};


export const deleteDmMessageChannelThunk = (dm_messageChannelId) => async () => {
    await fetch(`/api/dm_message_channels/${dm_messageChannelId}`, {
        method: 'DELETE'
    });
};


// ORGANIZATION THUNKS

export const createOrgThunk = (name, ownerId, img) => async (dispatch) => {
    const request = await fetch(`/api/organizations/new_org`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name,
            userId: ownerId,
            orgImage: img
        })
    });

    const responseJSON = await request.json();
    const orgData = responseJSON;

    dispatch(populateOrgData(orgData));
};


export const addUserToOrgThunk = (orgId, userToAddEmail) => async (dispatch) => {
    const request = await fetch(`/api/organizations/new_user`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            orgId,
            email: userToAddEmail
        })
    });

    const responseJSON = await request.json();
    const orgData = responseJSON;

    dispatch(populateOrgData(orgData));
};


export const removeUserFromOrgThunk = (orgId, userToRemoveId) => async (dispatch) => {
    await fetch(`/api/organizations/${orgId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            userId: userToRemoveId
        }),
    });
};


export const fetchOrgDataThunk = (orgId) => async (dispatch) => {
    const request = await fetch(`/api/organizations/${orgId}`, {
        method: 'GET'
    });

    const responseJSON = await request.json();
    const orgData = responseJSON;

    dispatch(populateOrgData(orgData));
};


export const editOrgThunk = (orgId, orgNameToEdit, orgImgToEdit) => async (dispatch) => {
    const request = await fetch(`/api/organizations/${orgId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: orgNameToEdit,
            org_image: orgImgToEdit
        })
    });

    const responseJSON = await request.json();
    const orgData = responseJSON;

    dispatch(populateOrgData(orgData));
};


export const deleteOrgThunk = (orgId) => async () => {
    await fetch(`/api/organizations/${orgId}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    });
};


// REDUCER

const organizationReducer = (state = initialState, action) => {
    const currentState = { ...state };

    switch (action.type) {
        case 'POPULATE_ORG_DATA': {
            for (let key in action.payload) currentState[key] = action.payload[key];

            return currentState;
        };

        case 'CLEAR_CHANNEL': {
            const channelsCopy = [ ...currentState.organization_channels ];

            for (let i = 0; i < channelsCopy.length; i++) {
                if (channelsCopy[i].id === action.payload) {
                    channelsCopy.splice(i, 1);

                    currentState.organization_channels = channelsCopy;

                    return currentState;
                };
            };

            return currentState;
        };

        case 'CLEAR_DM_CHANNEL': {
            const dmChannelsCopy = [ ...currentState.organization_dm_message_channels ];

            for (let i = 0; i < dmChannelsCopy.length; i++) {
                if (dmChannelsCopy[i].id === action.payload) {
                    dmChannelsCopy.splice(i, 1);

                    currentState.organization_dm_message_channels = dmChannelsCopy;

                    return currentState;
                };
            };

            return currentState;
        };

        case 'CLEAR_ORG_DATA': return initialState;

        default: return currentState;
    };
};

export default organizationReducer;
