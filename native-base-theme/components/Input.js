import variable from './../variables/platform';
import {Colors, Layout} from '../../constants';

export default (variables = variable) => {
    const inputTheme = {
        '.multiline': {
            height: null,
        },
        height: variables.inputHeightBase,
        color: Colors.darkGrey,
        padding: variables.contentPadding,
        flex: 1,
        fontFamily: 'clear-sans',
        fontSize: variables.inputFontSize,
        lineHeight: variables.inputLineHeight,
    };

    return inputTheme;
};
