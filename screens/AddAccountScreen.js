import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Container, Content, Form, Text } from "native-base";
import { Alert, BarCodeInput } from "../components";
import { AddAccount } from "../actions";

class AddAccountComponent extends Component {
    static navigationOptions = {
        title: "Add Account"
    };

    state = {
        public_key: "",
        secret_key: ""
    };

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        const { public_key, secret_key } = this.state;
        if (AddAccountComponent.validate(public_key, secret_key)) {
            this.props.AddAccount(public_key, secret_key);
        }
    }

    static validate(public_key, secret_key) {
        if (public_key === "") {
            Alert("Public key cannot be blank");
            return false;
        }

        if (secret_key === "") {
            Alert("Secret key cannot be blank");
            return false;
        }

        return true;
    }

    render() {
        return (
            <Container>
                <Content padder>
                    <Form>
                        <BarCodeInput
                            label="Public Key:"
                            autoCapitalize="none"
                            autoCorrect={false}
                            returnKeyType="next"
                            placeholder="Your public key"
                            onChangeText={public_key =>
                                this.setState({ public_key })
                            }
                            value={this.state.public_key}
                            onSubmitEditing={() => {
                                this.refs.SecretKeyInput.wrappedInstance.focus();
                            }}
                            handleBarCodeRead={data => {
                                this.setState({ public_key: data });
                            }}
                        />
                        <BarCodeInput
                            label="Secret Key:"
                            ref="SecretKeyInput"
                            autoCapitalize="none"
                            autoCorrect={false}
                            returnKeyType="done"
                            placeholder="Your secret key"
                            onChangeText={secret_key =>
                                this.setState({ secret_key })
                            }
                            value={this.state.secret_key}
                            onSubmitEditing={this.handleSubmit}
                            handleBarCodeRead={data => {
                                this.setState({ secret_key: data });
                            }}
                        />
                    </Form>
                    <Text danger mb>
                        ATTENTION: We will never save your keys. They will be
                        encrypted and stored only on your device. This allows
                        you to quickly and easily sign your transactions.
                    </Text>
                    <Button block onPress={this.handleSubmit}>
                        <Text>Save and Continue</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

const AddAccountScreen = connect(null, { AddAccount })(AddAccountComponent);

export { AddAccountScreen };
