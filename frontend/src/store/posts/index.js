import Axios from '../../axios';

//////////
// REDUCER
//////////

export const posts = (
  state = {
    data: [], // data that is shown to user (gets contents from the stores below, depending on the filter)
    storeAll: [],
    storeLiked: [],
    storeFriends: [],
    storeFollowing: [],
    storeOwn: [],
    filter: 'ALL',
    triggerReload: 'false',
  },
  action
) => {
  switch (action.type) {
    case 'POSTS_TRIGGER_RELOAD':
      return { ...state, ...{ triggerReload: !state.triggerReload } };
    case 'POSTS_SET_FILTER':
      let filteredData = [];
      switch (action.payload) {
        case 'ALL':
          filteredData = state.storeAll;
          break;
        case 'LIKED':
          filteredData = state.storeLiked;
          break;
        case 'FRIENDS':
          filteredData = state.storeFriends;
          break;
        case 'FOLLOWING':
          filteredData = state.storeFollowing;
          break;
        default:
          filteredData = state.storeAll;
          break;
      }
      return { ...state, ...{ filter: action.payload, data: filteredData } };
    case 'POSTS_ADD':
      // set to "null" if array is empty (used for loading indicator)
      let checkedInput =
        action.payload.posts.length === 0 ? null : action.payload.posts;

      // put data in correct place
      let newData = {};
      switch (action.payload.filter) {
        case 'ALL':
          newData = {
            storeAll: checkedInput,
          };
          break;
        case 'OWN':
          newData = {
            storeOwn: checkedInput,
          };
          break;
        case 'LIKED':
          newData = {
            storeLiked: checkedInput,
          };
          break;
        case 'FRIENDS':
          newData = {
            storeFriends: checkedInput,
          };
          break;
        case 'FOLLOWING':
          newData = {
            storeFollowing: checkedInput,
          };
          break;
        default:
          newData = {
            storeAll: checkedInput,
          };
          break;
      }
      // update UI data if the filter is still the same as when the request was sent
      if (state.filter === action.payload.filter) {
        newData = { ...newData, ...{ data: checkedInput } };
      }
      // update state
      return { ...state, ...newData };
    case 'POSTS_REMOVE_POST':
      let removedState = state.data.filter(
        (post) => post.id !== action.payload
      );
      return { ...state, ...{ data: removedState } };
    case 'POSTS_TOGGLE_LIKE':
      let toggledState = state.data.map((post) => {
        if (post.id === action.payload) {
          post.logged_in_user_liked = !post.logged_in_user_liked;
        }
        return post;
      });
      return { ...state, ...{ data: toggledState } };
    default:
      return state;
  }
};

//////////
// ACTIONS
//////////
export const triggerReload = () => {
  return { type: 'POSTS_TRIGGER_RELOAD' };
};

export const setFilter = (filter) => {
  return { type: 'POSTS_SET_FILTER', payload: filter };
};

export const addPosts = (filter, posts) => {
  return { type: 'POSTS_ADD', payload: { filter: filter, posts: posts } };
};

export const removePost = (postID) => {
  return { type: 'POSTS_REMOVE_POST', payload: postID };
};

export const toggleLike = (postID) => {
  return { type: 'POSTS_TOGGLE_LIKE', payload: postID };
};

//////////
// API HANDLING
//////////

export const apiPostsGet = (token, filter = 'ALL', page = null) => (
  dispatch
) => {
  // check if token is valid
  if (!token) {
    console.log('invalid token');
    return false;
  }

  // prepare data
  let url = 'social/posts/' + (page !== null ? page : '');
  if (filter === 'LIKED') url += 'likes/';
  else if (filter === 'FRIENDS') url += 'friends/';
  else if (filter === 'FOLLOWING') url += 'following/';
  else if (filter === 'OWN') url += 'me/';

  const auth = 'Bearer ' + token;
  const contents = { headers: { Authorization: auth } };

  Axios.get(url, contents)
    .then((response) => {
      dispatch(addPosts(filter, response.data));
      console.log('Posts retrieved');
    })
    .catch((error) => {
      console.log('apiPostsGet', error.response.data);
    });
};

export const apiPostCreate = (token, postData) => (dispatch) => {
  // check if token is valid
  if (!token) {
    console.log('invalid token');
    return false;
  }

  // prepare data
  const url = `social/posts/`;
  const auth = 'Bearer ' + token;
  const headers = {
    headers: { Authorization: auth, 'Content-Type': 'multipart/form-data' },
  };

  Axios.post(url, postData, headers)
    .then((response) => {
      dispatch(triggerReload());
      console.log('Post created');
    })
    .catch((error) => {
      console.log('apiPostCreate', error.response.data);
    });
};

export const apiPostDelete = (token, postID) => (dispatch) => {
  // check if token is valid
  if (!token) {
    console.log('invalid token');
    return false;
  }

  // prepare data
  const url = `social/posts/${postID}/`;
  const auth = 'Bearer ' + token;
  const headers = { headers: { Authorization: auth } };

  Axios.delete(url, headers)
    .then((response) => {
      // quick UI update
      dispatch(removePost(postID));
      // trigger update from server
      dispatch(triggerReload());
      console.log('Post deleted');
    })
    .catch((error) => {
      console.log('apiPostDelete', error.response.data);
    });
};

export const apiPostUpdate = (token, id, postData) => (dispatch) => {
  // check if token is valid
  if (!token) {
    console.log('invalid token');
    return false;
  }

  // prepare data
  const url = `social/posts/${id}/`;
  const auth = 'Bearer ' + token;
  const headers = {
    headers: { Authorization: auth, 'Content-Type': 'multipart/form-data' },
  };

  Axios.patch(url, postData, headers)
    .then((response) => {
      // trigger update from server
      dispatch(triggerReload());
      console.log('Post updated');
    })
    .catch((error) => {
      console.log('apiPostUpdate', error.response.data);
    });
};

export const apiPostToggleLike = (token, postID, postContent) => (dispatch) => {
  // check if token is valid
  if (!token) {
    console.log('invalid token');
    return false;
  }

  // prepare data
  const url = `social/posts/toggle-like/${postID}/`;
  const auth = 'Bearer ' + token;
  const headers = { headers: { Authorization: auth } };
  const data = { content: postContent };

  Axios.post(url, data, headers)
    .then((response) => {
      // quick UI update
      dispatch(toggleLike(postID));
      // trigger update from server
      dispatch(triggerReload());
      console.log('Post like toggled');
    })
    .catch((error) => {
      console.log('likePost', error.response.data);
    });
};

export const apiPostComment = (token, postID, commentContent) => (dispatch) => {
  // check if token is valid
  if (!token) {
    console.log('invalid token');
    return false;
  }

  // prepare data
  const url = `social/comments/${postID}/`;
  const auth = 'Bearer ' + token;
  const headers = { headers: { Authorization: auth } };
  const data = { content: commentContent };

  Axios.post(url, data, headers)
    .then((response) => {
      // trigger update from server
      dispatch(triggerReload());
      console.log('Post comment added');
    })
    .catch((error) => {
      console.log('postComment', error.response.data);
    });
};
