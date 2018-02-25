import React, {Component} from "react";
import {Image, StyleSheet} from "react-native";
import {connect} from "react-redux";
import {Button, Container, Content, H1, Text, View} from "native-base";
import {Layout} from '../constants';
import {Reset, Route} from "../actions";

class NoWalletComponent extends Component {
    static navigationOptions = {
        title: '',
    };

    _createWallet() {
    }

    render() {
        return (
            <Container>
                <Content padder contentContainerStyle={styles.content}>
                    <H1>404: No Wallets Found</H1>
                    <Image source={require('../assets/images/wallet.png')}
                    />
                    <View style={styles.buttons}>
                        <Button block onPress={this._createWallet.bind(this)}>
                            <Text>Create Wallet</Text>
                        </Button>
                        <Button block bordered dark onPress={() => {this.props.Route('AddWallet')}}>
                            <Text>Add Wallet</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        )
    }
}

const height = Layout.window.height - (Layout.gutter * 2);
const width = Layout.window.width - (Layout.gutter * 2);

const styles = StyleSheet.create({
    content: {
        alignItems: 'center',
        justifyContent: 'space-around',
        height: height
    },
    buttons: {
        width: width
    }
});

const mapStateToProps = (state) => {
    let {public_key, balance, transactions} = state.account;
    return {public_key, balance, transactions};
};

const NoWalletScreen = connect(mapStateToProps, {Route, Reset})(NoWalletComponent);

export {NoWalletScreen};
