import variable from "./../variables/platform";

export default (variables = variable) => {
    const labelTheme = {
        ".focused": {
            width: 0
        },
        fontFamily: 'clear-sans-bold',
        fontSize: 16
    };

    return labelTheme;
};
