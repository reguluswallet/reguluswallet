import {TOGGLE_TOUCH_ID, TOGGLE_PUSH_NOTIFICATIONS} from '../constants/types';

export const ToggleTouchID = () => {
    return {type: TOGGLE_TOUCH_ID}
};

export const TogglePushNotifications = () => {
    return {type: TOGGLE_PUSH_NOTIFICATIONS}
};