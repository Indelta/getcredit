import { SET_GEO } from '../constants/actionTypes';

const INIT_STATE = {};

export default function (state = INIT_STATE, action) {
    switch(action.type) {
        case SET_GEO: 
            return {...state, ...action.payload}
        default: return state;
    }
}