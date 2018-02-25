import React from 'react';
import {Platform} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {TabNavigator, TabBarBottom} from 'react-navigation';

import {Colors} from '../constants';

import TransactionsScreen from '../screens/TransactionsScreen';
import {Layout} from "../constants/Layout";
import {PaymentsScreen, ReceiveScreen, SettingsScreen} from "../screens";

export default TabNavigator(
    {
        Transactions: {
            screen: TransactionsScreen,
        },
        Payments: {
            screen: PaymentsScreen,
        },
        Receive: {
            screen: ReceiveScreen
        },
        Settings: {
            screen: SettingsScreen,
        },
    },
    {
        navigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused}) => {
                const {routeName} = navigation.state;
                let iconName;
                switch (routeName) {
                    case 'Transactions':
                        iconName =
                            Platform.OS === 'ios' ? 'ios-menu' : 'md-menu';
                        break;
                    case 'Payments':
                        iconName = Platform.OS === 'ios' ? 'ios-arrow-dropup' : 'md-card';
                        break;
                    case 'Receive':
                        iconName = Platform.OS === 'ios' ? 'ios-arrow-dropdown' : 'md-card';
                        break;
                    case 'Settings':
                        iconName =
                            Platform.OS === 'ios' ? 'ios-cog' : 'md-cog';
                }
                return (
                    <Ionicons
                        name={iconName}
                        size={28}
                        style={{marginBottom: -3}}
                        color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
                    />
                );
            },
            tabBarLabel: ({focused}) => {
                const {routeName} = navigation.state;
                switch (routeName) {
                    case 'Transactions':
                        return 'Transactions';
                    case 'Payments':
                        return 'Send';
                    case 'Receive':
                        return 'Receive';
                    case 'Settings':
                        return 'Settings'
                }
            },
        }),
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        animationEnabled: false,
        swipeEnabled: false,
        tabBarOptions: {
            style: {
                height: 60,
                backgroundColor: Colors.lightBlue,
                borderTopColor: '#d4d4d4'
            },
            activeTintColor: Colors.blue,
            inactiveTintColor: Colors.darkGrey,
            labelStyle: {
                fontFamily: 'clear-sans',
                fontSize: 12,
                marginBottom: Layout.gutter / 2
            }
        }
    }
);
