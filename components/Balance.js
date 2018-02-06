import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors, Layout} from '../constants';

const Balance = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your balance:</Text>
            <Text style={styles.balance}>{props.children} lumens</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: Layout.gutter,
        backgroundColor: Colors.white,
        borderBottomWidth: 1,
        borderBottomColor: Colors.grey
    },
    title: {
        color: Colors.darkGrey,
        fontSize: 14,
        marginBottom: 8
    },
    balance: {
        color: Colors.darkGrey,
        fontSize: 18
    }
});

export {Balance};
