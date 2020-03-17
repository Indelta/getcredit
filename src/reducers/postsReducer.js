import { ADD_POST, UPDATE_POSTS } from '../constants/actionTypes';

const addPost = (state, action) => [...state, action.payload];
const updatePosts = (state, action) => [...action.payload];


const INITIAL_STATE = [];
const postsReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ADD_POST : {
            return addPost(state, action);
        }
        case UPDATE_POSTS: {
            return updatePosts(state, action);
        }
        default : return state;
    }
}

export default postsReducer;