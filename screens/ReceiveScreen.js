import React, {Component} from 'react';
import {Picker, TouchableOpacity, TextInput, StyleSheet, View} from 'react-native';
import QRCode from 'react-native-qrcode';
import {Balance, Button, Text, Input, InputInfo, SectionHeader} from '../components';
import {Colors, Layout} from '../constants';

export default class ReceiveScreen extends Component {
    static navigationOptions = {
        title: 'Send Payment',
    };

    render() {
        return (
            <View style={styles.container}>
                <Balance>967.3479278</Balance>
                <SectionHeader>Receive Payment</SectionHeader>
                <View style={styles.padded}>
                    <View>
                        <Text>Public Key:</Text>
                        <Text>GD37245DE23W6I2JRULHEA22Y35XDVPGEXJ43W7TWWXORWIBDZC7JHCS</Text>
                    </View>
                    <View style={styles.qrcode}>
                        <QRCode
                            value="GD37245DE23W6I2JRULHEA22Y35XDVPGEXJ43W7TWWXORWIBDZC7JHCS"
                            size={150}
                            bgColor={Colors.black}
                            fgColor={Colors.white}
                        />
                    </View>
                    <Button>Share</Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    qrcode: {
        padding: Layout.gutter * 2,
        borderWidth: 1,
        borderColor: Colors.grey,
        borderRadius: 5,
    },
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
        flex: 1,
        padding: Layout.gutter,
        alignItems: 'center',
        justifyContent: 'space-between'
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
