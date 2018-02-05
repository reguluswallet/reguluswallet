import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {Amount} from '../components/';

export default class Balance extends Component {
    state = {
        open: false,
        buttonStyle: {
            transform: [{rotateZ: '0deg'}]
        }
    };

    onRowPress() {
        let rotation = (this.state.open) ? '0deg' : '90deg';
        this.setState({
            open: !this.state.open,
            buttonStyle: {
                transform: [{rotateZ: rotation}]
            }
        });

    }

    _renderDetails() {
        if (this.state.open) {
            return (
                <View style={styles.expandedContainer}>
                    <View style={styles.mb}>
                        <Text style={styles.expandedTitle}>Account ID:</Text>
                        <Text style={styles.expandedText}>GC25DC4QTB7RYKQZ6GR5L4Z4MCEJXR6PX6LBAKIOL2SFNE2CIMV3XQUE</Text>
                    </View>
                    <View>
                        <Text style={styles.expandedTitle}>Memo:</Text>
                        <Text style={styles.expandedText}>Thanks from lumenaut.net </Text>
                    </View>
                </View>
            )
        }
    }

    render() {
        return (
            <TouchableOpacity activeOpacity={0.5} onPress={this.onRowPress.bind(this)}>
                <View style={styles.container}>
                    <View style={styles.container__info}>
                        <Text style={styles.title}>GC25</Text>
                        <Amount number="negative">111.878</Amount>
                    </View>
                    <View style={styles.container__button}>
                        <Ionicons
                            name={'ios-more-outline'}
                            size={28}
                            color={'#000000'}
                            style={this.state.buttonStyle}
                        />
                    </View>
                </View>
                {this._renderDetails()}
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    expandedContainer: {
        padding: 15
    },
    expandedTitle: {
        color: '#545D6F',
        fontFamily: 'clear-sans',
        fontSize: 14
    },
    mb: {
        marginBottom: 5
    },
    expandedText: {
        color: '#545d6f',
        fontFamily: 'clear-sans',
        fontSize: 12
    },
    button: {
        transform: [{rotateZ: '90deg'}]
    },
    container: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 15,
        flexDirection: 'row'
    },
    container__info: {
        flex: 7,
        justifyContent: 'center',
    },
    info__amount_positive: {
        position: 'absolute',
        right: 0,
        backgroundColor: '#B6E7E4',
        borderRadius: 5,
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    info__amount_negative: {
        position: 'absolute',
        right: 0,
        backgroundColor: '#F5CED3',
        borderRadius: 5,
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    info__amount_text_positive: {
        color: '#27B6AF',
        marginRight: 5
    },
    info__amount_text_negative: {
        color: '#D8384D',
        marginRight: 5
    },
    info__amount_type: {
        fontSize: 10
    },
    container__button: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center'
    },
    title: {
        color: '#545D6F',
        fontSize: 16,
    },
    balance: {
        color: '#545D6F',
        fontSize: 18
    }
});
