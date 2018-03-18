import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet } from "react-native";
import {
    Button,
    Container,
    Content,
    Form,
    Input,
    Item,
    Label,
    Text
} from "native-base";
import { Colors } from "../constants";
import { LoadAccount, SendPayment } from "../actions";
import {
    Alert,
    Balance,
    BarCodeInput,
    LoadingButton,
    SectionHeader
} from "../components";

/**
 * Payments Component
 */
class PaymentsComponent extends Component {
    static navigationOptions = {
        title: "Send Payment"
    };

    state = {
        destination: "",
        amount: "",
        memo: "",
        memo_text: "Add Memo",
        has_memo: false,
        loading: false
    };

    constructor() {
        super();

        this.sendPayment = this.sendPayment.bind(this);
    }

    /**
     * Toggle Memo Box
     */
    toggleMemoBox() {
        let text = this.state.has_memo ? "Add Memo" : "Cancel";
        this.setState({ has_memo: !this.state.has_memo, memo_text: text });
    }

    /**
     * Render Memo Box
     *
     * @returns {*}
     */
    renderMemoBox() {
        if (this.state.has_memo) {
            return (
                <Item regular>
                    <Input
                        ref="MemoInput"
                        placeholder="Up to 28 characters"
                        multiline
                        style={styles.memoInput}
                        selectionColor={Colors.tintColor}
                        placeholderTextColor={Colors.grey}
                        returnKeyType="send"
                        onChangeText={value => this.setState({ memo: value })}
                        value={this.state.memo}
                        onSubmitEditing={this.sendPayment}
                    />
                </Item>
            );
        }
    }

    sendPayment() {
        const vm = this;
        if (this.validateForm()) {
            this.setState({ loading: true });
            const { destination, amount, memo } = this.state;
            this.props
                .SendPayment(this.props.public_key, destination, amount, memo)
                .then(() => {
                    Alert("Payment sent!", "success");
                    vm.setState({
                        destination: "",
                        amount: "",
                        memo: "",
                        has_memo: false
                    });
                    vm.props.LoadAccount(vm.props.public_key);
                })
                .catch(e => {
                    Alert(e.message);
                })
                .then(() => {
                    vm.setState({ loading: false });
                });
        }
    }

    /*
     * Validate Form
     *
     * @returns {boolean}
     */
    validateForm() {
        let { destination, amount } = this.state;

        if (destination === "") {
            PaymentsComponent.showError(
                "You must provide a destination address"
            );
            return false;
        }

        if (amount === "") {
            PaymentsComponent.showError("You must provide an amount");
            return false;
        }

        return true;
    }

    /**
     * Render
     *
     * @returns {*}
     */
    render() {
        return (
            <Container>
                <Balance>{this.props.balance}</Balance>
                <SectionHeader>Send Payment</SectionHeader>
                <Content padder>
                    <Form>
                        <BarCodeInput
                            label="To:"
                            autoCapitalize="none"
                            autoCorrect={false}
                            returnKeyType="next"
                            placeholder="Recipient's public key or address"
                            onChangeText={destination =>
                                this.setState({ destination })
                            }
                            value={this.state.destination}
                            onSubmitEditing={() => {
                                this.refs.AmountInput.wrappedInstance.focus();
                            }}
                            handleBarCodeRead={data => {
                                this.setState({ destination: data });
                            }}
                        />
                        <Item regular>
                            <Label>Amount:</Label>
                            <Input
                                placeholder="Amount to send"
                                onChangeText={amount =>
                                    this.setState({ amount })
                                }
                                value={this.state.amount}
                                ref="AmountInput"
                                selectionColor={Colors.tintColor}
                                autoCapitalize="none"
                                autoCorrect={false}
                                returnKeyType="next"
                                keyboardType="numeric"
                                placeholderTextColor={Colors.grey}
                            />
                        </Item>
                        <Button
                            transparent
                            dark
                            style={styles.memoButton}
                            onPress={this.toggleMemoBox.bind(this)}
                        >
                            <Text style={styles.memoButtonText}>
                                {this.state.memo_text}
                            </Text>
                        </Button>
                        {this.renderMemoBox()}
                    </Form>
                    <LoadingButton
                        block
                        loading={this.state.loading}
                        onPress={this.sendPayment}
                    >
                        Send Lumens
                    </LoadingButton>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    let { public_key, balance, transactions } = state.account;
    return { public_key, balance, transactions };
};

const PaymentsScreen = connect(mapStateToProps, { SendPayment, LoadAccount })(
    PaymentsComponent
);

export { PaymentsScreen };

const styles = StyleSheet.create({
    memoInput: {
        height: 100
    },
    memoButton: {
        alignSelf: "flex-end"
    },
    memoButtonText: {
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
        textDecorationColor: Colors.darkGrey
    }
});
