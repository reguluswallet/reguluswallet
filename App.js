import "./global";
import React, { Component } from "react";
import { NavigationActions } from "react-navigation";
import { AppState, StatusBar } from "react-native";
import { Provider } from "react-redux";
import { AppLoading, Asset, Font, Fingerprint } from "expo";
import { Ionicons } from "@expo/vector-icons";
import { Root, StyleProvider } from "native-base";
import firebase from "firebase";
import Sentry from "sentry-expo";
import { PersistGate } from "redux-persist/integration/react";
import RootNavigation from "./navigation/RootNavigation";
import getTheme from "./native-base-theme/components";
import { CheckPasscodeModal } from "./components";
import Config from "./config";
import { persistor, store } from "./store";

Sentry.enableInExpoDevelopment = true;
Sentry.config(Config.sentry.url).install();

firebase.initializeApp(Config.firebase);

export default class App extends Component {
    state = {
        authenticated: false,
        app_state: AppState.currentState,
        is_loading_complete: false,
        modal_visible: false,
        locked: false
    };

    constructor() {
        super();

        this.closeModal = this.closeModal.bind(this);
        this.unlockApp = this.unlockApp.bind(this);
    }

    componentDidMount() {
        AppState.addEventListener("change", this.handleAppStateChange);
    }

    componentWillUnmount() {
        AppState.removeEventListener("change", this.handleAppStateChange);
    }

    handleAppStateChange = nextAppState => {
        if (
            this.state.app_state.match(/inactive|background/) &&
            nextAppState === "active"
        ) {
            const {
                fingerprint_enabled,
                has_passcode
            } = store.getState().settings;
            // If TouchID is available and enabled?
            if (fingerprint_enabled && this.state.locked) {
                Fingerprint.authenticateAsync("Unlock with TouchID?").then(
                    result => {
                        if (result.success) {
                            this.unlockApp();
                        }
                    }
                );
            } else if (has_passcode && this.state.locked) {
                this.setState({ modal_visible: true });
            } else {
                this.unlockApp();
            }
        } else {
            if (!this.state.locked) {
                this.setState({ locked: true });
                store.dispatch(
                    NavigationActions.navigate({ routeName: "Splash" })
                );
            }
        }

        this.setState({ app_state: nextAppState });
    };

    closeModal() {
        this.setState({ modal_visible: false });
    }

    unlockApp() {
        this.setState({ locked: false });
        store.dispatch(NavigationActions.back());
    }

    renderCheckpasscodeModal() {
        const { passcode, has_passcode } = store.getState().settings;
        if (has_passcode) {
            return (
                <CheckPasscodeModal
                    visible={this.state.modal_visible}
                    closeModal={this.closeModal}
                    callback={this.unlockApp}
                    passcode_confirm={passcode}
                />
            );
        }
    }

    render() {
        if (!this.state.is_loading_complete && !this.state.authenticated) {
            return (
                <AppLoading
                    startAsync={this._loadResourcesAsync}
                    onError={this._handleLoadingError}
                    onFinish={this._handleFinishLoading}
                />
            );
        } else {
            return (
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <StyleProvider style={getTheme()}>
                            <Root>
                                <StatusBar barStyle="default" />
                                <RootNavigation />
                                {this.renderCheckpasscodeModal()}
                            </Root>
                        </StyleProvider>
                    </PersistGate>
                </Provider>
            );
        }
    }

    _loadResourcesAsync = async () => {
        return Promise.all([
            Asset.loadAsync([
                require("./assets/images/logo.png"),
                require("./assets/images/wallet.png"),
                require("./assets/images/network.png"),
                require("./assets/images/send-receive.png")
            ]),
            Font.loadAsync({
                // This is the font that we are using for our tab bar
                ...Ionicons.font,
                "clear-sans": require("./assets/fonts/ClearSans-Regular.ttf"),
                "clear-sans-bold": require("./assets/fonts/ClearSans-Bold.ttf")
            })
        ]);
    };

    _handleLoadingError = error => {
        // In this case, you might want to report the error to your error
        // reporting service, for example Sentry
        console.warn(error);
    };

    _handleFinishLoading = () => {
        this.setState({ is_loading_complete: true });
    };
}
