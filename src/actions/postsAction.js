import { ADD_POST, UPDATE_POSTS } from '../constants/actionTypes';

const addPost = newPost => ({
    type: ADD_POST,
    payload: newPost
});
const updatePosts = postsArray => ({
    type: UPDATE_POSTS,
    payload: postsArray
});

export {
    addPost,
    updatePosts
};