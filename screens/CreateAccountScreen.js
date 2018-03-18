import React, { Component } from "react";
import { connect } from "react-redux";
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
import { StyleSheet } from "react-native";
import { AddAccount } from "../actions";
import { Alert } from "../components";
import { Colors } from "../constants";

class CreateAccountComponent extends Component {
    static navigationOptions = {
        title: "Create Account"
    };

    state = {
        public_key: "",
        secret_key: ""
    };

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        const vm = this;
        fetch(
            "https://us-central1-regulus-wallet.cloudfunctions.net/generateTestKeyPair"
        )
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                vm.setState({
                    public_key: data.public_key,
                    secret_key: data.secret_key
                });
            });
    }

    handleSubmit() {
        const { public_key, secret_key } = this.state;
        if (CreateAccountComponent.validate(public_key, secret_key)) {
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
                        <Item regular>
                            <Label>Public Key:</Label>
                            <Input
                                label="Public Key:"
                                placeholder="Your public key"
                                disabled
                                selectable
                                multiline
                                value={this.state.public_key}
                                style={styles.input}
                                placeholderTextColor={Colors.grey}
                            />
                        </Item>
                        <Item regular>
                            <Label>Secret Key:</Label>
                            <Input
                                label="Secret Key:"
                                placeholder="Your secret key"
                                disabled
                                selectable
                                multiline
                                value={this.state.secret_key}
                                style={styles.input}
                                selectionColor={Colors.tintColor}
                                placeholderTextColor={Colors.grey}
                            />
                        </Item>
                    </Form>
                    <Text danger mb>
                        ATTENTION: ATTENTION: Please write down your secret key
                        and keep it safe. It won't be displayed again. You will
                        lose access to your lumens if you lose your secret key.
                    </Text>
                    <Text danger mb>
                        We will never save your keys. They will be encrypted and
                        stored only on your device. This allows you to quickly
                        and easily sign your transactions.
                    </Text>
                    <Button block onPress={this.handleSubmit}>
                        <Text>Save and Continue</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        flex: 1
    }
});

const CreateAccountScreen = connect(null, { AddAccount })(
    CreateAccountComponent
);

export { CreateAccountScreen };
