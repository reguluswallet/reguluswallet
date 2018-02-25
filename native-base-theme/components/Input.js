import variable from './../variables/platform';
import {Colors} from '../../constants';

export default (variables = variable) => {
    const inputTheme = {
        '.multiline': {
            height: null,
        },
        ".top": {
            borderBottomWidth: 0,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0
        },
        ".middle": {
            borderBottomWidth: 0,
            borderRadius: 0
        },
        ".bottom": {
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
        },
        height: variables.inputHeightBase,
        color: Colors.darkGrey,
        padding: variables.contentPadding,
        paddingLeft: variables.contentPadding / 2,
        flex: 1,
        fontFamily: 'clear-sans',
        fontSize: variables.inputFontSize,
        lineHeight: variables.inputLineHeight,
        backgroundColor: Colors.white,
        borderColor: variables.inputBorderColor,
        borderWidth: 1,
        borderRadius: variables.borderRadiusBase
    };

    return inputTheme;
};
