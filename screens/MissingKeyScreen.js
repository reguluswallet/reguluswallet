import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Content, Form, Text } from "native-base";
import { AddAccount } from "../actions";
import { BarCodeInput, LoadingButton } from "../components";

class MissingKeyComponent extends Component {
    static navigationOptions = {
        title: "Missing Key"
    };

    state = {
        loading: false,
        secret_key: ""
    };

    handleSubmit() {
        const { secret_key } = this.state;
        if (secret_key !== "") {
            this.props.AddAccount(this.props.public_key, secret_key);
        }
    }

    render() {
        return (
            <Container>
                <Content padder>
                    <Form>
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
                        ATTENTION: We will never save your secret key. It will
                        be encrypted and stored only on your device. This allows
                        you to quickly and easily sign your transactions.
                    </Text>
                    <LoadingButton
                        loading={this.state.loading}
                        block
                        onPress={this.handleSubmit.bind(this)}
                    >
                        Save and Continue
                    </LoadingButton>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = ({ account }) => {
    let { public_key } = account;
    return { public_key };
};

const MissingKeyScreen = connect(mapStateToProps, { AddAccount })(
    MissingKeyComponent
);

export { MissingKeyScreen };
