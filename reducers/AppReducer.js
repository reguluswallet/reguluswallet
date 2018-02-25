import {ADD_ACCOUNT, SET_USER, TOGGLE_COMPLETED_SETUP, TOGGLE_LOADING, LOCK, UNLOCK, RESET} from '../constants/types';

const INITIAL_STATE = {
    user: null,
    completed_setup: false,
    accounts: [],
    locked: false,
    loading: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_USER:
            return {...state, user: action.user};
        case ADD_ACCOUNT:
            return {
                ...state,
                accounts: [...state.accounts, action.account]
            };
        case  TOGGLE_COMPLETED_SETUP:
            return {...state, completed_setup: !state.completed_setup};
        case TOGGLE_LOADING:
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