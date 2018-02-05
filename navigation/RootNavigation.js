import {Notifications} from 'expo';
import React from 'react';
import {StackNavigator} from 'react-navigation';

import AuthScreen from '../screens/AuthScreen';
import MainTabNavigator from './MainTabNavigator';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';
import {Colors} from '../constants';

const RootStackNavigator = StackNavigator(
    {
        Main: {
            screen: MainTabNavigator,
        },
        Auth: {
            screen: AuthScreen
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

export default class RootNavigator extends React.Component {
    componentDidMount() {
        this._notificationSubscription = this._registerForPushNotifications();
    }

    componentWillUnmount() {
        this._notificationSubscription && this._notificationSubscription.remove();
    }

    render() {
        return <RootStackNavigator/>;
    }

    _registerForPushNotifications() {
        // Send our push token over to our backend so we can receive notifications
        // You can comment the following line out if you want to stop receiving
        // a notification every time you open the app. Check out the source
        // for this function in api/registerForPushNotificationsAsync.js
        registerForPushNotificationsAsync();

        // Watch for incoming notifications
        this._notificationSubscription = Notifications.addListener(this._handleNotification);
    }

    _handleNotification = ({origin, data}) => {
        console.log(`Push notification ${origin} with data: ${JSON.stringify(data)}`);
    };
}
