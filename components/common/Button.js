import React, {Component} from "react";
import {ActivityIndicator} from "react-native";
import {Button as NBButton, Text} from "native-base";
import {Colors} from "../../constants";
import {connect} from "react-redux";

class ButtonComponent extends Component {
    renderButtonChild() {
        if (this.props.loading) {
             return <ActivityIndicator color={Colors.white}/>
        }

        return <Text>{this.props.children}</Text>;
    }

    render() {
    return (
        <NBButton {...this.props} disabled={this.props.loading}>
            {this.renderButtonChild()}
        </NBButton>
    );
    }
}

const mapStateToProps = ({app}) => {
    let {loading} = app;
    return {loading};
};

const Button = connect(mapStateToProps)(ButtonComponent);

export {Button};
