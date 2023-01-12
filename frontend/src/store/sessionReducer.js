const initialState = { user: null };

const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';


// ACTION CREATORS

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER
  };
};


// THUNKS


export const authenticate = () => async (dispatch) => {
  const request = await fetch('/api/auth/', {
    headers: { 'Content-Type': 'application/json' }
  });

  if (request.ok) {
    const data = await request.json();

    if (data.errors) return;

    dispatch(setUser(data));
  };
}


export const login = (email, password) => async (dispatch) => {
  const request = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      password
    })
  });


  if (request.ok) {
    const data = await request.json();

    dispatch(setUser(data));

    return null;
  } else if (request.status < 500) {
    const data = await request.json();

    if (data.errors) return data.errors;
  } else {
    return ['An error occurred. Please try again.']
  };
};


export const logout = () => async (dispatch) => {
  const request = await fetch('/api/auth/logout', {
    headers: { 'Content-Type': 'application/json' }
  });

  if (request.ok) dispatch(removeUser());
};


export const signUp = (username, firstName, lastName, email, password) => async (dispatch) => {
  const request = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_name: username,
      first_name: firstName,
      last_name: lastName,
      email,
      password
    }),
  });

  if (request.ok) {
    const data = await request.json();

    dispatch(setUser(data));

    return null;
  } else if (request.status < 500) {
    const data = await request.json();

    if (data.errors) return data.errors;
  } else {
    return ['An error occurred. Please try again.']
  };
};


export const getUserThunk = (userId) => async (dispatch) => {
  const request = await fetch(`/api/users/${userId}`, {
    method: 'GET'
  })

  const response = await request.json();

  dispatch(setUser(response));
};

export const editUserThunk = (user) => async (dispatch) => {
  const request = await fetch(`/api/users/${user.userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      bio: user.bio,
      email: user.email,
      first_name: user.firstName,
      last_name: user.lastName,
      profile_img: user.profileImage,
      user_name: user.username
    }),
  });

  if (request.ok) {
    const data = await request.json();
    dispatch(setUser(data));
  }
}

// REDUCER

const sessionReducer = (state = initialState, action) => {
  const currentState = { ...state };

  switch (action.type) {
    case SET_USER: {
      delete currentState.user;

      currentState.user = action.payload;

      return currentState;
    };

    case REMOVE_USER: return initialState;

    default: return currentState;
  };
};

export default sessionReducer;
