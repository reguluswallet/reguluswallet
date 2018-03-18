import React, { Component } from "react";
import { Image, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Button, Container, Content, H1, Text, View } from "native-base";
import { Layout } from "../constants";
import { Reset, Route } from "../actions";

class NoAccountComponent extends Component {
    static navigationOptions = {
        title: "No Account"
    };

    render() {
        return (
            <Container>
                <Content padder contentContainerStyle={styles.content}>
                    <View>
                        <H1>404: No Account Found</H1>
                        <Text>To get started, add or create an account.</Text>
                    </View>
                    <Image source={require("../assets/images/wallet.png")} />
                    <View style={styles.buttons}>
                        <Button
                            block
                            onPress={() => {
                                this.props.Route("AddAccount");
                            }}
                        >
                            <Text>Add Account</Text>
                        </Button>
                        <Button
                            transparent
                            block
                            onPress={() => {
                                this.props.Route("CreateAccount");
                            }}
                        >
                            <Text>Create Account</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        );
    }
}

const height = Layout.window.height - Layout.gutter * 2;
const width = Layout.window.width - Layout.gutter * 2;

const styles = StyleSheet.create({
    content: {
        alignItems: "center",
        justifyContent: "space-around",
        height
    },
    buttons: {
        width
    }
});

const NoAccountScreen = connect(null, { Route, Reset })(NoAccountComponent);

export { NoAccountScreen };
