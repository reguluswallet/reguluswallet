import './global';
import React, {Component} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import {AppLoading, Asset, Font} from 'expo';
import {Ionicons} from '@expo/vector-icons';
import {Root, StyleProvider} from 'native-base';
import getTheme from './native-base-theme/components'
import firebase from 'firebase';
import reducers from './reducers';
import RootNavigation from './navigation/RootNavigation';
import {RootNavigationMiddleware} from './navigation/RootNavigation';
import Config from './config';


const store = createStore(reducers, applyMiddleware(ReduxThunk, RootNavigationMiddleware));

firebase.initializeApp(Config.firebase);

export default class App extends Component {
    state = {
        isLoadingComplete: false,
    };

    render() {
        if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
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
                    <StyleProvider style={getTheme()}>
                        <Root>
                            <StatusBar barStyle="default"/>
                            <RootNavigation/>
                        </Root>
                    </StyleProvider>
                </Provider>
            );
        }
    }

    _loadResourcesAsync = async () => {
        return Promise.all([
            Asset.loadAsync([
                require('./assets/images/wallet.png')
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
