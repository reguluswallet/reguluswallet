import './global';
import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {AppLoading, Asset, Font} from 'expo';
import {Ionicons} from '@expo/vector-icons';
import {Root, StyleProvider} from 'native-base';
import getTheme from './native-base-theme/components'
import firebase from 'firebase';
import RootNavigation from './navigation/RootNavigation';
import Config from './config';
import {PersistGate} from 'redux-persist/integration/react'
import {store, persistor} from './store';

firebase.initializeApp(Config.firebase);

export default class App extends Component {
    state = {
        isLoadingComplete: false,
        authenticated: false,
    };

    componentWillMount() {
    }

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
                // We include SpaceMono because we use it in HomeScreen.js. Feel free
                // to remove this if you are not using it in your app
                'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
                'clear-sans': require('./assets/fonts/ClearSans-Regular.ttf'),
                'clear-sans-bold': require('./assets/fonts/ClearSans-Bold.ttf'),
                'Roboto': require('native-base/Fonts/Roboto.ttf'),
                'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
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
