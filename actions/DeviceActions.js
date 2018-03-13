import {
    TOGGLE_DEVICE_INITIALIZED,
    TOGGLE_HAS_FINGERPRINT_HARDWARE
} from "../constants/types";

const ToggleDeviceInitialized = initialized => {
    return { type: TOGGLE_DEVICE_INITIALIZED, initialized };
};

const ToggleHasFingerprintHardware = has_fingerprint_hardware => {
    return { type: TOGGLE_HAS_FINGERPRINT_HARDWARE, has_fingerprint_hardware };
};

export { ToggleDeviceInitialized, ToggleHasFingerprintHardware };
