import {SET_USER, TOGGLE_COMPLETED_SETUP} from '../constants/types';

const INITIAL_STATE = {
    user: null,
    completedSetup: true
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_USER:
            return {...state, user: action.user};
        case  TOGGLE_COMPLETED_SETUP:
            return {...state, completedSetup: !state.completedSetup};
    }

    return state;
}