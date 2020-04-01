import { IS_VISIBLE_POPUP } from '../constants/actionTypes';

const changeVisiblePopup = (bul, flag = false) => {
    return {
        type: IS_VISIBLE_POPUP,
        payload: { isVisible: bul, isBanner: flag }
    }
}

export { changeVisiblePopup }