import React, { Component } from "react";
import { connect } from "react-redux";
import {
    Body,
    Button,
    Container,
    Content,
    Icon,
    List,
    ListItem,
    Right,
    Switch,
    Text
} from "native-base";
import {
    Logout,
    SetPasscode,
    ToggleFingerprintEnabled,
    ToggleHasPasscode
} from "../actions";
import {
    Alert,
    CheckPasscodeModal,
    FingerprintRow,
    PasscodeModal
} from "../components";

class SettingsComponent extends Component {
    static navigationOptions = {
        title: "Settings"
    };

    state = {
        modal_visible: false,
        check_modal_visible: false
    };

    constructor() {
        super();
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openCheckModal = this.openCheckModal.bind(this);
        this.closeCheckModal = this.closeCheckModal.bind(this);
        this.checkModalCallback = this.checkModalCallback.bind(this);
        this.setPasscode = this.setPasscode.bind(this);
        this.togglePasscode = this.togglePasscode.bind(this);
        this.toggleFingerprintEnabled = this.toggleFingerprintEnabled.bind(
            this
        );
    }

    toggleFingerprintEnabled(value) {
        if (value) {
            if (this.props.has_passcode) {
                this.props.ToggleFingerprintEnabled();
            } else {
                Alert("You must set a passcode before using TouchID");
            }
        } else {
            // TODO: Confirm passcode
            this.props.ToggleFingerprintEnabled(false);
        }
    }

    togglePasscode(value) {
        if (value) {
            this.openModal();
        } else {
            this.openCheckModal();
            // TODO: Confirm passcode
        }
    }

    setPasscode(passcode) {
        this.props.SetPasscode(passcode);
        this.props.ToggleHasPasscode(true);
    }

    openModal() {
        this.setState({ modal_visible: true });
    }

    closeModal() {
        this.setState({ modal_visible: false });
    }

    openCheckModal() {
        this.setState({ check_modal_visible: true });
    }

    closeCheckModal() {
        this.setState({ check_modal_visible: false });
    }

    checkModalCallback() {
        this.props.SetPasscode("");
        this.props.ToggleHasPasscode(false);
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
                        <ListItem itemDivider>
                            <Text>Account</Text>
                        </ListItem>
                        <ListItem icon>
                            <Body>
                                <Text>Wallet</Text>
                            </Body>
                            <Right>
                                <Text>
                                    {this.props.public_key.substring(0, 4)}
                                </Text>
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
                                    value={this.props.has_passcode}
                                    onValueChange={this.togglePasscode}
                                />
                            </Right>
                        </ListItem>
                        <FingerprintRow
                            onValueChange={this.toggleFingerprintEnabled}
                        />
                        <ListItem itemDivider large />
                    </List>
                    <Button full danger iconRight onPress={this.props.Logout}>
                        <Text>Logout</Text>
                        <Icon name="log-out" />
                    </Button>
                    <PasscodeModal
                        visible={this.state.modal_visible}
                        closeModal={this.closeModal}
                        setPasscode={this.setPasscode}
                    />
                    <CheckPasscodeModal
                        visible={this.state.check_modal_visible}
                        closeModal={this.closeCheckModal}
                        callback={this.checkModalCallback}
                        passcode_confirm={this.props.passcode}
                    />
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = ({ app, account, settings }) => {
    let { public_key, balance } = account;
    let { passcode, touch_id, has_passcode } = settings;
    let { user } = app;

    return {
        user,
        public_key,
        balance,
        passcode,
        touch_id,
        has_passcode
    };
};

const SettingsScreen = connect(mapStateToProps, {
    Logout,
    SetPasscode,
    ToggleFingerprintEnabled,
    ToggleHasPasscode
})(SettingsComponent);

export { SettingsScreen };
