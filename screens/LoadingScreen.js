import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {Container} from 'native-base';
import {LogoImage} from '../components';
import {Colors} from '../constants';
import {InitialRoute} from "../actions";
import {Fingerprint} from 'expo';

class LoadingScreen extends Component {
    static navigationOptions = {
        header: false,
    };

    componentWillMount() {
        let vm = this;
        Fingerprint.authenticateAsync().then((results) => {
            let route = 'Auth';
            if (vm.props.app.user) {
                if (vm.props.app.completedSetup) {
                    route = 'Main';
                } else {
                    route = 'Setup';
                }
            }
            route = 'Setup';

            vm.props.InitialRoute(route)
        });
    }

    render() {
        return (
            <Container style={styles.container}>
                <LogoImage/>
                <ActivityIndicator/>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    app: state.app
});

export default connect(mapStateToProps, {InitialRoute})(LoadingScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.lightBlue,
    }
});
