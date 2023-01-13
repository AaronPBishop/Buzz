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


export const editChannelThunk = (channelToEditId, channelNameToEdit, userToDeleteId) => async (dispatch) => {
    await fetch(`/api/channels/${channelToEditId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            userId: userToDeleteId,
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

export const removeDmMessageChannelUserThunk = (dmMessageChannelId, userToRemoveId) => async (dispatch) => {
    await fetch(`/api/dmMessage_channels/${dmMessageChannelId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userId: userToRemoveId
        })
    });
};


export const deleteDmMessageChannelThunk = (dmMessageChannelId) => async () => {
    await fetch(`/api/dmMessage_channels/${dmMessageChannelId}`, {
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


export const editOrgThunk = (orgId, userToRemoveId, orgNameToEdit, orgImgToEdit) => async (dispatch) => {
    const request = await fetch(`/api/organizations/${orgId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            userId: userToRemoveId,
            name: orgNameToEdit,
            org_image: orgImgToEdit
        })
    });

    const responseJSON = await request.json();
    const orgData = responseJSON;

    dispatch(populateOrgData(orgData));
};


export const deleteOrgThunk = (orgId, ownerId) => async () => {
    await fetch(`/api/organizations/${orgId}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            owner_id: ownerId
        })
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

        case 'CLEAR_ORG_DATA': return initialState;

        default: return currentState;
    };
};

export default organizationReducer;
