import Axios from '../../axios';

//////////
// REDUCER
//////////

export const users = (state = [], action) => {
  switch (action.type) {
    case 'USERS_ADD':
      return action.payload === [] ? null : action.payload;
    default:
      return state;
  }
};

//////////
// ACTIONS
//////////

export const usersAdd = (users) => {
  return { type: 'USERS_ADD', payload: users };
};

//////////
// API HANDLING
//////////

export const apiUsersGetAll = (token) => (dispatch) => {
  // check if token is valid
  if (!token) {
    console.log('invalid token');
    return false;
  }

  // prepare data
  const url = 'users/';
  const auth = 'Bearer ' + token;
  const contents = { headers: { Authorization: auth } };

  Axios.get(url, contents)
    .then((response) => {
      dispatch(usersAdd(response.data));
      console.log('Users retrieved');
    })
    .catch((error) => {
      console.log('apiUsersGetAll', error.response.data);
    });
};
