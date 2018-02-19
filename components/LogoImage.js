import React, {Component} from 'react';
import {StyleSheet, Image} from 'react-native';
import {Colors, Layout} from '../constants';

const LogoImage = () => {
    return (
        <Image
            source={require('../assets/images/logo.png')}
            style={styles.logo}
        />
    )

};

const styles = StyleSheet.create({
    logo: {
        marginBottom: Layout.gutter
    }
});

export {LogoImage};
