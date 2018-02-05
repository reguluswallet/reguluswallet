import React from 'react';
import {Platform} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {TabNavigator, TabBarBottom} from 'react-navigation';

import {Colors} from '../constants';

import TransactionsScreen from '../screens/TransactionsScreen';
import PaymentsScreen from '../screens/PaymentsScreen';
import SettingsScreen from '../screens/SettingsScreen';

export default TabNavigator(
    {
        Transactions: {
            screen: TransactionsScreen,
        },
        Payments: {
            screen: PaymentsScreen,
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
                        iconName = Platform.OS === 'ios' ? 'ios-card' : 'md-card';
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
        }),
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        animationEnabled: false,
        swipeEnabled: false,
        tabBarOptions: {
            showLabel: false,
            style: {
                height: 60,
                backgroundColor: '#d4eef7',
                borderTopColor: '#d4d4d4'
            }
        }
    }
);
