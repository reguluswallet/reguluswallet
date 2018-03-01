import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addNavigationHelpers, StackNavigator} from 'react-navigation';
import {createReactNavigationReduxMiddleware, createReduxBoundAddListener} from 'react-navigation-redux-helpers';
import SetupScreen from '../screens/SetupScreen';
import MainTabNavigator from './MainTabNavigator';
import {Colors} from '../constants';
import SplashScreen from "../screens/SplashScreen";
import {AddWalletScreen, AuthScreen, LoadingScreen, NoWalletScreen} from "../screens";

const RootStackNavigator = StackNavigator(
    {
        Loading: {
            screen: LoadingScreen
        },
        Auth: {
            screen: AuthScreen
        },
        Setup: {
            screen: SetupScreen
        },
        NoWallet: {
            screen: NoWalletScreen
        },
        Main: {
            screen: MainTabNavigator,
            navigationOptions: {
                gesturesEnabled: false
            }
        },
        Splash: {
            screen: SplashScreen
        },
        AddWallet: {
            screen: AddWalletScreen
        }
    },
    {
        navigationOptions: () => ({
            headerTintColor: Colors.tintColor,
            headerStyle: {
                backgroundColor: '#d4eef7'
            },
            headerTitleStyle: {
                fontFamily: 'clear-sans-bold',
            },
        }),
    }
);

const INITIAL_STATE = RootStackNavigator.router.getStateForAction(
    RootStackNavigator.router.getActionForPathAndParams('Loading')
);

export const RootNavigationReducer = (state = INITIAL_STATE, action) => {
    const nextState = RootStackNavigator.router.getStateForAction(action, state);

    // Simply return the original `state` if `nextState` is null or undefined.
    return nextState || state;
};

export const RootNavigationMiddleware = createReactNavigationReduxMiddleware(
    'root',
    state => state.nav,
);
const addListener = createReduxBoundAddListener('root');

class RootNavigator extends Component {
    render() {
        return (
            <RootStackNavigator navigation={addNavigationHelpers({
                dispatch: this.props.dispatch,
                state: this.props.nav,
                addListener
            })}/>
        );
    }
}

const mapStateToProps = (state) => ({
    nav: state.nav
});

export default connect(mapStateToProps)(RootNavigator);
