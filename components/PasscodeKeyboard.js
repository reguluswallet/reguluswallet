import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Icon, Text, View } from "native-base";
import PropTypes from "prop-types";
import chunk from "lodash/chunk";
import range from "lodash/range";
import { Colors } from "../constants/Colors";

class PasscodeKeyboard extends Component {
    static propTypes = {
        onBackPress: PropTypes.func.isRequired,
        onKeyPress: PropTypes.func.isRequired
    };

    render() {
        return (
            <View>
                {chunk(range(1, 10), 3).map((numbers, index) => (
                    <View style={styles.row} key={index}>
                        {numbers.map((number, key) => (
                            <TouchableOpacity
                                style={styles.key}
                                key={key}
                                onPress={() => {
                                    this.props.onKeyPress(number);
                                }}
                            >
                                <Text style={styles.text}>{number}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}
                <View style={styles.row}>
                    <TouchableOpacity style={styles.key}>
                        <Text style={styles.placeholder}>0</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.key}
                        onPress={() => {
                            this.props.onKeyPress(0);
                        }}
                    >
                        <Text style={styles.text}>0</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.key}
                        onPress={this.props.onBackPress}
                    >
                        <Icon name="ios-backspace" style={styles.text} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row"
    },
    key: {
        flex: 1,
        flexGrow: 1,
        paddingVertical: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    placeholder: {
        color: "transparent",
        fontSize: 36
    },
    text: {
        color: Colors.blue,
        fontSize: 36,
        textAlign: "center"
    },
    icon: {
        color: Colors.blue,
        fontSize: 36
    }
});

export { PasscodeKeyboard };
