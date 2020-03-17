import { IS_VISIBLE_DEFAULT_THANKYOU_PAGE } from '../constants/actionTypes';

const DEFAULT_STATE = {
    isVisibleDefaultThankyouPage: false
};
const thankyouPagesReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case IS_VISIBLE_DEFAULT_THANKYOU_PAGE: {
            return {...state, isVisibleDefaultThankyouPage: action.payload};
        }
        default: return state;
    }
}

export default thankyouPagesReducer;