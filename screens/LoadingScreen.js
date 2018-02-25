import React, {Component} from "react";
import {connect} from "react-redux";
import {ActivityIndicator, StyleSheet} from "react-native";
import {Container} from "native-base";
import firebase from "firebase";
import {Colors} from "../constants";
import {InitialRoute, Reset} from "../actions";

class LoadingComponent extends Component {
    static navigationOptions = {
        header: false,
    };

    componentWillMount() {
        // this.props.Reset();
        let vm = this;

        firebase.auth().onAuthStateChanged((user) => {
            let route = 'Auth';
            if (user) {
                if (vm.props.app.completed_setup) {
                    if (vm.props.app.accounts.length > 0) {
                        route = 'Main';
                    } else {
                        route = 'NoWallet';
                    }
                } else {
                    route = 'Setup';
                }
            }

            vm.props.InitialRoute(route)
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
    app: state.app
});

const LoadingScreen = connect(mapStateToProps, {Reset, InitialRoute})(LoadingComponent);

export {LoadingScreen};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.lightBlue,
    }
});
