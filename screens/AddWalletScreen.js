import React, {Component} from "react";
import {connect} from "react-redux";
import {Container, Content, Form, Item, Input, Label, Text} from "native-base";
import {Field, reduxForm} from "redux-form";
import {AddAccount} from "../actions";
import {Button} from "../components";

const validate = values => {
    const error = {};
    error.public_key = '';
    error.secret_key = '';
    let public_key = values.public_key;
    let secret_key = values.secret_key;

    // Protect against undefined values
    if (values.public_key === undefined) {
        public_key = '';
    }

    if (values.secret_key === undefined) {
        secret_key = '';
    }

    if (public_key === '') {
        error.public_key = '*';
    }

    if (secret_key === '') {
        error.secret_key = '*';
    }

    return error;
};

class AddWalletComponent extends Component {
    static navigationOptions = {
        title: 'Add Wallet',
    };

    renderInput({input, label, type, placeholder, meta: {touched, error, warning}}) {
        var hasError = false;
        if (error !== undefined) {
            hasError = true;
        }
        return (
            <Item regular error={hasError}>
                <Label>{label}</Label>
                <Input {...input} placeholder={placeholder}/>
            </Item>
        )
    }

    render() {
        return (
            <Container>
                <Content padder>
                    <Form>
                        <Field name="public_key" label="Public Key:" placeholder="Your public key"
                               component={this.renderInput}/>
                        <Field name="secret_key" label="Secret Key:" placeholder="Your secret key"
                               component={this.renderInput}/>
                    </Form>
                    <Text danger mb>
                        ATTENTION: We will never save your secret key. It will be encrypted and stored only on your
                        device. This allows you to quickly and easily sign your transactions.
                    </Text>
                    <Button block onPress={this.props.handleSubmit(data => {
                        const {public_key, secret_key} = data;
                        this.props.AddAccount(public_key, secret_key);
                    }).bind(this)}>
                        Save and Continue
                    </Button>
                </Content>
            </Container>
        );
    }
}

const AddWalletScreen = reduxForm({form: 'test', validate})(connect(null, {AddAccount})(AddWalletComponent));

export {AddWalletScreen};


