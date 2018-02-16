import React from 'react';
import { TouchableOpacity } from 'react-native';
import {Text} from '../../components';
import {Colors, Layout} from '../../constants';

const Button = ({ onPress, children }) => {
    const { button, text } = styles;

    return (
        <TouchableOpacity activeOpacity={0.5} onPress={onPress} style={button}>
            <Text style={text}>
                {children}
            </Text>
        </TouchableOpacity>
    );
};

const styles = {
    text: {
        alignSelf: 'center',
        color: Colors.white,
        lineHeight: 20,
        paddingTop: Layout.gutter,
        paddingBottom: Layout.gutter
    },
    button: {
        alignSelf: 'stretch',
        backgroundColor: Colors.blue,
        borderRadius: Layout.radius,
        marginBottom: Layout.gutter / 2
    }
};

export { Button };
