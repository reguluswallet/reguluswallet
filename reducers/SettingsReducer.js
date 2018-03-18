import {
    RESET,
    SET_PASSCODE,
    TOGGLE_FINGERPRINT_ENABLED,
    TOGGLE_HAS_PASSCODE
} from "../constants/types";

const INITIAL_STATE = {
    passcode: "",
    has_passcode: false,
    fingerprint_enabled: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_PASSCODE:
            return { ...state, passcode: action.passcode };
        case TOGGLE_HAS_PASSCODE: {
            let has_passcode = action.has_passcode || !state.has_passcode;
            return { ...state, has_passcode };
        }
        case TOGGLE_FINGERPRINT_ENABLED: {
            const fingerprint_enabled =
                action.fingerprint_enabled || !state.fingerprint_enabled;
            return { ...state, fingerprint_enabled };
        }
        case RESET:
            return INITIAL_STATE;
    }

    return state;
};
