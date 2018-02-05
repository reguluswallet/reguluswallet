import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import {Colors, Layout} from '../../constants';

const Button = ({ onPress, children }) => {
    const { buttonStyle, textStyle } = styles;

    return (
        <TouchableOpacity activeOpacity={0.5} onPress={onPress} style={buttonStyle}>
            <Text style={textStyle}>
                {children}
            </Text>
        </TouchableOpacity>
    );
};

const styles = {
    textStyle: {
        fontFamily: 'clear-sans',
        alignSelf: 'center',
        color: Colors.white,
        fontSize: 16,
        lineHeight: 20,
        paddingTop: 15,
        paddingBottom: 15
    },
    buttonStyle: {
        alignSelf: 'stretch',
        backgroundColor: Colors.blue,
        borderRadius: Layout.radius
    }
};

export { Button };
