import { IS_VISIBLE_DEFAULT_THANKYOU_PAGE } from '../constants/actionTypes';

const change_visible_default_thankyou_page = bool => ({
    type: IS_VISIBLE_DEFAULT_THANKYOU_PAGE,
    payload: bool
});

export {
    change_visible_default_thankyou_page
}