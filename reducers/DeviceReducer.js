import {
    RESET,
    TOGGLE_DEVICE_INITIALIZED,
    TOGGLE_HAS_FINGERPRINT_HARDWARE
} from "../constants/types";

const INITIAL_STATE = {
    initialized: false,
    has_fingerprint_hardware: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TOGGLE_DEVICE_INITIALIZED: {
            let initialized = action.initialized || !state.initialized;
            return { ...state, initialized };
        }
        case TOGGLE_HAS_FINGERPRINT_HARDWARE: {
            let has_fingerprint_hardware =
                action.has_fingerprint_hardware ||
                !state.has_fingerprint_hardware;
            return { ...state, has_fingerprint_hardware };
        }
        case RESET:
            return INITIAL_STATE;
    }

    return state;
};
