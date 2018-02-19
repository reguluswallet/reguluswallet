import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View} from 'react-native';
import {Logout, ToggleTouchID, TogglePushNotifications} from '../actions';
import {Colors, Layout} from '../constants';
import {Balance, SectionHeader} from '../components';
import {Fingerprint} from 'expo';

class SettingsScreen extends Component {
    static navigationOptions = {
        title: 'Settings',
    };

    state = {
        fingerprint: false
    };

    componentWillMount() {
        const vm = this;
        Fingerprint.hasHardwareAsync().then((result) => {
            vm.setState({fingerprint: result})
        });
    }

    _renderTouchID() {
        if (this.state.fingerprint) {
            return (
                <View style={styles.textRow}>
                    <Text style={styles.toggleRowTitle}>Touch ID</Text>
                    <Switch
                        value={this.props.touch_id}
                        onValueChange={this.props.ToggleTouchID}
                    />
                </View>
            )
        }
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Balance>{this.props.balance}</Balance>
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
                    <Switch
                        value={this.props.push_notifications}
                        onValueChange={this.props.TogglePushNotifications}
                    />
                </View>
                {this._renderTouchID()}
                <View style={styles.dividerLarge}/>
                <TouchableOpacity style={styles.signoutRow} onPress={this.props.Logout}>
                    <Text style={styles.signoutText}>Sign Out</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.resetRow}>
                    <Text style={styles.resetText}>Reset Password</Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}

const mapStateToProps = ({account, settings}) => {
    let {id, balance} = account;
    let {touch_id, push_notifications} = settings;
    return {id, balance, touch_id, push_notifications};
};

export default connect(mapStateToProps, {Logout, ToggleTouchID, TogglePushNotifications})(SettingsScreen);

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

