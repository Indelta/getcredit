import { UPDATE_UTMS } from '../constants/actionTypes';

const update_utms = utmsObj => ({
    type: UPDATE_UTMS,
    payload: utmsObj
});

export { update_utms };