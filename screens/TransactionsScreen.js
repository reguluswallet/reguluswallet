import React, {Component} from 'react';
import {
    ListView,
    StyleSheet,
    View,
} from 'react-native';
import stellar from 'stellar-sdk';
import _ from 'lodash';


import TransactionRow from '../components/TransactionRow';
import {Balance, SectionHeader} from '../components';
import {Colors, Layout} from '../constants';

var server = new stellar.Server('https://horizon-testnet.stellar.org');

export default class TransactionsScreen extends Component {
    static navigationOptions = {
        title: 'Transactions',
    };

    state = {
        balance: 0.00
    };

    componentWillMount() {
        let vm = this;
        server.loadAccount('GASOCNHNNLYFNMDJYQ3XFMI7BYHIOCFW3GJEOWRPEGK2TDPGTG2E5EDW').then(function (account) {
            // account.transactions().then(function (transactions) {
            //     console.log(transactions);
            // });
            server.transactions()
                .forAccount('GD37245DE23W6I2JRULHEA22Y35XDVPGEXJ43W7TWWXORWIBDZC7JHCS')
                .call().then(function(r){ console.log(r); });
            let nativeBalance = _.find(account.balances, function(b) { return b.asset_type == 'native'; });
            vm.setState({
                balance: nativeBalance.balance
            });
        });

        this.createDataSource([1,2,3]);
    }

    componentWillReceiveProps(nextProps) {
        // nextProps are the next set of props that this component
        // will be rendered with
        // this.props is still the old set of props

        this.createDataSource(nextProps);
    }

    createDataSource(data) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(data);
    }

    render() {
        return (
            <View style={styles.container}>
                <Balance>{this.state.balance}</Balance>
                <ListView
                    enableEmptySections
                    dataSource={this.dataSource}
                    renderRow={() => <TransactionRow/>}
                    renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                    renderHeader={() => <SectionHeader>Transactions</SectionHeader>}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        marginLeft: Layout.gutter,
        backgroundColor: Colors.grey,
    },
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    }
});
