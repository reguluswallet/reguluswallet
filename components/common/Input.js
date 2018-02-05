import React from 'react';
import { TextInput, View, Text } from 'react-native';
import { Colors, Layout } from '../../constants';

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
    const { inputStyle, labelStyle, containerStyle } = styles;

    return (
        <View style={containerStyle}>
            <Text style={labelStyle}>{label}</Text>
            <TextInput
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                autoCorrect={false}
                style={inputStyle}
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    );
};

const styles = {
    inputStyle: {
        color: Colors.darkGrey,
        padding: Layout.gutter,
        fontSize: 16,
        lineHeight: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Colors.grey,
        fontFamily: 'clear-sans'
    },
    labelStyle: {
        fontSize: 16,
        marginBottom: 5,
        fontFamily: 'clear-sans'
    },
    containerStyle: {
        marginBottom: Layout.gutter
    }
};

export { Input };
