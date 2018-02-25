import React, {Component} from 'react';
import {Animated, Easing, Image, StyleSheet, View} from 'react-native';
import {H1, Button, Container, Text} from 'native-base';
import Swiper from 'react-native-swiper';
import {SlideBackground} from '../components';
import {Colors, Layout} from '../constants';
import {connect} from "react-redux";
import {CompleteIntro} from "../actions";

class SetupScreen extends Component {
    static navigationOptions = {
        header: false,
    };

    state = {
        spinValue: new Animated.Value(0)
    };

    runAnimation() {
        this.state.spinValue.setValue(0);
        Animated.timing(
            this.state.spinValue,
            {
                toValue: 1,
                duration: 10000,
                easing: Easing.linear,
                useNativeDriver: true
            }
        ).start(() => this.runAnimation());
    }

    renderSlideOne() {
        this.runAnimation();

        const spin = this.state.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        });

        return (
            <View style={styles.slide}>
                <H1 style={styles.title}>Stellar Network</H1>
                <Animated.Image
                    style={[{transform: [{rotate: spin}]}, styles.networkImage]}
                    source={require('../assets/images/network.png')}
                />
                <View style={styles.infoBox}>
                    <View style={styles.content}>
                        <Text style={styles.infoText}>
                            The first thing you’ll need to do anything on the Stellar network
                            is an account. Accounts hold all your money inside Stellar and allow you to send and receive
                            payments—in fact, pretty much everything in Stellar is in some way tied to an
                            account.
                        </Text>
                    </View>
                    <SlideBackground/>
                </View>
            </View>
        );
    }

    renderSlideTwo() {
        return (
            <View style={styles.slide}>
                <H1 style={styles.title}>Accounts</H1>
                <Image source={require('../assets/images/wallet.png')}/>
                <View style={styles.infoBox}>
                    <View style={styles.content}>
                        <Text style={styles.infoText}>
                            Accounts are the central data structure in Stellar. Accounts are identified by a public key
                            and saved in the ledger. Everything else in the ledger, such as offers or trustlines, are
                            owned by a particular account.
                        </Text>
                    </View>
                    <SlideBackground flipped/>
                </View>
            </View>
        );
    }

    renderSlideThree() {
        return (
            <View style={styles.slide}>
                <H1 style={styles.title}>Send and Receive</H1>
                <Image source={require('../assets/images/send-receive.png')}/>
                <View style={styles.infoBox}>
                    <View style={styles.content}>
                        <Text style={styles.infoText}>
                            After you create an account, you can send and receive funds through the Stellar network.
                            Most of the time, you’ll be sending money to someone else who has their own account.
                        </Text>
                        <Button block onPress={this.props.CompleteIntro}>
                            <Text>Let's Get Started!</Text>
                        </Button>
                    </View>
                    <SlideBackground/>
                </View>
            </View>
        );
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
                    {this.renderSlideOne()}
                    {this.renderSlideTwo()}
                    {this.renderSlideThree()}
                </Swiper>
            </Container>
        );
    }
}

export default connect(null, {CompleteIntro})(SetupScreen);

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        backgroundColor: Colors.lightBlue,
        alignItems: 'center'
    },
    content: {
        position: 'absolute',
        zIndex: 2,
        flex: 1,
        height: Layout.window.height / 2,
        width: Layout.window.width,
        padding: Layout.gutter,
        justifyContent: 'center'
    },
    infoText: {
        textAlign: 'center',
        marginBottom: Layout.gutter * 2
    },
    infoBox: {
        position: 'absolute',
        bottom: 0
    },
    networkImage: {
        position: 'absolute',
        top: Layout.window.height * 0.25
    },
    title: {
        color: Colors.blue,
        textAlign: 'center',
        marginTop: Layout.gutter * 4,
        marginBottom: Layout.gutter * 4
    },
});
