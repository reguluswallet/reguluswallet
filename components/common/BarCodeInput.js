import React, { Component } from "react";
import { Modal, StyleSheet } from "react-native";
import { Button, Icon, Input, Item, Label, Text, View } from "native-base";
import { BarCodeScanner, Permissions } from "expo";
import PropTypes from "prop-types";
import { Layout } from "../../constants/Layout";
import { Colors } from "../../constants";

class BarCodeInput extends Component {
    static propTypes = {
        handleBarCodeRead: PropTypes.func.isRequired
    };

    state = {
        has_camera_permission: false,
        modal_visible: false
    };

    constructor() {
        super();

        this.handleBarCodeRead = this.handleBarCodeRead.bind(this);
        this.toggleBarCodeReader = this.toggleBarCodeReader.bind(this);
    }

    /**
     * Handle Bar Code Read
     *
     * @param type
     * @param data
     */
    handleBarCodeRead({ type, data }) {
        this.setState({
            modal_visible: false
        });

        this.props.handleBarCodeRead(data);
    }

    /**
     * Toggle BarCode Reader
     */
    toggleBarCodeReader() {
        const vm = this;
        if (!this.state.has_camera_permission) {
            const { status } = Permissions.askAsync(Permissions.CAMERA).then(
                () => {
                    vm.setState({
                        has_camera_permission: status === "granted",
                        modal_visible: true
                    });
                }
            );
        } else {
            vm.setState({
                modal_visible: true
            });
        }
    }

    render() {
        return (
            <View>
                <Item regular>
                    <Label>{this.props.label}</Label>
                    <Input
                        {...this.props}
                        style={{ paddingRight: Layout.gutter * 4 }}
                        selectionColor={Colors.tintColor}
                        placeholderTextColor={Colors.grey}
                    />
                    <Button onPress={this.toggleBarCodeReader}>
                        <Icon active name="qr-scanner" />
                    </Button>
                </Item>
                <Modal
                    transparent
                    visible={this.state.modal_visible}
                    animationType={"slide"}
                >
                    <View style={styles.barcode}>
                        <BarCodeScanner
                            onBarCodeRead={this.handleBarCodeRead}
                            style={StyleSheet.absoluteFill}
                        />
                        <Icon
                            active
                            style={styles.barcodeIcon}
                            name="qr-scanner"
                        />
                        <Button
                            full
                            transparent
                            light
                            style={styles.barcodeButton}
                            onPress={() => {
                                this.setState({ modal_visible: false });
                            }}
                        >
                            <Text>Cancel</Text>
                        </Button>
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    barcode: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    barcodeIcon: {
        fontSize: 300,
        color: Colors.white
    },
    barcodeButton: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0
    }
});

export { BarCodeInput };
