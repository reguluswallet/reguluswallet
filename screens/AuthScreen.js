import React, {Component} from "react";
import {connect} from "react-redux";
import firebase from "firebase";
import Sentry from "sentry-expo";
import {Animated, Easing, StyleSheet, View} from "react-native";
import {Button, Container, Content, Input, Item, Text, Toast} from 'native-base';
import {Colors, Layout} from '../constants';
import {LoadingButton, Logo} from '../components';
import {Login, Register, ToggleLoading} from '../actions';

/**
 * AuthComponent
 */
class AuthComponent extends Component {
    static navigationOptions = {
        header: false,
    };

    state = {
        animate_view: new Animated.Value(-Layout.window.width),
        login_email: undefined,
        login_password: undefined,
        register_email: undefined,
        register_password: undefined,
        register_confirm_password: undefined,
        reset_email: '',
        loading: false
    };

    /**
     * Show Success Toast
     *
     * @param message
     */
    static showSuccess(message) {
        AuthComponent.showToast(message, 'success');
    }

    /**
     * Show Error Toast
     *
     * @param message
     */
    static showError(message) {
        AuthComponent.showToast(message, 'danger');
    }

    /**
     * Show Toast
     *
     * @param message
     * @param type
     */
    static showToast(message, type) {
        Toast.show({
            text: message,
            position: 'top',
            type: type
        });
    }

    /**
     * Animate View
     *
     * @param value
     * @param ref
     */
    animateView(value, ref) {
        return Animated.timing(this.state.animate_view, {
            toValue: value,
            easing: Easing.elastic(),
            duration: 300
        }).start(() => {
            ref.focus();
        });
    }

    /**
     * Register
     */
    register() {
        const vm = this;

        if (this.validateRegister()) {
            let {register_email, register_password} = this.state;
            this.setState({loading: true});
            this.props.Register(register_email, register_password)
                .catch((error) => {
                    AuthComponent.showError(error);
                })
                .then(() => {
                    vm.setState({loading: false});
                })
        }
    }

    /**
     * Validate Register
     *
     * @returns {boolean}
     */
    validateRegister() {
        let {register_email, register_password, register_confirm_password} = this.state;

        if (!register_email) {
            AuthComponent.showError('Must provide an e-mail address');
            return false;
        }

        if (!register_password) {
            AuthComponent.showError('Must provide a password');
            return false;
        }

        if (!register_confirm_password) {
            AuthComponent.showError('Must confirm password');
            return false;
        }

        if (register_password !== register_confirm_password) {
            AuthComponent.showError('Passwords must match');
            return false;
        }

        return true;
    }

    /**
     * Render Register View
     *
     * @returns {*}
     */
    renderRegisterView() {
        return (
            <Animated.View style={[styles.container, {left: this.state.animate_view}]}>
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
                <LoadingButton
                    block
                    onPress={this.register.bind(this)}
                    loading={this.state.loading}
                >
                    Register
                </LoadingButton>
                <Button block transparent dark onPress={this.goToLoginView.bind(this)}>
                    <Text>Already Have An Account? Login Here</Text>
                </Button>
            </Animated.View>
        )
    }

    /**
     * Go To Register View
     */
    goToRegisterView() {
        let value = -Layout.window.width * 2;
        this.animateView(value, this.refs.RegisterEmailInput.wrappedInstance);
    }

    /**
     * Login
     */
    login() {
        const vm = this;

        if (this.validateLogin()) {
            let {login_email, login_password} = this.state;
            this.setState({loading: true});
            this.props.Login(login_email, login_password)
                .catch((error) => {
                    AuthComponent.showError(error);
                })
                .then(() => {
                    vm.setState({loading: false});
                })
        }
    }

    /**
     * Validate Login
     *
     * @returns {boolean}
     */
    validateLogin() {
        let {login_email, login_password} = this.state;

        if (!login_email) {
            AuthComponent.showError('Must provide an e-mail address');
            return false;
        }

        if (!login_password) {
            AuthComponent.showError('Must provide a password');
            return false;
        }

        return true;
    }

    /**
     * Render Login View
     *
     * @returns {*}
     */
    renderLoginView() {
        return (
            <Animated.View style={[styles.container, {left: this.state.animate_view}]}>
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
                <LoadingButton
                    block
                    onPress={this.login.bind(this)}
                    loading={this.state.loading}
                >
                    Login
                </LoadingButton>
                <Button block transparent dark onPress={this.goToRegisterView.bind(this)}>
                    <Text>Need An account? Register Here</Text>
                </Button>
                <Button block transparent dark onPress={this.goToResetView.bind(this)}>
                    <Text>Forgot Password?</Text>
                </Button>
            </Animated.View>
        )
    }

    /**
     * Go To Login View
     */
    goToLoginView() {
        this.animateView(-Layout.window.width, this.refs.LoginEmailInput.wrappedInstance);
    }

    /**
     * Reset Password
     */
    resetPassword() {
        const vm = this;
        if (this.state.reset_email !== '') {
            vm.setState({loading: true});
            firebase.auth().sendPasswordResetEmail(this.state.reset_email)
                .then(() => {
                    AuthComponent.showSuccess('Password reset sent. Please check your email.');
                    vm.goToLoginView();
                    vm.setState({reset_email: ''});
                })
                .catch((e) => {
                    Sentry.captureException(e);
                    AuthComponent.showError('Unable to send password reset.');
                })
                .then(() => {
                    vm.setState({loading: false});
                });
        } else {
            AuthComponent.showError('Must provide an e-mail address');
        }
    }

    /**
     * Render Reset Password View
     * @returns {*}
     */
    renderResetPasswordView() {
        return (
            <Animated.View style={[styles.container, {left: this.state.animate_view}]}>
                <Item regular>
                    <Input
                        ref="ResetEmailInput"
                        selectionColor={Colors.tintColor}
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType="next"
                        keyboardType="email-address"
                        placeholder="E-mail Address"
                        placeholderTextColor={Colors.grey}
                        onChangeText={value => this.setState({reset_email: value})}
                        value={this.state.reset_email}
                    />
                </Item>
                <LoadingButton
                    block
                    onPress={this.resetPassword.bind(this)}
                    loading={this.state.loading}
                >
                    Reset
                </LoadingButton>
                <Button block transparent dark onPress={this.goToLoginView.bind(this)}>
                    <Text>Cancel</Text>
                </Button>
            </Animated.View>
        )
    }

    /**
     * Go To Reset View
     */
    goToResetView() {
        this.animateView(0, this.refs.ResetEmailInput.wrappedInstance);
    }

    /**
     * Render
     *
     * @returns {*}
     */
    render() {
        return (
            <Container>
                <Content style={styles.content}>
                    <Logo/>
                    <View style={styles.auth}>
                        {this.renderResetPasswordView()}
                        {this.renderLoginView()}
                        {this.renderRegisterView()}
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
    container: {
        width: Layout.window.width,
        padding: Layout.gutter
    },
    content: {
        flex: 1,
        backgroundColor: Colors.lightBlue,
        paddingTop: Layout.gutter * 4
    }
});
