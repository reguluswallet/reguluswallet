import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Body, ListItem, Right, Switch, Text } from "native-base";

class FingerprintRowComponent extends Component {
    static propTypes = {
        onValueChange: PropTypes.func.isRequired
    };

    render() {
        if (this.props.has_fingerprint_hardware) {
            return (
                <ListItem icon>
                    <Body>
                        <Text>Require TouchID</Text>
                    </Body>
                    <Right>
                        <Switch
                            value={this.props.fingerprint_enabled}
                            onValueChange={this.props.onValueChange}
                        />
                    </Right>
                </ListItem>
            );
        } else {
            return null;
        }
    }
}

const mapStateToProps = ({ settings, device }) => {
    const { has_fingerprint_hardware } = device;
    const { fingerprint_enabled } = settings;
    return { fingerprint_enabled, has_fingerprint_hardware };
};

const FingerprintRow = connect(mapStateToProps)(FingerprintRowComponent);

export { FingerprintRow };
