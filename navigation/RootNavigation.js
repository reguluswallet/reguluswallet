import React, { Component } from "react";
import { connect } from "react-redux";
import { addNavigationHelpers, StackNavigator } from "react-navigation";
import {
    createReactNavigationReduxMiddleware,
    createReduxBoundAddListener
} from "react-navigation-redux-helpers";
import SetupScreen from "../screens/SetupScreen";
import MainTabNavigator from "./MainTabNavigator";
import { Colors } from "../constants";
import SplashScreen from "../screens/SplashScreen";
import {
    AddAccountScreen,
    CreateAccountScreen,
    LoadingScreen,
    MissingKeyScreen,
    NoAccountScreen,
    PasscodeScreen
} from "../screens";

const RootStackNavigator = StackNavigator(
    {
        Loading: {
            screen: LoadingScreen
        },
        Setup: {
            screen: SetupScreen
        },
        NoAccount: {
            screen: NoAccountScreen
        },
        Main: {
            screen: MainTabNavigator,
            navigationOptions: {
                gesturesEnabled: false
            }
        },
        MissingKey: {
            screen: MissingKeyScreen
        },
        Splash: {
            screen: SplashScreen
        },
        AddAccount: {
            screen: AddAccountScreen
        },
        CreateAccount: {
            screen: CreateAccountScreen
        },
        PasscodeScreen: {
            screen: PasscodeScreen
        }
    },
    {
        navigationOptions: () => ({
            headerTintColor: Colors.tintColor,
            headerStyle: {
                backgroundColor: "#d4eef7"
            },
            headerTitleStyle: {
                fontFamily: "clear-sans-bold"
            }
        })
    }
);

const INITIAL_STATE = RootStackNavigator.router.getStateForAction(
    RootStackNavigator.router.getActionForPathAndParams("Loading")
);

export const RootNavigationReducer = (state = INITIAL_STATE, action) => {
    const nextState = RootStackNavigator.router.getStateForAction(
        action,
        state
    );

    // Simply return the original `state` if `nextState` is null or undefined.
    return nextState || state;
};

export const RootNavigationMiddleware = createReactNavigationReduxMiddleware(
    "root",
    state => state.nav
);
const addListener = createReduxBoundAddListener("root");

class RootNavigator extends Component {
    render() {
        return (
            <RootStackNavigator
                navigation={addNavigationHelpers({
                    dispatch: this.props.dispatch,
                    state: this.props.nav,
                    addListener
                })}
            />
        );
    }
}

const mapStateToProps = state => ({
    nav: state.nav
});

export default connect(mapStateToProps)(RootNavigator);
