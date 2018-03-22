import React, { Component } from "react";
import { connect } from "react-redux";
import { ActivityIndicator, StyleSheet } from "react-native";
import { Container } from "native-base";
import { Fingerprint } from "expo";
import { Colors } from "../constants";
import {
    GetUserData,
    InitialRoute,
    LoadAccount,
    Reset,
    ToggleDeviceInitialized,
    ToggleHasFingerprintHardware,
    ToggleLoading
} from "../actions";

class LoadingComponent extends Component {
    static navigationOptions = {
        header: false
    };

    state = {
        loading: true
    };

    componentWillMount() {
        // this.props.Reset();
        const vm = this;

        if (!this.props.device.initialized) {
            Fingerprint.hasHardwareAsync().then(result => {
                if (result) {
                    Fingerprint.isEnrolledAsync().then(result => {
                        vm.props.ToggleHasFingerprintHardware(result);
                        vm.props.ToggleDeviceInitialized();
                        vm.loadInitialRoute();
                    });
                } else {
                    vm.loadInitialRoute();
                }
            });
        } else {
            vm.loadInitialRoute();
        }
    }

    loadInitialRoute() {
        const vm = this;
        if (this.props.app.completed_setup) {
            if (this.props.account.public_key) {
                this.props
                    .LoadAccount(this.props.account.public_key)
                    .then(() => {
                        vm.props.InitialRoute("Main");
                    });
            } else {
                this.props.InitialRoute("NoAccount");
            }
        } else {
            this.props.InitialRoute("Setup");
        }
    }

    render() {
        return (
            <Container style={styles.container}>
                <ActivityIndicator color={Colors.blue} />
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    app: state.app,
    account: state.account,
    device: state.device
});

const LoadingScreen = connect(mapStateToProps, {
    GetUserData,
    ToggleLoading,
    Reset,
    InitialRoute,
    ToggleDeviceInitialized,
    ToggleHasFingerprintHardware,
    LoadAccount
})(LoadingComponent);

export { LoadingScreen };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.lightBlue
    }
});
