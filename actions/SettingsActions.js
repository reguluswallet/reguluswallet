import {
    SET_PASSCODE,
    TOGGLE_FINGERPRINT_ENABLED,
    TOGGLE_HAS_PASSCODE
} from "../constants/types";

export const SetPasscode = passcode => {
    return { type: SET_PASSCODE, passcode };
};

export const ToggleHasPasscode = has_passcode => {
    return { type: TOGGLE_HAS_PASSCODE, has_passcode };
};

export const ToggleFingerprintEnabled = fingerprint_enabled => {
    return { type: TOGGLE_FINGERPRINT_ENABLED, fingerprint_enabled };
};
