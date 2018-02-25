import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors, Layout} from '../constants';

const SectionHeader = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{props.children}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.lightGrey,
        padding: Layout.gutter,
        borderBottomWidth: 1,
        borderBottomColor: Colors.grey
    },
    text: {
        fontFamily: 'clear-sans-bold',
        fontSize: 18,
        color: Colors.darkGrey
    }
});

export {SectionHeader};
