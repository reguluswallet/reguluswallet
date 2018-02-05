import React, { Component } from 'react';
import { Picker, TouchableOpacity, Text, TextInput, StyleSheet, View } from 'react-native';
import QRCode from 'react-native-qrcode';
import { Balance, Button, Input, InputInfo, SectionHeader } from '../components';
import { Colors, Layout } from '../constants';

export default class PaymentsScreen extends Component {
    static navigationOptions = {
        title: 'Send Payment',
    };

    render() {
        return (
            <View style={styles.container}>
                <Balance>967.3479278</Balance>
                <SectionHeader>Send Payment</SectionHeader>
                <View style={styles.padded}>
                    <Input label="To" placeholder="Recipient's public key or address" />
                    <InputInfo label="Amount" placeholder="Amount to send" />
                    <View style={styles.textContainer}>
                        <TouchableOpacity style={styles.textButton}>
                            <Text style={styles.text}>Add Memo</Text>
                        </TouchableOpacity>
                    </View>
                    <TextInput
                        style={styles.memo}
                        placeholder="Up to 28 characters"
                        multiline={true} />
                    <Button>Send Lumens</Button>
                    {/* <QRCode
                    value="GD37245DE23W6I2JRULHEA22Y35XDVPGEXJ43W7TWWXORWIBDZC7JHCS"
                    size={150}
                    bgColor='#545D6F'
                    fgColor='white'
                    /> */}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    memo: {
        color: Colors.darkGrey,
        padding: Layout.gutter,
        fontSize: 16,
        lineHeight: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Colors.grey,
        fontFamily: 'clear-sans',
        height: 80,
        marginBottom: Layout.gutter
    },
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    padded: {
        padding: Layout.gutter
    },
    textContainer: {
        alignItems: 'flex-end',
        marginBottom: Layout.gutter
    },
    textButton: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: Layout.gutter,
        paddingLeft: Layout.gutter
    },
    text: {
        fontFamily: 'clear-sans',
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
        textDecorationColor: Colors.darkGrey,
        color: Colors.darkGrey
    }
});
