import React, {Component} from 'react';
import {
    Animated,
    Easing,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import {Button, Logo} from '../components';
import {Colors, Layout} from '../constants';

export default class AuthScreen extends Component {
    static navigationOptions = {
        header: false,
    };

    constructor() {
        super();

        this.state = {
            leftAnim: new Animated.Value(0),
            login_email: undefined,
            login_password: undefined,
        }
    }

    _register() {

    }

    _goToRegisterView() {
        Animated.timing(
            this.state.leftAnim,
            {
                toValue: -Layout.window.width,
                easing: Easing.elastic(),
                duration: 300,
            }
        ).start(() => {
            this.refs.RegisterEmailInput.focus();
        });
    }

    _goToLoginView() {
        Animated.timing(
            this.state.leftAnim,
            {
                toValue: 0,
                easing: Easing.elastic(),
                duration: 300,
            }
        ).start(() => {
            this.refs.LoginEmailInput.focus();
        });
    }

    render() {
        return (
            <KeyboardAvoidingView
                style={styles.container}
                keyboardVerticalOffset={0}
                behavior="padding"
            >

                <View>
                    <Logo/>
                    <View style={styles.auth}>
                        <Animated.View style={[styles.loginContainer, {left: this.state.leftAnim}]}>
                            <TextInput
                                ref="LoginEmailInput"
                                selectionColor={Colors.tintColor}
                                style={styles.input}
                                autoCapitalize="none"
                                autoCorrect={false}
                                autoFocus
                                onChangeText={email => this.setState({login_email: email})}
                                returnKeyType="next"
                                keyboardType="email-address"
                                placeholder="email"
                                onSubmitEditing={() => {
                                    this.refs.PasswordInput.focus()
                                }}
                            />
                            <TextInput
                                ref="PasswordInput"
                                selectionColor={Colors.tintColor}
                                style={styles.inputBottom}
                                onChangeText={password => this.setState({login_password})}
                                secureTextEntry
                                placeholder="password"
                            />
                            <Button>Login</Button>
                            <TouchableOpacity style={styles.registerButton} onPress={this._goToRegisterView.bind(this)}>
                                <Text style={styles.register}>Need An account? Register Here</Text>
                            </TouchableOpacity>
                        </Animated.View>
                        <Animated.View style={[styles.registerContainer, {left: this.state.leftAnim}]}>
                            <TextInput
                                ref="RegisterEmailInput"
                                selectionColor={Colors.tintColor}
                                style={styles.input}
                                autoCapitalize="none"
                                autoCorrect={false}
                                autoFocus
                                onChangeText={email => this.setState({register_email: email})}
                                returnKeyType="next"
                                keyboardType="email-address"
                                placeholder="E-mail Address"
                            />
                            <TextInput
                                ref="PasswordInput"
                                selectionColor={Colors.tintColor}
                                style={styles.inputMiddle}
                                onChangeText={password => this.setState({register_password: password})}
                                secureTextEntry
                                placeholder="Password"
                            />
                            <TextInput
                                ref="PasswordInput"
                                selectionColor={Colors.tintColor}
                                style={styles.inputBottom}
                                onChangeText={password => this.setState({register_confirm_password: password})}
                                secureTextEntry
                                placeholder="Confirm Password"
                            />
                            <Button onPress={this._register.bind(this)}>Register</Button>
                            <TouchableOpacity style={styles.registerButton} onPress={this._goToLoginView.bind(this)}>
                                <Text style={styles.register}>Already Have An Account? Login Here</Text>
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

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
    registerButton: {
        marginTop: Layout.gutter * 2,
        alignItems: 'center',
        padding: Layout.gutter
    },
    register: {
        color: Colors.darkGrey,
        fontSize: 16,
    },
    container: {
        flex: 1,
        backgroundColor: Colors.lightBlue,
        justifyContent: 'center'
    },
    input: {
        color: Colors.darkGrey,
        padding: Layout.gutter,
        fontSize: 16,
        lineHeight: 20,
        borderTopLeftRadius: Layout.radius,
        borderTopRightRadius: Layout.radius,
        borderWidth: 1,
        borderColor: Colors.grey,
        fontFamily: 'clear-sans',
        backgroundColor: Colors.white
    },
    inputMiddle: {
        color: Colors.darkGrey,
        padding: Layout.gutter,
        fontSize: 16,
        lineHeight: 20,
        borderTopWidth: 0,
        borderWidth: 1,
        borderColor: Colors.grey,
        fontFamily: 'clear-sans',
        backgroundColor: Colors.white
    },
    inputBottom: {
        color: Colors.darkGrey,
        padding: Layout.gutter,
        fontSize: 16,
        lineHeight: 20,
        borderBottomLeftRadius: Layout.radius,
        borderBottomRightRadius: Layout.radius,
        borderTopWidth: 0,
        borderWidth: 1,
        borderColor: Colors.grey,
        fontFamily: 'clear-sans',
        backgroundColor: Colors.white,
        marginBottom: Layout.gutter
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        marginLeft: Layout.gutter,
        backgroundColor: Colors.grey,
    }
});
