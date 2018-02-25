import variable from "./../variables/platform";

export default (variables = variable) => {
    const textTheme = {
        fontSize: variables.DefaultFontSize - 1,
        fontFamily: variables.fontFamily,
        color: variables.textColor,
        ".danger": {
            color: variables.brandDanger
        },
        ".note": {
            color: "#a7a7a7",
            fontSize: variables.noteFontSize
        },
        ".mb": {
            marginBottom: variables.contentPadding
        }
    };

    return textTheme;
};
