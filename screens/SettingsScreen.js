import React from 'react';
import {ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View} from 'react-native';
import {Colors, Layout} from '../constants';
import {Balance, SectionHeader} from '../components';

export default class SettingsScreen extends React.Component {
    static navigationOptions = {
        title: 'Settings',
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                <Balance>967.3479278</Balance>
                <SectionHeader>Settings</SectionHeader>
                <View style={styles.textRow}>
                    <Text style={styles.textRowTitle}>App Version</Text>
                    <Text style={styles.textRowText}>1.0.0</Text>
                </View>
                <View style={styles.divider}/>
                <View style={styles.textRow}>
                    <Text style={styles.textRowTitle}>Public Key:</Text>
                    <Text style={styles.textRowText}>GC25DC4QTB7RYKQZ6GR5L4Z4MCEJXR6PX6LBAKIOL2SFNE2CIMV3XQUE</Text>
                </View>
                <View style={styles.textRow}>
                    <Text style={styles.textRowTitle}>Email</Text>
                    <Text style={styles.textRowText}>suxur@me.com</Text>
                </View>
                <View style={styles.divider}/>
                <View style={styles.textRow}>
                    <Text style={styles.toggleRowTitle}>Push for Transactions</Text>
                    <Switch/>
                </View>
                <View style={styles.textRow}>
                    <Text style={styles.toggleRowTitle}>Touch ID</Text>
                    <Switch/>
                </View>
                <View style={styles.dividerLarge}/>
                <TouchableOpacity style={styles.signoutRow}>
                    <Text style={styles.signoutText}>Sign Out</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.resetRow}>
                    <Text style={styles.resetText}>Reset Password</Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.lightGrey,
    },
    divider: {
        backgroundColor: Colors.lightGrey,
        height: Layout.gutter * 2,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: Colors.grey
    },
    dividerLarge: {
        backgroundColor: Colors.lightGrey,
        height: Layout.gutter * 4,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: Colors.grey
    },
    resetRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: Colors.lightGrey,
        padding: Layout.gutter,
    },
    resetText: {
        color: Colors.darkGrey,
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
        textDecorationColor: Colors.darkGrey,
        fontFamily: 'clear-sans-bold',
        fontSize: 16,
        textAlign: 'center'
    },
    signoutRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: Colors.white,
        padding: Layout.gutter,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: Colors.grey
    },
    signoutText: {
        color: Colors.red,
        fontFamily: 'clear-sans-bold',
        fontSize: 16,
        textAlign: 'center'
    },
    toggleRowTitle: {
        fontFamily: 'clear-sans-bold',
        fontSize: 16,
        color: Colors.darkGrey,
        marginRight: Layout.gutter
    },
    textRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Colors.white,
        padding: Layout.gutter,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: Colors.grey
    },
    textRowTitle: {
        flex: 1,
        fontFamily: 'clear-sans-bold',
        fontSize: 16,
        color: Colors.blue,
        marginRight: Layout.gutter
    },
    textRowText: {
        flex: 3,
        textAlign: 'right',
        fontFamily: 'clear-sans',
        fontSize: 16
    }
});

