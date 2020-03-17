import { GET_USER, LOG_OUT, GET_USERS, ADD_USER, DELETE_USER } from '../constants/actionTypes';

const getUser = user => ({
    type: GET_USER,
    payload: user
});

const getUsers = usersArray => ({
    type: GET_USERS,
    payload: usersArray
});
const addUser = userObj => ({
    type: ADD_USER,
    payload: userObj
});
const deleteUser = userId => ({
    type: DELETE_USER,
    payload: userId
});

const logOut = () => ({
    type: LOG_OUT
});

export {
    getUser,
    logOut,
    getUsers,
    addUser,
    deleteUser
};