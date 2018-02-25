import React, {Component} from "react";
import {connect} from "react-redux";
import {Share, StyleSheet, View} from "react-native";
import QRCode from "react-native-qrcode";
import {Container, Content, Button, H2, Text} from "native-base";
import {Balance, SectionHeader} from "../components";
import {Colors, Layout} from "../constants";

class ReceiveComponent extends Component {
    static navigationOptions = {
        title: 'Receive Payment',
    };

    _share() {
        Share.share({
            title: 'Stellar Public Key',
            message: this.props.public_key
        }, {
            subject: 'Stellar Public Key'
        });
    }

    render() {
        return (
            <Container>
                <Balance>{this.props.balance}</Balance>
                <SectionHeader>Receive Payment</SectionHeader>
                <Content padder contentContainerStyle={styles.content}>
                    <View>
                        <Text style={styles.bold}>Public Key:</Text>
                        <Text>{this.props.public_key}</Text>
                    </View>
                    <View style={styles.qrcode}>
                        <QRCode
                            value={this.props.public_key}
                            size={150}
                            bgColor={Colors.black}
                            fgColor={Colors.white}
                        />
                    </View>
                    <Button block onPress={this._share.bind(this)}>
                        <Text>Share</Text>
                    </Button>
                </Content>
            </Container>
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
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    bold: {
        fontFamily: 'clear-sans-bold'
    }
});

const mapStateToProps = ({account}) => {
    let {public_key, balance} = account;
    return {public_key, balance};
};

const ReceiveScreen = connect(mapStateToProps)(ReceiveComponent);

export {ReceiveScreen};
