import React, {Component} from "react";
import {connect} from "react-redux";
import {ActivityIndicator, StyleSheet} from "react-native";
import {Container} from "native-base";
import firebase from "firebase";
import {Colors} from "../constants";
import {GetUserData, GetWallet, InitialRoute, Reset, ToggleLoading} from "../actions";

class LoadingComponent extends Component {
    static navigationOptions = {
        header: false,
    };

    state = {
        loading: true
    };

    componentWillMount() {
        // this.props.Reset();
        // this.props.ToggleLoading();
        let vm = this;

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.props.GetUserData(user).then(() => {
                    if (vm.props.app.completed_setup) {
                        if (vm.props.account.public_key) {
                            vm.props.InitialRoute('Main');
                        } else {
                            vm.props.InitialRoute('NoWallet');
                        }
                    } else {
                        vm.props.InitialRoute('Setup');
                    }
                });
            } else {
                vm.props.InitialRoute('Auth');
            }
        });
    }

    render() {
        return (
            <Container style={styles.container}>
                <ActivityIndicator color={Colors.blue}/>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    app: state.app,
    account: state.account
});

const LoadingScreen = connect(mapStateToProps, {
    GetUserData,
    ToggleLoading,
    GetWallet,
    Reset,
    InitialRoute
})(LoadingComponent);

export {LoadingScreen};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.lightBlue,
    }
});
