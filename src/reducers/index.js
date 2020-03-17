import { combineReducers } from 'redux';
import postsReducer from './postsReducer';
import usersReducer from './usersReducer';
import utmsReducer from './utmsReducer';
import thankyouPagesReducer from './thankyouPagesReducer';
import popupReducer from './popupReducer';
import schemasReducer from './schemasReducer';
import geoReducer from './geoReducer';

const rootReducer = combineReducers({
    postsReducer,
    usersReducer,
    utmsReducer,
    thankyouPagesReducer,
    popupReducer,
    schemasReducer,
    geoReducer
});

export default rootReducer;