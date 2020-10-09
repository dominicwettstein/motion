import Axios from '../../axios';
import { apiPostsGet } from '../posts';

//////////
// REDUCER
//////////

export const user = (
  state = {
    token: null,
    tokenRefresh: null,
    signUpOK: false,
    signUpEmail: '',
    registrationOK: false,
    pwResetSentOK: false,
    pwResetEmail: '',
    pwResetOK: false,
    actionStatusOK: true,
    actionStatusMessage: '',
    userData: {},
    following: [],
    followers: [],
    friends: [],
    requests: [],
  },
  action
) => {
  switch (action.type) {
    case 'USER_ADD_TOKEN':
      localStorage.setItem('motionToken', action.payload);
      return {
        ...state,
        ...{
          token: action.payload,
          actionStatusOK: true,
          actionStatusMessage: '',
        },
      };
    case 'USER_ADD_TOKEN_REFRESH':
      localStorage.setItem('motionTokenRefresh', action.payload);
      return {
        ...state,
        ...{
          tokenRefresh: action.payload,
          actionStatusOK: true,
          actionStatusMessage: '',
        },
      };
    case 'USER_SIGN_UP':
      return {
        ...state,
        ...{
          signUpOK: true,
          signUpEmail: action.payload,
          actionStatusOK: true,
          actionStatusMessage: '',
        },
      };
    case 'USER_REGISTER':
      return {
        ...state,
        ...{
          registrationOK: true,
          actionStatusOK: true,
          actionStatusMessage: '',
        },
      };
    case 'USER_RESET_PW':
      return {
        ...state,
        ...{
          pwResetSentOK: true,
          pwResetEmail: action.payload,
          actionStatusOK: true,
          actionStatusMessage: '',
        },
      };
    case 'USER_RESET_PW_DONE':
      return {
        ...state,
        ...{
          pwResetOK: true,
          actionStatusOK: true,
          actionStatusMessage: '',
        },
      };
    case 'USER_SET_ACTION_STATUS':
      return {
        ...state,
        ...{
          actionStatusOK: action.payload.actionStatusOK,
          actionStatusMessage: action.payload.actionStatusMessage,
        },
      };
    case 'USER_RESET_AUTH_STATUS':
      return {
        ...state,
        ...{
          signUpOK: false,
          registrationOK: false,
          pwResetSentOK: false,
          pwResetOK: false,
        },
      };
    case 'USER_ADD_DATA':
      return {
        ...state,
        ...{
          userData: action.payload,
        },
      };
    case 'USER_ADD_FOLLOWING':
      return {
        ...state,
        ...{
          following: action.payload.length === 0 ? null : action.payload,
        },
      };
    case 'USER_ADD_FOLLOWERS':
      return {
        ...state,
        ...{
          followers: action.payload.length === 0 ? null : action.payload,
        },
      };
    case 'USER_ADD_FRIENDS':
      return {
        ...state,
        ...{
          friends: action.payload.length === 0 ? null : action.payload,
        },
      };
    case 'USER_ADD_REQUESTS':
      return {
        ...state,
        ...{
          requests: action.payload,
        },
      };
    default:
      return state;
  }
};

//////////
// ACTIONS
//////////

export const setToken = (token) => {
  return { type: 'USER_ADD_TOKEN', payload: token };
};

export const setTokenRefresh = (token) => {
  return { type: 'USER_ADD_TOKEN_REFRESH', payload: token };
};

export const userAdded = (email) => {
  return { type: 'USER_SIGN_UP', payload: email };
};

export const userRegistered = () => {
  return { type: 'USER_REGISTER' };
};

export const userPasswordReset = (email) => {
  return { type: 'USER_RESET_PW', payload: email };
};

export const userPasswordResetDone = () => {
  return { type: 'USER_RESET_PW_DONE' };
};

export const userSetStatus = (actionStatusOK, actionStatusMessage) => {
  return {
    type: 'USER_SET_ACTION_STATUS',
    payload: {
      actionStatusOK: actionStatusOK,
      actionStatusMessage: actionStatusMessage,
    },
  };
};

export const userResetAuthStatus = () => {
  return { type: 'USER_RESET_AUTH_STATUS' };
};

export const addUserData = (data) => {
  return { type: 'USER_ADD_DATA', payload: data };
};

export const addUserFollowing = (following) => {
  return { type: 'USER_ADD_FOLLOWING', payload: following };
};

export const addUserFollowers = (followers) => {
  return { type: 'USER_ADD_FOLLOWERS', payload: followers };
};

export const addUserFriends = (friends) => {
  return { type: 'USER_ADD_FRIENDS', payload: friends };
};

export const addUserRequests = (requests) => {
  return { type: 'USER_ADD_REQUESTS', payload: requests };
};

//////////
// API HANDLING
//////////

export const apiUserVerifyToken = (token) => (dispatch) => {
  const url = 'auth/token/verify/';
  const msgData = {
    token: token,
  };

  Axios.post(url, msgData)
    .then((response) => {
      const message = 'Token verification successful.';
      dispatch(setToken(token));
      dispatch(apiUserGetAll(token));
      console.log(message);
    })
    .catch((error) => {
      const message = 'Token invalid. Please log in.';
      dispatch(setToken(''));
      console.log(message);
    });
};

export const apiUserLogin = (email, password) => (dispatch) => {
  const url = 'auth/token/';
  const msgData = {
    email: email,
    password: password,
  };

  Axios.post(url, msgData)
    .then((response) => {
      const message = 'Login successful.';
      const token = response.data.access;
      const tokenRefresh = response.data.refresh;
      dispatch(setToken(token));
      dispatch(setTokenRefresh(tokenRefresh));
      dispatch(apiUserGetAll(token));
      console.log(message);
    })
    .catch((error) => {
      const message = 'Login failed. Please try again.';
      dispatch(userSetStatus(false, message));
      console.log(error.response.data);
    });
};

export const apiUserSignUp = (email) => (dispatch) => {
  const url = 'auth/registration/';
  const msgData = {
    email: email,
  };

  Axios.post(url, msgData)
    .then((response) => {
      const message = 'Registration successful.';
      dispatch(userAdded(email));
      console.log(message);
    })
    .catch((error) => {
      const message = 'Sign up failed. Please try again.';
      dispatch(userSetStatus(false, message));
      console.log(error.response.data);
    });
};

export const apiUserVerify = (
  email,
  userName,
  code,
  password,
  passwordRepeat,
  firstName,
  lastName
) => (dispatch) => {
  const url = 'auth/registration/validation/';
  const msgData = {
    email: email,
    username: userName,
    code: code,
    password: password,
    password_repeat: passwordRepeat,
    first_name: firstName,
    last_name: lastName,
  };

  Axios.patch(url, msgData)
    .then((response) => {
      const message = 'Registration successful.';
      dispatch(userRegistered());
      console.log(message);
    })
    .catch((error) => {
      const message = 'Registration failed. Please try again.';
      dispatch(userSetStatus(false, message));
      console.log(error.response.data);
    });
};

export const apiUserPwReset = (email) => (dispatch) => {
  const url = 'auth/password-reset/';
  const msgData = {
    email: email,
  };

  Axios.post(url, msgData)
    .then((response) => {
      const message = 'PW reset requested.';
      dispatch(userPasswordReset(email));
      console.log(message);
    })
    .catch((error) => {
      const message = 'Password reset did not work. Please try again.';
      dispatch(userSetStatus(false, message));
      console.log(error.response.data);
    });
};

export const apiUserPwResetVerify = (email, code, password, passwordRepeat) => (
  dispatch
) => {
  const url = 'auth/password-reset/validation/';
  const msgData = {
    email: email,
    code: code,
    password: password,
    password_repeat: passwordRepeat,
  };

  Axios.patch(url, msgData)
    .then((response) => {
      const message = 'Password reset successful.';
      dispatch(userPasswordResetDone());
      console.log(message);
    })
    .catch((error) => {
      const message = 'Password reset failed. Please try again.';
      dispatch(userSetStatus(false, message));
      console.log(error.response.data);
    });
};

export const apiUserGetAll = (token) => (dispatch) => {
  dispatch(apiUserGetData(token));
  dispatch(apiUserGetRequests(token));
  dispatch(apiUserGetFollowing(token));
  dispatch(apiUserGetFollowers(token));
  dispatch(apiUserGetFriends(token));
  dispatch(apiPostsGet(token, 'ALL'));
};

export const apiUserGetData = (token) => (dispatch) => {
  // check if token is valid
  if (!token) {
    console.log('invalid token');
    return false;
  }

  // prepare data
  const url = 'users/me/';
  const auth = 'Bearer ' + token;
  const headers = { headers: { Authorization: auth } };

  Axios.get(url, headers)
    .then((response) => {
      dispatch(addUserData(response.data));
      console.log('User data retrieved');
    })
    .catch((error) => {
      console.log('apiUserGetData', error.response.data);
    });
};

export const apiUserUpdateProfile = (token, profileData) => (dispatch) => {
  // check if token is valid
  if (!token) {
    console.log('invalid token');
    return false;
  }

  // prepare data
  const url = `users/me/`;
  const auth = 'Bearer ' + token;
  const headers = {
    headers: { Authorization: auth, 'Content-Type': 'multipart/form-data' },
  };

  Axios.patch(url, profileData, headers)
    .then((response) => {
      // trigger update from server
      dispatch(apiUserGetData(token));
      console.log('Profile updated');
    })
    .catch((error) => {
      console.log('apiUserUpdateProfile', error.response.data);
    });
};

export const apiUserDeleteProfile = (token) => (dispatch) => {
  // check if token is valid
  if (!token) {
    console.log('invalid token');
    return false;
  }

  // prepare data
  const url = `users/me/`;
  const auth = 'Bearer ' + token;
  const headers = {
    headers: { Authorization: auth },
  };

  Axios.delete(url, headers)
    .then((response) => {
      localStorage.clear();
      window.location.reload();

      console.log('Profile deleted');
    })
    .catch((error) => {
      console.log('apiUserDeleteProfile', error.response.data);
    });
};

export const apiUserGetFollowing = (token) => (dispatch) => {
  // check if token is valid
  if (!token) {
    console.log('invalid token');
    return false;
  }

  // prepare data
  const url = 'social/followers/following/';
  const auth = 'Bearer ' + token;
  const headers = { headers: { Authorization: auth } };

  Axios.get(url, headers)
    .then((response) => {
      dispatch(addUserFollowing(response.data));
      console.log('Following retrieved');
    })
    .catch((error) => {
      console.log('apiUserGetFollowing', error.response.data);
    });
};

export const apiUserGetFollowers = (token) => (dispatch) => {
  // check if token is valid
  if (!token) {
    console.log('invalid token');
    return false;
  }

  // prepare data
  const url = 'social/followers/followers/';
  const auth = 'Bearer ' + token;
  const headers = { headers: { Authorization: auth } };

  Axios.get(url, headers)
    .then((response) => {
      dispatch(addUserFollowers(response.data));
      console.log('Followers retrieved');
    })
    .catch((error) => {
      console.log('apiUserGetFollowers', error.response.data);
    });
};

export const apiUserGetFriends = (token) => (dispatch) => {
  // check if token is valid
  if (!token) {
    console.log('invalid token');
    return false;
  }

  // prepare data
  const url = 'social/friends/';
  const auth = 'Bearer ' + token;
  const headers = { headers: { Authorization: auth } };

  Axios.get(url, headers)
    .then((response) => {
      dispatch(addUserFriends(response.data));
      console.log('Friends retrieved');
    })
    .catch((error) => {
      console.log('apiUserGetFriends', error.response.data);
    });
};

export const apiUserGetRequests = (token) => (dispatch) => {
  // check if token is valid
  if (!token) {
    console.log('invalid token');
    return false;
  }

  // prepare data
  const url = 'social/friends/requests/';
  const auth = 'Bearer ' + token;
  const headers = { headers: { Authorization: auth } };

  Axios.get(url, headers)
    .then((response) => {
      dispatch(addUserRequests(response.data));
      console.log('Requests retrieved');
    })
    .catch((error) => {
      console.log('apiUserGetRequests', error.response.data);
    });
};

export const apiUserFollow = (token, ownUserName, followID) => (dispatch) => {
  // check if token is valid
  if (!token) {
    console.log('invalid token');
    return false;
  }

  // prepare data
  const url = `social/followers/toggle-follow/${followID}/`;
  const auth = 'Bearer ' + token;
  const headers = { headers: { Authorization: auth } };
  const data = { username: ownUserName };

  Axios.post(url, data, headers)
    .then((response) => {
      dispatch(apiUserGetFollowing(token));
      console.log('User follow toggled');
    })
    .catch((error) => {
      console.log('apiUserFollow', error.response.data);
    });
};

export const apiUserSendRequest = (token, ownID, friendID) => (dispatch) => {
  // check if token is valid
  if (!token) {
    console.log('invalid token');
    return false;
  }

  // prepare data
  const url = `social/friends/request/${friendID}/`;
  const auth = 'Bearer ' + token;
  const headers = { headers: { Authorization: auth } };
  const data = { requester: ownID, receiver: friendID };

  Axios.post(url, data, headers)
    .then((response) => {
      dispatch(apiUserGetRequests(token));
      dispatch(apiUserGetFriends(token));
      console.log('Friend request sent.');
    })
    .catch((error) => {
      console.log('apiUserSendRequest', error.response.data);
    });
};

export const apiUserDeleteRequest = (token, requestID) => (dispatch) => {
  // check if token is valid
  if (!token) {
    console.log('invalid token');
    return false;
  }

  // prepare data
  const url = `social/friends/requests/${requestID}/`;
  const auth = 'Bearer ' + token;
  const headers = { headers: { Authorization: auth } };

  Axios.delete(url, headers)
    .then((response) => {
      dispatch(apiUserGetRequests(token));
      dispatch(apiUserGetFriends(token));
      console.log('Friend request deleted.');
    })
    .catch((error) => {
      console.log('apiUserDeleteRequest', error.response.data);
    });
};

export const apiUserConfirmRequest = (token, requestID) => (dispatch) => {
  // check if token is valid
  if (!token) {
    console.log('invalid token');
    return false;
  }

  // prepare data
  const url = `social/friends/requests/${requestID}/`;
  const auth = 'Bearer ' + token;
  const headers = { headers: { Authorization: auth } };
  const data = { status: 'A' };

  Axios.patch(url, data, headers)
    .then((response) => {
      dispatch(apiUserGetRequests(token));
      dispatch(apiUserGetFriends(token));
      console.log('Friend request confirmed.');
    })
    .catch((error) => {
      console.log('apiUserConfirmRequest', error.response.data);
    });
};
