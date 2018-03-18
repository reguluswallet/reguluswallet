import React, { Component } from "react";
import { Modal, StyleSheet } from "react-native";
import { H3, Text, View } from "native-base";
import { BlurView } from "expo";
import PropTypes from "prop-types";
import { PasscodeIndicator, PasscodeKeyboard } from "../index";
import { Colors, Layout } from "../../constants";

class CheckPasscodeModal extends Component {
    static propTypes = {
        visible: PropTypes.bool.isRequired,
        closeModal: PropTypes.func.isRequired,
        callback: PropTypes.func.isRequired,
        passcode_confirm: PropTypes.string.isRequired
    };

    state = {
        alert: "",
        delay: 100,
        passcode: ""
    };

    constructor() {
        super();
        this.onKeyPress = this.onKeyPress.bind(this);
        this.onBackPress = this.onBackPress.bind(this);
    }

    onKeyPress(value) {
        this.updatePasscode(value);
    }

    updatePasscode(n) {
        this.setState(
            {
                passcode: `${this.state.passcode}${n}`
            },
            () => {
                if (
                    this.state.passcode.length === 4 &&
                    this.state.passcode === this.props.passcode_confirm
                ) {
                    setTimeout(() => {
                        this.props.closeModal();
                        this.props.callback();
                        this.setState({ passcode: "", alert: "" });
                    }, this.state.delay);
                } else if (this.state.passcode.length === 4) {
                    setTimeout(() => {
                        this.setState({
                            passcode: "",
                            alert:
                                "Your passcode doesn't match. Please try again."
                        });
                    }, this.state.delay);
                }
            }
        );
    }

    onBackPress() {
        this.setState({
            passcode: this.state.passcode.slice(0, -1)
        });
    }

    render() {
        return (
            <Modal
                transparent
                visible={this.props.visible}
                animationType={"slide"}
            >
                <BlurView
                    tint="light"
                    intensity={100}
                    style={StyleSheet.absoluteFill}
                />
                <View style={styles.container}>
                    <View style={styles.textContainer}>
                        <H3 style={styles.text}>Confirm Passcode</H3>
                        <Text style={styles.textAlert}>{this.state.alert}</Text>
                    </View>
                    <PasscodeIndicator length={this.state.passcode.length} />
                    <PasscodeKeyboard
                        onBackPress={this.onBackPress}
                        onKeyPress={this.onKeyPress}
                    />
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-around"
    },
    text: {
        textAlign: "center",
        color: Colors.blue
    },
    textAlert: {
        textAlign: "center",
        color: Colors.red,
        marginTop: Layout.gutter
    },
    textContainer: {
        height: 40
    }
});

export { CheckPasscodeModal };
