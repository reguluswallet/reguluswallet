import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Content, Form, Item, Label, Text } from "native-base";
import { LoadingButton } from "../components";

class PasscodeComponent extends Component {
    static navigationOptions = {
        title: "Add Passcode"
    };

    state = {
        loading: false
    };

    handleSubmit() {}

    render() {
        return (
            <Container>
                <Content padder>
                    <Form>
                        <Item regular>
                            <Label>Secret Key:</Label>
                        </Item>
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

const PasscodeScreen = connect()(PasscodeComponent);

export { PasscodeScreen };
