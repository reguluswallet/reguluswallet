import {
    LOCK,
    RESET,
    SET_COMPLETED_SETUP,
    SET_USER,
    TOGGLE_LOADING,
    UNLOCK
} from '../constants/types';

const INITIAL_STATE = {
    user: {},
    completed_setup: false,
    locked: false,
    loading: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_USER:
            return {...state, user: action.user};
        case SET_COMPLETED_SETUP:
            return {...state, completed_setup: action.completed_setup};
        case TOGGLE_LOADING:
            if (action.loading) {
                return {...state, loading: action.loading};
            }

            return {...state, loading: !state.loading};
        case LOCK:
            return {...state, locked: true};
        case UNLOCK:
            return {...state, locked: false};
        case RESET:
            return INITIAL_STATE;
    }

    return state;
}