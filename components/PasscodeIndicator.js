import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Icon, View } from "native-base";
import PropTypes from "prop-types";
import range from "lodash/range";
import { Colors } from "../constants/Colors";

class PasscodeIndicator extends Component {
    static propTypes = {
        length: PropTypes.number.isRequired
    };

    render() {
        return (
            <View style={styles.dots}>
                {range(0, this.props.length).map(n => (
                    <Icon name="radio-button-on" style={styles.dot} key={n} />
                ))}
                {range(0, 4 - this.props.length).map(n => (
                    <Icon name="radio-button-off" style={styles.dot} key={n} />
                ))}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    dots: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        paddingVertical: 15
    },
    dot: {
        color: Colors.blue,
        marginHorizontal: 10
    }
});

export { PasscodeIndicator };
