import './global';
import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import {AppState, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {AppLoading, Asset, Font} from 'expo';
import {Ionicons} from '@expo/vector-icons';
import {Root, StyleProvider} from 'native-base';
import getTheme from './native-base-theme/components'
import firebase from 'firebase';
import RootNavigation from './navigation/RootNavigation';
import Config from './config';
import {PersistGate} from 'redux-persist/integration/react'
import {persistor, store} from './store';
import Sentry from 'sentry-expo';
import {LOCK, UNLOCK} from "./constants/types";


Sentry.enableInExpoDevelopment = true;
// import { SentrySeverity, SentryLog } from 'react-native-sentry';
Sentry.config('https://0640d0a03ec34f9b8c810ba3b3b341fe@sentry.io/290824').install();

firebase.initializeApp(Config.firebase);

export default class App extends Component {
    state = {
        isLoadingComplete: false,
        authenticated: false,
        appState: AppState.currentState
    };

    componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange);
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    _handleAppStateChange = (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            // If TouchID is available and enabled?
            // If pin is set?
            store.dispatch({type: UNLOCK});
            store.dispatch(
                NavigationActions.back()
            )
        }
        else {
            store.dispatch({type: LOCK});
            store.dispatch(
                NavigationActions.navigate({
                    routeName: 'Splash'
                }))

        }
        this.setState({appState: nextAppState});
    };

    render() {
        if (!this.state.isLoadingComplete && !this.state.authenticated) {
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
                                <StatusBar barStyle="default"/>
                                <RootNavigation/>
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
                require('./assets/images/wallet.png'),
                require('./assets/images/network.png'),
                require('./assets/images/send-receive.png')
            ]),
            Font.loadAsync({
                // This is the font that we are using for our tab bar
                ...Ionicons.font,
                'clear-sans': require('./assets/fonts/ClearSans-Regular.ttf'),
                'clear-sans-bold': require('./assets/fonts/ClearSans-Bold.ttf'),
            }),
        ]);
    };

    _handleLoadingError = error => {
        // In this case, you might want to report the error to your error
        // reporting service, for example Sentry
        console.warn(error);
    };

    _handleFinishLoading = () => {
        this.setState({isLoadingComplete: true});
    };
}
