import {RESET, TOGGLE_PASSCODE, TOGGLE_PUSH_NOTIFICATIONS, TOGGLE_TOUCH_ID} from "../constants/types";

const INITIAL_STATE = {
    touch_id: false,
    passcode: false,
    push_notifications: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TOGGLE_TOUCH_ID:
            return {...state, touch_id: !state.touch_id};
        case TOGGLE_PASSCODE:
            return {...state, passcode: !state.passcode};
        case TOGGLE_PUSH_NOTIFICATIONS:
            return {...state, push_notifications: !state.push_notifications};
        case RESET:
            return INITIAL_STATE;
    }

    return state;
}