import { Toast } from "native-base";

const Alert = (message, type) => {
    type = type ? type : "danger";

    Toast.show({
        text: message,
        type,
        duration: 2500,
        position: "top"
    });
};

export { Alert };
