import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Animated,
    Easing,
    KeyboardAvoidingView,
    StyleSheet,
    TextInput,
    View,
} from 'react-native';
import {Button, Content, Container, Text, Item, Input} from 'native-base';
import {Login, LoginAnonymously, Register} from '../actions';
import {Logo} from '../components';
import {Colors, Layout} from '../constants';

class AuthScreen extends Component {
    static navigationOptions = {
        header: false,
    };

    constructor() {
        super();

        this.state = {
            animate_view: new Animated.Value(0),
            login_email: undefined,
            login_password: undefined,
            login_error: false,
            register_email: undefined,
            register_password: undefined,
            register_confirm_password: undefined,
            register_error: false
        }
    }

    _register() {
        let {register_email, register_password, register_confirm_password} = this.state;
        if (this.validateRegister()) {
            this.props.Register(register_email, register_password);
        }
    }

    validateRegister() {
        let {register_email, register_password, register_confirm_password} = this.state;
        this.setState({register_error: false});

        if (!register_email) {
            this.setState({register_error: true});
            return false;
        }

        if (!register_password) {
            this.setState({register_error: true});
            return false;
        }

        if (!register_confirm_password) {
            this.setState({register_error: true});
            return false;
        }

        if (register_password !== register_confirm_password) {
            this.setState({register_error: true});
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

        if (this.validateLogin()) {
            this.props.Login(login_email, login_password);
        }
    }

    validateLogin() {
        let {login_email, login_password} = this.state;
        this.setState({login_error: false});

        if (!login_email) {
            this.setState({login_error: true});
            return false;
        }

        if (!login_password) {
            this.setState({login_error: true});
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
                <KeyboardAvoidingView
                    style={styles.container}
                    keyboardVerticalOffset={0}
                    behavior="padding"
                >
                    <View>
                        <Logo/>
                        <View style={styles.auth}>
                            <Animated.View style={[styles.loginContainer, {left: this.state.animate_view}]}>
                                <Item regular top error={this.state.login_error}>
                                    <Input
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
                                        onSubmitEditing={() => {
                                            this.refs.PasswordInput.wrappedInstance.focus()
                                        }}
                                    />
                                </Item>
                                <Item regular bottom error={this.state.login_error} style={styles.mb}>
                                    <Input
                                        ref="PasswordInput"
                                        secureTextEntry
                                        selectionColor={Colors.tintColor}
                                        onChangeText={password => this.setState({login_password: password})}
                                        placeholder="Password"
                                        placeholderTextColor={Colors.grey}
                                    />
                                </Item>
                                <Button block onPress={this._login.bind(this)}>
                                    <Text>Login</Text>
                                </Button>
                                <Button block onPress={this.props.LoginAnonymously}>
                                    <Text>Login Anonymously</Text>
                                </Button>
                                <Button block transparent dark onPress={this._goToRegisterView.bind(this)}>
                                    <Text>Need An account? Register Here</Text>
                                </Button>
                            </Animated.View>
                            <Animated.View style={[styles.registerContainer, {left: this.state.animate_view}]}>
                                <Item regular top error={this.state.register_error}>
                                    <Input
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
                                        ref="PasswordInput"
                                        secureTextEntry
                                        selectionColor={Colors.tintColor}
                                        onChangeText={password => this.setState({register_password: password})}
                                        placeholder="Password"
                                        placeholderTextColor={Colors.grey}
                                    />
                                </Item>
                                <Item regular bottom error={this.state.register_error} style={styles.mb}>
                                    <Input
                                        ref="PasswordInput"
                                        selectionColor={Colors.tintColor}
                                        onChangeText={password => this.setState({register_confirm_password: password})}
                                        secureTextEntry
                                        placeholder="Confirm Password"
                                        placeholderTextColor={Colors.grey}
                                    />
                                </Item>
                                <Button block onPress={this._register.bind(this)}>
                                    <Text>Register</Text>
                                </Button>
                                <Button block transparent dark onPress={this._goToLoginView.bind(this)}>
                                    <Text>Already Have An Account? Login Here</Text>
                                </Button>
                            </Animated.View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    state
});

export default connect(mapStateToProps, {Login, LoginAnonymously, Register})(AuthScreen);

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
    container: {
        flex: 1,
        backgroundColor: Colors.lightBlue,
        justifyContent: 'center'
    },
    mb: {
        marginBottom: Layout.gutter
    }
});
