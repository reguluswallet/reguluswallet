import {TOGGLE_TOUCH_ID, TOGGLE_PUSH_NOTIFICATIONS} from '../constants/types';

const INITIAL_STATE = {
    touch_id: false,
    push_notifications: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TOGGLE_TOUCH_ID:
            return {...state, touch_id: !state.touch_id};
        case TOGGLE_PUSH_NOTIFICATIONS:
            return {...state, push_notifications: !state.push_notifications};
    }

    return state;
}