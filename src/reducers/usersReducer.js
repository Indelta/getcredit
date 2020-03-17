import { GET_USER, LOG_OUT, GET_USERS, ADD_USER, DELETE_USER } from '../constants/actionTypes';

const INITIAL_STATE = [];

const getUser = (state, action) => [action.payload];
const logOut = () => INITIAL_STATE;

const usersReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_USER: {
            return getUser(state, action);
        }
        case LOG_OUT: {
            return logOut();
        }
        case GET_USERS: {
            return action.payload;
        }
        case ADD_USER: {
            return [...state, action.payload];
        }
        case DELETE_USER: {
            return state; 
        }
        default : return state
    }
}

export default usersReducer;