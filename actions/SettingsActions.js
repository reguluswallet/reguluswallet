import {TOGGLE_TOUCH_ID, TOGGLE_PUSH_NOTIFICATIONS, TOGGLE_PASSCODE} from '../constants/types';
import {NavigationActions} from 'react-navigation';

export const ToggleTouchID = () => {
    return {type: TOGGLE_TOUCH_ID}
};

export const TogglePasscode = () => {
    // return {type: TOGGLE_PASSCODE}
    return (dispatch, getState) => {
        let {passcode} = getState().settings;

        if (passcode) {
            dispatch({type: TOGGLE_PASSCODE});
        } else {
            dispatch(
                NavigationActions.navigate({
                    routeName: 'RequirePasscode'
                })
            );
        }
    }
};

export const TogglePushNotifications = () => {
    return {type: TOGGLE_PUSH_NOTIFICATIONS}
};