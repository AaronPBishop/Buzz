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


// THUNKS

export const createOrgThunk = (name, ownerId, img) => async (dispatch) => {
    const request = await fetch(`/api/organizations`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name,
            owner_id: ownerId,
            org_image: img
        })
    });

    const responseJSON = await request.json();
    const orgData = responseJSON;

    dispatch(populateOrgData(orgData));
};


export const addUserToOrgThunk = (orgId, userToAddId) => async (dispatch) => {
    const request = await fetch(`/api/organizations/new_user`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            orgId,
            userId: userToAddId
        })
    });

    const responseJSON = await request.json();
    const orgData = responseJSON;

    dispatch(populateOrgData(orgData));
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
            currentState[action.payload.name] = action.payload;

            return currentState;
        };

        case 'CLEAR_ORG_DATA': return initialState;

        default: return currentState;
    };
};

export default organizationReducer;