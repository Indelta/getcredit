import { SET_SCHEMAS } from '../constants/actionTypes';

const set_schemas = newSchemas => {
    return { type: SET_SCHEMAS, payload: newSchemas }
}

export {
    set_schemas
}