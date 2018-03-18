import React, { Component } from "react";
import { Modal, StyleSheet } from "react-native";
import { H3, Text, View } from "native-base";
import { BlurView } from "expo";
import PropTypes from "prop-types";
import { PasscodeIndicator, PasscodeKeyboard } from "../index";
import { Colors, Layout } from "../../constants";

class PasscodeModal extends Component {
    static propTypes = {
        visible: PropTypes.bool.isRequired,
        closeModal: PropTypes.func.isRequired,
        setPasscode: PropTypes.func.isRequired
    };

    state = {
        delay: 100,
        confirm: false,
        alert: "",
        passcode: "",
        passcode_confirm: ""
    };

    constructor() {
        super();
        this.onKeyPress = this.onKeyPress.bind(this);
        this.onBackPress = this.onBackPress.bind(this);
    }

    onKeyPress(value) {
        if (!this.state.confirm) {
            this.updatePasscode(value);
        } else {
            this.updatePasscodeConfirm(value);
        }
    }

    updatePasscode(n) {
        this.setState(
            {
                passcode: `${this.state.passcode}${n}`
            },
            () => {
                if (this.state.passcode.length === 4) {
                    setTimeout(() => {
                        this.setState({ confirm: true, alert: "" });
                    }, this.state.delay);
                }
            }
        );
    }

    updatePasscodeConfirm(n) {
        this.setState(
            {
                passcode_confirm: `${this.state.passcode_confirm}${n}`
            },
            () => {
                if (
                    this.state.passcode_confirm.length === 4 &&
                    this.state.passcode === this.state.passcode_confirm
                ) {
                    setTimeout(() => {
                        this.props.setPasscode(this.state.passcode);
                        this.props.closeModal();
                        this.setState({
                            alert: "",
                            confirm: false,
                            passcode: "",
                            passcode_confirm: ""
                        });
                    }, this.state.delay);
                } else if (this.state.passcode_confirm.length === 4) {
                    setTimeout(() => {
                        this.setState({
                            alert:
                                "Your passcode doesn't match. Please try again.",
                            confirm: false,
                            passcode: "",
                            passcode_confirm: ""
                        });
                    }, this.state.delay);
                }
            }
        );
    }

    onBackPress() {
        if (!this.state.confirm) {
            this.setState({
                passcode: this.state.passcode.slice(0, -1)
            });
        } else {
            this.setState({
                passcode_confirm: this.state.passcode_confirm.slice(0, -1)
            });
        }
    }

    renderAlert() {
        if (this.state.alert !== "") {
            return <Text>{this.state.alert}</Text>;
        }
    }

    render() {
        const passcode = this.state.confirm
            ? this.state.passcode_confirm
            : this.state.passcode;
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
                        <H3 style={styles.text}>
                            {this.state.confirm
                                ? "Confirm Passcode"
                                : "Set Passcode"}
                        </H3>
                        <Text style={styles.textAlert}>{this.state.alert}</Text>
                    </View>
                    <PasscodeIndicator length={passcode.length} />
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

export { PasscodeModal };
