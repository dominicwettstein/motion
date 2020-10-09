import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// import reducers
import { user } from './user';
import { users } from './users';
import { posts } from './posts';

// combine reducers and create store
const combinedReducers = combineReducers({ user, users, posts });
const store = createStore(combinedReducers, applyMiddleware(thunk));

// export store
export default store;
