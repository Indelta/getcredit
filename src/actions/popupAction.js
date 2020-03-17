import { IS_VISIBLE_POPUP } from '../constants/actionTypes';

const changeVisiblePopup = bul => {
    return {
        type: IS_VISIBLE_POPUP,
        payload: bul
    }
}

export { changeVisiblePopup }