import React, {Component} from "react";
import {StyleSheet, View} from "react-native";
import QRCode from 'react-native-qrcode';
import {Balance, SectionHeader} from '../components';
import {Colors, Layout} from '../constants';
import {connect} from "react-redux";
import {Container, Content, Button, Text} from "native-base";

class ReceiveComponent extends Component {
    static navigationOptions = {
        title: 'Receive Payment',
    };

    render() {
        return (
            <Container>
                <Balance>{this.props.balance}</Balance>
                <SectionHeader>Receive Payment</SectionHeader>
                <Content padder contentContainerStyle={styles.content}>
                    <View>
                        <Text>Public Key:</Text>
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
                    <Button block>
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
});

const mapStateToProps = (state) => {
    let {public_key, balance, transactions} = state.account;
    return {public_key, balance, transactions};
};

const ReceiveScreen = connect(mapStateToProps)(ReceiveComponent);

export {ReceiveScreen};
