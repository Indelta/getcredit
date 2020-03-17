import { SET_SCHEMAS } from '../constants/actionTypes';
const INITIAL_STATE = [];


export default function SchemasReducer (state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_SCHEMAS: {
            return [...action.payload]
        }
        default: return state;
    }
}