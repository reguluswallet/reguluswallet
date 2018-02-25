import React, {Component} from "react";
import {StyleSheet} from "react-native";
import {Container} from "native-base";
import {LogoImage} from "../components/index"
import {Colors} from "../constants/index";

class SplashScreen extends Component {
    static navigationOptions = {
        header: false,
    };
    render() {
        return (
            <Container style={styles.container}>
                <LogoImage/>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.lightBlue,
    }
});

export default SplashScreen;
