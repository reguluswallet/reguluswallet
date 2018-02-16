import React, {Component} from 'react';
import {
    Animated,
    Easing,
    Image,
    KeyboardAvoidingView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import {Button, Container, Text} from 'native-base';
import Swiper from 'react-native-swiper';
import StellarSdk from 'stellar-sdk';

import {Logo} from '../components';
import {Colors, Layout} from '../constants';

var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

export default class SetupScreen extends Component {
    static navigationOptions = {
        header: false,
    };

    constructor() {
        super();
    }

    _createWallet() {
        console.log();
    }

    render() {
        return (
            <Container>
                <Swiper
                    style={styles.wrapper}
                    loop={false}
                    dotColor={Colors.grey}
                    activeDotColor={Colors.blue}
                >
                    <View style={styles.slide}>
                        <View style={styles.slide1}>
                            <View style={styles.slideTop}>
                                <Image
                                    source={require('../assets/images/wallet.png')}
                                    style={styles.wallet}
                                />
                                <Text style={styles.text}>Click "Create Wallet" to generate key pair for a new account. If you already have a key pair, click "Add Exisiting Wallet"</Text>
                            </View>
                            <View style={styles.slideBottom}>
                                <View style={styles.buttons}>
                                <Button block style={styles.mb} onPress={() => {
                                    this._createWallet();
                                }}>
                                    <Text>Create Wallet</Text>
                                </Button>
                                <Button dark bordered block>
                                    <Text>Add Existing</Text>
                                </Button>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.slide2}>
                        <Text style={styles.text}>Beautiful</Text>
                    </View>
                    <View style={styles.slide3}>
                        <Text style={styles.text}>And simple</Text>
                    </View>
                </Swiper>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {},
    slide: {
        flex: 1,
        padding: Layout.gutter,
        paddingBottom: Layout.gutter * 4,
        backgroundColor: Colors.lightBlue,
    },
    slide1: {
        flex: 1,
        flexDirection: 'column'
    },
    slideTop: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    slideBottom: {
        flex: 1,
        flexDirection: 'row',
    },
    buttons: {
        flex: 1,
        alignSelf: 'flex-end',
    },
    mb: {
        marginBottom: Layout.gutter
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.lightBlue,
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.lightBlue,
    },
    wallet: {
        marginBottom: Layout.gutter
    },
    text: {
        textAlign: 'center'
    }
});
