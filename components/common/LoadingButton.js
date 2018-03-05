import React, {Component} from "react";
import PropTypes from "prop-types";
import {ActivityIndicator} from "react-native";
import {Button, Text} from "native-base";
import {Colors} from "../../constants";

/**
 * Loading Button Component
 */
class LoadingButtonComponent extends Component {

    /**
     * Render Button Child
     *
     * @returns {*}
     */
    renderButtonChild() {
        if (this.props.loading) {
            return <ActivityIndicator color={Colors.white}/>
        }

        return <Text>{this.props.children}</Text>;
    }

    /**
     * Render
     *
     * @returns {*}
     */
    render() {
        return (
            <Button {...this.props} disabled={this.props.loading}>
                {this.renderButtonChild()}
            </Button>
        );
    }
}

LoadingButtonComponent.propTypes = {
    loading: PropTypes.bool.isRequired
};

const LoadingButton = LoadingButtonComponent;

export {LoadingButton};
