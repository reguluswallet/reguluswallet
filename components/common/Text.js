import React, {Component} from 'react';
import {Text as RNText, StyleSheet} from 'react-native';
import {Colors} from '../../constants';

export class Text extends Component {
    render() {
        return <RNText {...this.props} style={[styles.text, this.props.style]}/>;
    }
}

const styles = StyleSheet.create({
    text: {
        color: Colors.black,
        fontFamily: 'clear-sans',
        fontSize: 16,
        marginBottom: 5
    }
});


