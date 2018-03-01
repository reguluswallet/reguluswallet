import React, {Component} from "react";
import {ActivityIndicator} from "react-native";
import {Button, Text} from "native-base";
import {Colors} from "../../constants";
import {connect} from "react-redux";

class LoadingButtonComponent extends Component {
    renderButtonChild() {
        if (this.props.loading) {
            return <ActivityIndicator color={Colors.white}/>
        }

        return <Text>{this.props.children}</Text>;
    }

    render() {
        return (
            <Button {...this.props} disabled={this.props.loading}>
                {this.renderButtonChild()}
            </Button>
        );
    }
}

const mapStateToProps = ({app}) => {
    let {loading} = app;
    return {loading};
};

const LoadingButton = connect(mapStateToProps)(LoadingButtonComponent);

export {LoadingButton};
