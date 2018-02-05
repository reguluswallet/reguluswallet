import React from 'react';
import { TextInput, View, Text } from 'react-native';
import { Colors, Layout } from '../../constants';

const InputInfo = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
    const { inputStyle, labelStyle, containerStyle } = styles;

    return (
        <View style={containerStyle}>
            <Text style={labelStyle}>{label}</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    secureTextEntry={secureTextEntry}
                    placeholder={placeholder}
                    autoCorrect={false}
                    style={inputStyle}
                    value={value}
                    onChangeText={onChangeText}
                />
                <View style={styles.info}>
                    <Text style={styles.infoText}>lumens</Text>
                </View>
            </View>
        </View>
    );
};

const styles = {
    inputContainer: {
        flexDirection: 'row'
    },
    info: {
        flex: 1,
        backgroundColor: Colors.lightGrey,
        borderTopRightRadius: 5,
        borderWidth: 1,
        borderLeftWidth: 0,
        borderColor: Colors.grey,
        borderBottomRightRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    infoText: {
        color: Colors.darkGrey,
        fontSize: 16,
        lineHeight: 20,
        fontFamily: 'clear-sans'
    },
    inputStyle: {
        flex: 4,
        color: Colors.darkGrey,
        padding: Layout.gutter,
        fontSize: 16,
        lineHeight: 20,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
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

export { InputInfo };
