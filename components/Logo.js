import React, {Component} from 'react';
import {StyleSheet, Text} from 'react-native';
import {Colors, Layout} from '../constants';

const Logo = () => {
    return <Text style={styles.logo}>Regulus</Text>

};

const styles = StyleSheet.create({
    logo: {
        color: Colors.blue,
        fontFamily: 'clear-sans-bold',
        fontSize: 56,
        textAlign: 'center',
        marginBottom: Layout.gutter
    }
});

export {Logo};
