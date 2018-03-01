import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Logout, ToggleTouchID, TogglePushNotifications, TogglePasscode} from '../actions';
import {Fingerprint} from 'expo';
import {Grid, Row, Col, Button, Container, Content, Icon, Switch, Left, Body, Right, List, ListItem, Text, View} from "native-base";
import {Modal, StyleSheet} from "react-native";
import {Colors} from "../constants/Colors";

class SettingsComponent extends Component {
    static navigationOptions = {
        title: 'Settings',
    };

    state = {
        modalVisible: false,
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
                <ListItem icon>
                    <Body>
                    <Text>Require TouchID</Text>
                    </Body>
                    <Right>
                        <Switch
                            value={this.props.touch_id}
                            onValueChange={this.props.ToggleTouchID}
                        />
                    </Right>
                </ListItem>
            )
        }
    }

    openModal() {
        this.setState({modalVisible:true});
    }

    closeModal() {
        this.setState({modalVisible:false});
    }

    render() {
        return (
            <Container>
                <Content>
                    <List>
                        <ListItem itemDivider>
                            <Text>General</Text>
                        </ListItem>
                        <ListItem icon>
                            <Body>
                            <Text>App Version</Text>
                            </Body>
                            <Right>
                                <Text>1.0.0</Text>
                            </Right>
                        </ListItem>
                        <ListItem icon>
                            <Body>
                            <Text>Push for Transactions</Text>
                            </Body>
                            <Right>
                                <Switch
                                    value={this.props.push_notifications}
                                    onValueChange={this.props.TogglePushNotifications}
                                />
                            </Right>
                        </ListItem>
                        <ListItem itemDivider>
                            <Text>Account</Text>
                        </ListItem>
                        <ListItem icon>
                            <Body>
                            <Text>Wallet</Text>
                            </Body>
                            <Right>
                                <Text>{this.props.public_key.substring(0, 4)}</Text>
                            </Right>
                        </ListItem>
                        <ListItem icon>
                            <Body>
                            <Text title>Email</Text>
                            </Body>
                            <Right>
                                <Text>{this.props.user.email}</Text>
                            </Right>
                        </ListItem>
                        <ListItem itemDivider>
                            <Text>Security</Text>
                        </ListItem>
                        <ListItem icon>
                            <Body>
                            <Text>Require Passcode</Text>
                            </Body>
                            <Right>
                                <Switch
                                    value={this.props.passcode}
                                    // onValueChange={this.props.TogglePasscode}
                                    onValueChange={this.openModal.bind(this)}
                                />
                            </Right>
                        </ListItem>
                        {this._renderTouchID()}
                        <ListItem itemDivider large/>
                    </List>
                    <Button full danger iconRight onPress={this.props.Logout}>
                        <Text>Logout</Text>
                        <Icon name='log-out'/>
                    </Button>
                    <Button full dark transparent>
                        <Text>Reset Password</Text>
                    </Button>
                </Content>
                <Modal
                    transparent
                    visible={this.state.modalVisible}
                    animationType={'slide'}
                    onRequestClose={() => this.closeModal()}
                >
                    <Content style={styles.modalContainer}>
                    </Content>
                </Modal>
            </Container>
        );
    }
}

const mapStateToProps = ({app, account, settings}) => {
    let {public_key, balance} = account;
    let {touch_id, passcode, push_notifications} = settings;
    let {user} = app;

    return {user, public_key, balance, touch_id, passcode, push_notifications};
};

const styles = StyleSheet.create({
    row: {
        flex: 1,
    },
    // container: {
    //     flex: 1,
    //     justifyContent: 'center',
    // },
    modalContainer: {
        // flex: 1,
        // justifyContent: 'center',
        backgroundColor: Colors.lightBlue
    },
    // innerContainer: {
    //     alignItems: 'center',
    // },
});

const SettingsScreen = connect(mapStateToProps, {
    Logout,
    ToggleTouchID,
    TogglePasscode,
    TogglePushNotifications
})(SettingsComponent);

export {SettingsScreen};
