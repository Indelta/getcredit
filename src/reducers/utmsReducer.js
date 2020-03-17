import { UPDATE_UTMS } from '../constants/actionTypes';

const INITIAL_STATE = {};

const updateUtms = (state, action) => ({...action.payload});

const utmsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_UTMS: {
            return updateUtms(state, action);
        }
        default: return state
    }
}

export default utmsReducer;