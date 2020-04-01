import { IS_VISIBLE_POPUP } from '../constants/actionTypes';
const INIT_STATE = {
    isVisiblePopup: false,
    isFlag: false
}


const popupReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case IS_VISIBLE_POPUP: 
            return {...state, isVisiblePopup: action.payload.isVisible, isFlag: action.payload.isBanner}
        default: return state;
    }
}

export default popupReducer;