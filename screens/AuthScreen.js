import React, {Component} from "react";
import {connect} from "react-redux";
import {Animated, Easing, StyleSheet, View} from "react-native";
import {Button, Container, Content, Input, Item, Text, Toast} from 'native-base';
import {Login, Register, ToggleLoading} from '../actions';
import {LoadingButton, Logo} from '../components';
import {Colors, Layout} from '../constants';

class AuthComponent extends Component {
    static navigationOptions = {
        header: false,
    };

    state = {
        animate_view: new Animated.Value(0),
        login_email: undefined,
        login_password: undefined,
        register_email: undefined,
        register_password: undefined,
        register_confirm_password: undefined,
    };

    showError(message) {
        Toast.show({
            text: message,
            position: 'top',
            type: 'danger'
        });
    }

    _register() {
        let {register_email, register_password} = this.state;

        const vm = this;
        if (this.validateRegister()) {
            this.props.Register(register_email, register_password)
                .catch((error) => {
                    vm.showError(error);
                })
        }
    }

    validateRegister() {
        let {register_email, register_password, register_confirm_password} = this.state;

        if (!register_email) {
            this.showError('Must provide an e-mail address');
            return false;
        }

        if (!register_password) {
            this.showError('Must provide a password');
            return false;
        }

        if (!register_confirm_password) {
            this.showError('Must confirm password');
            return false;
        }

        if (register_password !== register_confirm_password) {
            this.showError('Passwords must match');
            return false;
        }

        return true;
    }

    _goToRegisterView() {
        Animated.timing(
            this.state.animate_view,
            {
                toValue: -Layout.window.width,
                easing: Easing.elastic(),
                duration: 300,
            }
        ).start(() => {
            this.refs.RegisterEmailInput.wrappedInstance.focus();
        });
    }

    _login() {
        let {login_email, login_password} = this.state;

        const vm = this;
        if (this.validateLogin()) {
            this.props.Login(login_email, login_password)
                .catch((error) => {
                    vm.showError(error);
                })
        }
    }

    validateLogin() {
        let {login_email, login_password} = this.state;

        if (!login_email) {
            this.showError('Must provide an e-mail address');
            return false;
        }

        if (!login_password) {
            this.showError('Must provide a password');
            return false;
        }

        return true;
    }

    _goToLoginView() {
        Animated.timing(
            this.state.animate_view,
            {
                toValue: 0,
                easing: Easing.elastic(),
                duration: 300,
            }
        ).start(() => {
            this.refs.LoginEmailInput.wrappedInstance.focus();
        });
    }

    render() {
        return (
            <Container>
                <Content style={styles.content}>
                    <Logo/>
                    <View style={styles.auth}>
                        <Animated.View style={[styles.loginContainer, {left: this.state.animate_view}]}>
                            <Item regular top>
                                <Input
                                    top
                                    ref="LoginEmailInput"
                                    autoFocus
                                    selectionColor={Colors.tintColor}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    returnKeyType="next"
                                    keyboardType="email-address"
                                    placeholder="E-mail Address"
                                    placeholderTextColor={Colors.grey}
                                    onChangeText={email => this.setState({login_email: email})}
                                    value={this.state.login_email}
                                    onSubmitEditing={() => {
                                        this.refs.PasswordInput.wrappedInstance.focus()
                                    }}
                                />
                            </Item>
                            <Item regular bottom error={this.state.login_error}>
                                <Input
                                    bottom
                                    ref="PasswordInput"
                                    secureTextEntry
                                    selectionColor={Colors.tintColor}
                                    onChangeText={password => this.setState({login_password: password})}
                                    value={this.state.login_password}
                                    placeholder="Password"
                                    placeholderTextColor={Colors.grey}
                                />
                            </Item>
                            <LoadingButton block onPress={this._login.bind(this)}>
                                Login
                            </LoadingButton>
                            <Button block transparent dark onPress={this._goToRegisterView.bind(this)}>
                                <Text>Need An account? Register Here</Text>
                            </Button>
                        </Animated.View>
                        <Animated.View style={[styles.registerContainer, {left: this.state.animate_view}]}>
                            <Item regular top error={this.state.register_error}>
                                <Input
                                    top
                                    ref="RegisterEmailInput"
                                    autoFocus
                                    selectionColor={Colors.tintColor}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    onChangeText={email => this.setState({register_email: email})}
                                    returnKeyType="next"
                                    keyboardType="email-address"
                                    placeholder="E-mail Address"
                                    placeholderTextColor={Colors.grey}
                                />
                            </Item>
                            <Item regular middle error={this.state.register_error}>
                                <Input
                                    middle
                                    ref="PasswordInput"
                                    secureTextEntry
                                    selectionColor={Colors.tintColor}
                                    onChangeText={password => this.setState({register_password: password})}
                                    placeholder="Password"
                                    placeholderTextColor={Colors.grey}
                                />
                            </Item>
                            <Item regular bottom error={this.state.register_error}>
                                <Input
                                    bottom
                                    ref="PasswordInput"
                                    selectionColor={Colors.tintColor}
                                    onChangeText={password => this.setState({register_confirm_password: password})}
                                    secureTextEntry
                                    placeholder="Confirm Password"
                                    placeholderTextColor={Colors.grey}
                                />
                            </Item>
                            <LoadingButton block onPress={this._register.bind(this)}>
                                Register
                            </LoadingButton>
                            <Button block transparent dark onPress={this._goToLoginView.bind(this)}>
                                <Text>Already Have An Account? Login Here</Text>
                            </Button>
                        </Animated.View>
                    </View>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    state
});

const AuthScreen = connect(mapStateToProps, {Login, Register, ToggleLoading})(AuthComponent);

export {AuthScreen};

const styles = StyleSheet.create({
    auth: {
        flexDirection: 'row'
    },
    loginContainer: {
        width: Layout.window.width,
        padding: Layout.gutter,
    },
    registerContainer: {
        width: Layout.window.width,
        padding: Layout.gutter
    },
    content: {
        flex: 1,
        backgroundColor: Colors.lightBlue,
        paddingTop: Layout.gutter * 4
    }
});
