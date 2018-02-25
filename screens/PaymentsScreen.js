import React, {Component} from "react";
import {StyleSheet} from "react-native";
import {Balance, SectionHeader} from "../components";
import {Colors} from '../constants/Colors';
import {Button, Container, Content, Text, Form, Item, Label, Input, Icon} from "native-base";
import {connect} from "react-redux";

class PaymentsComponent extends Component {
    static navigationOptions = {
        title: 'Send Payment',
    };

    state = {
        memo: false,
        memo_text: 'Add Memo'
    };

    _toggleMemoBox() {
        let text = (this.state.memo) ? 'Add Memo' : 'Cancel';
        this.setState({memo: !this.state.memo, memo_text: text});
    }

    _renderMemoBox() {
        if (this.state.memo) {
            return (
                <Item regular>
                    <Input
                        placeholder="Up to 28 characters"
                        multiline={true}
                        style={styles.memoInput}
                    />
                </Item>
            )
        }
    }

    render() {
        return (
            <Container>
                <Balance>{this.props.balance}</Balance>
                <SectionHeader>Send Payment</SectionHeader>
                <Content padder>
                    <Form>
                        <Item regular>
                            <Label>To:</Label>
                            <Input placeholder="Recipient's public key or address"/>
                        </Item>
                        <Item regular>
                            <Label>Amount:</Label>
                            <Input placeholder="Amount to send"/>
                        </Item>
                        <Button transparent dark style={styles.memoButton} onPress={this._toggleMemoBox.bind(this)}>
                            <Text style={styles.memoButtonText}>{this.state.memo_text}</Text>
                        </Button>
                        {this._renderMemoBox()}
                    </Form>
                    <Button block>
                        <Text>Send Lumens</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    let {public_key, balance, transactions} = state.account;
    return {public_key, balance, transactions};
};

const PaymentsScreen = connect(mapStateToProps)(PaymentsComponent);

export {PaymentsScreen};

const styles = StyleSheet.create({
    memoInput: {
        height: 100
    },
    memoButton: {
        alignSelf: 'flex-end'
    },
    memoButtonText: {
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
        textDecorationColor: Colors.darkGrey,
    }
});
