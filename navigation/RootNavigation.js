import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StackNavigator, addNavigationHelpers} from 'react-navigation';
import {
    createReduxBoundAddListener,
    createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import AuthScreen from '../screens/AuthScreen';
import SetupScreen from '../screens/SetupScreen';
import ReceiveScreen from '../screens/ReceiveScreen';
import LoadingScreen from "../screens/LoadingScreen";
import MainTabNavigator from './MainTabNavigator';
import {Colors} from '../constants';

const RootStackNavigator = StackNavigator(
    {
        Loading: {
            screen: LoadingScreen
        },
        Auth: {
            screen: AuthScreen
        },
        Receive: {
            screen: ReceiveScreen
        },
        Setup: {
            screen: SetupScreen
        },
        Main: {
            screen: MainTabNavigator,
            navigationOptions: {
                gesturesEnabled: false
            }
        },
    },
    {
        navigationOptions: () => ({
            headerStyle: {
                backgroundColor: '#d4eef7'
            },
            headerTitleStyle: {
                fontFamily: 'clear-sans',
                fontWeight: 'normal',
                color: Colors.tintColor
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
