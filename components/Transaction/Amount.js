import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {Colors} from '../../constants';

class Amount extends Component {
    render() {

        let sign = {
            backgroundColor: Colors.lightGreen,
            color: Colors.green
        };

        if (this.props.number === 'negative') {
            sign.backgroundColor = Colors.lightRed;
            sign.color = Colors.red
        }

        return (
            <View style={[styles.container, {backgroundColor: sign.backgroundColor}]}>
                <Text style={[styles.amount, {color: sign.color}]}>{this.props.children}</Text>
                <Text style={styles.type}>XLM</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        right: 0,
        borderRadius: 5,
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    amount: {
        marginRight: 5
    },
    type: {
        fontSize: 10
    }
});

export {Amount};
